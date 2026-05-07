#!/bin/bash
# Erhöht die Version in version.json → Clients sehen das Update-Banner
CURRENT=$(python3 -c "import json; d=json.load(open('version.json')); print(d['version'])")
# Patch-Version hochzählen (1.0.0 → 1.0.1)
IFS='.' read -r -a parts <<< "$CURRENT"
parts[2]=$((${parts[2]} + 1))
NEW="${parts[0]}.${parts[1]}.${parts[2]}"
TS=$(date +%s)
echo "{\"version\": \"$NEW\", \"ts\": $TS}" > version.json
echo "✅ Version $CURRENT → $NEW (ts=$TS)"
