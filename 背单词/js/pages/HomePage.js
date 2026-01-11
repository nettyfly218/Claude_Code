/**
 * 首页控制器
 */

class HomePage {
    constructor() {
        this.container = null;
    }

    /**
     * 渲染首页
     * @param {HTMLElement} container - 容器元素
     */
    render(container) {
        this.container = container;

        const todayProgress = userProgress.getTodayProgress();
        const stats = userProgress.data.stats;
        const masteryStats = userProgress.getWordMasteryStats();

        const html = `
            <div class="home-page">
                <!-- 欢迎区域 -->
                <div class="home-header">
                    <div class="home-avatar">${userProgress.data.avatar}</div>
                    <h1 class="home-welcome">你好，${userProgress.data.userName}！</h1>
                    <p class="home-subtitle">一起来学单词吧 🌟</p>
                </div>

                <!-- 统计卡片 -->
                <div class="home-stats">
                    <div class="stat-card">
                        <div class="stat-icon">📚</div>
                        <div class="stat-value">${stats.totalWordsLearned}</div>
                        <div class="stat-label">已学单词</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🔥</div>
                        <div class="stat-value">${stats.currentStreak}</div>
                        <div class="stat-label">连续打卡</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">⭐</div>
                        <div class="stat-value">${stats.totalStars}</div>
                        <div class="stat-label">获得星星</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🎮</div>
                        <div class="stat-value">${stats.totalPracticeCount}</div>
                        <div class="stat-label">练习次数</div>
                    </div>
                </div>

                <!-- 今日目标 -->
                <div class="daily-goal">
                    <h3>📅 今日目标</h3>
                    <div class="goal-progress">
                        <div class="goal-progress-fill" style="width: ${todayProgress.percentage}%">
                            ${todayProgress.learned}/${todayProgress.goal}
                        </div>
                    </div>
                    <p class="goal-text">
                        ${todayProgress.learned >= todayProgress.goal
                            ? '🎉 太棒了！今天的目标已完成！'
                            : `还需学习 ${todayProgress.goal - todayProgress.learned} 个单词`}
                    </p>
                </div>

                <!-- 单词掌握情况 -->
                <div class="word-mastery">
                    <h3 class="mastery-header">📊 单词掌握情况 <span style="font-size: 14px; color: #999; font-weight: normal;">(点击查看详情)</span></h3>
                    <div class="mastery-categories">
                        <div class="mastery-category new" onclick="app.pages.home.showWordList('new')" style="cursor: pointer;">
                            <div class="mastery-count">${masteryStats.new}</div>
                            <div class="mastery-label">新单词</div>
                        </div>
                        <div class="mastery-category learning" onclick="app.pages.home.showWordList('learning')" style="cursor: pointer;">
                            <div class="mastery-count">${masteryStats.learning}</div>
                            <div class="mastery-label">学习中</div>
                        </div>
                        <div class="mastery-category mastered" onclick="app.pages.home.showWordList('mastered')" style="cursor: pointer;">
                            <div class="mastery-count">${masteryStats.mastered}</div>
                            <div class="mastery-label">已掌握</div>
                        </div>
                    </div>
                </div>

                <!-- 主要操作 -->
                <div class="home-actions">
                    <div class="action-card primary" onclick="app.navigateTo('learn')">
                        <div class="action-icon">📖</div>
                        <h3 class="action-title">开始学习</h3>
                        <p class="action-desc">学习新单词，巩固旧知识</p>
                    </div>

                    <div class="action-card secondary" onclick="app.navigateTo('game')">
                        <div class="action-icon">🎮</div>
                        <h3 class="action-title">趣味游戏</h3>
                        <p class="action-desc">通过游戏练习单词</p>
                    </div>

                    <div class="action-card accent" onclick="app.navigateTo('progress')">
                        <div class="action-icon">📊</div>
                        <h3 class="action-title">学习进度</h3>
                        <p class="action-desc">查看学习统计和成就</p>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
        this.addAnimations();
    }

    /**
     * 添加动画效果
     */
    addAnimations() {
        // 为统计卡片添加依次出现的动画
        const statCards = this.container.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            setTimeout(() => {
                Helpers.addClass(card, 'slide-up');
            }, index * 100);
        });

        // 为操作卡片添加动画
        const actionCards = this.container.querySelectorAll('.action-card');
        actionCards.forEach((card, index) => {
            setTimeout(() => {
                Helpers.addClass(card, 'slide-up');
            }, 400 + index * 150);
        });
    }

    /**
     * 显示单词列表弹窗
     * @param {string} status - 单词状态 (new/learning/mastered)
     */
    showWordList(status) {
        // 获取该状态的所有单词
        const wordIds = Object.keys(userProgress.data.wordProgress).filter(wordId => {
            return userProgress.data.wordProgress[wordId].status === status;
        });

        if (wordIds.length === 0) {
            alert('暂无单词');
            return;
        }

        // 获取单词详情
        const words = wordIds.map(id => {
            const wordData = userProgress.data.wordProgress[id];
            const word = getWordById(parseInt(id));
            return {
                ...word,
                mastery: wordData.mastery,
                reviewCount: wordData.reviewCount,
                correctCount: wordData.correctCount,
                wrongCount: wordData.wrongCount
            };
        }).filter(w => w.word); // 过滤掉找不到的单词

        // 状态名称映射
        const statusNames = {
            'new': '新单词',
            'learning': '学习中',
            'mastered': '已掌握'
        };

        // 生成单词列表HTML
        let wordsHtml = words.map(word => `
            <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px;
                margin-bottom: 8px;
                background: #f8f9fa;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">
                <div style="flex: 1;">
                    <div style="font-size: 20px; font-weight: bold; color: #333; margin-bottom: 4px;">
                        ${word.word}
                    </div>
                    <div style="font-size: 14px; color: #666;">
                        ${word.translation} ${word.phonetic}
                    </div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 14px; color: #FF6B6B; font-weight: bold;">
                        掌握度: ${Math.round(word.mastery * 100)}%
                    </div>
                    <div style="font-size: 12px; color: #999;">
                        练习${word.reviewCount}次 (对${word.correctCount}/错${word.wrongCount})
                    </div>
                </div>
            </div>
        `).join('');

        // 创建弹窗
        const modalHtml = `
            <div id="wordListModal" style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                padding: 20px;
            " onclick="this.remove()">
                <div style="
                    background: white;
                    border-radius: 24px;
                    padding: 32px;
                    max-width: 600px;
                    width: 100%;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
                " onclick="event.stopPropagation()">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                        <h2 style="font-size: 24px; color: #FF6B6B; margin: 0;">
                            📚 ${statusNames[status]} (${words.length}个)
                        </h2>
                        <button onclick="document.getElementById('wordListModal').remove()" style="
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            border: none;
                            background: #f8f9fa;
                            font-size: 20px;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        " onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">
                            ✕
                        </button>
                    </div>
                    <div style="margin-bottom: 24px;">
                        ${wordsHtml}
                    </div>
                    <div style="text-align: center;">
                        <button class="btn-primary" onclick="document.getElementById('wordListModal').remove()">
                            关闭
                        </button>
                    </div>
                </div>
            </div>
        `;

        // 添加到页面
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
}
