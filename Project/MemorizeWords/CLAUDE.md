# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个专为小学1-2年级学生设计的英语单词学习Web应用，采用**纯原生JavaScript**实现，无需后端服务器。数据通过localStorage本地存储。

**核心特点**：
- 完全本地运行，双击 `index.html` 即可使用
- 530个常用单词，覆盖18个分类
- 三个互动游戏：选择题、配对游戏、拼写游戏
- 基于遗忘曲线的智能复习系统
- 响应式设计，支持移动端和桌面端

## 运行项目

```bash
# 方法1: 直接打开（推荐）
# 双击 index.html 文件

# 方法2: 本地服务器（解决跨域问题）
python -m http.server 8000
# 访问 http://localhost:8000

# 方法3: VS Code Live Server
# 右键 index.html -> Open with Live Server
```

## 项目架构

### 代码加载顺序（重要）

index.html 中的脚本加载顺序严格定义了依赖关系：

1. **工具和常量** - `constants.js`, `helpers.js`
2. **数据层** - `words.js`, `words-extended.js`
3. **服务层** - `StorageService.js`, `AudioService.js`, `ProgressTracker.js`
4. **模型层** - `UserProgress.js`, `ReviewScheduler.js`
5. **组件层** - 各个UI组件
6. **页面控制器** - `HomePage.js`, `LearnPage.js`, `GamePage.js`, `ProgressPage.js`
7. **游戏模块** - `SpellingGame.js`, `MatchingGame.js`, `QuizGame.js`
8. **应用主入口** - `app.js` (最后加载)

### 全局单例模式

项目使用全局单例模式管理核心功能：

- `app` - 主应用实例，控制页面路由
- `userProgress` - 用户进度数据管理
- `audioService` - 音频播放服务
- `reviewScheduler` - 复习计划调度器
- `quizGame`, `matchingGame`, `spellingGame` - 游戏实例

这些单例在各模块中直接引用，无需传参。

### 页面路由系统

应用使用简单的字符串路由，通过 `App.navigateTo()` 方法切换页面：

```javascript
// 定义在 constants.js
PAGES: {
    HOME: 'home',
    LEARN: 'learn',
    GAME: 'game',
    PROGRESS: 'progress'
}

// 使用方式
app.navigateTo('learn');
app.navigateTo('game');
```

页面切换时：
1. 清空 `#page-container` 容器
2. 调用对应页面的 `render(container, params)` 方法
3. 触发 `pageChanged` 自定义事件更新导航栏状态

### 单词数据结构

```javascript
{
    id: 1,
    word: 'cat',
    translation: '猫',
    category: 'animals',
    difficulty: 1,
    imagePath: 'assets/images/words/cat.png',
    audioPath: 'assets/audio/words/cat.mp3',
    phonetic: '/kæt/',
    sentence: {
        english: 'I have a cat.',
        chinese: '我有一只猫。'
    },
    tags: ['pet', 'animal'],
    grade: 1
}
```

**数据文件位置**：
- `js/data/words.js` - 基础单词库
- `js/data/words-extended.js` - 扩展单词库（可选）

### 智能复习系统

复习调度器 (`ReviewScheduler`) 实现了基于遗忘曲线的算法：

- **复习间隔**: 1, 3, 7, 15, 30天
- **优先级计算**: 综合考虑掌握度、错误率、超期天数
- **单词状态**: new (新单词) → learning (学习中) → mastered (已掌握)

掌握度阈值：
- NEW: < 0.3
- LEARNING: 0.3 - 0.9
- MASTERED: ≥ 0.95 且复习次数 ≥ 5

### 音频服务降级策略

`AudioService` 实现了优雅降级：

1. 优先使用预录音频文件 (`assets/audio/words/*.mp3`)
2. 文件不存在时降级到 Web Speech API (TTS)
3. 检测浏览器支持情况，静默处理失败

## 添加新单词

编辑 `js/data/words.js` 或 `js/data/words-extended.js`：

```javascript
{
    id: 531,  // 确保ID唯一
    word: 'hello',
    translation: '你好',
    category: 'daily',
    difficulty: 1,
    imagePath: 'assets/images/words/hello.png',
    audioPath: 'assets/audio/words/hello.mp3',
    phonetic: '/həˈləʊ/',
    sentence: {
        english: 'Hello, how are you?',
        chinese: '你好，你好吗？'
    },
    tags: ['greeting'],
    grade: 1
}
```

## 常用工具函数

```javascript
// 日期处理
Helpers.getTodayDate()           // 返回 'YYYY-MM-DD'
Helpers.getDaysDiff(date1, date2) // 计算天数差
Helpers.getMonthString()         // 返回 'YYYY-MM'

// 数组操作
Helpers.shuffleArray(array)      // 打乱数组
Helpers.randomPick(array, n)     // 随机选择n个元素

// UI辅助
Helpers.addClass(element, className)
Helpers.removeClass(element, className)
Helpers.toggleClass(element, className)

// 评分计算
Helpers.getStarRating(score)     // 0-100分数转1-3星级
Helpers.generateStars(stars)     // 生成星星显示字符串
Helpers.getEncouragement()       // 获取随机鼓励语
```

## 游戏系统

### 三个游戏模块

1. **QuizGame** (选择题)
   - 10道题，每题10分
   - 听单词选翻译
   - 星级评分：⭐⭐⭐(90+), ⭐⭐(70+), ⭐(50+)

2. **MatchingGame** (配对游戏)
   - 6对卡片配对
   - 3D翻转动画
   - 步数计时评分

3. **SpellingGame** (拼写游戏)
   - 字母拼写
   - 提示系统（扣分）
   - 难度自适应

### 游戏初始化模式

```javascript
// 标准游戏启动流程
game.init(container, questionCount) {
    this.container = container;
    this.reset();
    this.selectWords();
    this.render();
}
```

## CSS架构

项目采用模块化CSS结构：

- `css/variables.css` - 设计变量（颜色、字体、间距）
- `css/common.css` - 通用样式和组件
- `css/layout.css` - 布局相关
- `css/animations.css` / `css/animations-enhanced.css` - 动画定义
- `css/components/` - 组件样式（导航、图表、庆祝效果等）
- `css/pages/` - 页面特定样式

**CSS变量**：使用 `var(--color-primary)` 等变量便于主题切换

## 数据存储

所有数据通过 `StorageService` 保存到localStorage：

- `englishLearning_userProgress` - 用户进度和统计
- `englishLearning_learningHistory` - 学习历史记录
- `englishLearning_settings` - 用户设置
- `englishLearning_gameRecords` - 游戏记录

**注意事项**：
- localStorage有容量限制（通常5-10MB）
- 清除浏览器缓存会丢失数据
- 建议定期使用"导出数据"功能备份

## 常见开发任务

### 添加新的游戏类型

1. 在 `js/games/` 创建新的游戏类
2. 实现标准接口：`init()`, `reset()`, `selectWords()`, `render()`
3. 在 `GamePage.js` 的 `startGame()` 方法中添加新游戏类型
4. 在 `constants.js` 的 `GAMES` 中注册

### 添加新的页面

1. 在 `js/pages/` 创建新的页面控制器类
2. 实现 `render(container, params)` 方法
3. 在 `app.js` 的 `pages` 对象中注册
4. 在 `constants.js` 的 `PAGES` 中添加路由常量

### 修改样式

- 全局样式：修改 `css/common.css`
- 页面样式：修改对应的 `css/pages/*.css`
- 动画效果：修改 `css/animations-enhanced.css`
- 设计变量：修改 `css/variables.css`

## 开发注意事项

1. **保持纯前端架构** - 所有功能必须在浏览器中完成，无需服务器
2. **优雅降级** - 音频、图片等资源要处理加载失败情况
3. **儿童友好设计** - 大图标、明亮色彩、简单操作
4. **localStorage依赖** - 所有状态变更后记得调用 `userProgress.save()`
5. **全局变量** - 新增全局单例时确保命名不冲突
