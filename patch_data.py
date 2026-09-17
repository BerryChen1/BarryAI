import json
import re

with open('src/data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove vid-8 and vid-9
# I'll use regex to remove the blocks
# format: { id: "vid-8", ... },
# Since it's TS, it's a list of objects.

