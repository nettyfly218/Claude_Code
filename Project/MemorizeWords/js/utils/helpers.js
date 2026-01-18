/**
 * 工具函数
 * 提供通用的辅助方法
 */

const Helpers = {
    /**
     * 获取当前日期字符串 (YYYY-MM-DD)
     */
    getTodayDate() {
        const today = new Date();
        return today.toISOString().split('T')[0];
    },

    /**
     * 计算两个日期之间的天数差
     * @param {string} date1 - 日期字符串 (YYYY-MM-DD)
     * @param {string} date2 - 日期字符串 (YYYY-MM-DD)
     * @returns {number} 天数差
     */
    getDaysDiff(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffTime = Math.abs(d2 - d1);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },

    /**
     * 格式化日期显示
     * @param {string} dateStr - 日期字符串
     * @returns {string} 格式化后的日期
     */
    formatDate(dateStr) {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}年${month}月${day}日`;
    },

    /**
     * 获取月份字符串 (YYYY-MM)
     * @param {Date} date - 日期对象
     * @returns {string} 月份字符串
     */
    getMonthString(date = new Date()) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${year}-${month}`;
    },

    /**
     * 打乱数组顺序
     * @param {Array} array - 原数组
     * @returns {Array} 打乱后的新数组
     */
    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },

    /**
     * 从数组中随机选择n个元素
     * @param {Array} array - 原数组
     * @param {number} n - 选择数量
     * @returns {Array} 选中的元素数组
     */
    randomPick(array, n) {
        const shuffled = this.shuffleArray(array);
        return shuffled.slice(0, n);
    },

    /**
     * 防抖函数
     * @param {Function} func - 要防抖的函数
     * @param {number} wait - 等待时间(毫秒)
     * @returns {Function} 防抖后的函数
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * 节流函数
     * @param {Function} func - 要节流的函数
     * @param {number} limit - 时间限制(毫秒)
     * @returns {Function} 节流后的函数
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * 延迟执行
     * @param {number} ms - 延迟毫秒数
     * @returns {Promise}
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * 生成唯一ID
     * @returns {string} 唯一标识符
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    /**
     * 计算得分对应的星级
     * @param {number} score - 分数 (0-100)
     * @returns {number} 星级 (1-3)
     */
    getStarRating(score) {
        if (score >= CONSTANTS.STAR_THRESHOLDS.THREE_STARS) return 3;
        if (score >= CONSTANTS.STAR_THRESHOLDS.TWO_STARS) return 2;
        if (score >= CONSTANTS.STAR_THRESHOLDS.ONE_STAR) return 1;
        return 0;
    },

    /**
     * 生成星星显示
     * @param {number} stars - 星级数量
     * @returns {string} 星星字符串
     */
    generateStars(stars) {
        const fullStar = '⭐';
        const emptyStar = '☆';
        return fullStar.repeat(stars) + emptyStar.repeat(3 - stars);
    },

    /**
     * 格式化时间显示 (秒转分钟)
     * @param {number} seconds - 秒数
     * @returns {string} 格式化的时间
     */
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        if (mins > 0) {
            return `${mins}分${secs}秒`;
        }
        return `${secs}秒`;
    },

    /**
     * 获取随机鼓励语
     * @returns {string} 鼓励语
     */
    getEncouragement() {
        const messages = [
            '太棒了！',
            '你真聪明！',
            '继续加油！',
            '很好！',
            '做得好！',
            '真厉害！',
            '非常棒！',
            '你是最棒的！',
            '真不错！',
            '真棒！'
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    },

    /**
     * 检查是否为移动设备
     * @returns {boolean}
     */
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    /**
     * 检查localStorage可用性
     * @returns {boolean}
     */
    isLocalStorageAvailable() {
        try {
            const testKey = '__test__';
            localStorage.setItem(testKey, 'test');
            localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
     * 添加CSS类名
     * @param {HTMLElement} element - DOM元素
     * @param {string} className - 类名
     */
    addClass(element, className) {
        if (element && !element.classList.contains(className)) {
            element.classList.add(className);
        }
    },

    /**
     * 移除CSS类名
     * @param {HTMLElement} element - DOM元素
     * @param {string} className - 类名
     */
    removeClass(element, className) {
        if (element && element.classList.contains(className)) {
            element.classList.remove(className);
        }
    },

    /**
     * 切换CSS类名
     * @param {HTMLElement} element - DOM元素
     * @param {string} className - 类名
     */
    toggleClass(element, className) {
        if (element) {
            element.classList.toggle(className);
        }
    }
};
