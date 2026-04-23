const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf-8');

// 1. Revert MainContent
code = code.replace(
  /const \[view, setView\] = useState\('list'\);\n  const \[selectedTask, setSelectedTask\] = useState\(null\);\n\n  const handleCreateSuccess/g,
  'const handleCreateSuccess'
);
code = code.replace(
  /  if \(view === 'details'\) \{\n    return <TaskDetails task=\{selectedTask\} onBack=\{\(\) => setView\('list'\)\} \/>;\n  \}\n\n  return \(/g,
  '  return ('
);
code = code.replace(
  /<TableArea onTaskClick=\{\(task\) => \{ setSelectedTask\(task\); setView\('details'\); \}\} \/>/g,
  '<TableArea />'
);

// 2. Revert TableArea
code = code.replace(
  /function TableArea\(\{ onTaskClick \}\) \{/g,
  'function TableArea() {'
);
code = code.replace(
  /<TableRow key=\{row\.id\} data=\{row\} isLast=\{idx === data\.length - 1\} onTaskClick=\{onTaskClick\} \/>/g,
  '<TableRow key={row.id} data={row} isLast={idx === data.length - 1} />'
);

// 3. Revert TableRow
code = code.replace(
  /function TableRow\(\{ data, isLast, onTaskClick \}\) \{/g,
  'function TableRow({ data, isLast }) {'
);
code = code.replace(
  /onClick=\{\(\) => onTaskClick && onTaskClick\(data\)\}\n        >/g,
  '>'
);

// 4. Remove new components
const taskDetailsIndex = code.indexOf('function TaskDetails({ task, onBack }) {');
if (taskDetailsIndex !== -1) {
  code = code.substring(0, taskDetailsIndex);
}

fs.writeFileSync('src/App.jsx', code);
