/**
 * 进度页面控制器
 */

class ProgressPage {
    render(container) {
        const stats = userProgress.data.stats;
        const masteryStats = userProgress.getWordMasteryStats();
        const monthKey = Helpers.getMonthString();
        const checkedDays = userProgress.data.checkinCalendar[monthKey] || [];

        const html = `
            <div class="progress-page">
                <div class="progress-header">
                    <h2 class="progress-title">📊 我的学习进度</h2>
                </div>

                <!-- 总体统计 -->
                <div class="progress-overview">
                    <div class="progress-stat-card">
                        <div class="progress-stat-icon">📚</div>
                        <div class="progress-stat-value">${stats.totalWordsLearned}</div>
                        <div class="progress-stat-label">学习单词数</div>
                    </div>
                    <div class="progress-stat-card">
                        <div class="progress-stat-icon">🔥</div>
                        <div class="progress-stat-value">${stats.currentStreak}</div>
                        <div class="progress-stat-label">连续打卡</div>
                    </div>
                    <div class="progress-stat-card">
                        <div class="progress-stat-icon">⭐</div>
                        <div class="progress-stat-value">${stats.totalStars}</div>
                        <div class="progress-stat-label">获得星星</div>
                    </div>
                    <div class="progress-stat-card">
                        <div class="progress-stat-icon">🎮</div>
                        <div class="progress-stat-value">${stats.totalPracticeCount}</div>
                        <div class="progress-stat-label">练习次数</div>
                    </div>
                    <div class="progress-stat-card">
                        <div class="progress-stat-icon">🏆</div>
                        <div class="progress-stat-value">${stats.longestStreak}</div>
                        <div class="progress-stat-label">最长连续</div>
                    </div>
                    <div class="progress-stat-card">
                        <div class="progress-stat-icon">📈</div>
                        <div class="progress-stat-value">Lv.${stats.level}</div>
                        <div class="progress-stat-label">当前等级</div>
                    </div>
                </div>

                <!-- 打卡日历 -->
                <div class="checkin-calendar">
                    <div class="calendar-header">
                        <h3 class="calendar-title">📅 本月打卡</h3>
                        <div class="calendar-nav">
                            <span>${new Date().getMonth() + 1}月</span>
                        </div>
                    </div>
                    <div class="calendar-grid">
                        <div class="calendar-day-header">日</div>
                        <div class="calendar-day-header">一</div>
                        <div class="calendar-day-header">二</div>
                        <div class="calendar-day-header">三</div>
                        <div class="calendar-day-header">四</div>
                        <div class="calendar-day-header">五</div>
                        <div class="calendar-day-header">六</div>
                        ${this.generateCalendarDays(checkedDays)}
                    </div>
                </div>

                <!-- 单词掌握情况 -->
                <div class="word-mastery">
                    <h3 class="mastery-header">📖 单词掌握情况</h3>
                    <div class="mastery-categories">
                        <div class="mastery-category new">
                            <div class="mastery-count">${masteryStats.new}</div>
                            <div class="mastery-label">新单词</div>
                        </div>
                        <div class="mastery-category learning">
                            <div class="mastery-count">${masteryStats.learning}</div>
                            <div class="mastery-label">学习中</div>
                        </div>
                        <div class="mastery-category mastered">
                            <div class="mastery-count">${masteryStats.mastered}</div>
                            <div class="mastery-label">已掌握</div>
                        </div>
                    </div>
                </div>

                <!-- 成就徽章 -->
                <div class="achievements">
                    <h3 class="achievements-header">🏆 成就徽章</h3>
                    <div class="achievement-grid">
                        ${this.generateAchievements()}
                    </div>
                </div>

                <div class="text-center mt-xl">
                    <button class="btn-secondary" onclick="app.goBack()">返回首页</button>
                </div>
            </div>
        `;
        container.innerHTML = html;
    }

    /**
     * 生成日历天数
     */
    generateCalendarDays(checkedDays) {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const todayDate = today.getDate();

        let html = '';

        // 填充空白
        for (let i = 0; i < firstDay; i++) {
            html += '<div class="calendar-day other-month"></div>';
        }

        // 填充日期
        for (let day = 1; day <= lastDate; day++) {
            const isToday = day === todayDate;
            const isChecked = checkedDays.includes(day);
            let classes = 'calendar-day';
            if (isToday) classes += ' today';
            if (isChecked) classes += ' checked';

            html += `<div class="${classes}">${day}</div>`;
        }

        return html;
    }

    /**
     * 生成成就列表
     */
    generateAchievements() {
        const unlocked = userProgress.data.achievements;
        let html = '';

        Object.values(CONSTANTS.ACHIEVEMENTS).forEach(achievement => {
            const isUnlocked = unlocked.includes(achievement.id);
            html += `
                <div class="achievement-item ${isUnlocked ? 'unlocked' : 'locked'}"
                     onclick="app.pages.progress.showAchievementDetail('${achievement.id}', ${isUnlocked})"
                     style="cursor: pointer; position: relative;">
                    ${isUnlocked ? '<div style="position: absolute; top: 5px; right: 5px; font-size: 16px;">✓</div>' : ''}
                    <div class="achievement-icon">${achievement.icon}</div>
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-desc">${achievement.desc}</div>
                    ${!isUnlocked ? '<div style="margin-top: 8px; padding: 4px 8px; background: rgba(255,255,255,0.5); border-radius: 4px; font-size: 11px; color: #666;">🔒 未解锁</div>' : ''}
                </div>
            `;
        });

        return html;
    }

    /**
     * 显示成就详情
     * @param {string} achievementId - 成就ID
     * @param {boolean} isUnlocked - 是否已解锁
     */
    showAchievementDetail(achievementId, isUnlocked) {
        const achievement = CONSTANTS.ACHIEVEMENTS[achievementId];
        if (!achievement) return;

        // 获取解锁条件说明
        const conditionText = this.getAchievementCondition(achievementId);
        const progressText = this.getAchievementProgress(achievementId);

        const modalHtml = `
            <div id="achievementModal" style="
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
                    background: ${isUnlocked ? 'linear-gradient(135deg, #FFE66D, #FFED8E)' : 'white'};
                    border-radius: 24px;
                    padding: 40px;
                    max-width: 400px;
                    width: 100%;
                    text-align: center;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
                    animation: celebrate 0.5s ease;
                " onclick="event.stopPropagation()">
                    <div style="font-size: 80px; margin-bottom: 16px; ${isUnlocked ? 'animation: bounce 1s ease infinite;' : ''}">
                        ${achievement.icon}
                    </div>
                    <h2 style="font-size: 28px; margin-bottom: 8px; color: #333;">
                        ${achievement.name}
                    </h2>
                    <p style="font-size: 16px; color: #666; margin-bottom: 24px;">
                        ${achievement.desc}
                    </p>

                    ${isUnlocked ? `
                        <div style="padding: 16px; background: rgba(255,255,255,0.7); border-radius: 12px; margin-bottom: 24px;">
                            <div style="font-size: 18px; font-weight: bold; color: #51CF66; margin-bottom: 8px;">
                                ✓ 已解锁
                            </div>
                            <div style="font-size: 14px; color: #666;">
                                恭喜你获得此成就！
                            </div>
                        </div>
                    ` : `
                        <div style="padding: 16px; background: #f8f9fa; border-radius: 12px; margin-bottom: 24px;">
                            <div style="font-size: 14px; font-weight: bold; color: #999; margin-bottom: 8px;">
                                🔒 解锁条件
                            </div>
                            <div style="font-size: 14px; color: #666; margin-bottom: 12px;">
                                ${conditionText}
                            </div>
                            <div style="font-size: 14px; font-weight: bold; color: #FF6B6B;">
                                ${progressText}
                            </div>
                        </div>
                    `}

                    <button class="btn-primary" onclick="document.getElementById('achievementModal').remove()">
                        关闭
                    </button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    /**
     * 获取成就解锁条件
     */
    getAchievementCondition(achievementId) {
        const conditions = {
            'first_day': '首次打开应用',
            'streak_3': '连续打卡3天',
            'streak_7': '连续打卡7天',
            'streak_30': '连续打卡30天',
            'words_10': '学习10个单词',
            'words_50': '学习50个单词',
            'words_100': '学习100个单词',
            'game_master': '玩过所有三种游戏'
        };
        return conditions[achievementId] || '完成特定任务';
    }

    /**
     * 获取成就完成进度
     */
    getAchievementProgress(achievementId) {
        const stats = userProgress.data.stats;
        const gameRecords = userProgress.data.gameRecords;

        switch(achievementId) {
            case 'first_day':
                return '打开应用即可解锁';
            case 'streak_3':
                return `当前连续打卡: ${stats.currentStreak}/3天`;
            case 'streak_7':
                return `当前连续打卡: ${stats.currentStreak}/7天`;
            case 'streak_30':
                return `当前连续打卡: ${stats.currentStreak}/30天`;
            case 'words_10':
                return `当前学习: ${stats.totalWordsLearned}/10个单词`;
            case 'words_50':
                return `当前学习: ${stats.totalWordsLearned}/50个单词`;
            case 'words_100':
                return `当前学习: ${stats.totalWordsLearned}/100个单词`;
            case 'game_master':
                const playedGames = [gameRecords.spelling, gameRecords.matching, gameRecords.quiz]
                    .filter(g => g.playCount > 0).length;
                return `已玩游戏: ${playedGames}/3种`;
            default:
                return '继续努力！';
        }
    }
}
