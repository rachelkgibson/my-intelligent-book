"""csv-to-json.py v0.04 — converts learning-graph.csv to learning-graph.json"""
import csv, json, sys

DARK_COLORS = {
    "SteelBlue","DarkSlateBlue","DarkGreen","DarkGoldenrod","Teal","DodgerBlue",
    "Crimson","DarkRed","MediumPurple","Indigo","DarkOrchid","OliveDrab",
    "SaddleBrown","Tomato","DeepPink","DimGray"
}

DEFAULT_PALETTE = [
    "SteelBlue","DarkSlateBlue","DarkGreen","LimeGreen","Gold","DarkGoldenrod",
    "Khaki","Teal","DodgerBlue","LightSkyBlue","Crimson","DarkRed","MediumPurple",
    "Indigo","DarkOrchid","HotPink","OliveDrab","Orange","Coral","Peru",
    "SaddleBrown","Tomato","DeepPink","DimGray"
]

def font_color(bg):
    return "white" if bg in DARK_COLORS else "black"

def main():
    csv_file = sys.argv[1]
    out_file = sys.argv[2]
    color_config_file = sys.argv[3] if len(sys.argv) > 3 else None
    metadata_file = sys.argv[4] if len(sys.argv) > 4 else None
    taxonomy_names_file = sys.argv[5] if len(sys.argv) > 5 else None

    color_config = {}
    if color_config_file:
        with open(color_config_file) as f:
            color_config = json.load(f)

    metadata = {}
    if metadata_file:
        with open(metadata_file) as f:
            metadata = json.load(f)

    taxonomy_names = {}
    if taxonomy_names_file:
        with open(taxonomy_names_file) as f:
            taxonomy_names = json.load(f)

    rows = []
    with open(csv_file, newline='') as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)

    # Collect taxonomy IDs
    taxonomy_ids = []
    seen = set()
    for row in rows:
        tid = row.get('TaxonomyID', 'MISC').strip()
        if tid not in seen:
            taxonomy_ids.append(tid)
            seen.add(tid)

    # Build groups
    palette_idx = 0
    groups = {}
    for tid in taxonomy_ids:
        color = color_config.get(tid, DEFAULT_PALETTE[palette_idx % len(DEFAULT_PALETTE)])
        if tid not in color_config:
            palette_idx += 1
        name = taxonomy_names.get(tid)
        if not name:
            print(f"WARNING: No human-readable name for taxonomy ID '{tid}' — using ID as name.")
            name = tid
        groups[tid] = {
            "classifierName": name,
            "color": color,
            "font": {"color": font_color(color)}
        }

    # Build nodes and edges
    nodes = []
    edges = []
    edge_id = 1
    for row in rows:
        cid = int(row['ConceptID'])
        label = row['ConceptLabel']
        tid = row.get('TaxonomyID', 'MISC').strip()
        nodes.append({
            "id": cid,
            "label": label,
            "group": tid
        })
        raw_deps = row['Dependencies'].strip()
        if raw_deps:
            for dep in raw_deps.split('|'):
                dep = dep.strip()
                if dep:
                    edges.append({
                        "id": edge_id,
                        "from": int(dep),
                        "to": cid
                    })
                    edge_id += 1

    output = {
        "metadata": metadata,
        "groups": groups,
        "nodes": nodes,
        "edges": edges
    }

    with open(out_file, 'w') as f:
        json.dump(output, f, indent=2)
    print(f"Written {len(nodes)} nodes and {len(edges)} edges to {out_file}")

if __name__ == '__main__':
    main()
