# -*- coding: utf-8 -*-
"""
Combines all 20 records of Batch 3 (Items 41-60) and writes equipment-db/data/batch3.json
"""

import json
import os
import sys

from batch3_items41_50 import ITEMS_41_TO_50
from batch3_items51_60 import ITEMS_51_TO_60

all_batch3 = ITEMS_41_TO_50 + ITEMS_51_TO_60

out_dir = os.path.join(os.path.dirname(__file__), 'data')
os.makedirs(out_dir, exist_ok=True)
out_file = os.path.join(out_dir, 'batch3.json')

with open(out_file, 'w', encoding='utf-8') as f:
    json.dump(all_batch3, f, indent=2, ensure_ascii=False)

print(f"Successfully generated {len(all_batch3)} records in {out_file}")
