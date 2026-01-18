/**
 * 成就庆祝动画组件
 * 提供丰富的庆祝动画效果
 */

class Celebration {
    /**
     * 触发成就解锁庆祝动画
     * @param {HTMLElement} container - 容器元素
     * @param {Object} options - 配置选项
     */
    static unlockAchievement(container, options = {}) {
        const {
            title = '成就解锁！',
            message = '恭喜你获得新成就！',
            icon = '🏆',
            duration = 3000,
            confetti = true,
            fireworks = true,
            sparkle = true
        } = options;

        // 创建庆祝容器
        const celebrationId = 'celebration-' + Date.now();
        const html = `
            <div id="${celebrationId}" class="celebration-overlay">
                <div class="celebration-content">
                    ${sparkle ? this._createSparkles() : ''}
                    ${fireworks ? this._createFireworks() : ''}

                    <div class="celebration-icon">${icon}</div>
                    <h2 class="celebration-title">${title}</h2>
                    <p class="celebration-message">${message}</p>

                    <button class="celebration-btn btn-primary" onclick="Celebration.close('${celebrationId}')">
                        太棒了！
                    </button>
                </div>
                ${confetti ? this._createConfetti() : ''}
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', html);

        // 自动关闭
        if (duration > 0) {
            setTimeout(() => {
                this.close(celebrationId);
            }, duration);
        }

        return celebrationId;
    }

    /**
     * 触发升级庆祝动画
     * @param {number} level - 新等级
     */
    static levelUp(level) {
        return this.unlockAchievement(null, {
            title: `🎉 升级到 Lv.${level}！`,
            message: '你的努力得到了回报！',
            icon: '⭐',
            duration: 4000,
            confetti: true,
            fireworks: true,
            sparkle: true
        });
    }

    /**
     * 触发连续打卡庆祝动画
     * @param {number} days - 连续天数
     */
    static streakDays(days) {
        const messages = {
            3: '连续3天，继续保持！',
            7: '一周连续学习，太棒了！',
            14: '两周不间断，你是最棒的！',
            30: '整月坚持，令人敬佩！'
        };

        return this.unlockAchievement(null, {
            title: `🔥 ${days}天连续打卡！`,
            message: messages[days] || '坚持就是胜利！',
            icon: '🔥',
            duration: 3000,
            confetti: true,
            fireworks: days >= 7,
            sparkle: true
        });
    }

    /**
     * 触发学习里程碑庆祝
     * @param {number} count - 学习单词数
     */
    static wordsMilestone(count) {
        const milestones = {
            10: { icon: '📚', message: '开始学习之旅！' },
            50: { icon: '🌟', message: '积累了丰富词汇！' },
            100: { icon: '🎖️', message: '百词达成，学习大师！' },
            200: { icon: '🏅', message: '两百词汇，继续加油！' },
            500: { icon: '👑', message: '五百词汇，词汇之王！' }
        };

        const milestone = milestones[count] || { icon: '⭐', message: '新的里程碑！' };

        return this.unlockAchievement(null, {
            title: `🎊 学习了 ${count} 个单词！`,
            message: milestone.message,
            icon: milestone.icon,
            duration: 3500,
            confetti: true,
            fireworks: count >= 50,
            sparkle: true
        });
    }

    /**
     * 创建彩带效果
     * @private
     */
    static _createConfetti() {
        let confetti = '<div class="confetti-container">';
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#51CF66', '#74C0FC', '#FFA94D'];

        for (let i = 0; i < 50; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const delay = Math.random() * 2;
            const duration = 2 + Math.random() * 2;
            const size = 5 + Math.random() * 10;

            confetti += `
                <div class="confetti"
                     style="
                        left: ${left}%;
                        background: ${color};
                        width: ${size}px;
                        height: ${size * 0.6}px;
                        animation-delay: ${delay}s;
                        animation-duration: ${duration}s;
                        transform: rotate(${Math.random() * 360}deg);
                     ">
                </div>
            `;
        }

        confetti += '</div>';
        return confetti;
    }

    /**
     * 创建火花效果
     * @private
     */
    static _createSparkles() {
        let sparkles = '<div class="sparkles-container">';
        const positions = [
            { top: '10%', left: '15%' },
            { top: '20%', left: '80%' },
            { top: '60%', left: '10%' },
            { top: '70%', left: '85%' },
            { top: '40%', left: '95%' },
            { top: '80%', left: '20%' }
        ];

        positions.forEach((pos, i) => {
            const delay = i * 0.3;
            sparkles += `
                <div class="sparkle" style="
                    top: ${pos.top};
                    left: ${pos.left};
                    animation-delay: ${delay}s;
                ">✨</div>
            `;
        });

        sparkles += '</div>';
        return sparkles;
    }

    /**
     * 创建烟花效果
     * @private
     */
    static _createFireworks() {
        let fireworks = '<div class="fireworks-container">';

        for (let i = 0; i < 3; i++) {
            const left = 20 + i * 30;
            const delay = i * 0.5;
            fireworks += `
                <div class="firework" style="
                    left: ${left}%;
                    animation-delay: ${delay}s;
                ">
                    ${this._createFireworkParticles()}
                </div>
            `;
        }

        fireworks += '</div>';
        return fireworks;
    }

    /**
     * 创建烟花粒子
     * @private
     */
    static _createFireworkParticles() {
        let particles = '';
        const colors = ['#FF6B6B', '#FFE66D', '#4ECDC4', '#51CF66'];

        for (let i = 0; i < 12; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const angle = (i / 12) * 360;
            particles += `
                <div class="firework-particle" style="
                    background: ${color};
                    transform: rotate(${angle}deg) translateY(-80px);
                    animation-delay: ${i * 0.05}s;
                "></div>
            `;
        }

        return particles;
    }

    /**
     * 关闭庆祝动画
     * @param {string} celebrationId - 庆祝容器ID
     */
    static close(celebrationId) {
        const element = document.getElementById(celebrationId);
        if (element) {
            element.classList.add('closing');
            setTimeout(() => {
                element.remove();
            }, 300);
        }
    }

    /**
     * 小型庆祝效果（用于按钮点击等）
     * @param {HTMLElement} element - 触发元素
     */
    static miniCelebrate(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // 创建小型粒子爆发
        const particles = 12;
        const containerId = 'mini-celebration-' + Date.now();
        let html = `<div id="${containerId}" class="mini-celebration" style="left: ${centerX}px; top: ${centerY}px;">`;

        for (let i = 0; i < particles; i++) {
            const angle = (i / particles) * 360;
            const color = ['#FF6B6B', '#FFE66D', '#51CF66', '#74C0FC'][i % 4];
            html += `<div class="mini-particle" style="transform: rotate(${angle}deg); background: ${color};"></div>`;
        }

        html += '</div>';
        document.body.insertAdjacentHTML('beforeend', html);

        // 自动移除
        setTimeout(() => {
            const element = document.getElementById(containerId);
            if (element) element.remove();
        }, 600);
    }

    /**
     * 简单的星星雨效果
     */
    static starRain() {
        const containerId = 'star-rain-' + Date.now();
        let html = `<div id="${containerId}" class="star-rain">`;

        for (let i = 0; i < 20; i++) {
            const left = Math.random() * 100;
            const delay = Math.random() * 2;
            const size = 10 + Math.random() * 20;
            html += `<div class="star" style="left: ${left}%; font-size: ${size}px; animation-delay: ${delay}s;">⭐</div>`;
        }

        html += '</div>';
        document.body.insertAdjacentHTML('beforeend', html);

        setTimeout(() => {
            const element = document.getElementById(containerId);
            if (element) element.remove();
        }, 3000);
    }

    /**
     * 彩虹波浪效果
     */
    static rainbowWave() {
        const containerId = 'rainbow-wave-' + Date.now();
        const colors = ['#FF6B6B', '#FFA94D', '#FFE66D', '#51CF66', '#4ECDC4', '#74C0FC'];
        let html = `<div id="${containerId}" class="rainbow-wave">`;

        colors.forEach((color, i) => {
            html += `<div class="wave-ripple" style="background: ${color}; animation-delay: ${i * 0.2}s;"></div>`;
        });

        html += '</div>';
        document.body.insertAdjacentHTML('beforeend', html);

        setTimeout(() => {
            const element = document.getElementById(containerId);
            if (element) element.remove();
        }, 2000);
    }
}

// 导出到全局
window.Celebration = Celebration;
