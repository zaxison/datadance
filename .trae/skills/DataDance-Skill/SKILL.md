---
name: "DataDance-Skill"
description: "DataDance 项目标准设计规范、代码模板与交互指南。在创建新项目、新页面或重构时调用，以确保左侧菜单、主题变量、人员卡片等核心组件的 100% 一致性。"
---

# DataDance-Skill (DataDance 设计规范与代码模板)

本 Skill 旨在确保任何新项目或新页面在应用 DataDance 规范时，能够 **100% 还原** 现有的布局、交互（如侧边栏悬浮、主题切换、用户卡片）和视觉样式。

**⚠️ 核心准则：绝对不要从零手写核心组件！**
为了保证样式和交互的完全一致，本 Skill 附带了标准模板代码。当你在新项目中应用此规范时，**必须** 使用读取工具（Read Tool）读取并复用 `.trae/skills/DataDance-Skill/templates/` 目录下的参考代码。

## 1. 核心模板文件位置 (Templates)
在应用此规范初始化新项目或组件时，必须先读取以下参考代码，并将其适配/复制到目标项目中：
- **`templates/App_reference.jsx`**: 包含全局布局、核心侧边栏 `Sidebar`、侧边栏菜单项 `MenuItem`、用户设置悬浮菜单 `UserSettingItem`，以及多套颜色主题的切换逻辑 `window.changeTheme`。
- **`templates/UserHoverCard_reference.jsx`**: 包含人员悬浮卡片 `UserHoverCard` 及其 Portal 包装器 `UserHoverWrapper` 的完整实现代码。
- **`templates/index_reference.css`**: 包含所有的 CSS 变量定义（`--color-primary` 等）、基础层覆盖以及必要的自定义动画。

## 2. 左侧菜单栏 (Sidebar) 严格规范
- **布局复用**：必须完整复用 `Sidebar` 组件代码，包含折叠/展开的平滑过渡 (`72px` <-> `200px`)。
- **用户设置菜单 (User Profile & Settings)**：左下角的用户菜单具有复杂的层级交互。必须使用 `createPortal` 将用户菜单（主题配置、租户切换、时区、语言等二级悬浮面板）渲染在 `document.body` 下，避免被父级的 `overflow-hidden` 裁切。
- **路由联动**：菜单的 `active` 状态必须与当前 `location.pathname` 强绑定。

## 3. 一级/二级页面构建规范
- **一级页面（如任务管理）**：
  - 必须包含 **标题区 (TitleArea)**（大标题与主色背景的操作按钮）。
  - **页签区 (TabArea)** 是可选的，视业务需求而定。
  - 必须包含 **筛选项区 (FilterArea)**：搜索和筛选框需遵循“左侧 Label 灰色边框，右侧 Input 焦点时带有 `var(--primary-shadow)` 阴影”的组合样式规范。
  - 必须包含 **表格区 (TableArea)**：列表展示必须实现现有参考代码中的状态指示器、双进度条、操作菜单等复合组件。**注意：表格内容必须上下居中对齐，通常在 `tbody` 或 `td` 上使用 `align-middle` (即 `vertical-align: middle`)。**
- **二级页面（如任务详情页）**：
  - 布局灵活，但内部的各种卡片、按钮、输入框必须使用 `index_reference.css` 中定义的中性色和主题色变量。

## 4. 样式与主题变量 (Design Tokens)
- **CSS 变量强约束**：所有的颜色必须使用 CSS 变量，**严禁硬编码**具体的色值（如 `#5364FF` 或 `#EDEFFC`），必须写为 `var(--primary-color)`、`var(--primary-bg-hover)`、`var(--primary-border)` 等，以支持 `themes` 对象的动态一键切换。
- **动画一致性**：所有的 Hover、展开收起、弹窗过渡效果统一使用 `transition-all duration-300 ease-in-out`。
- **圆角与阴影**：
  - 基础组件（输入框/按钮）：`6px`
  - 卡片/弹窗：`8px` 或 `12px`
  - 悬浮阴影：`box-shadow: 0 15px 35px -2px rgba(0,0,0,0.05), 0 5px 15px 0 rgba(0,0,0,0.05)`

## Tooltips (黑底气泡规范)
- **文字字号**: `13px`
- **文字行高**: `22px`
- **背景颜色**: `#2B303A`
- **文字颜色**: `#FFFFFF`
- **内边距**: 上下 `6px`，左右 `8px`
- **圆角**: `4px`
- **阴影样式**: `box-shadow: 0 15px 35px -2px rgba(0, 0, 0, 0.05), 0 5px 15px 0 rgba(0, 0, 0, 0.05)`
- **箭头**: 纯CSS绘制，底边长 `12px`，高 `6px`。
- **定位间距**: 气泡与被 hover 的触发目标按钮之间需要保持 `4px` 的间距（例如，如果箭头高 `6px`，气泡的 left/top 偏移量需要再增加 `4px`，确保箭头尖端距离按钮有 `4px` 的空隙）。
- **出现动效**: 所有的 Tooltip 出现时需要附带由透明度 0 变到 1，同时由大小 `80%` 变到 `100%` 的渐显放大效果，动画时间建议在 `150ms`（例如使用 Tailwind 的 `animate-in fade-in zoom-in-80 duration-150` 或者 CSS 的 `scale-80 -> scale-100`）。

## 总结
在新项目中，你的第一步动作应该是：
1. 将 `templates/index_reference.css` 的 CSS 变量注入到新项目的全局样式中。
2. 将 `Sidebar` 相关的组件和 `UserHoverCard` 组件原封不动地迁移过去。
3. 在此基础上，遵守主题色和阴影规范进行新页面内容的开发。
