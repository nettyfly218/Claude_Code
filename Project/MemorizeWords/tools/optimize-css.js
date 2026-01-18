/**
 * CSS 性能优化工具
 * 用于压缩CSS和提取关键CSS
 *
 * 使用方法:
 * node tools/optimize-css.js
 */

const fs = require('fs');
const path = require('path');

// CSS文件列表
const cssFiles = [
    'css/variables.css',
    'css/common.css',
    'css/layout.css',
    'css/animations.css',
    'css/animations-enhanced.css',
    'css/components/navigation.css',
    'css/components/charts.css',
    'css/components/celebration.css',
    'css/pages/home.css',
    'css/pages/learn.css',
    'css/pages/game.css',
    'css/pages/progress.css'
];

// 关键CSS选择器（首屏渲染必须的样式）
const criticalSelectors = [
    // 变量
    ':root',
    '[data-theme="dark"]',

    // 布局
    'body',
    '#app',
    '#page-container',
    '.loading',

    // 按钮
    '.btn',
    '.btn-primary',
    '.btn-secondary',
    '.btn:active',

    // 卡片
    '.card',
    '.card:hover',

    // 容器
    '.container',
    '.text-center',

    // 加载状态
    '.loading-spinner',
    '.spinner',

    // 底部导航
    '.bottom-navigation',
    '.nav-item',
    '.nav-icon',

    // 首页关键元素
    '.home-page',
    '.welcome-section',
    '.stat-card',
    '.progress-card',
    '.action-card'
];

/**
 * 压缩CSS字符串
 */
function minifyCSS(css) {
    return css
        // 移除注释
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // 移除多余空格
        .replace(/\s+/g, ' ')
        // 移除属性值前后的空格
        .replace(/:\s+/g, ':')
        // 移除分号前的空格
        .replace(/\s+;/g, ';')
        // 移除大括号前后的空格
        .replace(/\s*{\s*/g, '{')
        .replace(/\s*}\s*/g, '}')
        // 移除最后一个分号
        .replace(/;}/g, '}')
        // 移除换行符
        .replace(/\n/g, '')
        .trim();
}

/**
 * 提取关键CSS
 */
function extractCriticalCSS(css, selectors) {
    const rules = [];
    const regex = /([^{}]+)\{([^{}]+)\}/g;
    let match;

    while ((match = regex.exec(css)) !== null) {
        const selector = match[1].trim();
        const properties = match[2].trim();

        // 检查是否是关键选择器
        const isCritical = selectors.some(critical => {
            // 精确匹配
            if (selector === critical) return true;
            // 包含匹配（如 .btn 匹配 .btn-primary）
            if (selector.includes(critical)) return true;
            // 伪类匹配
            if (selector.startsWith(critical + ':')) return true;
            // 后代选择器
            if (selector.includes(critical + ' ') || selector.includes(' ' + critical)) return true;
            return false;
        });

        if (isCritical) {
            rules.push(`${selector}{${properties}}`);
        }
    }

    // 保留CSS变量（@规则）
    const atRules = css.match(/@[^{]+\{[\s\S]*?\n\}/g) || [];

    return atRules.join('') + rules.join('');
}

/**
 * 主函数
 */
function main() {
    const projectDir = path.resolve(__dirname, '..');
    const outputDir = path.join(projectDir, 'dist');

    // 创建输出目录
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log('🚀 开始CSS优化...\n');

    // 1. 合并所有CSS
    console.log('📦 合并CSS文件...');
    let combinedCSS = '';
    cssFiles.forEach(file => {
        const filePath = path.join(projectDir, file);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            combinedCSS += `/* === ${file} === */\n${content}\n\n`;
            console.log(`  ✓ ${file}`);
        }
    });

    // 2. 压缩完整CSS
    console.log('\n🗜️  压缩完整CSS...');
    const minifiedCSS = minifyCSS(combinedCSS);
    const minifiedPath = path.join(outputDir, 'app.min.css');
    fs.writeFileSync(minifiedPath, minifiedCSS);
    console.log(`  ✓ 输出: dist/app.min.css (${(minifiedCSS.length / 1024).toFixed(2)} KB)`);

    // 3. 提取关键CSS
    console.log('\n⚡ 提取关键CSS...');
    const criticalCSS = extractCriticalCSS(combinedCSS, criticalSelectors);
    const minifiedCriticalCSS = minifyCSS(criticalCSS);
    const criticalPath = path.join(outputDir, 'critical.min.css');
    fs.writeFileSync(criticalPath, minifiedCriticalCSS);
    console.log(`  ✓ 输出: dist/critical.min.css (${(minifiedCriticalCSS.length / 1024).toFixed(2)} KB)`);

    // 4. 生成优化报告
    const originalSize = combinedCSS.length;
    const minifiedSize = minifiedCSS.length;
    const criticalSize = minifiedCriticalCSS.length;
    const compressionRatio = ((1 - minifiedSize / originalSize) * 100).toFixed(2);

    console.log('\n📊 优化报告:');
    console.log(`  原始大小: ${(originalSize / 1024).toFixed(2)} KB`);
    console.log(`  压缩后: ${(minifiedSize / 1024).toFixed(2)} KB`);
    console.log(`  压缩率: ${compressionRatio}%`);
    console.log(`  关键CSS: ${(criticalSize / 1024).toFixed(2)} KB`);
    console.log(`  非关键CSS: ${((minifiedSize - criticalSize) / 1024).toFixed(2)} KB`);

    // 5. 生成HTML模板（使用关键CSS内联）
    console.log('\n📄 生成优化后的HTML模板...');
    const htmlTemplate = generateOptimizedHTML();
    const htmlPath = path.join(outputDir, 'index-optimized.html');
    fs.writeFileSync(htmlPath, htmlTemplate);
    console.log(`  ✓ 输出: dist/index-optimized.html`);

    console.log('\n✅ 优化完成！');
    console.log('\n💡 使用建议:');
    console.log('  1. 将 critical.min.css 内联到 HTML <head> 中');
    console.log('  2. 将 app.min.css 异步加载');
    console.log('  3. 使用 preload 提示浏览器加载CSS');
}

/**
 * 生成优化后的HTML模板
 */
function generateOptimizedHTML() {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="description" content="适合小学生的英语单词学习应用">
    <title>快乐学单词 🌟</title>

    <!-- 关键CSS内联 -->
    <style>
        /* 关键CSS - 由 optimize-css.js 生成 */
        /* 将 dist/critical.min.css 的内容复制到这里 */
    </style>

    <!-- 预加载完整CSS -->
    <link rel="preload" href="dist/app.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="dist/app.min.css"></noscript>

    <!-- 异步加载非关键CSS -->
    <script>
        // 加载非关键CSS
        function loadCSS(href) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
        }

        // 页面加载后加载完整CSS
        window.addEventListener('load', function() {
            loadCSS('dist/app.min.css');
        });
    </script>
</head>
<body>
    <!-- 主应用容器 -->
    <div id="app">
        <div id="page-container"></div>
    </div>

    <!-- JavaScript模块 -->
    <script src="js/utils/constants.js"></script>
    <script src="js/utils/helpers.js"></script>
    <script src="js/data/words.js"></script>
    <script src="js/data/words-extended.js"></script>
    <script src="js/services/StorageService.js"></script>
    <script src="js/services/AudioService.js"></script>
    <script src="js/services/ProgressTracker.js"></script>
    <script src="js/models/UserProgress.js"></script>
    <script src="js/models/ReviewScheduler.js"></script>
    <script src="js/components/WordCard.js"></script>
    <script src="js/components/ProgressBar.js"></script>
    <script src="js/components/Calendar.js"></script>
    <script src="js/components/Charts.js"></script>
    <script src="js/components/Celebration.js"></script>
    <script src="js/components/BottomNavigation.js"></script>
    <script src="js/components/ThemeToggle.js"></script>
    <script src="js/pages/HomePage.js"></script>
    <script src="js/pages/LearnPage.js"></script>
    <script src="js/pages/GamePage.js"></script>
    <script src="js/pages/ProgressPage.js"></script>
    <script src="js/games/SpellingGame.js"></script>
    <script src="js/games/MatchingGame.js"></script>
    <script src="js/games/QuizGame.js"></script>
    <script src="js/app.js"></script>
</body>
</html>`;
}

// 运行优化
if (require.main === module) {
    main();
}

module.exports = { minifyCSS, extractCriticalCSS };
