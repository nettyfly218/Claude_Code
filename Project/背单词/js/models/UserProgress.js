/**
 * 用户进度数据模型
 * 管理用户的学习进度和统计数据
 */

class UserProgress {
    constructor() {
        this.data = this.initializeData();
        this.load();
    }

    /**
     * 初始化默认数据结构
     */
    initializeData() {
        return {
            userId: 'default',
            userName: '小朋友',
            avatar: '🦁',

            // 总体统计
            stats: {
                totalWordsLearned: 0,      // 已学单词总数
                totalPracticeCount: 0,      // 练习次数
                currentStreak: 0,           // 连续打卡天数
                longestStreak: 0,           // 最长连续天数
                totalStars: 0,              // 累计星星数
                level: 1,                   // 用户等级
                exp: 0,                     // 经验值
                lastLoginDate: Helpers.getTodayDate()
            },

            // 单词掌握情况 {wordId: {...}}
            wordProgress: {},

            // 打卡日历 {"2026-01": [3, 4, 5]}
            checkinCalendar: {},

            // 游戏记录
            gameRecords: {
                spelling: { bestScore: 0, playCount: 0 },
                matching: { bestScore: 0, playCount: 0 },
                quiz: { bestScore: 0, playCount: 0 }
            },

            // 成就
            achievements: [],

            // 设置
            settings: {
                soundEnabled: true,
                musicEnabled: false,
                voiceSpeed: 0.8,
                dailyGoal: CONSTANTS.DEFAULT_DAILY_GOAL
            }
        };
    }

    /**
     * 从localStorage加载数据
     */
    load() {
        const saved = StorageService.load(CONSTANTS.STORAGE_KEYS.USER_PROGRESS);
        if (saved) {
            this.data = { ...this.data, ...saved };
        }
        this.checkDailyLogin();
    }

    /**
     * 保存数据到localStorage
     */
    save() {
        StorageService.save(CONSTANTS.STORAGE_KEYS.USER_PROGRESS, this.data);
    }

    /**
     * 检查每日登录，更新打卡
     */
    checkDailyLogin() {
        const today = Helpers.getTodayDate();
        const lastLogin = this.data.stats.lastLoginDate;

        if (lastLogin !== today) {
            // 新的一天
            const daysDiff = Helpers.getDaysDiff(lastLogin, today);

            if (daysDiff === 1) {
                // 连续打卡
                this.data.stats.currentStreak++;
                if (this.data.stats.currentStreak > this.data.stats.longestStreak) {
                    this.data.stats.longestStreak = this.data.stats.currentStreak;
                }
            } else if (daysDiff > 1) {
                // 打卡中断
                this.data.stats.currentStreak = 1;
            }

            // 更新日历
            const monthKey = Helpers.getMonthString();
            if (!this.data.checkinCalendar[monthKey]) {
                this.data.checkinCalendar[monthKey] = [];
            }
            const day = new Date(today).getDate();
            if (!this.data.checkinCalendar[monthKey].includes(day)) {
                this.data.checkinCalendar[monthKey].push(day);
            }

            this.data.stats.lastLoginDate = today;
            this.save();

            // 检查成就
            this.checkAchievements();
        }
    }

    /**
     * 更新单词学习进度
     * @param {number} wordId - 单词ID
     * @param {boolean} isCorrect - 是否回答正确
     */
    updateWordProgress(wordId, isCorrect) {
        if (!this.data.wordProgress[wordId]) {
            // 首次学习该单词
            this.data.wordProgress[wordId] = {
                wordId: wordId,
                mastery: 0,
                reviewCount: 0,
                correctCount: 0,
                wrongCount: 0,
                lastReviewDate: Helpers.getTodayDate(),
                nextReviewDate: null,
                firstLearnDate: Helpers.getTodayDate(),
                status: CONSTANTS.WORD_STATUS.NEW
            };
            this.data.stats.totalWordsLearned++;
        }

        const wordData = this.data.wordProgress[wordId];
        const oldMastery = wordData.mastery;

        if (isCorrect) {
            // 答对：掌握度提升
            const increment = 0.2 * (1 - oldMastery);
            wordData.mastery = Math.min(1, oldMastery + increment);
            wordData.correctCount++;
        } else {
            // 答错：掌握度下降
            wordData.mastery = Math.max(0, oldMastery - 0.15);
            wordData.wrongCount++;
        }

        wordData.reviewCount++;
        wordData.lastReviewDate = Helpers.getTodayDate();

        // 更新状态
        if (wordData.mastery >= CONSTANTS.MASTERY_THRESHOLDS.MASTERED && wordData.reviewCount >= 5) {
            wordData.status = CONSTANTS.WORD_STATUS.MASTERED;
        } else if (wordData.mastery >= CONSTANTS.MASTERY_THRESHOLDS.NEW) {
            wordData.status = CONSTANTS.WORD_STATUS.LEARNING;
        } else {
            wordData.status = CONSTANTS.WORD_STATUS.NEW;
        }

        this.data.stats.totalPracticeCount++;
        this.save();
    }

    /**
     * 更新游戏记录
     * @param {string} gameType - 游戏类型
     * @param {number} score - 分数
     */
    updateGameRecord(gameType, score) {
        if (this.data.gameRecords[gameType]) {
            const record = this.data.gameRecords[gameType];
            if (score > record.bestScore) {
                record.bestScore = score;
            }
            record.playCount++;

            // 增加星星
            const stars = Helpers.getStarRating(score);
            this.data.stats.totalStars += stars;

            this.save();
            this.checkAchievements();
        }
    }

    /**
     * 检查并解锁成就
     */
    checkAchievements() {
        const newAchievements = [];

        // 检查各种成就条件
        if (!this.hasAchievement('first_day')) {
            this.unlockAchievement('first_day');
            newAchievements.push(CONSTANTS.ACHIEVEMENTS.first_day);
        }

        if (this.data.stats.currentStreak >= 3 && !this.hasAchievement('streak_3')) {
            this.unlockAchievement('streak_3');
            newAchievements.push(CONSTANTS.ACHIEVEMENTS.streak_3);
        }

        if (this.data.stats.currentStreak >= 7 && !this.hasAchievement('streak_7')) {
            this.unlockAchievement('streak_7');
            newAchievements.push(CONSTANTS.ACHIEVEMENTS.streak_7);
        }

        if (this.data.stats.totalWordsLearned >= 10 && !this.hasAchievement('words_10')) {
            this.unlockAchievement('words_10');
            newAchievements.push(CONSTANTS.ACHIEVEMENTS.words_10);
        }

        return newAchievements;
    }

    /**
     * 检查是否已解锁成就
     * @param {string} achievementId
     */
    hasAchievement(achievementId) {
        return this.data.achievements.includes(achievementId);
    }

    /**
     * 解锁成就
     * @param {string} achievementId
     */
    unlockAchievement(achievementId) {
        if (!this.hasAchievement(achievementId)) {
            this.data.achievements.push(achievementId);
            this.save();
        }
    }

    /**
     * 获取今日学习进度
     */
    getTodayProgress() {
        // 简化实现：计算今天学习的单词数
        const today = Helpers.getTodayDate();
        let todayCount = 0;

        Object.values(this.data.wordProgress).forEach(wordData => {
            if (wordData.lastReviewDate === today) {
                todayCount++;
            }
        });

        return {
            learned: todayCount,
            goal: this.data.settings.dailyGoal,
            percentage: Math.min(100, (todayCount / this.data.settings.dailyGoal) * 100)
        };
    }

    /**
     * 获取单词掌握情况统计
     */
    getWordMasteryStats() {
        const stats = {
            new: 0,
            learning: 0,
            mastered: 0
        };

        Object.values(this.data.wordProgress).forEach(wordData => {
            stats[wordData.status]++;
        });

        return stats;
    }
}

// 创建全局实例
const userProgress = new UserProgress();
