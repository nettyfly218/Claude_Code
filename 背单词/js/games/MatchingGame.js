/**
 * 配对游戏
 * 翻牌配对单词和翻译
 */

class MatchingGame {
    constructor() {
        this.container = null;
        this.cards = [];           // 卡片数组
        this.flippedCards = [];    // 已翻开的卡片
        this.matchedPairs = 0;     // 已配对数量
        this.totalPairs = 6;       // 总配对数
        this.score = 0;            // 得分
        this.moves = 0;            // 移动次数
        this.isProcessing = false; // 是否正在处理（防止快速点击）
        this.startTime = null;     // 游戏开始时间
    }

    /**
     * 初始化游戏
     * @param {HTMLElement} container - 容器元素
     * @param {number} pairCount - 配对数量
     */
    init(container, pairCount = 6) {
        this.container = container;
        this.totalPairs = pairCount;
        this.reset();
        this.generateCards();
        this.render();
        this.startTime = Date.now();
    }

    /**
     * 重置游戏状态
     */
    reset() {
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.score = 0;
        this.moves = 0;
        this.isProcessing = false;
        this.startTime = null;
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
     * 生成配对卡片
     */
    generateCards() {
        // 随机选择指定数量的单词
        const allWords = this.getAllWords();
        const selectedWords = Helpers.randomPick(allWords, this.totalPairs);

        // 为每个单词创建两张卡片：一张显示单词，一张显示翻译
        const cardPairs = [];
        selectedWords.forEach((word, index) => {
            // 单词卡片
            cardPairs.push({
                id: `word-${index}`,
                pairId: index,
                type: 'word',
                content: word.word,
                phonetic: word.phonetic || '',
                wordData: word
            });

            // 翻译卡片
            cardPairs.push({
                id: `translation-${index}`,
                pairId: index,
                type: 'translation',
                content: word.translation,
                wordData: word
            });
        });

        // 打乱卡片顺序
        this.cards = Helpers.shuffleArray(cardPairs);
    }

    /**
     * 渲染游戏界面
     */
    render() {
        const html = `
            <div class="matching-game">
                <!-- 顶部信息栏 -->
                <div class="game-header">
                    <div class="game-info">
                        <div class="game-score">
                            <span class="score-label">得分:</span>
                            <span class="score-value">${this.score}</span>
                        </div>
                        <div class="game-moves">
                            <span class="moves-label">步数:</span>
                            <span class="moves-value">${this.moves}</span>
                        </div>
                        <div class="game-pairs">
                            <span class="pairs-label">配对:</span>
                            <span class="pairs-value">${this.matchedPairs}/${this.totalPairs}</span>
                        </div>
                    </div>
                </div>

                <!-- 卡片网格 -->
                <div class="matching-grid">
                    ${this.cards.map((card, index) => this.renderCard(card, index)).join('')}
                </div>

                <!-- 底部按钮 -->
                <div class="game-footer">
                    <button class="btn-secondary" onclick="matchingGame.quit()">退出游戏</button>
                </div>
            </div>
        `;

        this.container.innerHTML = html;
    }

    /**
     * 渲染单张卡片
     * @param {Object} card - 卡片数据
     * @param {number} index - 卡片索引
     * @returns {string} HTML字符串
     */
    renderCard(card, index) {
        const isFlipped = card.flipped || card.matched;
        const isMatched = card.matched;
        const cardClass = `matching-card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`;

        return `
            <div class="${cardClass}" data-index="${index}" onclick="matchingGame.flipCard(${index})">
                <div class="card-back">
                    <div class="card-back-icon">?</div>
                </div>
                <div class="card-front">
                    ${card.type === 'word' ? `
                        <div class="card-word">
                            <div class="card-word-main">${card.content}</div>
                            ${card.phonetic ? `<div class="card-word-phonetic">${card.phonetic}</div>` : ''}
                        </div>
                    ` : `
                        <div class="card-translation">${card.content}</div>
                    `}
                </div>
            </div>
        `;
    }

    /**
     * 翻转卡片
     * @param {number} index - 卡片索引
     */
    flipCard(index) {
        // 防止处理中点击
        if (this.isProcessing) return;

        const card = this.cards[index];

        // 已翻开或已配对的卡片不能再翻
        if (card.flipped || card.matched) return;

        // 翻开卡片
        card.flipped = true;
        this.flippedCards.push(index);

        // 更新显示
        this.updateCardDisplay(index);

        // 播放翻牌音效
        audioService.playEffect('click');

        // 如果翻开了两张卡片，检查是否匹配
        if (this.flippedCards.length === 2) {
            this.moves++;
            this.isProcessing = true;
            setTimeout(() => this.checkMatch(), 800);
        }
    }

    /**
     * 更新卡片显示
     * @param {number} index - 卡片索引
     */
    updateCardDisplay(index) {
        const cardElement = this.container.querySelector(`[data-index="${index}"]`);
        if (cardElement) {
            const card = this.cards[index];
            if (card.flipped) {
                cardElement.classList.add('flipped');
            }
            if (card.matched) {
                cardElement.classList.add('matched');
            }
        }

        // 更新顶部信息
        this.updateHeader();
    }

    /**
     * 更新头部信息
     */
    updateHeader() {
        const scoreValue = this.container.querySelector('.score-value');
        const movesValue = this.container.querySelector('.moves-value');
        const pairsValue = this.container.querySelector('.pairs-value');

        if (scoreValue) scoreValue.textContent = this.score;
        if (movesValue) movesValue.textContent = this.moves;
        if (pairsValue) pairsValue.textContent = `${this.matchedPairs}/${this.totalPairs}`;
    }

    /**
     * 检查两张卡片是否匹配
     */
    checkMatch() {
        const [index1, index2] = this.flippedCards;
        const card1 = this.cards[index1];
        const card2 = this.cards[index2];

        // 检查pairId是否相同
        if (card1.pairId === card2.pairId) {
            // 匹配成功
            card1.matched = true;
            card2.matched = true;
            this.matchedPairs++;

            // 计算得分：基础分10分，步数越少奖励越高
            const bonusScore = Math.max(0, 20 - this.moves * 2);
            this.score += 10 + bonusScore;

            // 更新卡片显示
            this.updateCardDisplay(index1);
            this.updateCardDisplay(index2);

            // 播放成功音效
            audioService.playEffect('correct');

            // 更新用户进度
            userProgress.updateWordProgress(card1.wordData.id, true);

            // 清空已翻开数组
            this.flippedCards = [];
            this.isProcessing = false;

            // 检查是否全部配对完成
            if (this.matchedPairs === this.totalPairs) {
                setTimeout(() => this.showResult(), 800);
            }
        } else {
            // 不匹配，翻回去
            setTimeout(() => {
                card1.flipped = false;
                card2.flipped = false;

                // 更新显示
                const cardElement1 = this.container.querySelector(`[data-index="${index1}"]`);
                const cardElement2 = this.container.querySelector(`[data-index="${index2}"]`);

                if (cardElement1) cardElement1.classList.remove('flipped');
                if (cardElement2) cardElement2.classList.remove('flipped');

                // 播放错误音效
                audioService.playEffect('wrong');

                // 清空已翻开数组
                this.flippedCards = [];
                this.isProcessing = false;
            }, 500);
        }
    }

    /**
     * 显示游戏结果
     */
    showResult() {
        const endTime = Date.now();
        const totalSeconds = Math.round((endTime - this.startTime) / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const timeStr = minutes > 0 ? `${minutes}分${seconds}秒` : `${seconds}秒`;

        // 根据步数和时间评星
        let starCount = 0;
        let comment = '';

        const idealMoves = this.totalPairs; // 理想步数等于配对数
        if (this.moves <= idealMoves + 2) {
            starCount = 3;
            comment = '完美！记忆力超强！🎉';
        } else if (this.moves <= idealMoves + 5) {
            starCount = 2;
            comment = '很棒！继续加油！👍';
        } else if (this.moves <= idealMoves + 10) {
            starCount = 1;
            comment = '不错！再接再厉！💪';
        } else {
            starCount = 0;
            comment = '加油！多练习会更好！📚';
        }

        const stars = '⭐'.repeat(starCount);

        const html = `
            <div class="matching-result">
                <div class="result-card">
                    <h2 class="result-title">游戏结束！</h2>

                    <div class="result-stars">${stars}</div>

                    <div class="result-score">
                        <div class="score-main">${this.score}</div>
                        <div class="score-label">总分</div>
                    </div>

                    <div class="result-stats">
                        <div class="stat-item">
                            <div class="stat-value">${this.moves}</div>
                            <div class="stat-label">总步数</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${this.matchedPairs}</div>
                            <div class="stat-label">配对数</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${timeStr}</div>
                            <div class="stat-label">用时</div>
                        </div>
                    </div>

                    <div class="result-comment">${comment}</div>

                    <div class="result-actions">
                        <button class="btn-primary" onclick="matchingGame.restart()">再玩一次</button>
                        <button class="btn-secondary" onclick="matchingGame.quit()">返回</button>
                    </div>
                </div>
            </div>
        `;

        this.container.innerHTML = html;

        // 更新游戏记录
        userProgress.updateGameRecord('matching', this.score);

        // 播放完成音效
        audioService.playEffect('complete');
    }

    /**
     * 重新开始游戏
     */
    restart() {
        this.init(this.container, this.totalPairs);
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
const matchingGame = new MatchingGame();
