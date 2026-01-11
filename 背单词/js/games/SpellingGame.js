/**
 * 拼写游戏
 * 听/看单词，点击字母拼写
 */

class SpellingGame {
    constructor() {
        this.container = null;
        this.words = [];           // 本轮游戏的单词列表
        this.currentIndex = 0;     // 当前题目索引
        this.currentWord = null;   // 当前单词
        this.letterButtons = [];   // 字母按钮列表
        this.userInput = [];       // 用户输入的字母
        this.score = 0;            // 得分
        this.correctCount = 0;     // 答对数量
        this.wrongCount = 0;       // 答错数量
        this.totalQuestions = 10;  // 总题数
        this.hintsUsed = 0;        // 使用提示次数
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
        this.hintsUsed = 0;
    }

    /**
     * 选择本轮游戏的单词
     */
    selectWords() {
        const allWords = this.getAllWords();
        // 选择适合拼写的单词（长度3-8个字母）
        const suitableWords = allWords.filter(w =>
            w.word.length >= 3 && w.word.length <= 8
        );
        this.words = Helpers.randomPick(suitableWords, this.totalQuestions);
    }

    /**
     * 获取所有可用单词
     * @returns {Array} 单词数组
     */
    getAllWords() {
        if (typeof wordDatabaseExtended !== 'undefined' && wordDatabaseExtended.length > 0) {
            return wordDatabaseExtended;
        }
        return wordDatabase;
    }

    /**
     * 生成打乱的字母按钮
     */
    generateLetters() {
        this.currentWord = this.words[this.currentIndex];
        this.userInput = [];

        // 将单词拆分成字母，打乱顺序
        const letters = this.currentWord.word.split('');
        this.letterButtons = Helpers.shuffleArray(letters.map((letter, index) => ({
            letter: letter,
            originalIndex: index,
            used: false
        })));
    }

    /**
     * 渲染游戏界面
     */
    render() {
        this.generateLetters();

        const progress = Math.round((this.currentIndex / this.totalQuestions) * 100);

        const html = `
            <div class="spelling-game">
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
                <div class="spelling-question">
                    <h3 class="spelling-instruction">听单词，拼写出来</h3>

                    <!-- 单词翻译和发音 -->
                    <div class="spelling-word-card">
                        <div class="spelling-translation">${this.currentWord.translation}</div>
                        <button class="btn-audio" onclick="spellingGame.playWordAudio()">
                            🔊 听发音
                        </button>
                    </div>

                    <!-- 输入区域 -->
                    <div class="spelling-input-area">
                        ${this.userInput.length === 0 ?
                            '<div class="input-placeholder">点击下方字母开始拼写</div>' :
                            this.userInput.map((item, index) => `
                                <div class="spelling-letter" onclick="spellingGame.removeLetter(${index})">
                                    ${item.letter}
                                </div>
                            `).join('')
                        }
                    </div>
                </div>

                <!-- 字母按钮区域 -->
                <div class="spelling-letters">
                    ${this.letterButtons.map((item, index) => `
                        <button
                            class="spelling-letter-btn"
                            data-index="${index}"
                            onclick="spellingGame.addLetter(${index})"
                            ${item.used ? 'disabled' : ''}
                        >
                            ${item.letter}
                        </button>
                    `).join('')}
                </div>

                <!-- 操作按钮 -->
                <div class="spelling-actions">
                    <button class="btn-hint" onclick="spellingGame.useHint()">💡 提示</button>
                    <button class="btn-clear" onclick="spellingGame.clearInput()">🔄 清空</button>
                    <button class="btn-submit" onclick="spellingGame.submitAnswer()">✓ 提交</button>
                </div>

                <!-- 底部按钮 -->
                <div class="game-footer">
                    <button class="btn-secondary" onclick="spellingGame.quit()">退出游戏</button>
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
     * 添加字母到输入区
     * @param {number} index - 字母按钮索引
     */
    addLetter(index) {
        const letterItem = this.letterButtons[index];
        if (letterItem.used) return;

        // 标记为已使用
        letterItem.used = true;
        this.userInput.push(letterItem);

        // 更新显示
        this.updateDisplay();

        // 播放点击音效
        audioService.playEffect('click');
    }

    /**
     * 从输入区移除字母
     * @param {number} inputIndex - 输入区字母索引
     */
    removeLetter(inputIndex) {
        const removedLetter = this.userInput[inputIndex];

        // 从输入区移除
        this.userInput.splice(inputIndex, 1);

        // 在字母按钮区标记为可用
        removedLetter.used = false;

        // 更新显示
        this.updateDisplay();
    }

    /**
     * 清空输入
     */
    clearInput() {
        // 重置所有字母按钮状态
        this.letterButtons.forEach(item => item.used = false);
        this.userInput = [];

        // 更新显示
        this.updateDisplay();
    }

    /**
     * 更新显示
     */
    updateDisplay() {
        // 重新渲染输入区
        const inputArea = this.container.querySelector('.spelling-input-area');
        if (inputArea) {
            inputArea.innerHTML = this.userInput.length === 0 ?
                '<div class="input-placeholder">点击下方字母开始拼写</div>' :
                this.userInput.map((item, index) => `
                    <div class="spelling-letter" onclick="spellingGame.removeLetter(${index})">
                        ${item.letter}
                    </div>
                `).join('');
        }

        // 更新字母按钮状态
        this.letterButtons.forEach((item, index) => {
            const btn = this.container.querySelector(`.spelling-letter-btn[data-index="${index}"]`);
            if (btn) {
                btn.disabled = item.used;
            }
        });
    }

    /**
     * 使用提示
     */
    useHint() {
        if (this.userInput.length >= this.currentWord.word.length) {
            alert('已经拼完了，请提交答案！');
            return;
        }

        // 找到下一个应该添加的字母
        const nextPosition = this.userInput.length;
        const correctLetter = this.currentWord.word[nextPosition];

        // 在未使用的字母按钮中找到正确的字母
        const correctButtonIndex = this.letterButtons.findIndex(
            (item, index) => !item.used && item.originalIndex === nextPosition
        );

        if (correctButtonIndex !== -1) {
            this.addLetter(correctButtonIndex);
            this.hintsUsed++;

            // 使用提示会扣分
            this.score = Math.max(0, this.score - 2);
            this.updateScoreDisplay();
        }
    }

    /**
     * 更新得分显示
     */
    updateScoreDisplay() {
        const scoreValue = this.container.querySelector('.score-value');
        if (scoreValue) {
            scoreValue.textContent = this.score;
        }
    }

    /**
     * 提交答案
     */
    submitAnswer() {
        if (this.userInput.length === 0) {
            alert('请先拼写单词！');
            return;
        }

        const userWord = this.userInput.map(item => item.letter).join('');
        const correctWord = this.currentWord.word;
        const isCorrect = userWord.toLowerCase() === correctWord.toLowerCase();

        if (isCorrect) {
            // 答对
            this.correctCount++;
            this.score += 15;
            audioService.playEffect('correct');

            // 更新用户进度
            userProgress.updateWordProgress(this.currentWord.id, true);

            this.showFeedback(true, '太棒了！拼写正确！✓');
        } else {
            // 答错
            this.wrongCount++;
            audioService.playEffect('wrong');

            // 更新用户进度
            userProgress.updateWordProgress(this.currentWord.id, false);

            this.showFeedback(false, `不对哦！正确拼写是: ${correctWord}`);
        }

        // 延迟后进入下一题
        setTimeout(() => {
            this.nextQuestion();
        }, 2500);
    }

    /**
     * 显示答题反馈
     * @param {boolean} isCorrect - 是否正确
     * @param {string} message - 反馈消息
     */
    showFeedback(isCorrect, message) {
        const feedbackClass = isCorrect ? 'feedback-correct' : 'feedback-wrong';
        const feedbackHtml = `
            <div class="spelling-feedback ${feedbackClass}">
                ${message}
            </div>
        `;

        const questionArea = this.container.querySelector('.spelling-question');
        const existingFeedback = questionArea.querySelector('.spelling-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }

        questionArea.insertAdjacentHTML('beforeend', feedbackHtml);

        // 禁用所有按钮
        const allButtons = this.container.querySelectorAll('.spelling-letter-btn, .btn-hint, .btn-clear, .btn-submit');
        allButtons.forEach(btn => btn.disabled = true);
    }

    /**
     * 下一题
     */
    nextQuestion() {
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

        // 根据正确率评星
        if (accuracy >= 90 && this.hintsUsed <= 1) {
            starCount = 3;
            comment = '完美！你是拼写高手！🎉';
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
            <div class="spelling-result">
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
                        <div class="stat-item">
                            <div class="stat-value">${this.hintsUsed}</div>
                            <div class="stat-label">使用提示</div>
                        </div>
                    </div>

                    <div class="result-comment">${comment}</div>

                    <div class="result-actions">
                        <button class="btn-primary" onclick="spellingGame.restart()">再玩一次</button>
                        <button class="btn-secondary" onclick="spellingGame.quit()">返回</button>
                    </div>
                </div>
            </div>
        `;

        this.container.innerHTML = html;

        // 更新游戏记录
        userProgress.updateGameRecord('spelling', this.score);

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
const spellingGame = new SpellingGame();
