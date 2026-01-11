/**
 * 学习页面控制器
 * 实现单词卡片学习功能
 */

class LearnPage {
    constructor() {
        this.container = null;
        this.words = [];
        this.currentIndex = 0;
        this.isFlipped = false;
    }

    /**
     * 渲染学习页面
     * @param {HTMLElement} container - 容器元素
     * @param {object} params - 页面参数
     */
    render(container, params = {}) {
        this.container = container;

        // 获取要学习的单词（随机选择5个）
        this.words = getRandomWords(5);
        this.currentIndex = 0;
        this.isFlipped = false;

        if (this.words.length === 0) {
            container.innerHTML = `
                <div class="learn-page text-center">
                    <h2>暂无单词可学习</h2>
                    <button class="btn-primary mt-lg" onclick="app.goBack()">返回首页</button>
                </div>
            `;
            return;
        }

        this.renderLearningInterface();
    }

    /**
     * 渲染学习界面
     */
    renderLearningInterface() {
        const word = this.words[this.currentIndex];
        const progress = ((this.currentIndex + 1) / this.words.length) * 100;

        const html = `
            <div class="learn-page">
                <!-- 顶部导航 -->
                <div class="learn-header">
                    <button class="btn-icon learn-back-btn" onclick="app.goBack()">
                        ←
                    </button>
                    <span class="learn-progress-text">${this.currentIndex + 1} / ${this.words.length}</span>
                    <div style="width: 60px;"></div>
                </div>

                <!-- 进度条 -->
                <div class="learn-progress-bar">
                    <div class="learn-progress-fill" style="width: ${progress}%"></div>
                </div>

                <!-- 单词卡片 -->
                <div class="word-card-container">
                    <div class="word-card" id="wordCard" onclick="app.pages.learn.flipCard()">
                        <!-- 正面 -->
                        <div class="word-card-face word-card-front">
                            <img src="${word.imagePath}" alt="${word.word}" class="word-image"
                                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23FFE66D%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2248%22 text-anchor=%22middle%22 dy=%22.3em%22%3E${word.word.charAt(0).toUpperCase()}%3C/text%3E%3C/svg%3E'">
                            <h2 class="word-text">${word.word}</h2>
                            <p class="word-phonetic">${word.phonetic}</p>
                            <button class="btn-icon word-sound-btn" onclick="event.stopPropagation(); audioService.playWord('${word.word}', '${word.audioPath}')">
                                🔊
                            </button>
                        </div>

                        <!-- 反面 -->
                        <div class="word-card-face word-card-back">
                            <h2 class="word-translation">${word.translation}</h2>
                            <div class="word-sentence">
                                <p class="word-sentence-en">${word.sentence.english}</p>
                                <p class="word-sentence-cn">${word.sentence.chinese}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <p class="flip-hint">点击卡片翻转查看翻译</p>

                <!-- 操作按钮 -->
                <div class="learn-actions">
                    <button class="unknown-btn" onclick="app.pages.learn.markWord(false)">
                        😕 不认识
                    </button>
                    <button class="know-btn" onclick="app.pages.learn.markWord(true)">
                        ✅ 认识
                    </button>
                </div>

                <!-- 导航按钮 -->
                <div class="learn-nav">
                    <button class="nav-btn" onclick="app.pages.learn.prevWord()"
                            ${this.currentIndex === 0 ? 'disabled' : ''}>
                        ←
                    </button>
                    <button class="nav-btn" onclick="app.pages.learn.nextWord()"
                            ${this.currentIndex === this.words.length - 1 ? 'disabled' : ''}>
                        →
                    </button>
                </div>
            </div>
        `;

        this.container.innerHTML = html;

        // 自动播放单词发音
        setTimeout(() => {
            audioService.playWord(word.word, word.audioPath);
        }, 500);
    }

    /**
     * 翻转卡片
     */
    flipCard() {
        const card = document.getElementById('wordCard');
        if (card) {
            this.isFlipped = !this.isFlipped;
            if (this.isFlipped) {
                Helpers.addClass(card, 'flipped');
            } else {
                Helpers.removeClass(card, 'flipped');
            }
        }
    }

    /**
     * 标记单词认识/不认识
     * @param {boolean} isKnown - 是否认识
     */
    markWord(isKnown) {
        const word = this.words[this.currentIndex];

        // 更新用户进度
        userProgress.updateWordProgress(word.id, isKnown);

        // 播放音效
        audioService.playEffect(isKnown ? 'correct' : 'wrong');

        // 自动进入下一个单词
        setTimeout(() => {
            this.nextWord();
        }, 300);
    }

    /**
     * 下一个单词
     */
    nextWord() {
        if (this.currentIndex < this.words.length - 1) {
            this.currentIndex++;
            this.isFlipped = false;
            this.renderLearningInterface();
        } else {
            // 学习完成
            this.showComplete();
        }
    }

    /**
     * 上一个单词
     */
    prevWord() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.isFlipped = false;
            this.renderLearningInterface();
        }
    }

    /**
     * 显示完成页面
     */
    showComplete() {
        const html = `
            <div class="learn-complete">
                <div class="complete-icon">🎉</div>
                <h2 class="complete-title">太棒了！</h2>
                <p class="complete-message">你已经学完了${this.words.length}个单词！</p>
                <div class="complete-stats">
                    <p>继续努力，每天进步一点点！</p>
                </div>
                <div style="display: flex; gap: 16px; justify-content: center; margin-top: 32px;">
                    <button class="btn-primary" onclick="app.navigateTo('learn')">
                        继续学习
                    </button>
                    <button class="btn-secondary" onclick="app.navigateTo('home')">
                        返回首页
                    </button>
                </div>
            </div>
        `;

        this.container.innerHTML = html;
        audioService.playEffect('complete');
    }
}
