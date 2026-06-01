const fs = require('fs');

const skillPath = '.trae/skills/DataDance-Skill/SKILL.md';
let content = fs.readFileSync(skillPath, 'utf8');

// Replace sections 1 and 2 completely
const newContent = `---
name: "DataDance-Skill"
alias: "标准化设计skill"
description: "又名标准化设计skill。DataDance 项目标准设计规范、代码模板与交互指南。在创建新项目、新页面或重构时调用，以确保左侧菜单、主题变量、人员卡片等核心组件的 100% 一致性。"
---

# DataDance-Skill (DataDance 设计规范与代码模板)

本 Skill 旨在确保在本项目（\`datadance\` / \`standard-platform-app\`）中新建页面或组件时，能够 **100% 复用** 全局架构，保持 UI 和交互绝对一致。

**⚠️ 核心准则：绝对不要从零手写核心组件（如左侧菜单栏）！**
本项目已经将全局通用的 UI 提取为公共组件。当你应用本规范时，请遵循以下约定：

## 1. 核心组件复用规范 (Sidebar)
在新建或重构页面布局时，**必须直接引入现有的全局菜单组件**，严禁在页面内硬编码侧边栏：
\`\`\`jsx
import Sidebar from '@/components/Sidebar'; // 或者根据相对路径 import Sidebar from '../../components/Sidebar';
\`\`\`
- 菜单栏的悬浮交互、动画、主题切换、用户设置均已在内部封装完毕，你只需引入使用即可。

## 2. 菜单结构配置规范 (MENU_CONFIG)
如果用户要求**新增、修改、删除菜单项**，或者**调整菜单层级与顺序**，请**绝对不要去修改 \`Sidebar\` 的渲染代码**。
你需要去修改全局菜单配置文件：**\`src/config/menu.js\`**。
\`\`\`js
// src/config/menu.js 示例
export const MENU_CONFIG = [
  { id: '首页', icon: '/menu-home.svg', path: '/home' },
  { id: '模型评估', icon: '/menu-model-evaluation.svg', submenus: [
    { id: '模型评估-题库管理', label: '题库管理', path: '/eval-question' },
    // ...新增你的二级菜单
  ]}
];
\`\`\`
- 只要修改此配置，所有引用了 \`Sidebar\` 的页面都会自动、实时地更新菜单。

## 3. 一级/二级页面构建规范
- **页面背景与右侧区域**: 
  - 整个视口背景色使用 \`--color-sidebar\` (#EFF3F6)。
  - 右侧主内容区域（不含菜单栏）统一设置外边距：上下 8px、右侧 8px。
  - 右侧主内容区域具有 \`12px\` 的圆角和 \`overflow-hidden\`，呈现为一张独立的白底卡片。
- **页面主体**: \`bg-white\` 白底，内容区域限制最大宽度或自适应。
- **一级页面（如任务管理）**：
  - 顶部导航应包含：大标题、创建/新建按钮（右侧）。
  - 支持多 Tab 切换（如：全部任务、我的任务、我的收藏）。
  - Tab 下方为筛选区（FilterArea）和主表格区（TableArea）。
- **右侧侧边栏（弹窗/详情）**：
  - 若点击表格某项，页面右侧应滑出抽屉式详情面板（width: \`600px\` - \`800px\`），附带阴影和遮罩。

## 4. 人员悬浮卡片规范 (UserHoverCard)
当在表格或页面中需要展示人员名称时，必须使用提供的人员悬浮组件，而不能只写纯文本。
请引入并使用现有组件：
\`\`\`jsx
import { UserHoverWrapper } from '@/components/UserHoverCard'; // 视具体路径而定

<UserHoverWrapper 
  name="张三" 
  avatar="https://..." 
  trigger={<span>张三</span>} 
/>
\`\`\`

## 5. 主题与样式变量规范
- 全局 CSS 变量已在 \`src/index.css\` 中定义。
- 严禁使用 hardcode 的蓝/灰色值，必须使用 Tailwind 自定义变量：
  - 品牌主色：\`var(--primary-color)\`
  - 主色悬浮背景：\`var(--primary-bg-hover)\`
  - 边框色：\`var(--primary-border)\`
`;

fs.writeFileSync(skillPath, newContent);
