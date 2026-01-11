/**
 * 选择题游戏
 * 看图/听音选择正确的单词
 */

class QuizGame {
    constructor() {
        this.container = null;
        this.words = [];           // 本轮游戏的单词列表
        this.currentIndex = 0;     // 当前题目索引
        this.currentWord = null;   // 当前单词
        this.options = [];         // 当前选项
        this.score = 0;            // 当前得分
        this.correctCount = 0;     // 答对数量
        this.wrongCount = 0;       // 答错数量
        this.totalQuestions = 10;  // 总题数
        this.isAnswering = false;  // 是否正在答题（防止重复点击）
    }

    /**
     * 初始化游戏
     * @param {HTMLElement} container - 容器元素
     * @param {number} questionCount - 题目数量
     */
    init(container, questionCount = 10) {
        this.container = container;
        this.totalQuestions = questionCount;
        this.reset();
        this.selectWords();
        this.render();
    }

    /**
     * 重置游戏状态
     */
    reset() {
        this.currentIndex = 0;
        this.score = 0;
        this.correctCount = 0;
        this.wrongCount = 0;
        this.isAnswering = false;
    }

    /**
     * 选择本轮游戏的单词
     */
    selectWords() {
        // 从单词库中随机选择指定数量的单词
        const allWords = this.getAllWords();
        this.words = Helpers.randomPick(allWords, this.totalQuestions);
    }

    /**
     * 获取所有可用单词
     * @returns {Array} 单词数组
     */
    getAllWords() {
        // 尝试使用扩展单词库，如果不存在则使用基础单词库
        if (typeof wordDatabaseExtended !== 'undefined' && wordDatabaseExtended.length > 0) {
            return wordDatabaseExtended;
        }
        return wordDatabase;
    }

    /**
     * 生成当前题目的选项
     */
    generateOptions() {
        this.currentWord = this.words[this.currentIndex];

        // 生成3个错误选项
        const allWords = this.getAllWords();
        const wrongWords = [];

        while (wrongWords.length < 3) {
            const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
            // 确保不重复且不是正确答案
            if (randomWord.id !== this.currentWord.id &&
                !wrongWords.find(w => w.id === randomWord.id)) {
                wrongWords.push(randomWord);
            }
        }

        // 组合正确答案和错误选项，然后打乱顺序
        this.options = Helpers.shuffleArray([this.currentWord, ...wrongWords]);
    }

    /**
     * 渲染游戏界面
     */
    render() {
        this.generateOptions();

        const progress = Math.round((this.currentIndex / this.totalQuestions) * 100);

        const html = `
            <div class="quiz-game">
                <!-- 顶部信息栏 -->
                <div class="game-header">
                    <div class="game-info">
                        <div class="game-score">
                            <span class="score-label">得分:</span>
                            <span class="score-value">${this.score}</span>
                        </div>
                        <div class="game-progress-text">
                            ${this.currentIndex + 1} / ${this.totalQuestions}
                        </div>
                    </div>
                    <div class="game-progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                </div>

                <!-- 题目区域 -->
                <div class="quiz-question">
                    <h3 class="quiz-instruction">选择正确的翻译</h3>

                    <!-- 单词显示 -->
                    <div class="quiz-word-card">
                        <div class="quiz-word-display">
                            <div class="word-main">${this.currentWord.word}</div>
                            <div class="word-phonetic">${this.currentWord.phonetic || ''}</div>
                        </div>
                        <button class="btn-audio" onclick="quizGame.playWordAudio()">
                            🔊 发音
                        </button>
                    </div>
                </div>

                <!-- 选项区域 -->
                <div class="quiz-options">
                    ${this.options.map((option, index) => `
                        <button
                            class="quiz-option"
                            data-word-id="${option.id}"
                            onclick="quizGame.selectOption(${option.id})"
                        >
                            <span class="option-label">${String.fromCharCode(65 + index)}.</span>
                            <span class="option-text">${option.translation}</span>
                        </button>
                    `).join('')}
                </div>

                <!-- 底部按钮 -->
                <div class="game-footer">
                    <button class="btn-secondary" onclick="quizGame.quit()">退出游戏</button>
                </div>
            </div>
        `;

        this.container.innerHTML = html;

        // 自动播放单词发音
        setTimeout(() => this.playWordAudio(), 500);
    }

    /**
     * 播放当前单词发音
     */
    playWordAudio() {
        if (this.currentWord) {
            audioService.playWord(
                this.currentWord.word,
                this.currentWord.audioPath
            );
        }
    }

    /**
     * 选择答案
     * @param {number} wordId - 选中的单词ID
     */
    selectOption(wordId) {
        if (this.isAnswering) return;
        this.isAnswering = true;

        const isCorrect = wordId === this.currentWord.id;
        const selectedButton = this.container.querySelector(`[data-word-id="${wordId}"]`);
        const correctButton = this.container.querySelector(`[data-word-id="${this.currentWord.id}"]`);

        if (isCorrect) {
            // 答对
            this.correctCount++;
            this.score += 10;
            selectedButton.classList.add('correct');
            audioService.playEffect('correct');

            // 更新用户进度（标记为认识）
            userProgress.updateWordProgress(this.currentWord.id, true);

            this.showFeedback(true, '太棒了！✓');
        } else {
            // 答错
            this.wrongCount++;
            selectedButton.classList.add('wrong');
            correctButton.classList.add('correct');
            audioService.playEffect('wrong');

            // 更新用户进度（标记为不认识）
            userProgress.updateWordProgress(this.currentWord.id, false);

            this.showFeedback(false, `正确答案是: ${this.currentWord.translation}`);
        }

        // 禁用所有选项按钮
        const allOptions = this.container.querySelectorAll('.quiz-option');
        allOptions.forEach(btn => btn.style.pointerEvents = 'none');

        // 延迟后进入下一题或结束游戏
        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    /**
     * 显示答题反馈
     * @param {boolean} isCorrect - 是否正确
     * @param {string} message - 反馈消息
     */
    showFeedback(isCorrect, message) {
        const feedbackClass = isCorrect ? 'feedback-correct' : 'feedback-wrong';
        const feedbackHtml = `
            <div class="quiz-feedback ${feedbackClass}">
                ${message}
            </div>
        `;

        const questionArea = this.container.querySelector('.quiz-question');
        const existingFeedback = questionArea.querySelector('.quiz-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }

        questionArea.insertAdjacentHTML('beforeend', feedbackHtml);
    }

    /**
     * 下一题
     */
    nextQuestion() {
        this.isAnswering = false;
        this.currentIndex++;

        if (this.currentIndex >= this.totalQuestions) {
            // 游戏结束
            this.showResult();
        } else {
            // 继续下一题
            this.render();
        }
    }

    /**
     * 显示游戏结果
     */
    showResult() {
        const accuracy = Math.round((this.correctCount / this.totalQuestions) * 100);
        let starCount = 0;
        let comment = '';

        // 根据正确率评星和评语
        if (accuracy >= 90) {
            starCount = 3;
            comment = '完美！你是单词小天才！🎉';
        } else if (accuracy >= 70) {
            starCount = 2;
            comment = '很棒！继续加油！👍';
        } else if (accuracy >= 50) {
            starCount = 1;
            comment = '不错！再接再厉！💪';
        } else {
            starCount = 0;
            comment = '加油！多练习会更好！📚';
        }

        const stars = '⭐'.repeat(starCount);

        const html = `
            <div class="quiz-result">
                <div class="result-card">
                    <h2 class="result-title">游戏结束！</h2>

                    <div class="result-stars">${stars}</div>

                    <div class="result-score">
                        <div class="score-main">${this.score}</div>
                        <div class="score-label">总分</div>
                    </div>

                    <div class="result-stats">
                        <div class="stat-item">
                            <div class="stat-value correct">${this.correctCount}</div>
                            <div class="stat-label">答对</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value wrong">${this.wrongCount}</div>
                            <div class="stat-label">答错</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${accuracy}%</div>
                            <div class="stat-label">正确率</div>
                        </div>
                    </div>

                    <div class="result-comment">${comment}</div>

                    <div class="result-actions">
                        <button class="btn-primary" onclick="quizGame.restart()">再玩一次</button>
                        <button class="btn-secondary" onclick="quizGame.quit()">返回</button>
                    </div>
                </div>
            </div>
        `;

        this.container.innerHTML = html;

        // 更新游戏记录
        userProgress.updateGameRecord('quiz', this.score);

        // 播放完成音效
        audioService.playEffect('complete');
    }

    /**
     * 重新开始游戏
     */
    restart() {
        this.init(this.container, this.totalQuestions);
    }

    /**
     * 退出游戏
     */
    quit() {
        if (app && typeof app.navigate === 'function') {
            app.navigate('game');
        }
    }
}

// 创建全局实例
const quizGame = new QuizGame();
