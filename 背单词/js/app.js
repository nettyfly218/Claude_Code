/**
 * 应用主入口
 * 负责路由控制和页面切换
 */

class App {
    constructor() {
        this.currentPage = null;
        this.pages = {};
        this.init();
    }

    /**
     * 初始化应用
     */
    init() {
        // 检查localStorage可用性
        if (!Helpers.isLocalStorageAvailable()) {
            alert('您的浏览器不支持本地存储，数据将无法保存。请使用现代浏览器。');
        }

        // 初始化页面控制器
        this.pages = {
            home: new HomePage(),
            learn: new LearnPage(),
            game: new GamePage(),
            progress: new ProgressPage()
        };

        // 加载首页
        this.navigateTo(CONSTANTS.PAGES.HOME);

        // 绑定全局事件
        this.bindEvents();

        console.log('应用初始化完成');
    }

    /**
     * 导航到指定页面
     * @param {string} pageName - 页面名称
     * @param {object} params - 页面参数
     */
    navigateTo(pageName, params = {}) {
        const page = this.pages[pageName];

        if (!page) {
            console.error(`页面不存在: ${pageName}`);
            return;
        }

        // 隐藏加载提示
        this.hideLoading();

        // 切换页面
        const container = document.getElementById('page-container');
        if (container) {
            // 清空容器
            container.innerHTML = '';

            // 渲染新页面
            page.render(container, params);

            // 更新当前页面
            this.currentPage = pageName;

            // 滚动到顶部
            window.scrollTo(0, 0);
        }
    }

    /**
     * 返回上一页
     */
    goBack() {
        // 简化实现：总是返回首页
        this.navigateTo(CONSTANTS.PAGES.HOME);
    }

    /**
     * 显示加载提示
     */
    showLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            Helpers.removeClass(loading, 'hidden');
        }
    }

    /**
     * 隐藏加载提示
     */
    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            Helpers.addClass(loading, 'hidden');
        }
    }

    /**
     * 显示奖励弹窗
     * @param {string} title - 标题
     * @param {string} message - 消息
     */
    showRewardModal(title, message) {
        const modal = document.getElementById('reward-modal');
        const titleEl = document.getElementById('reward-title');
        const messageEl = document.getElementById('reward-message');

        if (modal && titleEl && messageEl) {
            titleEl.textContent = title;
            messageEl.textContent = message;
            Helpers.removeClass(modal, 'hidden');

            // 播放音效
            audioService.playEffect('complete');
        }
    }

    /**
     * 关闭奖励弹窗
     */
    closeRewardModal() {
        const modal = document.getElementById('reward-modal');
        if (modal) {
            Helpers.addClass(modal, 'hidden');
        }
    }

    /**
     * 绑定全局事件
     */
    bindEvents() {
        // 键盘事件
        document.addEventListener('keydown', (e) => {
            // ESC键关闭弹窗
            if (e.key === 'Escape') {
                this.closeRewardModal();
            }
        });

        // 防止页面刷新时丢失进度提示
        window.addEventListener('beforeunload', (e) => {
            // 如果正在学习中，提示用户
            if (this.currentPage === CONSTANTS.PAGES.LEARN) {
                e.preventDefault();
                e.returnValue = '';
            }
        });
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
