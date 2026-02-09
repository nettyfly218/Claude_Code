---
name: fuxa-hmi-generator
description: 快速生成 FUXA SCADA/HMI 项目配置和代码，支持设备配置、视图设计、报警规则和自定义脚本
category: industrial-automation
---

# FUXA HMI 项目生成器

## 功能概述

本 Skill 帮助用户快速生成完整的 FUXA HMI 项目配置，包括：
- 设备连接配置（MQTT、Modbus、OPC UA 等）
- 标签/变量定义
- HMI 视图设计
- 报警规则配置
- 自动化脚本

## 使用方法

### 场景 1: 创建新项目

用户描述需求，生成完整项目配置：

**示例对话：**
```
用户：帮我创建一个 FUXA 项目，监控工厂生产线：
- 3个温度传感器（MQTT协议）
- 2个电机（Modbus TCP）
- 1个急停按钮
- 深色主题界面
```

**响应步骤：**
1. 创建设备配置文件
2. 生成标签定义
3. 设计 HMI 视图
4. 配置报警规则
5. 添加自动化脚本

### 场景 2: 生成单个控件配置

**示例对话：**
```
用户：生成一个温度仪表盘控件，范围0-150°C，红黄绿三色区间
```

**生成代码：**
```json
{
  "type": "gauge",
  "name": "gauge_temperature",
  "property": {
    "tag": "${TEMPERATURE}",
    "min": 0,
    "max": 150,
    "unit": "°C",
    "colorZones": [
      { "from": 0, "to": 80, "color": "#22c55e" },
      { "from": 80, "to": 100, "color": "#eab308" },
      { "from": 100, "to": 150, "color": "#ef4444" }
    ]
  }
}
```

### 场景 3: 批量生成相似控件

**示例对话：**
```
用户：批量生成8个电机状态卡片，每行4个
```

**生成代码：**
```javascript
const generateMotorCards = () => {
  return Array.from({ length: 8 }, (_, i) => ({
    type: 'panel',
    name: `panel_motor_${i + 1}`,
    x: 80 + (i % 4) * 460,
    y: 180 + Math.floor(i / 4) * 220,
    width: 420,
    height: 200,
    property: {
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      borderWidth: 2,
      borderRadius: 12
    }
  }));
};
```

## 配置模板

### MQTT 设备配置模板

```json
{
  "id": "dev_mqtt_001",
  "name": "MQTT设备组",
  "type": "MQTT",
  "enabled": true,
  "connection": {
    "host": "192.168.1.100",
    "port": 1883,
    "clientId": "fuxa_client_001",
    "keepalive": 60,
    "reconnectPeriod": 5000,
    "clean": true
  },
  "tags": []
}
```

### Modbus TCP 设备配置模板

```json
{
  "id": "dev_modbus_001",
  "name": "Modbus设备组",
  "type": "ModbusTCP",
  "enabled": true,
  "connection": {
    "host": "192.168.1.101",
    "port": 502,
    "slaveId": 1,
    "timeout": 5000
  },
  "tags": []
}
```

### 报警规则模板

```json
{
  "id": "ALM_TEMP_HIGH",
  "name": "温度高报警",
  "tag": "${TEMPERATURE}",
  "condition": {
    "type": "high",
    "threshold": 100,
    "deadband": 2
  },
  "severity": "high",
  "message": "温度过高！当前值：${TEMPERATURE}°C"
}
```

### 脚本模板

```javascript
// 数据处理脚本
var value = $getTag('TAG_NAME');
$log('当前值: ' + value);

// 条件判断
if (value > 100) {
  $setTag('ALARM_STATUS', true);
  $toast('警告：数值超限', 'warning');
}
```

## 控件库

### 1. 仪表盘 (Gauge)

```json
{
  "type": "gauge",
  "property": {
    "tag": "${VALUE}",
    "min": 0,
    "max": 100,
    "unit": "",
    "decimals": 1,
    "colorZones": []
  }
}
```

### 2. 趋势图 (Chart)

```json
{
  "type": "chart",
  "property": {
    "chartType": "line",
    "timeRange": "1h",
    "series": [
      { "name": "数据1", "tag": "${TAG1}", "color": "#22c55e" }
    ]
  }
}
```

### 3. LED 指示灯

```json
{
  "type": "led",
  "property": {
    "tag": "${STATUS}",
    "colorOn": "#22c55e",
    "colorOff": "#64748b",
    "blinkOnAlarm": true
  }
}
```

### 4. 按钮 (Button)

```json
{
  "type": "button",
  "property": {
    "text": "启动",
    "backgroundColor": "#22c55e",
    "action": {
      "type": "setValue",
      "tag": "${CONTROL}",
      "value": true
    }
  }
}
```

### 5. 文本显示 (Text)

```json
{
  "type": "text",
  "property": {
    "text": "数值: ${VALUE}",
    "fontSize": 16,
    "color": "#f8fafc"
  }
}
```

### 6. 面板 (Panel)

```json
{
  "type": "panel",
  "property": {
    "backgroundColor": "#1e293b",
    "borderColor": "#334155",
    "borderWidth": 2,
    "borderRadius": 12
  }
}
```

## 最佳实践

### 1. 命名规范

- 设备 ID: `dev_{protocol}_{number}` (如: dev_mqtt_001)
- 标签 ID: `tag_{device}_{signal}` (如: tag_temp_01)
- 视图名称: 使用中文描述性名称
- 报警 ID: `ALM_{TAG}_{condition}` (如: ALM_TEMP_HIGH)

### 2. 颜色规范

- 正常: `#22c55e` (绿色)
- 警告: `#eab308` (黄色)
- 报警: `#ef4444` (红色)
- 信息: `#3b82f6` (蓝色)
- 背景深色: `#0f172a` / `#1e293b`
- 文字浅色: `#f8fafc` / `#94a3b8`

### 3. 布局规范

- 标准分辨率: 1920×1080
- 标题栏高度: 100px
- 控件间距: 20px
- 字体大小: 标题24px, 正文16-18px

### 4. 安全规范

- 急停按钮使用红色圆形
- 安全门状态必须监控
- 启动前执行安全检查
- 报警必须记录日志

## 常见问题

### Q: 如何引用标签？
A: 使用 `${TAG_NAME}` 语法，如 `${TEMP_01}`

### Q: 如何创建计算标签？
A: 使用 formula 字段：
```json
{
  "id": "AVG_TEMP",
  "formula": "(${TEMP_01} + ${TEMP_02}) / 2"
}
```

### Q: 如何设置条件颜色？
A: 使用表达式：
```
${TEMP_01} > 100 ? '#ef4444' : '#22c55e'
```

## 示例项目

参考项目结构：
```
project/
├── devices/
│   └── mqtt_devices.json
├── tags/
│   └── tag_definitions.json
├── views/
│   └── main_dashboard.json
├── alarms/
│   └── alarm_config.json
└── scripts/
    └── scripts.json
```

---

**使用本 Skill，几分钟内即可创建专业的工业监控系统！**
