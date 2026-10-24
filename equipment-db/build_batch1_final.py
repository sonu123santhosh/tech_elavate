# -*- coding: utf-8 -*-
"""
Combines all 20 records of Batch 1 and writes equipment-db/data/batch1.json
"""

import json
import os
import sys

from build_batch1_full import records as records_1_to_3
from batch1_items4_10 import ITEMS_4_TO_10
from batch1_items11_20 import ITEMS_11_TO_20

all_batch1 = records_1_to_3 + ITEMS_4_TO_10 + ITEMS_11_TO_20

out_dir = os.path.join(os.path.dirname(__file__), 'data')
os.makedirs(out_dir, exist_ok=True)
out_file = os.path.join(out_dir, 'batch1.json')

with open(out_file, 'w', encoding='utf-8') as f:
    json.dump(all_batch1, f, indent=2, ensure_ascii=False)

print(f"Successfully generated {len(all_batch1)} records in {out_file}")
