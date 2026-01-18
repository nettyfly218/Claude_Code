/**
 * 深色模式切换组件
 * 提供明暗主题切换功能
 */

class ThemeToggle {
    constructor() {
        this.currentTheme = this.getSavedTheme();
        this.themes = ['light', 'dark'];
        this.init();
    }

    /**
     * 初始化主题切换器
     */
    init() {
        this.applyTheme(this.currentTheme);
        this.createToggleButton();
        this.bindEvents();
    }

    /**
     * 获取保存的主题
     * @returns {string} 主题名称
     */
    getSavedTheme() {
        const saved = localStorage.getItem('theme');
        if (saved && this.themes.includes(saved)) {
            return saved;
        }
        // 检测系统主题偏好
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    /**
     * 保存主题设置
     * @param {string} theme - 主题名称
     */
    saveTheme(theme) {
        localStorage.setItem('theme', theme);
    }

    /**
     * 应用主题
     * @param {string} theme - 主题名称
     */
    applyTheme(theme) {
        this.currentTheme = theme;
        const root = document.documentElement;

        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.removeAttribute('data-theme');
        }

        this.updateToggleButton();
    }

    /**
     * 创建切换按钮
     */
    createToggleButton() {
        // 检查是否已存在
        if (document.getElementById('theme-toggle')) {
            return;
        }

        const buttonHTML = `
            <button id="theme-toggle" class="theme-toggle" aria-label="切换主题">
                <span class="theme-icon theme-icon-light">☀️</span>
                <span class="theme-icon theme-icon-dark">🌙</span>
            </button>
        `;

        // 插入到header中
        const header = document.querySelector('.app-header');
        if (header) {
            header.insertAdjacentHTML('beforeend', buttonHTML);
        } else {
            // 如果没有header，插入到body中
            document.body.insertAdjacentHTML('beforeend', buttonHTML);
        }

        this.updateToggleButton();
    }

    /**
     * 更新切换按钮状态
     */
    updateToggleButton() {
        const button = document.getElementById('theme-toggle');
        if (!button) return;

        const lightIcon = button.querySelector('.theme-icon-light');
        const darkIcon = button.querySelector('.theme-icon-dark');

        if (this.currentTheme === 'dark') {
            button.classList.add('dark');
            lightIcon.style.display = 'none';
            darkIcon.style.display = 'inline';
            button.setAttribute('aria-label', '切换到亮色模式');
        } else {
            button.classList.remove('dark');
            lightIcon.style.display = 'inline';
            darkIcon.style.display = 'none';
            button.setAttribute('aria-label', '切换到深色模式');
        }
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        const button = document.getElementById('theme-toggle');
        if (!button) return;

        // 点击事件
        button.addEventListener('click', () => {
            this.toggle();
        });

        // 键盘事件
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggle();
            }
        });

        // 监听系统主题变化
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                // 只在用户没有手动设置过主题时，才跟随系统
                if (!localStorage.getItem('theme')) {
                    const newTheme = e.matches ? 'dark' : 'light';
                    this.applyTheme(newTheme);
                }
            });
        }
    }

    /**
     * 切换主题
     */
    toggle() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        this.saveTheme(newTheme);

        // 添加切换动画
        const button = document.getElementById('theme-toggle');
        if (button) {
            button.classList.add('theme-switching');
            setTimeout(() => {
                button.classList.remove('theme-switching');
            }, 300);
        }
    }

    /**
     * 获取当前主题
     * @returns {string} 当前主题名称
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * 设置特定主题
     * @param {string} theme - 主题名称
     */
    setTheme(theme) {
        if (this.themes.includes(theme)) {
            this.applyTheme(theme);
            this.saveTheme(theme);
        }
    }

    /**
     * 重置为自动模式（跟随系统）
     */
    resetToAuto() {
        localStorage.removeItem('theme');

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.applyTheme('dark');
        } else {
            this.applyTheme('light');
        }
    }

    /**
     * 获取是否为自动模式
     * @returns {boolean} 是否为自动模式
     */
    isAutoMode() {
        return !localStorage.getItem('theme');
    }
}

// 导出
window.ThemeToggle = ThemeToggle;
