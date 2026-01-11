/**
 * 本地存储服务
 * 封装localStorage操作，提供数据持久化功能
 */

class StorageService {
    /**
     * 保存数据到localStorage
     * @param {string} key - 存储键名
     * @param {*} data - 要存储的数据
     * @returns {boolean} 是否保存成功
     */
    static save(key, data) {
        try {
            const jsonData = JSON.stringify(data);

            // 检查存储空间
            if (this.checkStorageQuota(jsonData)) {
                localStorage.setItem(key, jsonData);
                return true;
            } else {
                // 空间不足，清理旧数据
                console.warn('存储空间不足，清理旧数据...');
                this.cleanOldData();
                localStorage.setItem(key, jsonData);
                return true;
            }
        } catch (error) {
            console.error('保存数据失败:', error);

            // 存储失败降级处理
            if (key === CONSTANTS.STORAGE_KEYS.USER_PROGRESS) {
                this.saveEssentialProgress(data);
            }
            return false;
        }
    }

    /**
     * 从localStorage读取数据
     * @param {string} key - 存储键名
     * @returns {*} 读取的数据，失败返回null
     */
    static load(key) {
        try {
            const jsonData = localStorage.getItem(key);
            if (jsonData === null) {
                return null;
            }
            return JSON.parse(jsonData);
        } catch (error) {
            console.error('读取数据失败:', error);
            return null;
        }
    }

    /**
     * 删除指定的数据
     * @param {string} key - 存储键名
     */
    static remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('删除数据失败:', error);
            return false;
        }
    }

    /**
     * 清空所有应用数据
     */
    static clearAll() {
        try {
            Object.values(CONSTANTS.STORAGE_KEYS).forEach(key => {
                localStorage.removeItem(key);
            });
            return true;
        } catch (error) {
            console.error('清空数据失败:', error);
            return false;
        }
    }

    /**
     * 检查存储空间是否足够
     * @param {string} jsonData - JSON字符串
     * @returns {boolean} 是否有足够空间
     */
    static checkStorageQuota(jsonData) {
        try {
            // localStorage通常限制为5MB
            const MAX_SIZE = 5 * 1024 * 1024; // 5MB
            const currentSize = new Blob(Object.values(localStorage)).size;
            const newDataSize = new Blob([jsonData]).size;

            return (currentSize + newDataSize) < MAX_SIZE * 0.9; // 保留10%缓冲
        } catch (error) {
            // 如果无法检查，假设空间足够
            return true;
        }
    }

    /**
     * 清理旧数据 (保留最近30天)
     */
    static cleanOldData() {
        try {
            const history = this.load(CONSTANTS.STORAGE_KEYS.LEARNING_HISTORY) || [];
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const filtered = history.filter(record => {
                return new Date(record.date) >= thirtyDaysAgo;
            });

            this.save(CONSTANTS.STORAGE_KEYS.LEARNING_HISTORY, filtered);
            console.log('已清理旧数据，保留最近30天的记录');
        } catch (error) {
            console.error('清理旧数据失败:', error);
        }
    }

    /**
     * 保存核心进度数据 (降级方案)
     * @param {object} data - 用户进度数据
     */
    static saveEssentialProgress(data) {
        try {
            // 只保存最关键的数据
            const essential = {
                stats: data.stats,
                wordProgress: data.wordProgress,
                settings: data.settings
            };
            localStorage.setItem(
                CONSTANTS.STORAGE_KEYS.USER_PROGRESS + '_essential',
                JSON.stringify(essential)
            );
        } catch (error) {
            console.error('保存核心进度数据失败:', error);
        }
    }

    /**
     * 导出所有数据为JSON文件
     */
    static exportData() {
        try {
            const allData = {
                progress: this.load(CONSTANTS.STORAGE_KEYS.USER_PROGRESS),
                history: this.load(CONSTANTS.STORAGE_KEYS.LEARNING_HISTORY),
                settings: this.load(CONSTANTS.STORAGE_KEYS.SETTINGS),
                games: this.load(CONSTANTS.STORAGE_KEYS.GAME_RECORDS),
                exportDate: new Date().toISOString(),
                version: '1.0.0'
            };

            const jsonString = JSON.stringify(allData, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `learning-backup-${Date.now()}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            console.log('数据导出成功');
            return true;
        } catch (error) {
            console.error('导出数据失败:', error);
            return false;
        }
    }

    /**
     * 导入数据
     * @param {object} data - 导入的数据对象
     */
    static importData(data) {
        try {
            if (data.progress) {
                this.save(CONSTANTS.STORAGE_KEYS.USER_PROGRESS, data.progress);
            }
            if (data.history) {
                this.save(CONSTANTS.STORAGE_KEYS.LEARNING_HISTORY, data.history);
            }
            if (data.settings) {
                this.save(CONSTANTS.STORAGE_KEYS.SETTINGS, data.settings);
            }
            if (data.games) {
                this.save(CONSTANTS.STORAGE_KEYS.GAME_RECORDS, data.games);
            }

            console.log('数据导入成功');
            return true;
        } catch (error) {
            console.error('导入数据失败:', error);
            return false;
        }
    }

    /**
     * 获取存储空间使用情况
     * @returns {object} 包含使用量和总量的对象
     */
    static getStorageInfo() {
        try {
            let totalSize = 0;
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    totalSize += localStorage[key].length + key.length;
                }
            }

            const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
            const maxSizeMB = 5; // localStorage通常为5MB

            return {
                used: totalSizeMB,
                total: maxSizeMB,
                percentage: ((totalSizeMB / maxSizeMB) * 100).toFixed(1)
            };
        } catch (error) {
            console.error('获取存储信息失败:', error);
            return { used: 0, total: 5, percentage: 0 };
        }
    }
}
