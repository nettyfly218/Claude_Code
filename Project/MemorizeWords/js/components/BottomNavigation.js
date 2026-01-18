/**
 * 底部导航栏组件
 * 提供移动端友好的页面导航
 */

class BottomNavigation {
    constructor() {
        this.navItems = [
            { id: 'home', icon: '🏠', label: '首页', page: CONSTANTS.PAGES.HOME },
            { id: 'learn', icon: '📚', label: '学习', page: CONSTANTS.PAGES.LEARN },
            { id: 'game', icon: '🎮', label: '游戏', page: CONSTANTS.PAGES.GAME },
            { id: 'progress', icon: '📊', label: '进度', page: CONSTANTS.PAGES.PROGRESS }
        ];
        this.activeId = 'home';
        this.init();
    }

    /**
     * 初始化导航栏
     */
    init() {
        this.render();
        this.bindEvents();
    }

    /**
     * 渲染导航栏
     */
    render() {
        // 检查是否已存在
        if (document.getElementById('bottom-navigation')) {
            return;
        }

        const navHTML = `
            <nav id="bottom-navigation" class="bottom-navigation">
                ${this.navItems.map(item => `
                    <div class="nav-item" data-page="${item.id}" role="button" tabindex="0" aria-label="${item.label}">
                        <div class="nav-icon">${item.icon}</div>
                        <div class="nav-label">${item.label}</div>
                        <div class="nav-indicator"></div>
                    </div>
                `).join('')}
            </nav>
        `;

        // 插入到body中
        document.body.insertAdjacentHTML('beforeend', navHTML);

        // 设置初始活跃状态
        this.setActive(this.activeId);
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        const nav = document.getElementById('bottom-navigation');
        if (!nav) return;

        // 点击事件
        nav.addEventListener('click', (e) => {
            const navItem = e.target.closest('.nav-item');
            if (navItem) {
                const pageId = navItem.dataset.page;
                this.navigate(pageId);
            }
        });

        // 键盘事件
        nav.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const navItem = e.target.closest('.nav-item');
                if (navItem) {
                    e.preventDefault();
                    const pageId = navItem.dataset.page;
                    this.navigate(pageId);
                }
            }
        });

        // 监听页面变化，更新活跃状态
        document.addEventListener('pageChanged', (e) => {
            const pageId = e.detail.pageId || 'home';
            this.setActive(pageId);
        });
    }

    /**
     * 导航到指定页面
     * @param {string} pageId - 页面ID
     */
    navigate(pageId) {
        if (pageId === this.activeId) return;

        // 添加涟漪效果
        this.addRippleEffect(pageId);

        // 导航
        if (window.app) {
            const targetPage = this.navItems.find(item => item.id === pageId);
            if (targetPage) {
                window.app.navigateTo(targetPage.page);
            }
        }
    }

    /**
     * 设置活跃状态
     * @param {string} pageId - 页面ID
     */
    setActive(pageId) {
        this.activeId = pageId;

        const nav = document.getElementById('bottom-navigation');
        if (!nav) return;

        // 更新导航项状态
        const items = nav.querySelectorAll('.nav-item');
        items.forEach(item => {
            if (item.dataset.page === pageId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    /**
     * 添加涟漪效果
     * @param {string} pageId - 页面ID
     */
    addRippleEffect(pageId) {
        const nav = document.getElementById('bottom-navigation');
        if (!nav) return;

        const item = nav.querySelector(`.nav-item[data-page="${pageId}"]`);
        if (!item) return;

        // 创建涟漪元素
        const ripple = document.createElement('div');
        ripple.className = 'nav-ripple';
        item.appendChild(ripple);

        // 动画结束后移除
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    /**
     * 显示/隐藏导航栏
     * @param {boolean} visible - 是否可见
     */
    setVisible(visible) {
        const nav = document.getElementById('bottom-navigation');
        if (!nav) return;

        if (visible) {
            nav.classList.remove('hidden');
        } else {
            nav.classList.add('hidden');
        }
    }

    /**
     * 更新导航项徽章
     * @param {string} pageId - 页面ID
     * @param {number} count - 徽章数量
     */
    setBadge(pageId, count) {
        const nav = document.getElementById('bottom-navigation');
        if (!nav) return;

        const item = nav.querySelector(`.nav-item[data-page="${pageId}"]`);
        if (!item) return;

        let badge = item.querySelector('.nav-badge');

        if (count > 0) {
            if (!badge) {
                badge = document.createElement('div');
                badge.className = 'nav-badge';
                item.appendChild(badge);
            }
            badge.textContent = count > 99 ? '99+' : count;
        } else if (badge) {
            badge.remove();
        }
    }
}

// 导出
window.BottomNavigation = BottomNavigation;
