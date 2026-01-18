/**
 * 图表可视化组件
 * 提供学习趋势图、环形进度图等可视化功能
 */

class Charts {
    /**
     * 创建学习趋势柱状图
     * @param {string} containerId - 容器ID
     * @param {Array} data - 数据数组 [{label: '周一', value: 10}, ...]
     * @param {Object} options - 配置选项
     */
    static createTrendChart(containerId, data, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const {
            height = 200,
            color = 'var(--primary-gradient)',
            showValues = true,
            animate = true
        } = options;

        // 计算最大值用于缩放
        const maxValue = Math.max(...data.map(d => d.value), 1);

        let html = `
            <div class="trend-chart" style="height: ${height}px;">
        `;

        data.forEach((item, index) => {
            const percentage = (item.value / maxValue) * 100;
            const animationDelay = animate ? `style="animation-delay: ${index * 0.1}s;"` : '';

            html += `
                <div class="trend-bar" ${animationDelay}
                     style="height: ${percentage}%; background: ${color};"
                     data-value="${item.value}"
                     data-label="${item.label}">
                    ${showValues ? `<span class="trend-bar-value">${item.value}</span>` : ''}
                </div>
            `;
        });

        html += `</div>`;

        // 添加标签
        html += `<div class="trend-labels">`;
        data.forEach(item => {
            html += `<div class="trend-label">${item.label}</div>`;
        });
        html += `</div>`;

        container.innerHTML = html;

        // 添加交互事件
        this._bindChartEvents(container);
    }

    /**
     * 创建环形进度图
     * @param {string} containerId - 容器ID
     * @param {Array} data - 数据数组 [{label: '已掌握', value: 30, color: '#51CF66'}, ...]
     * @param {Object} options - 配置选项
     */
    static createDonutChart(containerId, data, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const {
            size = 200,
            strokeWidth = 20,
            showLegend = true,
            animate = true
        } = options;

        const total = data.reduce((sum, item) => sum + item.value, 0);
        const radius = (size - strokeWidth) / 2;
        const circumference = 2 * Math.PI * radius;
        let currentOffset = 0;

        let html = `
            <div class="donut-chart-container">
                <svg width="${size}" height="${size}" class="donut-chart ${animate ? 'animate' : ''}">
        `;

        // 创建背景圆
        html += `
            <circle
                cx="${size / 2}"
                cy="${size / 2}"
                r="${radius}"
                fill="none"
                stroke="var(--bg-secondary)"
                stroke-width="${strokeWidth}"
            />
        `;

        // 创建数据段
        data.forEach((item, index) => {
            const percentage = item.value / total;
            const dashArray = percentage * circumference;
            const dashOffset = circumference - dashArray;

            html += `
                <circle
                    class="donut-segment"
                    cx="${size / 2}"
                    cy="${size / 2}"
                    r="${radius}"
                    fill="none"
                    stroke="${item.color}"
                    stroke-width="${strokeWidth}"
                    stroke-dasharray="${dashArray} ${circumference}"
                    stroke-dashoffset="${-currentOffset}"
                    stroke-linecap="round"
                    transform="rotate(-90 ${size / 2} ${size / 2})"
                    data-label="${item.label}"
                    data-value="${item.value}"
                    data-percentage="${Math.round(percentage * 100)}%"
                    style="${animate ? `animation: donutFadeIn 0.6s ease ${index * 0.2}s both;` : ''}"
                />
            `;

            currentOffset += dashArray;
        });

        // 中心文字
        html += `
            <text x="50%" y="45%" text-anchor="middle" class="donut-total">${total}</text>
            <text x="50%" y="60%" text-anchor="middle" class="donut-label">总计</text>
        `;

        html += `
                </svg>
        `;

        // 图例
        if (showLegend) {
            html += `<div class="donut-legend">`;
            data.forEach(item => {
                const percentage = Math.round((item.value / total) * 100);
                html += `
                    <div class="donut-legend-item">
                        <span class="donut-legend-color" style="background: ${item.color}"></span>
                        <span class="donut-legend-label">${item.label}</span>
                        <span class="donut-legend-value">${item.value} (${percentage}%)</span>
                    </div>
                `;
            });
            html += `</div>`;
        }

        html += `</div>`;
        container.innerHTML = html;

        // 添加交互事件
        this._bindDonutEvents(container);
    }

    /**
     * 创建迷你统计卡片（带小图表）
     * @param {string} containerId - 容器ID
     * @param {Array} items - 统计项数组
     */
    static createMiniStats(containerId, items) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let html = `<div class="mini-stats-grid">`;

        items.forEach((item, index) => {
            html += `
                <div class="mini-stat-card" style="animation-delay: ${index * 0.1}s;">
                    <div class="mini-stat-header">
                        <span class="mini-stat-icon">${item.icon}</span>
                        <span class="mini-stat-title">${item.title}</span>
                    </div>
                    <div class="mini-stat-value">${item.value}</div>
                    ${item.change !== undefined ? `
                        <div class="mini-stat-change ${item.change >= 0 ? 'positive' : 'negative'}">
                            ${item.change >= 0 ? '↑' : '↓'} ${Math.abs(item.change)}%
                            <span>较上周</span>
                        </div>
                    ` : ''}
                    ${item.sparkline ? this._generateSparkline(item.sparkline) : ''}
                </div>
            `;
        });

        html += `</div>`;
        container.innerHTML = html;
    }

    /**
     * 创建单词掌握分布饼图
     * @param {string} containerId - 容器ID
     * @param {Object} stats - 统计数据 {new: 10, learning: 20, mastered: 30}
     */
    static createMasteryPie(containerId, stats) {
        const data = [
            {
                label: '新单词',
                value: stats.new || 0,
                color: 'var(--color-warning)'
            },
            {
                label: '学习中',
                value: stats.learning || 0,
                color: 'var(--color-secondary)'
            },
            {
                label: '已掌握',
                value: stats.mastered || 0,
                color: 'var(--color-success)'
            }
        ];

        this.createDonutChart(containerId, data, {
            size: 180,
            strokeWidth: 25,
            showLegend: true,
            animate: true
        });
    }

    /**
     * 获取学习趋势数据（过去7天）
     * @param {Object} userProgress - 用户进度对象
     * @returns {Array} 趋势数据
     */
    static getWeeklyTrendData(userProgress) {
        const data = [];
        const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateKey = Helpers.getDateString(date);

            // 从学习历史获取数据
            const dayData = userProgress.data.learningHistory[dateKey] || { wordsLearned: 0, practiceCount: 0 };

            data.push({
                label: i === 0 ? '今天' : weekDays[date.getDay()],
                value: dayData.wordsLearned + dayData.practiceCount
            });
        }

        return data;
    }

    /**
     * 获取月度学习数据
     * @param {Object} userProgress - 用户进度对象
     * @returns {Array} 月度数据
     */
    static getMonthlyTrendData(userProgress) {
        const data = [];
        const today = new Date();
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

        // 按周分组
        for (let week = 0; week < 4; week++) {
            let weekTotal = 0;
            const startDay = week * 7 + 1;
            const endDay = Math.min(startDay + 6, daysInMonth);

            for (let day = startDay; day <= endDay; day++) {
                const date = new Date(today.getFullYear(), today.getMonth(), day);
                const dateKey = Helpers.getDateString(date);
                const dayData = userProgress.data.learningHistory[dateKey] || { wordsLearned: 0, practiceCount: 0 };
                weekTotal += dayData.wordsLearned + dayData.practiceCount;
            }

            data.push({
                label: `第${week + 1}周`,
                value: weekTotal
            });
        }

        return data;
    }

    /**
     * 生成迷你折线图SVG
     * @private
     */
    static _generateSparkline(data) {
        const width = 80;
        const height = 30;
        const max = Math.max(...data, 1);
        const points = data.map((value, index) => {
            const x = (index / (data.length - 1)) * width;
            const y = height - (value / max) * height;
            return `${x},${y}`;
        }).join(' ');

        return `
            <svg class="mini-stat-sparkline" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                <polyline
                    fill="none"
                    stroke="var(--primary-color)"
                    stroke-width="2"
                    points="${points}"
                />
            </svg>
        `;
    }

    /**
     * 绑定图表交互事件
     * @private
     */
    static _bindChartEvents(container) {
        const bars = container.querySelectorAll('.trend-bar');
        bars.forEach(bar => {
            bar.addEventListener('mouseenter', () => {
                const value = bar.dataset.value;
                const label = bar.dataset.label;
                this._showTooltip(bar, `${label}: ${value}`);
            });

            bar.addEventListener('mouseleave', () => {
                this._hideTooltip();
            });
        });
    }

    /**
     * 绑定环形图交互事件
     * @private
     */
    static _bindDonutEvents(container) {
        const segments = container.querySelectorAll('.donut-segment');
        segments.forEach(segment => {
            segment.addEventListener('mouseenter', () => {
                const label = segment.dataset.label;
                const value = segment.dataset.value;
                const percentage = segment.dataset.percentage;
                this._showTooltip(segment, `${label}: ${value} (${percentage})`);
                segment.style.opacity = '1';
            });

            segment.addEventListener('mouseleave', () => {
                this._hideTooltip();
                segment.style.opacity = '0.9';
            });
        });
    }

    /**
     * 显示工具提示
     * @private
     */
    static _showTooltip(element, text) {
        let tooltip = document.querySelector('.chart-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'chart-tooltip';
            document.body.appendChild(tooltip);
        }

        const rect = element.getBoundingClientRect();
        tooltip.textContent = text;
        tooltip.style.display = 'block';
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
    }

    /**
     * 隐藏工具提示
     * @private
     */
    static _hideTooltip() {
        const tooltip = document.querySelector('.chart-tooltip');
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }

    /**
     * 创建打卡热力图
     * @param {string} containerId - 容器ID
     * @param {Object} checkinData - 打卡数据
     */
    static createCheckinHeatmap(containerId, checkinData) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const today = new Date();
        const weeks = 12; // 显示12周
        const daysPerWeek = 7;

        let html = `<div class="checkin-heatmap">`;
        html += `<div class="heatmap-header">📅 学习打卡热力图</div>`;
        html += `<div class="heatmap-grid">`;

        // 星期标签
        const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
        weekDays.forEach(day => {
            html += `<div class="heatmap-day-label">${day}</div>`;
        });

        // 生成热力图格子
        for (let week = 0; week < weeks; week++) {
            for (let day = 0; day < daysPerWeek; day++) {
                const date = new Date(today);
                date.setDate(date.getDate() - ((weeks - week - 1) * 7 + (daysPerWeek - day - 1)));
                const dateKey = Helpers.getDateString(date);
                const count = checkinData[dateKey] || 0;

                let level = 'level-0';
                if (count > 0) level = 'level-1';
                if (count >= 3) level = 'level-2';
                if (count >= 5) level = 'level-3';
                if (count >= 10) level = 'level-4';

                html += `
                    <div class="heatmap-cell ${level}"
                         data-date="${dateKey}"
                         data-count="${count}"
                         title="${dateKey}: ${count}次">
                    </div>
                `;
            }
        }

        html += `</div>`;

        // 图例
        html += `<div class="heatmap-legend">
            <span>少</span>
            <div class="heatmap-legend-scale">
                <div class="heatmap-cell level-0"></div>
                <div class="heatmap-cell level-1"></div>
                <div class="heatmap-cell level-2"></div>
                <div class="heatmap-cell level-3"></div>
                <div class="heatmap-cell level-4"></div>
            </div>
            <span>多</span>
        </div>`;

        html += `</div>`;
        container.innerHTML = html;
    }
}

// 导出到全局
window.Charts = Charts;
