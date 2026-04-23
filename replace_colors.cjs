const fs = require('fs');
const files = ['src/App.jsx', 'src/TaskDetail.jsx'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Protect the theme color picker options array from being replaced
    content = content.replace(/'#5364FF', '#FF7D00'/g, "'THEME_BLUE', '#FF7D00'");
    
    // Replace hardcoded primary colors with CSS variables
    content = content.replace(/#5364FF/gi, 'var(--primary-color)');
    content = content.replace(/#5252FF/gi, 'var(--primary-color)');
    content = content.replace(/#EDEFFC/gi, 'var(--primary-bg-hover)');
    content = content.replace(/#F5F7FF/gi, 'var(--primary-bg-light)');
    content = content.replace(/#F7F8FD/gi, 'var(--primary-bg-light)');
    content = content.replace(/rgba\(82,\s*82,\s*255,\s*0\.30\)/gi, 'var(--primary-shadow)');
    content = content.replace(/#8E96FF/gi, 'var(--primary-border)');

    // Restore the theme options array
    content = content.replace(/'THEME_BLUE', '#FF7D00'/g, "'#5364FF', '#FF7D00'");

    fs.writeFileSync(file, content);
});
