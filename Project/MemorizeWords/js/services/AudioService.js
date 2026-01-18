/**
 * 音频服务
 * 提供单词发音和音效播放功能
 */

class AudioService {
    constructor() {
        // 检测浏览器支持情况
        this.ttsSupported = 'speechSynthesis' in window;
        this.audioCache = {}; // 音频缓存
        this.enabled = true;  // 音频开关
    }

    /**
     * 播放单词发音
     * @param {string} word - 要朗读的单词
     * @param {string} audioPath - 音频文件路径（可选）
     * @returns {Promise<boolean>} 是否播放成功
     */
    async playWord(word, audioPath = null) {
        if (!this.enabled) {
            return false;
        }

        try {
            // 方案1: 使用预录音频文件 (优先)
            if (audioPath) {
                const success = await this.playAudioFile(audioPath);
                if (success) return true;
            }

            // 方案2: Web Speech API (备用)
            if (this.ttsSupported) {
                return this.playTTS(word);
            }

            console.warn('音频播放不可用');
            return false;
        } catch (error) {
            console.error('播放单词发音失败:', error);
            return false;
        }
    }

    /**
     * 使用Web Speech API朗读
     * @param {string} text - 要朗读的文本
     * @param {string} lang - 语言代码，默认'en-US'
     * @returns {boolean}
     */
    playTTS(text, lang = 'en-US') {
        try {
            // 停止当前朗读
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            utterance.rate = 0.8;  // 适合儿童的语速
            utterance.pitch = 1.0;
            utterance.volume = 1.0;

            window.speechSynthesis.speak(utterance);
            return true;
        } catch (error) {
            console.error('TTS播放失败:', error);
            return false;
        }
    }

    /**
     * 播放音频文件
     * @param {string} audioPath - 音频文件路径
     * @returns {Promise<boolean>}
     */
    async playAudioFile(audioPath) {
        try {
            // 从缓存中获取或创建新的Audio对象
            let audio = this.audioCache[audioPath];

            if (!audio) {
                audio = new Audio(audioPath);
                this.audioCache[audioPath] = audio;
            }

            // 重置音频播放位置
            audio.currentTime = 0;

            // 播放音频
            await audio.play();
            return true;
        } catch (error) {
            // 音频文件可能不存在或加载失败
            console.warn(`音频文件播放失败: ${audioPath}`, error);
            return false;
        }
    }

    /**
     * 播放音效
     * @param {string} effectType - 音效类型 (correct/wrong/complete/star)
     */
    playEffect(effectType) {
        if (!this.enabled) {
            return;
        }

        const effectPaths = {
            correct: 'assets/audio/effects/correct.mp3',
            wrong: 'assets/audio/effects/wrong.mp3',
            complete: 'assets/audio/effects/complete.mp3',
            star: 'assets/audio/effects/star.mp3',
            click: 'assets/audio/effects/click.mp3'
        };

        const path = effectPaths[effectType];
        if (path) {
            this.playAudioFile(path).catch(() => {
                // 如果音效文件不存在，静默失败
            });
        }
    }

    /**
     * 预加载音频文件
     * @param {Array<string>} audioPaths - 音频路径数组
     */
    async preloadAudio(audioPaths) {
        const promises = audioPaths.map(path => {
            return new Promise((resolve) => {
                const audio = new Audio(path);
                audio.addEventListener('canplaythrough', () => {
                    this.audioCache[path] = audio;
                    resolve();
                });
                audio.addEventListener('error', () => {
                    // 加载失败也继续
                    resolve();
                });
                audio.load();
            });
        });

        await Promise.all(promises);
        console.log(`预加载了 ${audioPaths.length} 个音频文件`);
    }

    /**
     * 设置音频开关
     * @param {boolean} enabled - 是否启用音频
     */
    setEnabled(enabled) {
        this.enabled = enabled;

        // 如果禁用，停止当前所有播放
        if (!enabled) {
            this.stopAll();
        }
    }

    /**
     * 停止所有音频播放
     */
    stopAll() {
        // 停止TTS
        if (this.ttsSupported) {
            window.speechSynthesis.cancel();
        }

        // 停止所有缓存的音频
        Object.values(this.audioCache).forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
    }

    /**
     * 清空音频缓存
     */
    clearCache() {
        this.audioCache = {};
    }
}

// 创建全局单例
const audioService = new AudioService();
