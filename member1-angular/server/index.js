/**
 * SmartLab AI — Express Backend Service
 * Integrates Google Gemini Multimodal Vision API via @google/genai
 * Team: UNEMPLOYED 004 | Tech Elevate Hackathon
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI, Type } = require('@google/genai');
const { CATALOG_NAMES, matchEquipment } = require('./catalog-matcher');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
// Support up to 10MB payload for high-resolution apparatus camera snapshots
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Simple in-memory rate limiting counter (per IP, 30 requests per minute)
const requestCounts = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 30;

function rateLimiter(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  const entry = requestCounts.get(ip);

  if (!entry || now - entry.startTime > RATE_LIMIT_WINDOW_MS) {
    requestCounts.set(ip, { count: 1, startTime: now });
    return next();
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      success: false,
      error: 'Rate limit exceeded: Too many scan requests. Please wait a moment before scanning again.',
      code: 'RATE_LIMIT_EXCEEDED'
    });
  }

  entry.count++;
  next();
}

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '' && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here');
  res.json({
    status: 'healthy',
    service: 'SmartLab AI Backend',
    team: 'UNEMPLOYED 004',
    geminiConfigured: hasKey,
    catalogTotal: CATALOG_NAMES.length,
    timestamp: new Date().toISOString()
  });
});

/**
 * Equipment catalog endpoints for external sites / frontends
 * GET /api/equipment (with optional ?category=volumetric or ?search=pipette)
 */
app.get('/api/equipment', (req, res) => {
  try {
    const database = require('./equipment-database.json');
    const { category, search } = req.query;
    let results = database;

    if (category && category !== 'all') {
      results = results.filter(item => item.category === category);
    }

    if (search) {
      const q = search.toLowerCase().trim();
      results = results.filter(item => 
        item.name.toLowerCase().includes(q) ||
        (item.alternateNames && item.alternateNames.some(a => a.toLowerCase().includes(q))) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.tagline && item.tagline.toLowerCase().includes(q))
      );
    }

    res.json({
      success: true,
      count: results.length,
      totalCatalog: database.length,
      items: results
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to retrieve equipment database.' });
  }
});

/**
 * Get single equipment by ID
 * GET /api/equipment/:id
 */
app.get('/api/equipment/:id', (req, res) => {
  try {
    const database = require('./equipment-database.json');
    const item = database.find(eq => eq.id === req.params.id);
    if (!item) {
      return res.status(404).json({ 
        success: false, 
        error: `Equipment with ID '${req.params.id}' not found in catalog.` 
      });
    }
    res.json({ success: true, equipment: item });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to retrieve equipment item.' });
  }
});

/**
 * Equipment identification endpoint
 * POST /api/identify-equipment
 * Body: { image: string, mimeType?: string }
 */
app.post('/api/identify-equipment', rateLimiter, async (req, res) => {
  try {
    const { image, mimeType: providedMimeType } = req.body;

    // 1. Validate request payload
    if (!image || typeof image !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Missing required "image" field in request body. Provide a base64-encoded image string.',
        code: 'INVALID_PAYLOAD'
      });
    }

    // 2. Validate and parse Base64 image
    let base64Data = image;
    let mimeType = providedMimeType || 'image/jpeg';

    if (image.startsWith('data:')) {
      const match = image.match(/^data:([^;]+);base64,(.+)$/);
      if (!match) {
        return res.status(400).json({
          success: false,
          error: 'Invalid Data URL format. Expected data:[mimeType];base64,[data]',
          code: 'MALFORMED_DATA_URL'
        });
      }
      mimeType = match[1];
      base64Data = match[2];
    }

    // Validate supported image MIME types
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedMimeTypes.includes(mimeType.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: `Unsupported image format: "${mimeType}". Allowed formats: JPEG, PNG, WebP.`,
        code: 'UNSUPPORTED_MEDIA_TYPE'
      });
    }

    // Validate image size (Approx. 10MB max base64 size)
    const approximateSizeBytes = (base64Data.length * 3) / 4;
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB
    if (approximateSizeBytes > maxSizeBytes) {
      return res.status(413).json({
        success: false,
        error: `Image size exceeds the 10MB limit (estimated: ${(approximateSizeBytes / (1024 * 1024)).toFixed(1)}MB). Please use a smaller image.`,
        code: 'PAYLOAD_TOO_LARGE'
      });
    }

    // 3. Verify GEMINI_API_KEY presence
    const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : null;
    if (!apiKey || apiKey === '' || apiKey === 'your_gemini_api_key_here') {
      return res.status(503).json({
        success: false,
        error: 'GEMINI_API_KEY is not configured on the backend server. Please create a .env file with your GEMINI_API_KEY from Google AI Studio and restart the server.',
        code: 'MISSING_API_KEY',
        requiresApiKey: true
      });
    }

    // 4. Initialize Google Gen AI SDK
    const ai = new GoogleGenAI({ apiKey });

    // 5. Construct System Instructions & Prompt
    const catalogListPrompt = CATALOG_NAMES.join(', ');
    const systemPrompt = `You are SmartLab Vision, an expert scientific laboratory equipment identifier.
Your task is to analyze the image provided and identify the physical laboratory equipment/apparatus shown.
The verified laboratory equipment catalog contains:
${catalogListPrompt}.

Rules:
1. Identify the equipment accurately.
2. If the apparatus closely matches an item from the verified catalog, use the catalog name as 'equipmentName' (e.g., 'Burette', 'Conical Flask', 'Beaker', 'Measuring Cylinder', 'Pipette', 'Compound Microscope', 'Electronic Balance', 'Volumetric Flask', 'Funnel', 'Laboratory Thermometer', 'Glass Stirring Rod', 'Test Tube').
3. In 'alternativeNames', provide common laboratory synonyms (e.g. ['Erlenmeyer Flask'] for Conical Flask, or ['Graduated Cylinder'] for Measuring Cylinder).
4. In 'visualDescription', provide a concise factual description of what is physically visible in the image (shape, scale markings, material, stopcock, pan, lens, etc.).
5. If the image is blurry, partial, ambiguous, or not laboratory equipment, provide a clear, helpful explanation in 'uncertaintyNote'. If identification is clear and certain, set 'uncertaintyNote' to null or an empty string.
6. Do NOT invent specifications or safety rules; only describe visual features observed.`;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        equipmentName: {
          type: Type.STRING,
          description: 'The standardized name of the identified laboratory apparatus.'
        },
        alternativeNames: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: 'Common alternative or scientific names for the apparatus.'
        },
        visualDescription: {
          type: Type.STRING,
          description: 'Concise visual description of the observed physical characteristics, geometry, scale markings, or optical components.'
        },
        uncertaintyNote: {
          type: Type.STRING,
          description: 'Any uncertainty, ambiguity, or partial view note. Set to empty string if clear.'
        }
      },
      required: ['equipmentName', 'alternativeNames', 'visualDescription']
    };

    // 6. Call Gemini Vision Model with auto-failover across active models
    const VISION_MODELS = ['gemini-3.5-flash', 'gemini-flash-latest', 'gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.1-flash-lite'];
    let rawResult = null;
    let lastError = null;

    for (const modelName of VISION_MODELS) {
      try {
        rawResult = await ai.models.generateContent({
          model: modelName,
          contents: [
            {
              role: 'user',
              parts: [
                { text: systemPrompt },
                {
                  inlineData: {
                    mimeType: mimeType,
                    data: base64Data
                  }
                }
              ]
            }
          ],
          config: {
            responseMimeType: 'application/json',
            responseSchema: responseSchema
          }
        });
        if (rawResult && rawResult.text) {
          break; // Successfully generated content!
        }
      } catch (err) {
        lastError = err;
        console.warn(`Model ${modelName} encountered: ${err.message}. Trying next available model...`);
      }
    }

    if (!rawResult || !rawResult.text) {
      throw lastError || new Error('All vision models failed to respond.');
    }

    // 7. Parse and validate Gemini output
    const responseText = rawResult.text;
    if (!responseText) {
      throw new Error('Empty response received from Gemini Vision model.');
    }

    let parsedOutput;
    try {
      parsedOutput = JSON.parse(responseText);
    } catch (parseErr) {
      console.error('Failed to parse Gemini JSON output:', responseText);
      throw new Error('Model did not return valid JSON output.');
    }

    const {
      equipmentName = 'Unrecognized Apparatus',
      alternativeNames = [],
      visualDescription = 'No visual description provided.',
      uncertaintyNote = null
    } = parsedOutput;

    // Clean up uncertainty note
    const cleanUncertainty = uncertaintyNote && uncertaintyNote.trim() !== '' ? uncertaintyNote.trim() : null;

    // 8. Match against Source-of-Truth Equipment Catalog
    const matched = matchEquipment(equipmentName, alternativeNames);

    return res.json({
      success: true,
      source: 'gemini',
      geminiOutput: {
        equipmentName,
        alternativeNames,
        visualDescription,
        uncertaintyNote: cleanUncertainty
      },
      matchedCatalog: matched
        ? {
            equipmentId: matched.id,
            matchedName: matched.name,
            isConfident: matched.isConfident,
            details: matched.details || null
          }
        : null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

  } catch (error) {
    console.error('Gemini Equipment Identification Error:', error);

    // Differentiate known API quota / auth errors
    const errorMessage = error.message || 'An error occurred during Gemini vision analysis.';
    
    if (errorMessage.includes('API_KEY_INVALID') || errorMessage.includes('API key not valid')) {
      return res.status(401).json({
        success: false,
        error: 'The configured GEMINI_API_KEY is invalid. Please check your key at https://aistudio.google.com/',
        code: 'INVALID_API_KEY'
      });
    }

    if (errorMessage.includes('RESOURCE_EXHAUSTED') || errorMessage.includes('quota') || errorMessage.includes('429')) {
      return res.status(429).json({
        success: false,
        error: 'Gemini API quota exceeded or rate limit reached. Please wait a minute before retrying.',
        code: 'QUOTA_EXCEEDED'
      });
    }

    return res.status(500).json({
      success: false,
      error: `Gemini Vision processing error: ${errorMessage}`,
      code: 'GEMINI_SERVER_ERROR'
    });
  }
});

// Start listening
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 SmartLab AI Express Backend is running on port ${PORT}`);
  console.log(`📡 Equipment Recognition Endpoint: POST http://localhost:${PORT}/api/identify-equipment`);
  console.log(`❤️  Healthcheck: GET http://localhost:${PORT}/api/health`);
  console.log(`🔑 GEMINI_API_KEY configured: ${Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here')}`);
  console.log(`====================================================`);
});
