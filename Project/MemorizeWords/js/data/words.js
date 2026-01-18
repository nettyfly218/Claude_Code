/**
 * 单词数据库
 * 包含小学1-2年级常用英语单词
 */

const wordDatabase = [
    // 动物类
    {
        id: 1,
        word: 'cat',
        translation: '猫',
        category: 'animals',
        difficulty: 1,
        imagePath: 'assets/images/words/cat.png',
        audioPath: 'assets/audio/words/cat.mp3',
        phonetic: '/kæt/',
        sentence: {
            english: 'I have a cat.',
            chinese: '我有一只猫。'
        },
        tags: ['pet', 'animal'],
        grade: 1
    },
    {
        id: 2,
        word: 'dog',
        translation: '狗',
        category: 'animals',
        difficulty: 1,
        imagePath: 'assets/images/words/dog.png',
        audioPath: 'assets/audio/words/dog.mp3',
        phonetic: '/dɒɡ/',
        sentence: {
            english: 'The dog is big.',
            chinese: '这只狗很大。'
        },
        tags: ['pet', 'animal'],
        grade: 1
    },
    {
        id: 3,
        word: 'bird',
        translation: '鸟',
        category: 'animals',
        difficulty: 1,
        imagePath: 'assets/images/words/bird.png',
        audioPath: 'assets/audio/words/bird.mp3',
        phonetic: '/bɜːd/',
        sentence: {
            english: 'A bird can fly.',
            chinese: '鸟会飞。'
        },
        tags: ['animal'],
        grade: 1
    },

    // 食物类
    {
        id: 4,
        word: 'apple',
        translation: '苹果',
        category: 'food',
        difficulty: 1,
        imagePath: 'assets/images/words/apple.png',
        audioPath: 'assets/audio/words/apple.mp3',
        phonetic: '/ˈæpl/',
        sentence: {
            english: 'I like apples.',
            chinese: '我喜欢苹果。'
        },
        tags: ['fruit', 'food'],
        grade: 1
    },
    {
        id: 5,
        word: 'banana',
        translation: '香蕉',
        category: 'food',
        difficulty: 1,
        imagePath: 'assets/images/words/banana.png',
        audioPath: 'assets/audio/words/banana.mp3',
        phonetic: '/bəˈnɑːnə/',
        sentence: {
            english: 'The banana is yellow.',
            chinese: '香蕉是黄色的。'
        },
        tags: ['fruit', 'food'],
        grade: 1
    },
    {
        id: 6,
        word: 'cake',
        translation: '蛋糕',
        category: 'food',
        difficulty: 1,
        imagePath: 'assets/images/words/cake.png',
        audioPath: 'assets/audio/words/cake.mp3',
        phonetic: '/keɪk/',
        sentence: {
            english: 'I love cake.',
            chinese: '我喜欢蛋糕。'
        },
        tags: ['food', 'dessert'],
        grade: 1
    },

    // 颜色类
    {
        id: 7,
        word: 'red',
        translation: '红色',
        category: 'colors',
        difficulty: 1,
        imagePath: 'assets/images/words/red.png',
        audioPath: 'assets/audio/words/red.mp3',
        phonetic: '/red/',
        sentence: {
            english: 'The apple is red.',
            chinese: '苹果是红色的。'
        },
        tags: ['color'],
        grade: 1
    },
    {
        id: 8,
        word: 'blue',
        translation: '蓝色',
        category: 'colors',
        difficulty: 1,
        imagePath: 'assets/images/words/blue.png',
        audioPath: 'assets/audio/words/blue.mp3',
        phonetic: '/bluː/',
        sentence: {
            english: 'The sky is blue.',
            chinese: '天空是蓝色的。'
        },
        tags: ['color'],
        grade: 1
    },

    // 数字类
    {
        id: 9,
        word: 'one',
        translation: '一',
        category: 'numbers',
        difficulty: 1,
        imagePath: 'assets/images/words/one.png',
        audioPath: 'assets/audio/words/one.mp3',
        phonetic: '/wʌn/',
        sentence: {
            english: 'I have one ball.',
            chinese: '我有一个球。'
        },
        tags: ['number'],
        grade: 1
    },
    {
        id: 10,
        word: 'two',
        translation: '二',
        category: 'numbers',
        difficulty: 1,
        imagePath: 'assets/images/words/two.png',
        audioPath: 'assets/audio/words/two.mp3',
        phonetic: '/tuː/',
        sentence: {
            english: 'I have two hands.',
            chinese: '我有两只手。'
        },
        tags: ['number'],
        grade: 1
    },

    // === 更多动物 ===
    {
        id: 11,
        word: 'fish',
        translation: '鱼',
        category: 'animals',
        difficulty: 1,
        imagePath: 'assets/images/words/fish.png',
        audioPath: 'assets/audio/words/fish.mp3',
        phonetic: '/fɪʃ/',
        sentence: {
            english: 'I see a fish.',
            chinese: '我看见一条鱼。'
        },
        tags: ['animal'],
        grade: 1
    },
    {
        id: 12,
        word: 'pig',
        translation: '猪',
        category: 'animals',
        difficulty: 1,
        imagePath: 'assets/images/words/pig.png',
        audioPath: 'assets/audio/words/pig.mp3',
        phonetic: '/pɪɡ/',
        sentence: {
            english: 'The pig is pink.',
            chinese: '猪是粉色的。'
        },
        tags: ['animal', 'farm'],
        grade: 1
    },
    {
        id: 13,
        word: 'duck',
        translation: '鸭子',
        category: 'animals',
        difficulty: 1,
        imagePath: 'assets/images/words/duck.png',
        audioPath: 'assets/audio/words/duck.mp3',
        phonetic: '/dʌk/',
        sentence: {
            english: 'The duck can swim.',
            chinese: '鸭子会游泳。'
        },
        tags: ['animal', 'bird'],
        grade: 1
    },

    // === 更多食物 ===
    {
        id: 14,
        word: 'milk',
        translation: '牛奶',
        category: 'food',
        difficulty: 1,
        imagePath: 'assets/images/words/milk.png',
        audioPath: 'assets/audio/words/milk.mp3',
        phonetic: '/mɪlk/',
        sentence: {
            english: 'I drink milk.',
            chinese: '我喝牛奶。'
        },
        tags: ['food', 'drink'],
        grade: 1
    },
    {
        id: 15,
        word: 'bread',
        translation: '面包',
        category: 'food',
        difficulty: 1,
        imagePath: 'assets/images/words/bread.png',
        audioPath: 'assets/audio/words/bread.mp3',
        phonetic: '/bred/',
        sentence: {
            english: 'I eat bread.',
            chinese: '我吃面包。'
        },
        tags: ['food'],
        grade: 1
    },
    {
        id: 16,
        word: 'egg',
        translation: '鸡蛋',
        category: 'food',
        difficulty: 1,
        imagePath: 'assets/images/words/egg.png',
        audioPath: 'assets/audio/words/egg.mp3',
        phonetic: '/eɡ/',
        sentence: {
            english: 'I like eggs.',
            chinese: '我喜欢鸡蛋。'
        },
        tags: ['food'],
        grade: 1
    },

    // === 更多颜色 ===
    {
        id: 17,
        word: 'green',
        translation: '绿色',
        category: 'colors',
        difficulty: 1,
        imagePath: 'assets/images/words/green.png',
        audioPath: 'assets/audio/words/green.mp3',
        phonetic: '/ɡriːn/',
        sentence: {
            english: 'The grass is green.',
            chinese: '草是绿色的。'
        },
        tags: ['color'],
        grade: 1
    },
    {
        id: 18,
        word: 'yellow',
        translation: '黄色',
        category: 'colors',
        difficulty: 1,
        imagePath: 'assets/images/words/yellow.png',
        audioPath: 'assets/audio/words/yellow.mp3',
        phonetic: '/ˈjeləʊ/',
        sentence: {
            english: 'The sun is yellow.',
            chinese: '太阳是黄色的。'
        },
        tags: ['color'],
        grade: 1
    },

    // === 更多数字 ===
    {
        id: 19,
        word: 'three',
        translation: '三',
        category: 'numbers',
        difficulty: 1,
        imagePath: 'assets/images/words/three.png',
        audioPath: 'assets/audio/words/three.mp3',
        phonetic: '/θriː/',
        sentence: {
            english: 'I have three books.',
            chinese: '我有三本书。'
        },
        tags: ['number'],
        grade: 1
    },
    {
        id: 20,
        word: 'four',
        translation: '四',
        category: 'numbers',
        difficulty: 1,
        imagePath: 'assets/images/words/four.png',
        audioPath: 'assets/audio/words/four.mp3',
        phonetic: '/fɔː/',
        sentence: {
            english: 'I see four dogs.',
            chinese: '我看见四只狗。'
        },
        tags: ['number'],
        grade: 1
    },
    {
        id: 21,
        word: 'five',
        translation: '五',
        category: 'numbers',
        difficulty: 1,
        imagePath: 'assets/images/words/five.png',
        audioPath: 'assets/audio/words/five.mp3',
        phonetic: '/faɪv/',
        sentence: {
            english: 'I have five fingers.',
            chinese: '我有五根手指。'
        },
        tags: ['number'],
        grade: 1
    },

    // === 家庭类 ===
    {
        id: 22,
        word: 'mom',
        translation: '妈妈',
        category: 'family',
        difficulty: 1,
        imagePath: 'assets/images/words/mom.png',
        audioPath: 'assets/audio/words/mom.mp3',
        phonetic: '/mɒm/',
        sentence: {
            english: 'I love my mom.',
            chinese: '我爱我的妈妈。'
        },
        tags: ['family'],
        grade: 1
    },
    {
        id: 23,
        word: 'dad',
        translation: '爸爸',
        category: 'family',
        difficulty: 1,
        imagePath: 'assets/images/words/dad.png',
        audioPath: 'assets/audio/words/dad.mp3',
        phonetic: '/dæd/',
        sentence: {
            english: 'My dad is tall.',
            chinese: '我爸爸很高。'
        },
        tags: ['family'],
        grade: 1
    },

    // === 学校类 ===
    {
        id: 24,
        word: 'book',
        translation: '书',
        category: 'school',
        difficulty: 1,
        imagePath: 'assets/images/words/book.png',
        audioPath: 'assets/audio/words/book.mp3',
        phonetic: '/bʊk/',
        sentence: {
            english: 'I read a book.',
            chinese: '我读一本书。'
        },
        tags: ['school', 'study'],
        grade: 1
    },
    {
        id: 25,
        word: 'pen',
        translation: '钢笔',
        category: 'school',
        difficulty: 1,
        imagePath: 'assets/images/words/pen.png',
        audioPath: 'assets/audio/words/pen.mp3',
        phonetic: '/pen/',
        sentence: {
            english: 'I write with a pen.',
            chinese: '我用钢笔写字。'
        },
        tags: ['school', 'tool'],
        grade: 1
    },

    // === 日常类 ===
    {
        id: 26,
        word: 'sun',
        translation: '太阳',
        category: 'daily',
        difficulty: 1,
        imagePath: 'assets/images/words/sun.png',
        audioPath: 'assets/audio/words/sun.mp3',
        phonetic: '/sʌn/',
        sentence: {
            english: 'The sun is bright.',
            chinese: '太阳很明亮。'
        },
        tags: ['nature'],
        grade: 1
    },
    {
        id: 27,
        word: 'moon',
        translation: '月亮',
        category: 'daily',
        difficulty: 1,
        imagePath: 'assets/images/words/moon.png',
        audioPath: 'assets/audio/words/moon.mp3',
        phonetic: '/muːn/',
        sentence: {
            english: 'I see the moon.',
            chinese: '我看见月亮。'
        },
        tags: ['nature'],
        grade: 1
    },
    {
        id: 28,
        word: 'star',
        translation: '星星',
        category: 'daily',
        difficulty: 1,
        imagePath: 'assets/images/words/star.png',
        audioPath: 'assets/audio/words/star.mp3',
        phonetic: '/stɑː/',
        sentence: {
            english: 'I count the stars.',
            chinese: '我数星星。'
        },
        tags: ['nature'],
        grade: 1
    },
    {
        id: 29,
        word: 'hand',
        translation: '手',
        category: 'daily',
        difficulty: 1,
        imagePath: 'assets/images/words/hand.png',
        audioPath: 'assets/audio/words/hand.mp3',
        phonetic: '/hænd/',
        sentence: {
            english: 'I wash my hands.',
            chinese: '我洗手。'
        },
        tags: ['body'],
        grade: 1
    },
    {
        id: 30,
        word: 'eye',
        translation: '眼睛',
        category: 'daily',
        difficulty: 1,
        imagePath: 'assets/images/words/eye.png',
        audioPath: 'assets/audio/words/eye.mp3',
        phonetic: '/aɪ/',
        sentence: {
            english: 'I have two eyes.',
            chinese: '我有两只眼睛。'
        },
        tags: ['body'],
        grade: 1
    }
];

/**
 * 根据分类获取单词
 * @param {string} category - 分类名称
 * @returns {Array} 单词数组
 */
function getWordsByCategory(category) {
    // 检查是否已加载扩展单词库
    const allWords = typeof fullWordDatabase !== 'undefined' ? fullWordDatabase : wordDatabase;
    return allWords.filter(word => word.category === category);
}

/**
 * 根据ID获取单词
 * @param {number} id - 单词ID
 * @returns {object|null} 单词对象
 */
function getWordById(id) {
    // 检查是否已加载扩展单词库
    const allWords = typeof fullWordDatabase !== 'undefined' ? fullWordDatabase : wordDatabase;
    return allWords.find(word => word.id === id) || null;
}

/**
 * 获取随机单词
 * @param {number} count - 数量
 * @param {string} category - 分类(可选)
 * @returns {Array} 随机单词数组
 */
function getRandomWords(count, category = null) {
    // 检查是否已加载扩展单词库
    const allWords = typeof fullWordDatabase !== 'undefined' ? fullWordDatabase : wordDatabase;
    let words = category ? getWordsByCategory(category) : allWords;
    return Helpers.randomPick(words, count);
}

/**
 * 获取所有单词
 * @returns {Array} 所有单词
 */
function getAllWords() {
    // 检查是否已加载扩展单词库
    const allWords = typeof fullWordDatabase !== 'undefined' ? fullWordDatabase : wordDatabase;
    return [...allWords];
}
