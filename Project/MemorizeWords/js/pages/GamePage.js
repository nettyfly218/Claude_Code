/**
 * 游戏页面控制器
 */

class GamePage {
    constructor() {
        this.container = null;
    }

    render(container) {
        this.container = container;
        const html = `
            <div class="game-page">
                <h2 class="text-center">🎮 趣味游戏</h2>
                <p class="text-center text-secondary">选择一个游戏开始练习</p>

                <div class="game-select">
                    <div class="game-card spelling" onclick="gamePage.startGame('spelling')">
                        <div class="game-icon">✏️</div>
                        <h3 class="game-title">拼写游戏</h3>
                        <p class="game-desc">拖动字母拼出单词</p>
                        <div class="game-stats">
                            <div class="game-stat-item">
                                <div class="game-stat-value">${userProgress.data.gameRecords.spelling.playCount}</div>
                                <div class="game-stat-label">已玩次数</div>
                            </div>
                            <div class="game-stat-item">
                                <div class="game-stat-value">${userProgress.data.gameRecords.spelling.bestScore}</div>
                                <div class="game-stat-label">最高分</div>
                            </div>
                        </div>
                    </div>

                    <div class="game-card matching" onclick="gamePage.startGame('matching')">
                        <div class="game-icon">🃏</div>
                        <h3 class="game-title">配对游戏</h3>
                        <p class="game-desc">翻牌配对单词和图片</p>
                        <div class="game-stats">
                            <div class="game-stat-item">
                                <div class="game-stat-value">${userProgress.data.gameRecords.matching.playCount}</div>
                                <div class="game-stat-label">已玩次数</div>
                            </div>
                            <div class="game-stat-item">
                                <div class="game-stat-value">${userProgress.data.gameRecords.matching.bestScore}</div>
                                <div class="game-stat-label">最高分</div>
                            </div>
                        </div>
                    </div>

                    <div class="game-card quiz" onclick="gamePage.startGame('quiz')">
                        <div class="game-icon">❓</div>
                        <h3 class="game-title">选择题</h3>
                        <p class="game-desc">看图选择正确的单词</p>
                        <div class="game-stats">
                            <div class="game-stat-item">
                                <div class="game-stat-value">${userProgress.data.gameRecords.quiz.playCount}</div>
                                <div class="game-stat-label">已玩次数</div>
                            </div>
                            <div class="game-stat-item">
                                <div class="game-stat-value">${userProgress.data.gameRecords.quiz.bestScore}</div>
                                <div class="game-stat-label">最高分</div>
                            </div>
                        </div>
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
     * 启动游戏
     * @param {string} gameType - 游戏类型 (quiz/matching/spelling)
     */
    startGame(gameType) {
        if (!this.container) return;

        switch (gameType) {
            case 'quiz':
                // 启动选择题游戏
                if (typeof quizGame !== 'undefined') {
                    quizGame.init(this.container, 10);
                } else {
                    alert('选择题游戏加载失败，请刷新页面重试');
                }
                break;
            case 'matching':
                // 启动配对游戏
                if (typeof matchingGame !== 'undefined') {
                    matchingGame.init(this.container, 6);
                } else {
                    alert('配对游戏加载失败，请刷新页面重试');
                }
                break;
            case 'spelling':
                // 启动拼写游戏
                if (typeof spellingGame !== 'undefined') {
                    spellingGame.init(this.container, 10);
                } else {
                    alert('拼写游戏加载失败，请刷新页面重试');
                }
                break;
            default:
                alert('未知的游戏类型');
        }
    }
}

// 创建全局实例
const gamePage = new GamePage();
