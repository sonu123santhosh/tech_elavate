# -*- coding: utf-8 -*-
"""
Combines all 20 records of Batch 2 (Items 21-40) and writes equipment-db/data/batch2.json
"""

import json
import os
import sys

from batch2_items21_30 import ITEMS_21_TO_30
from batch2_items31_40 import ITEMS_31_TO_40

all_batch2 = ITEMS_21_TO_30 + ITEMS_31_TO_40

out_dir = os.path.join(os.path.dirname(__file__), 'data')
os.makedirs(out_dir, exist_ok=True)
out_file = os.path.join(out_dir, 'batch2.json')

with open(out_file, 'w', encoding='utf-8') as f:
    json.dump(all_batch2, f, indent=2, ensure_ascii=False)

print(f"Successfully generated {len(all_batch2)} records in {out_file}")
