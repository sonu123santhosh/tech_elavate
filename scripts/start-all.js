/**
 * Unified Full-Stack Launcher
 * Concurrently starts:
 * 1. Express API Backend on http://localhost:5000
 * 2. Vite Frontend on http://localhost:5173
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const isWin = process.platform === 'win32';
const npmCmd = isWin ? 'npm.cmd' : 'npm';

console.log('🧪 Starting Smart Lab Assistant Unified Platform...\n');

// 1. Launch Backend
console.log('▶ Starting Backend Express API on http://localhost:5000...');
const backendProcess = spawn(npmCmd, ['--prefix', 'backend', 'run', 'dev'], {
  stdio: 'inherit',
  shell: true,
});

// 2. Launch Frontend
console.log('▶ Starting Frontend Vite Server on http://localhost:5173...');
const frontendProcess = spawn(npmCmd, ['--prefix', 'frontend', 'run', 'dev'], {
  stdio: 'inherit',
  shell: true,
});

function cleanup() {
  console.log('\n🛑 Shutting down Smart Lab Assistant services...');
  backendProcess.kill();
  frontendProcess.kill();
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
