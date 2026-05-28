const fs = require('fs');
let c = fs.readFileSync('src/App.jsx', 'utf8');

const newMenuConfig = `const MENU_CONFIG = [
  { id: '首页', icon: '/menu-home.svg', path: '/home' },
  { id: '项目管理', icon: '/menu-project-management.svg', path: '/project' },
  { id: '数据生产', icon: '/menu-data-generation.svg', submenus: [
    { id: '数据生产-任务列表', label: '任务列表', path: '/data-task' },
    { id: '数据生产-我的任务', label: '我的任务', path: '/data-mytask' },
    { id: '数据生产-组别管理', label: '组别管理', path: '/data-group' },
  ]},
  { id: '模型评估', icon: '/menu-model-evaluation.svg', submenus: [
    { id: '模型评估-题库管理', label: '题库管理', path: '/eval-question' },
    { id: '模型评估-抓取任务', label: '抓取任务', path: '/eval-crawl' },
    { id: '模型评估-任务列表', label: '任务列表', path: '/eval-task' },
    { id: '模型评估-我的任务', label: '我的任务', path: '/eval-mytask' },
    { id: '模型评估-评估报告', label: '评估报告', path: '/eval-report' },
    { id: '模型评估-人员标签', label: '人员标签', path: '/eval-personnel' },
    { id: '模型评估-数据可视化', label: '数据可视化', path: '/eval-viz' },
  ]},
  { id: '质量管理', icon: '/menu-quality-management.svg', submenus: [
    { id: '质量管理-申诉中心', label: '申诉中心', path: '/quality-appeal' },
  ]},
  { id: '模板管理', icon: '/menu-template.svg', path: '/template' },
  { id: '资产管理', icon: '/menu-asset-management.svg', path: '/asset' },
  { id: '算子管理', icon: '/menu-operator-management.svg', path: '/operator' },
  { id: '用户管理', icon: '/menu-user-management.svg', submenus: [
    { id: '用户管理-标签管理', label: '标签管理', path: '/user-tag' },
    { id: '用户管理-团队管理', label: '团队管理', path: '/user-team' },
  ]},
  { id: '租户管理', icon: '/menu-tenant-management.svg', path: '/tenant' },
];`;

c = c.replace(/const MENU_CONFIG = \[\s*\{[\s\S]*?\];/m, newMenuConfig);
fs.writeFileSync('src/App.jsx', c);
