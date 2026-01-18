/**
 * 骨架屏组件
 * 提供各种骨架屏加载效果
 */

class Skeleton {
    /**
     * 创建卡片骨架屏
     * @param {number} count - 卡片数量
     */
    static cards(count = 4) {
        let html = '<div class="skeleton-cards">';
        for (let i = 0; i < count; i++) {
            html += `
                <div class="skeleton-card">
                    <div class="skeleton-icon"></div>
                    <div class="skeleton-title"></div>
                    <div class="skeleton-text"></div>
                </div>
            `;
        }
        html += '</div>';
        return html;
    }

    /**
     * 创建列表骨架屏
     * @param {number} count - 列表项数量
     */
    static list(count = 5) {
        let html = '<div class="skeleton-list">';
        for (let i = 0; i < count; i++) {
            html += `
                <div class="skeleton-list-item">
                    <div class="skeleton-avatar"></div>
                    <div class="skeleton-content">
                        <div class="skeleton-title"></div>
                        <div class="skeleton-text"></div>
                    </div>
                </div>
            `;
        }
        html += '</div>';
        return html;
    }

    /**
     * 创建统计卡片骨架屏
     */
    static stats() {
        let html = '<div class="skeleton-stats">';
        const stats = [
            { icon: '📚', label: '学习单词数' },
            { icon: '🔥', label: '连续打卡' },
            { icon: '⭐', label: '获得星星' },
            { icon: '🎮', label: '练习次数' }
        ];
        stats.forEach(stat => {
            html += `
                <div class="skeleton-stat-card">
                    <div class="skeleton-stat-icon">${stat.icon}</div>
                    <div class="skeleton-stat-value"></div>
                    <div class="skeleton-stat-label">${stat.label}</div>
                </div>
            `;
        });
        html += '</div>';
        return html;
    }

    /**
     * 创建日历骨架屏
     */
    static calendar() {
        return `
            <div class="skeleton-calendar">
                <div class="skeleton-calendar-header">
                    <div class="skeleton-title"></div>
                </div>
                <div class="skeleton-calendar-grid">
                    ${Array(7).fill('<div class="skeleton-calendar-day"></div>').join('')}
                </div>
            </div>
        `;
    }

    /**
     * 创建单词卡片骨架屏
     */
    static wordCard() {
        return `
            <div class="skeleton-word-card">
                <div class="skeleton-word-large"></div>
                <div class="skeleton-phonetic"></div>
                <div class="skeleton-meaning"></div>
                <div class="skeleton-buttons">
                    <div class="skeleton-button"></div>
                    <div class="skeleton-button"></div>
                </div>
            </div>
        `;
    }

    /**
     * 创建游戏页面骨架屏
     */
    static game() {
        return `
            <div class="skeleton-game">
                <div class="skeleton-game-header">
                    <div class="skeleton-title"></div>
                    <div class="skeleton-score"></div>
                </div>
                <div class="skeleton-game-content">
                    <div class="skeleton-game-question"></div>
                    <div class="skeleton-game-options">
                        ${Array(4).fill('<div class="skeleton-game-option"></div>').join('')}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 创建成就徽章骨架屏
     */
    static achievements(count = 8) {
        let html = '<div class="skeleton-achievements">';
        for (let i = 0; i < count; i++) {
            html += `
                <div class="skeleton-achievement">
                    <div class="skeleton-achievement-icon"></div>
                    <div class="skeleton-achievement-name"></div>
                    <div class="skeleton-achievement-desc"></div>
                </div>
            `;
        }
        html += '</div>';
        return html;
    }

    /**
     * 创建完整页面骨架屏
     * @param {string} pageType - 页面类型 (home|learn|game|progress)
     */
    static page(pageType) {
        switch (pageType) {
            case 'home':
                return `
                    <div class="skeleton-page">
                        <div class="skeleton-welcome">
                            <div class="skeleton-title"></div>
                            <div class="skeleton-text"></div>
                        </div>
                        ${this.stats()}
                        ${this.cards(3)}
                    </div>
                `;
            case 'learn':
                return `
                    <div class="skeleton-page">
                        ${this.wordCard()}
                    </div>
                `;
            case 'game':
                return `
                    <div class="skeleton-page">
                        ${this.game()}
                    </div>
                `;
            case 'progress':
                return `
                    <div class="skeleton-page">
                        ${this.stats()}
                        ${this.calendar()}
                        ${this.achievements()}
                    </div>
                `;
            default:
                return '<div class="skeleton-page"></div>';
        }
    }

    /**
     * 显示页面骨架屏
     * @param {string} containerId - 容器ID
     * @param {string} pageType - 页面类型
     */
    static show(containerId, pageType) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `<div class="skeleton-wrapper">${this.page(pageType)}</div>`;
    }

    /**
     * 隐藏骨架屏（带淡出动画）
     * @param {string} containerId - 容器ID
     * @param {Function} callback - 隐藏完成后的回调
     */
    static hide(containerId, callback) {
        const wrapper = document.querySelector(`#${containerId} .skeleton-wrapper`);
        if (!wrapper) {
            if (callback) callback();
            return;
        }

        wrapper.classList.add('skeleton-fade-out');
        setTimeout(() => {
            if (callback) callback();
        }, 300);
    }

    /**
     * 使用骨架屏过渡（显示骨架屏 -> 加载数据 -> 隐藏骨架屏）
     * @param {string} containerId - 容器ID
     * @param {string} pageType - 页面类型
     * @param {Function} loadFn - 加载数据的函数
     */
    static async loadWith(containerId, pageType, loadFn) {
        // 显示骨架屏
        this.show(containerId, pageType);

        // 模拟最小加载时间（避免闪烁）
        await new Promise(resolve => setTimeout(resolve, 500));

        // 执行加载
        await loadFn();

        // 隐藏骨架屏
        this.hide(containerId);
    }
}

// 导出到全局
window.Skeleton = Skeleton;
