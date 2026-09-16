import re

with open('src/components/Vid1Detail.tsx', 'r', encoding='utf-8') as f:
    vid1 = f.read()

# add import
if 'CustomVideoPlayer' not in vid1:
    vid1 = vid1.replace("import React from 'react';", "import React from 'react';\nimport { CustomVideoPlayer } from './CustomVideoPlayer';")

# fix extra </div> 
lines = vid1.split('\n')
if lines[355].strip() == '</div>':
    lines.pop(355)
vid1 = '\n'.join(lines)

with open('src/components/Vid1Detail.tsx', 'w', encoding='utf-8') as f:
    f.write(vid1)


with open('src/components/Vid3Detail.tsx', 'r', encoding='utf-8') as f:
    vid3 = f.read()

vid3 = vid3.replace('视觉场景资产 / VISUAL SCENE ASSETS', '工作流拆解 / WORKFLOW BREAKDOWN')
vid3 = vid3.replace('className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8"', 'className="flex flex-col gap-6 w-full"')
vid3 = vid3.replace('alt="Visual Scene Asset"', 'alt="Workflow Breakdown"')
vid3 = vid3.replace('className="w-full h-full object-cover', 'className="w-full h-auto object-cover')
vid3 = vid3.replace('aspect-video rounded-none', 'rounded-none')

with open('src/components/Vid3Detail.tsx', 'w', encoding='utf-8') as f:
    f.write(vid3)
