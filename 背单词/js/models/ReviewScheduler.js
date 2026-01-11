/**
 * 复习调度器
 * 基于遗忘曲线安排智能复习
 */

class ReviewScheduler {
    constructor() {
        // 遗忘曲线复习间隔（天）
        this.reviewIntervals = [1, 3, 7, 15, 30];
    }

    /**
     * 获取需要复习的单词列表
     * @param {Object} wordProgress - 用户单词进度数据
     * @param {Array} allWords - 所有单词数据
     * @returns {Array} 需要复习的单词列表
     */
    getWordsToReview(wordProgress, allWords) {
        const today = Helpers.getTodayDate();
        const reviewWords = [];

        // 遍历所有已学习的单词
        for (const wordId in wordProgress) {
            const progress = wordProgress[wordId];

            // 只处理已学习但未完全掌握的单词
            if (progress.status === 'new') continue;

            // 计算下次复习时间
            const nextReviewDate = this.calculateNextReviewDate(progress);

            // 如果今天应该复习
            if (nextReviewDate <= today) {
                const wordData = allWords.find(w => w.id == wordId);
                if (wordData) {
                    reviewWords.push({
                        ...wordData,
                        progress: progress,
                        priority: this.calculatePriority(progress, today)
                    });
                }
            }
        }

        // 按优先级排序（优先级高的在前）
        reviewWords.sort((a, b) => b.priority - a.priority);

        return reviewWords;
    }

    /**
     * 计算下次复习日期
     * @param {Object} progress - 单词进度数据
     * @returns {string} 下次复习日期 (YYYY-MM-DD)
     */
    calculateNextReviewDate(progress) {
        if (!progress.lastReviewDate) {
            return Helpers.getTodayDate();
        }

        // 根据复习次数确定复习间隔
        const reviewCount = progress.reviewCount || 0;
        const intervalIndex = Math.min(reviewCount, this.reviewIntervals.length - 1);
        const intervalDays = this.reviewIntervals[intervalIndex];

        // 计算下次复习日期
        const lastReview = new Date(progress.lastReviewDate);
        const nextReview = new Date(lastReview);
        nextReview.setDate(nextReview.getDate() + intervalDays);

        return nextReview.toISOString().split('T')[0];
    }

    /**
     * 计算复习优先级
     * @param {Object} progress - 单词进度数据
     * @param {string} today - 今天日期
     * @returns {number} 优先级分数（越高越优先）
     */
    calculatePriority(progress, today) {
        let priority = 0;

        // 1. 掌握度越低，优先级越高
        const masteryScore = (1 - progress.mastery) * 50;
        priority += masteryScore;

        // 2. 错误率越高，优先级越高
        const total = progress.correctCount + progress.wrongCount;
        if (total > 0) {
            const errorRate = progress.wrongCount / total;
            priority += errorRate * 30;
        }

        // 3. 超期天数越多，优先级越高
        const nextReviewDate = this.calculateNextReviewDate(progress);
        const overdueDays = Helpers.getDaysDiff(nextReviewDate, today);
        if (overdueDays > 0) {
            priority += Math.min(overdueDays * 5, 20);
        }

        return Math.round(priority);
    }

    /**
     * 获取今日复习统计
     * @param {Object} wordProgress - 用户单词进度数据
     * @param {Array} allWords - 所有单词数据
     * @returns {Object} 复习统计信息
     */
    getTodayReviewStats(wordProgress, allWords) {
        const reviewWords = this.getWordsToReview(wordProgress, allWords);

        // 按掌握度分类
        const weak = reviewWords.filter(w => w.progress.mastery < 0.3);
        const medium = reviewWords.filter(w =>
            w.progress.mastery >= 0.3 && w.progress.mastery < 0.7
        );
        const strong = reviewWords.filter(w => w.progress.mastery >= 0.7);

        return {
            total: reviewWords.length,
            weak: weak.length,
            medium: medium.length,
            strong: strong.length,
            words: reviewWords
        };
    }

    /**
     * 更新复习记录
     * @param {Object} progress - 单词进度数据
     * @param {boolean} isCorrect - 是否回答正确
     */
    updateReviewRecord(progress, isCorrect) {
        progress.lastReviewDate = Helpers.getTodayDate();
        progress.reviewCount = (progress.reviewCount || 0) + 1;

        if (isCorrect) {
            progress.correctCount++;
        } else {
            progress.wrongCount++;
        }
    }

    /**
     * 推荐今日复习数量
     * @param {number} totalReviewWords - 总复习单词数
     * @returns {number} 推荐复习数量
     */
    getRecommendedReviewCount(totalReviewWords) {
        // 基础建议：每天复习10-20个单词
        const baseRecommendation = 15;

        if (totalReviewWords <= baseRecommendation) {
            return totalReviewWords;
        }

        // 如果超过基础建议，分批复习
        return baseRecommendation;
    }

    /**
     * 生成复习计划
     * @param {Array} reviewWords - 需要复习的单词
     * @param {number} count - 本次复习数量
     * @returns {Object} 复习计划
     */
    generateReviewPlan(reviewWords, count) {
        // 选择优先级最高的单词
        const selectedWords = reviewWords.slice(0, count);

        return {
            words: selectedWords,
            totalCount: reviewWords.length,
            selectedCount: selectedWords.length,
            remainingCount: Math.max(0, reviewWords.length - count)
        };
    }
}

// 创建全局实例
const reviewScheduler = new ReviewScheduler();
