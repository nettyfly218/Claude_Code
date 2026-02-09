# 🏭 FUXA HMI 项目示例 - 智能工厂生产线监控

[![FUXA](https://img.shields.io/badge/FUXA-v1.2.0-blue)](https://github.com/frangoteam/FUXA)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

一个完整的 FUXA HMI/SCADA 项目示例，展示如何使用 Claude Code / OpenCode 快速开发生产线监控系统。

![Project Preview](assets/preview.png)

---

## ✨ 项目特性

### 🌡️ 温度监控
- 3个温度传感器实时监控
- 彩色仪表盘显示（绿/黄/红区间）
- 实时趋势图（1小时历史数据）
- 自动计算平均温度和最高温度

### ⚙️ 电机控制
- 2个电机状态监控（运行/停止）
- 转速实时显示
- 启动/停止按钮控制
- 运行数量统计

### 🚨 安全系统
- 紧急停止按钮
- 安全门状态监控
- 系统就绪状态
- 完整的安全互锁逻辑

### 📊 数据可视化
- 现代化深色主题界面
- 1920×1080 全高清布局
- 响应式控件布局
- 实时数据更新

### 🔔 报警系统
- 温度超限报警
- 电机故障报警
- 安全事件报警
- 报警历史记录

### ⚡ 自动化脚本
- 温度报警自动处理
- 生产数量自动计数
- 定期数据记录
- 启动前安全检查

---

## 🚀 快速开始

### 方式 1: Docker 一键启动（推荐）

```bash
# 1. 启动 FUXA
docker run -d --name fuxa -p 1881:1881 frangoteam/fuxa:latest

# 2. 启动 MQTT Broker（用于测试）
docker run -d --name mosquitto -p 1883:1883 eclipse-mosquitto

# 3. 访问编辑器
open http://localhost:1881/editor
```

### 方式 2: 本地安装

```bash
# 安装 FUXA
npm install -g @frangoteam/fuxa

# 启动
fuxa

# 访问
http://localhost:1881/editor
```

详细步骤请参考 [📖 快速启动指南](docs/quick_start.md)

---

## 📁 项目结构

```
fuxa-hmi-demo/
├── 📁 devices/                          # 设备连接配置
│   └── mqtt_devices.json               # MQTT设备配置模板
│
├── 📁 tags/                             # 标签/变量定义
│   └── tag_definitions.json            # 完整的标签定义
│
├── 📁 views/                            # HMI 视图设计
│   └── main_dashboard.json             # 主监控画面（1920×1080）
│
├── 📁 alarms/                           # 报警配置
│   └── alarm_config.json               # 报警规则和动作
│
├── 📁 scripts/                          # 自定义脚本
│   └── scripts.json                    # JavaScript 自动化脚本
│
├── 📁 assets/                           # 静态资源
│   └── preview.png                     # 项目预览图
│
├── 📁 docs/                             # 文档
│   ├── quick_start.md                  # ⚡ 5分钟快速启动
│   └── import_export_guide.md          # 📥 详细导入导出指南
│
└── 📄 README.md                         # 本文件
```

---

## 🎨 界面设计

### 主监控画面布局

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🏭 智能生产线监控系统                              2026-02-08 14:30:25   │
├─────────────────────────────────────────────────────────────────────────┤
│ 🌡️ 温度监控                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────────────┐ │
│  │    🔴     │  │    🟡     │  │    🟢     │  │      📈 温度趋势图       │ │
│  │   65.5°C  │  │   72.3°C  │  │   58.7°C  │  │    ╱╲                    │ │
│  │  入口温度  │  │  中段温度  │  │  出口温度  │  │  ╱    ╲___              │ │
│  └──────────┘  └──────────┘  └──────────┘  │ ╱          ╲____          │ │
│                                             └──────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────┤
│ ⚙️ 电机状态                                  🛑        ┌─────────────┐  │
│  ┌──────────────────┐  ┌──────────────────┐   紧急停止   │  系统状态    │  │
│  │ 电机 1#       🟢  │  │ 电机 2#       🔴  │             │  ✓ 安全门   │  │
│  │ 转速: 1200 RPM   │  │ 转速: 0 RPM      │             │  ✓ 系统就绪  │  │
│  │ [ 启动 ] [停止]  │  │ [ 启动 ] [停止]  │             │ 产量: 152   │  │
│  └──────────────────┘  └──────────────────┘             │ 效率: 85%   │  │
│                                                         └─────────────┘  │
├─────────────────────────────────────────────────────────────────────────┤
│ © 2026 智能工厂监控系统 | Powered by FUXA                              │
└─────────────────────────────────────────────────────────────────────────┘
```

### 设计特点

- 🎨 **现代化深色主题** - 深蓝灰色调，专业工业风格
- 📐 **1920×1080 全高清** - 适配大屏显示器
- 🎯 **信息层次分明** - 温度、电机、安全分区显示
- ⚡ **实时数据更新** - 毫秒级数据刷新
- 🎪 **动态效果** - LED 闪烁、数值动画

---

## 🔧 技术规格

### 支持的协议
- ✅ MQTT
- ✅ Modbus RTU/TCP
- ✅ OPC UA
- ✅ Siemens S7
- ✅ BACnet IP
- ✅ Ethernet/IP
- ✅ WebAPI

### 数据类型
- Float（浮点数）- 温度、效率
- Integer（整数）- 转速、计数
- Boolean（布尔）- 状态、控制
- String（字符串）- 文本信息

### 系统要求
- Node.js ≥ 14.x
- 或 Docker 环境
- 现代浏览器（Chrome/Firefox/Edge）

---

## 📖 使用指南

### 1. 创建设备连接

参考 `devices/mqtt_devices.json` 创建设备：

1. 打开 FUXA 编辑器 → 连接
2. 添加 MQTT 设备
3. 配置主机、端口、客户端ID
4. 添加标签（Tags）

### 2. 设计视图

参考 `views/main_dashboard.json` 创建界面：

1. 新建视图（1920×1080）
2. 添加仪表盘控件
3. 绑定温度标签
4. 添加趋势图
5. 配置按钮动作

### 3. 配置报警

参考 `alarms/alarm_config.json`：

1. 设置温度阈值
2. 配置报警动作
3. 启用报警通知

### 4. 添加脚本

参考 `scripts/scripts.json`：

1. 创建温度报警处理脚本
2. 配置定时任务
3. 启用数据记录

详细步骤请参考 [📥 导入导出指南](docs/import_export_guide.md)

---

## 🤖 Claude Code 辅助开发

### 快速生成配置

在 Claude Code 中描述你的需求：

```markdown
帮我创建一个 FUXA 项目，监控工厂生产线：
- 4个温度传感器（0-200°C范围）
- 1个压力传感器
- 3个电机控制
- 使用 Modbus TCP 协议
- 浅色主题界面
```

Claude Code 将自动生成：
- ✅ 设备配置文件
- ✅ 标签定义
- ✅ 视图布局
- ✅ 报警规则
- ✅ 控制脚本

### 批量生成控件

```javascript
// 批量生成仪表盘配置
const generateGauges = (count, prefix) => {
  return Array.from({ length: count }, (_, i) => ({
    type: 'gauge',
    name: `${prefix}_${i + 1}`,
    x: 100 + i * 260,
    y: 180,
    property: {
      tag: `\${${prefix.toUpperCase()}_${i + 1}}`,
      min: 0,
      max: 200
    }
  }));
};
```

### 自动化工作流

```powershell
# 使用 Claude Code 批量处理
claude "读取 device_config.json，为每个设备生成对应的视图控件配置"
```

---

## 🎓 学习资源

### 官方资源
- 📖 [FUXA Wiki](https://github.com/frangoteam/FUXA/wiki)
- 🐙 [GitHub 仓库](https://github.com/frangoteam/FUXA)
- 🎬 [视频教程](https://www.youtube.com/playlist?list=PLxrSjjYyzaaK8uY3kVaFzfGnwhVXiCEAO)

### 项目文档
- ⚡ [快速启动指南](docs/quick_start.md) - 5分钟上手
- 📥 [导入导出指南](docs/import_export_guide.md) - 详细配置说明
- 🔧 [设备配置](devices/mqtt_devices.json) - MQTT配置模板
- 🎨 [视图设计](views/main_dashboard.json) - 界面布局参考

---

## 🐛 故障排查

### 常见问题

| 问题 | 解决方案 |
|------|----------|
| 设备离线 | 检查 MQTT Broker 是否运行 |
| 标签不更新 | 验证 MQTT 主题地址 |
| 控件不显示 | 检查标签名称拼写 |
| 报警不触发 | 确认报警已启用 |

详细排查步骤请参考 [📥 导入导出指南](docs/import_export_guide.md) 的故障排查章节

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建功能分支
3. 提交更改
4. 创建 Pull Request

---

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

---

## 🙏 致谢

- [FUXA](https://github.com/frangoteam/FUXA) - 优秀的开源 SCADA/HMI 平台
- [frangoteam](https://frangoteam.org/) - 项目维护团队
- 所有贡献者

---

## 📞 联系我们

- 🐛 Bug 报告: [GitHub Issues](https://github.com/frangoteam/FUXA/issues)
- 💬 讨论区: [GitHub Discussions](https://github.com/frangoteam/FUXA/discussions)
- 🌐 官网: [frangoteam.org](https://frangoteam.org/)

---

**开始使用 FUXA 构建你的工业监控系统！** 🚀

---

*Generated with ❤️ by Claude Code*
