# AIDP 校企名片 Demo

独立静态 demo，直接打开 `index.html` 即可预览；如果需要本地服务，也可以在本目录运行：

```bash
python3 -m http.server 5180
```

文件说明：

- `data.js`：mock 数据和筛选项，前端接接口时优先替换这里。
- `app.js`：筛选、卡片/列表切换、详情页左右切换。
- `styles.css`：按 Figma 设计稿抽取的字号、行高、间距、圆角、颜色和状态样式。
- `index.html`：页面结构入口。
- `assets/`：从 Figma “组件”页导出的 8 个校企 logo PNG。
