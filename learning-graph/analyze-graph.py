import csv
import sys
from collections import defaultdict, deque

def analyze(csv_file, output_file):
    concepts = {}
    deps = {}

    with open(csv_file, newline='') as f:
        reader = csv.DictReader(f)
        for row in reader:
            cid = int(row['ConceptID'])
            label = row['ConceptLabel']
            raw = row['Dependencies'].strip()
            dep_list = [int(x) for x in raw.split('|') if x.strip()] if raw else []
            concepts[cid] = label
            deps[cid] = dep_list

    n = len(concepts)

    # Build adjacency (dependency -> dependents)
    children = defaultdict(list)
    for cid, dep_list in deps.items():
        for d in dep_list:
            children[d].append(cid)

    # Foundational (zero dependencies)
    foundational = [cid for cid, d in deps.items() if not d]

    # Terminal (nothing depends on them)
    all_depended_on = set()
    for d in deps.values():
        all_depended_on.update(d)
    terminal = [cid for cid in concepts if cid not in all_depended_on]

    # Indegree (how many concepts depend on each)
    indegree = defaultdict(int)
    for cid, dep_list in deps.items():
        for d in dep_list:
            indegree[d] += 1

    top10 = sorted(indegree.items(), key=lambda x: -x[1])[:10]

    # Cycle detection (Kahn's algorithm)
    in_count = defaultdict(int)
    for cid, dep_list in deps.items():
        in_count[cid] += len(dep_list)
    queue = deque([cid for cid in concepts if in_count[cid] == 0])
    visited = 0
    while queue:
        node = queue.popleft()
        visited += 1
        for child in children[node]:
            in_count[child] -= 1
            if in_count[child] == 0:
                queue.append(child)
    has_cycle = visited != n

    # Self-dependencies
    self_deps = [cid for cid, d in deps.items() if cid in d]

    # Average dependencies
    avg_deps = sum(len(d) for d in deps.values()) / n

    # Longest chain (BFS from foundational nodes)
    dist = {cid: 0 for cid in foundational}
    queue = deque(foundational)
    while queue:
        node = queue.popleft()
        for child in children[node]:
            if child not in dist or dist[child] < dist[node] + 1:
                dist[child] = dist[node] + 1
                queue.append(child)
    max_chain = max(dist.values()) if dist else 0

    # Disconnected subgraphs (undirected connectivity)
    adj = defaultdict(set)
    for cid, dep_list in deps.items():
        for d in dep_list:
            adj[cid].add(d)
            adj[d].add(cid)
    visited_set = set()
    subgraphs = 0
    for cid in concepts:
        if cid not in visited_set:
            subgraphs += 1
            queue = deque([cid])
            while queue:
                node = queue.popleft()
                if node in visited_set:
                    continue
                visited_set.add(node)
                queue.extend(adj[node] - visited_set)

    lines = []
    lines.append("# Learning Graph Quality Metrics\n")
    lines.append(f"**Total Concepts:** {n}\n")
    lines.append(f"**DAG Valid (no cycles):** {'Yes' if not has_cycle else 'NO - CYCLES DETECTED'}\n")
    lines.append(f"**Self-dependencies:** {self_deps if self_deps else 'None'}\n")
    lines.append(f"**Foundational concepts (0 dependencies):** {len(foundational)}\n")
    lines.append(f"**Terminal nodes (leaf concepts):** {len(terminal)}\n")
    lines.append(f"**Average dependencies per concept:** {avg_deps:.2f}\n")
    lines.append(f"**Maximum dependency chain length:** {max_chain}\n")
    lines.append(f"**Disconnected subgraphs:** {subgraphs}\n")
    lines.append("\n## Top 10 Most Depended-Upon Concepts\n")
    lines.append("| Concept | Indegree |\n|---|---|\n")
    for cid, count in top10:
        lines.append(f"| {concepts[cid]} | {count} |\n")
    lines.append("\n## Foundational Concepts\n")
    for cid in sorted(foundational):
        lines.append(f"- {concepts[cid]}\n")
    lines.append("\n## Terminal (Leaf) Concepts\n")
    for cid in sorted(terminal):
        lines.append(f"- {concepts[cid]}\n")

    # Quality score
    score = 100
    if has_cycle:
        score -= 30
    if self_deps:
        score -= 10
    if subgraphs > 2:
        score -= 10 * (subgraphs - 2)
    if avg_deps < 1.0:
        score -= 10
    score = max(0, score)
    lines.append(f"\n## Overall Quality Score: {score}/100\n")

    with open(output_file, 'w') as f:
        f.writelines(lines)
    print(f"Report written to {output_file}")
    print(f"Quality score: {score}/100")

if __name__ == '__main__':
    analyze(sys.argv[1], sys.argv[2])
