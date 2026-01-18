/**
 * 微交互动画组件
 * 提供丰富的用户交互反馈效果
 */

class MicroInteractions {
    /**
     * 初始化所有微交互效果
     */
    static init() {
        this._initButtonEffects();
        this._initCardEffects();
        this._initListEffects();
        this._initInputEffects();
        this._initScrollEffects();
        this._initRippleEffect();
    }

    /**
     * 按钮点击效果
     * @private
     */
    static _initButtonEffects() {
        // 为所有按钮添加点击效果
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn, button, .clickable');
            if (!btn) return;

            // 添加点击动画
            btn.classList.add('btn-clicked');
            setTimeout(() => {
                btn.classList.remove('btn-clicked');
            }, 200);

            // 触发小型庆祝效果
            if (btn.classList.contains('btn-primary') || btn.classList.contains('btn-success')) {
                this.miniCelebrate(btn);
            }
        }, true);
    }

    /**
     * 卡片悬停效果
     * @private
     */
    static _initCardEffects() {
        const cards = document.querySelectorAll('.card, .stat-card, .action-card, .word-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('card-hover');
            });

            card.addEventListener('mouseleave', () => {
                card.classList.remove('card-hover');
            });
        });
    }

    /**
     * 列表项滑动效果
     * @private
     */
    static _initListEffects() {
        const listItems = document.querySelectorAll('.list-item, .word-list-item, .achievement-item');

        listItems.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.add('item-clicked');
                setTimeout(() => {
                    item.classList.remove('item-clicked');
                }, 300);
            });
        });
    }

    /**
     * 输入框焦点效果
     * @private
     */
    static _initInputEffects() {
        const inputs = document.querySelectorAll('input[type="text"], input[type="number"], textarea');

        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('input-focused');
            });

            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('input-focused');
            });

            // 输入时的抖动反馈（用于错误提示）
            input.addEventListener('invalid', () => {
                input.classList.add('input-shake');
                setTimeout(() => {
                    input.classList.remove('input-shake');
                }, 500);
            });
        });
    }

    /**
     * 滚动显示效果
     * @private
     */
    static _initScrollEffects() {
        // 使用 Intersection Observer API
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // 观察所有需要滚动显示的元素
        const scrollElements = document.querySelectorAll('.scroll-reveal, .card, .stat-card, .action-card');
        scrollElements.forEach(el => observer.observe(el));
    }

    /**
     * 波纹点击效果
     * @private
     */
    static _initRippleEffect() {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('.ripple-effect, .btn, .nav-item');
            if (!target) return;

            const rect = target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            target.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        }, true);
    }

    /**
     * 小型庆祝效果
     * @param {HTMLElement} element - 触发元素
     */
    static miniCelebrate(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // 创建粒子
        const particles = 8;
        const colors = ['#FF6B6B', '#FFE66D', '#51CF66', '#74C0FC'];

        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.className = 'mini-particle';
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 8px;
                height: 8px;
                background: ${colors[i % colors.length]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                transform: rotate(${(i / particles) * 360}deg);
                animation: miniParticleBurst 0.6s ease-out forwards;
            `;

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 600);
        }
    }

    /**
     * 成功反馈动画
     * @param {HTMLElement} element - 目标元素
     */
    static successFeedback(element) {
        element.classList.add('success-pulse');

        // 添加对勾标记
        const checkmark = document.createElement('span');
        checkmark.className = 'success-checkmark';
        checkmark.innerHTML = '✓';
        checkmark.style.cssText = `
            position: absolute;
            top: -10px;
            right: -10px;
            width: 24px;
            height: 24px;
            background: var(--success-color);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            animation: checkmarkPop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            box-shadow: var(--shadow-sm);
        `;

        element.style.position = 'relative';
        element.appendChild(checkmark);

        setTimeout(() => {
            element.classList.remove('success-pulse');
            checkmark.remove();
        }, 2000);
    }

    /**
     * 错误抖动效果
     * @param {HTMLElement} element - 目标元素
     */
    static errorShake(element) {
        element.classList.add('error-shake');
        setTimeout(() => {
            element.classList.remove('error-shake');
        }, 500);
    }

    /**
     * 加载状态切换
     * @param {HTMLElement} element - 目标元素
     * @param {boolean} loading - 是否加载中
     * @param {string} originalText - 原始文本
     */
    static toggleLoading(element, loading, originalText) {
        if (loading) {
            element.dataset.originalText = element.textContent;
            element.disabled = true;
            element.innerHTML = `
                <span class="btn-spinner"></span>
                <span>加载中...</span>
            `;
            element.classList.add('btn-loading');
        } else {
            element.disabled = false;
            element.textContent = element.dataset.originalText || originalText;
            element.classList.remove('btn-loading');
        }
    }

    /**
     * 卡片翻转效果
     * @param {HTMLElement} card - 卡片元素
     */
    static flipCard(card) {
        card.classList.add('card-flipping');

        setTimeout(() => {
            card.classList.toggle('card-flipped');
            card.classList.remove('card-flipping');
        }, 150);
    }

    /**
     * 元素进入动画
     * @param {HTMLElement} element - 目标元素
     * @param {string} animation - 动画类型
     */
    static animateIn(element, animation = 'fadeInUp') {
        element.style.animation = 'none';
        element.offsetHeight; // 触发重绘
        element.style.animation = `${animation} 0.5s ease forwards`;
    }

    /**
     * 数字滚动动画
     * @param {HTMLElement} element - 目标元素
     * @param {number} target - 目标值
     * @param {number} duration - 动画时长(ms)
     */
    static countUp(element, target, duration = 1000) {
        const start = 0;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // 使用缓动函数
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        };

        requestAnimationFrame(animate);
    }

    /**
     * 进度条动画
     * @param {HTMLElement} element - 进度条元素
     * @param {number} percentage - 目标百分比
     */
    static animateProgress(element, percentage) {
        const fillElement = element.querySelector('.progress-fill') || element;
        fillElement.style.transition = 'width 0.6s ease-out';
        fillElement.style.width = percentage + '%';
    }

    /**
     * 涟漪扩散效果
     * @param {HTMLElement} element - 目标元素
     */
    static ripple(element) {
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple = document.createElement('div');

        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: rippleExpand 0.6s ease-out;
            pointer-events: none;
            left: 50%;
            top: 50%;
            margin-left: -${size / 2}px;
            margin-top: -${size / 2}px;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    /**
     * 工具提示显示
     * @param {HTMLElement} element - 目标元素
     * @param {string} text - 提示文本
     */
    static showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'micro-tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.85);
            color: white;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 14px;
            white-space: nowrap;
            z-index: 1000;
            animation: tooltipFadeIn 0.2s ease;
        `;

        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';

        document.body.appendChild(tooltip);

        setTimeout(() => {
            tooltip.remove();
        }, 2000);
    }
}

// 导出到全局
window.MicroInteractions = MicroInteractions;

// 页面加载后自动初始化
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            MicroInteractions.init();
        });
    } else {
        MicroInteractions.init();
    }
}
