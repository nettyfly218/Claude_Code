/**
 * 常量定义
 * 定义应用中使用的常量值
 */

const CONSTANTS = {
    // LocalStorage键名
    STORAGE_KEYS: {
        USER_PROGRESS: 'englishLearning_userProgress',
        LEARNING_HISTORY: 'englishLearning_learningHistory',
        SETTINGS: 'englishLearning_settings',
        GAME_RECORDS: 'englishLearning_gameRecords'
    },

    // 页面路由
    PAGES: {
        HOME: 'home',
        LEARN: 'learn',
        GAME: 'game',
        PROGRESS: 'progress'
    },

    // 游戏类型
    GAMES: {
        SPELLING: 'spelling',
        MATCHING: 'matching',
        QUIZ: 'quiz'
    },

    // 单词状态
    WORD_STATUS: {
        NEW: 'new',            // 新单词
        LEARNING: 'learning',  // 学习中
        MASTERED: 'mastered'   // 已掌握
    },

    // 单词分类
    CATEGORIES: {
        animals: { name: '动物', icon: '🐶', color: '#FFB6C1' },
        food: { name: '食物', icon: '🍎', color: '#FFE4B5' },
        colors: { name: '颜色', icon: '🌈', color: '#E0BBE4' },
        numbers: { name: '数字', icon: '🔢', color: '#B4E7CE' },
        family: { name: '家庭', icon: '👨‍👩‍👧', color: '#FFD1DC' },
        school: { name: '学校', icon: '🏫', color: '#B6E5FF' },
        daily: { name: '日常', icon: '🏠', color: '#FFE8B6' }
    },

    // 遗忘曲线复习间隔(天)
    REVIEW_INTERVALS: [1, 3, 7, 15, 30],

    // 掌握度阈值
    MASTERY_THRESHOLDS: {
        NEW: 0.3,       // 低于0.3为新单词
        LEARNING: 0.9,  // 0.3-0.9为学习中
        MASTERED: 0.95  // 高于0.95为已掌握
    },

    // 每日默认目标
    DEFAULT_DAILY_GOAL: 10,

    // 得分星级
    STAR_THRESHOLDS: {
        THREE_STARS: 90,
        TWO_STARS: 70,
        ONE_STAR: 50
    },

    // 成就定义
    ACHIEVEMENTS: {
        first_day: {
            id: 'first_day',
            name: '初次登录',
            icon: '🎉',
            desc: '开始学习之旅'
        },
        streak_3: {
            id: 'streak_3',
            name: '坚持3天',
            icon: '🔥',
            desc: '连续打卡3天'
        },
        streak_7: {
            id: 'streak_7',
            name: '坚持一周',
            icon: '⭐',
            desc: '连续打卡7天'
        },
        streak_30: {
            id: 'streak_30',
            name: '坚持一月',
            icon: '🏆',
            desc: '连续打卡30天'
        },
        words_10: {
            id: 'words_10',
            name: '初学者',
            icon: '🌱',
            desc: '学习10个单词'
        },
        words_50: {
            id: 'words_50',
            name: '勤奋学习',
            icon: '📚',
            desc: '学习50个单词'
        },
        words_100: {
            id: 'words_100',
            name: '单词达人',
            icon: '🎓',
            desc: '学习100个单词'
        },
        game_master: {
            id: 'game_master',
            name: '游戏高手',
            icon: '🎮',
            desc: '每个游戏都玩过'
        }
    }
};

// 防止修改常量
Object.freeze(CONSTANTS);
