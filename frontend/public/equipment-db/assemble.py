import json
import os

base_dir = os.path.dirname(os.path.abspath(__file__))
data_dir = os.path.join(base_dir, "data")

batches = ["batch1.json", "batch2.json", "batch3.json", "batch4.json"]
all_records = []

for b in batches:
    path = os.path.join(data_dir, b)
    if not os.path.exists(path):
        raise FileNotFoundError(f"Missing batch file: {path}")
    with open(path, "r", encoding="utf-8") as f:
        records = json.load(f)
        print(f"Loaded {len(records)} records from {b}")
        all_records.extend(records)

print(f"Total records combined: {len(all_records)}")
assert len(all_records) == 62, f"Expected 62 records, got {len(all_records)}"

# Sort by pdfNumber
all_records.sort(key=lambda x: x["pdfNumber"])

# Check continuity 1 to 62
for i, rec in enumerate(all_records, start=1):
    assert rec["pdfNumber"] == i, f"Expected pdfNumber {i}, got {rec['pdfNumber']} for id {rec['id']}"

# Write master database equipment.json
master_db_path = os.path.join(base_dir, "equipment.json")
with open(master_db_path, "w", encoding="utf-8") as f:
    json.dump(all_records, f, indent=2, ensure_ascii=False)
print(f"Successfully wrote master database to {master_db_path}")

# Build equipment.index.json
index_records = []
for rec in all_records:
    index_records.append({
        "id": rec["id"],
        "number": rec["pdfNumber"],
        "name": rec["name"],
        "category": rec["category"],
        "pdfGroup": rec["pdfGroup"],
        "imagePath": rec["image"]["src"]
    })

index_path = os.path.join(base_dir, "equipment.index.json")
with open(index_path, "w", encoding="utf-8") as f:
    json.dump(index_records, f, indent=2, ensure_ascii=False)
print(f"Successfully wrote index with {len(index_records)} entries to {index_path}")

# Also build equipment-data.js for standalone file:// protocol support
js_data_path = os.path.join(base_dir, "equipment-data.js")
with open(js_data_path, "w", encoding="utf-8") as f:
    f.write("window.LAB_EQUIPMENT_DB = " + json.dumps(all_records, indent=2, ensure_ascii=False) + ";\n")
    f.write("window.LAB_EQUIPMENT_INDEX = " + json.dumps(index_records, indent=2, ensure_ascii=False) + ";\n")
print(f"Successfully wrote JS bundle to {js_data_path}")
