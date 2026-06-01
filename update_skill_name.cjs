const fs = require('fs');
let c = fs.readFileSync('.trae/skills/DataDance-Skill/SKILL.md', 'utf8');

c = c.replace(/name: "DataDance-Skill"/, 'name: "DataDance-Skill"\nalias: "标准化设计skill"');
c = c.replace(/description: "/, 'description: "又名标准化设计skill。');

fs.writeFileSync('.trae/skills/DataDance-Skill/SKILL.md', c);
