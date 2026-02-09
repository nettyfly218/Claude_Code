# ⚡ FUXA HMI 项目快速启动指南

## 🎯 5分钟快速启动

### 步骤 1: 启动 FUXA（1分钟）

```bash
# 使用 Docker（最简单）
docker run -d --name fuxa -p 1881:1881 frangoteam/fuxa:latest

# 或使用 NPM
npm install -g @frangoteam/fuxa
fuxa
```

访问：`http://localhost:1881/editor`

### 步骤 2: 配置 MQTT Broker（1分钟）

如果你没有 MQTT Broker，快速启动一个：

```bash
docker run -d --name mosquitto -p 1883:1883 eclipse-mosquitto
```

### 步骤 3: 创建设备（1分钟）

1. 在 FUXA 编辑器中，点击 **"连接"**
2. 点击 **"+ 添加设备"**
3. 配置：
   - 类型：MQTT
   - 名称：温度传感器组
   - 主机：localhost (或 192.168.1.100)
   - 端口：1883
4. 添加标签：
   - temp1 → 地址：`factory/line1/temp1`
   - temp2 → 地址：`factory/line1/temp2`
   - temp3 → 地址：`factory/line1/temp3`
5. 点击 **"保存"** 和 **"启用"**

### 步骤 4: 创建视图（2分钟）

1. 点击 **"视图"** → **"+ 添加视图"**
2. 设置：
   - 名称：主监控画面
   - 尺寸：1920 × 1080
3. 拖拽控件：
   - 3个 **Gauge**（仪表盘）
   - 1个 **Chart**（图表）
   - 2个 **LED**（指示灯）
   - 4个 **Button**（按钮）
4. 绑定标签（双击控件设置属性）

### 步骤 5: 测试数据（可选）

发送测试数据到 MQTT：

```bash
# 使用 mosquitto_pub 发送测试数据
mosquitto_pub -h localhost -t "factory/line1/temp1" -m "65.5"
mosquitto_pub -h localhost -t "factory/line1/temp2" -m "72.3"
mosquitto_pub -h localhost -t "factory/line1/temp3" -m "58.7"
```

---

## 📁 项目文件速览

```
fuxa-hmi-demo/
├── 📁 devices/
│   └── mqtt_devices.json          # 设备配置模板
├── 📁 tags/
│   └── tag_definitions.json       # 标签定义参考
├── 📁 views/
│   └── main_dashboard.json        # 视图控件配置（可直接参考）
├── 📁 alarms/
│   └── alarm_config.json          # 报警规则模板
├── 📁 scripts/
│   └── scripts.json               # 脚本代码示例
└── 📁 docs/
    ├── import_export_guide.md     # 详细导入导出指南
    └── quick_start.md             # 本文件
```

---

## 🎨 界面预览

### 主监控画面布局

```
┌────────────────────────────────────────────────────────────────┐
│ 🏭 智能生产线监控系统                    2026-02-08 14:30:25   │
├────────────────────────────────────────────────────────────────┤
│ 🌡️ 温度监控                                                    │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                        │
│  │  🔴 65°C │  │  🟡 72°C │  │  🟢 58°C │     📈 温度趋势图    │
│  │ 入口温度 │  │ 中段温度 │  │ 出口温度 │     ╱╲              │
│  └─────────┘  └─────────┘  └─────────┘    ╱    ╲            │
│                                              ╲____╱            │
├────────────────────────────────────────────────────────────────┤
│ ⚙️ 电机状态                                  🛑    ┌─────────┐ │
│  ┌──────────────────┐  ┌──────────────────┐  急停   │系统状态  │ │
│  │ 电机 1#       🟢 │  │ 电机 2#       🔴 │       │ ✓ 安全门 │ │
│  │ 转速: 1200 RPM   │  │ 转速: 0 RPM      │       │ ✓ 系统就绪│ │
│  │ [启动] [停止]    │  │ [启动] [停止]    │       │ 产量: 152 │ │
│  └──────────────────┘  └──────────────────┘       └─────────┘ │
├────────────────────────────────────────────────────────────────┤
│ © 2026 智能工厂监控系统 | Powered by FUXA                     │
└────────────────────────────────────────────────────────────────┘
```

---

## 🔧 常用配置代码片段

### 1. 仪表盘控件配置

```json
{
  "type": "gauge",
  "property": {
    "tag": "${TEMP_01}",
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

### 2. 按钮动作配置

```json
{
  "type": "button",
  "property": {
    "text": "启动",
    "backgroundColor": "#22c55e",
    "action": {
      "type": "setValue",
      "tag": "${MOTOR_01_CMD}",
      "value": true
    }
  }
}
```

### 3. 报警规则配置

```json
{
  "name": "入口温度高",
  "tag": "${TEMP_01}",
  "condition": {
    "type": "high",
    "threshold": 100,
    "deadband": 2
  },
  "severity": "high"
}
```

### 4. 脚本示例

```javascript
// 读取标签
var temp = $getTag('TEMP_01');

// 写入标签
$setTag('MOTOR_01_CMD', true);

// 记录日志
$log('当前温度: ' + temp + '°C');

// 显示提示
$toast('操作成功', 'success');
```

---

## 🐛 常见问题速查

### Q: 设备显示离线？
```bash
# 检查 MQTT Broker 是否运行
docker ps | grep mosquitto

# 测试连接
mosquitto_sub -h localhost -t "test"
```

### Q: 标签值不更新？
- 检查设备是否已启用
- 验证 MQTT 主题地址正确
- 确认有数据发布到该主题

### Q: 控件不显示？
- 检查标签名称拼写
- 确认使用 `${TAG_NAME}` 语法
- 刷新页面重试

### Q: 如何备份项目？
1. 文件 → 导出项目
2. 保存 .fuxa 文件
3. 定期备份

---

## 📚 下一步

1. **详细配置** → 查看 `docs/import_export_guide.md`
2. **设备配置** → 参考 `devices/mqtt_devices.json`
3. **自定义视图** → 参考 `views/main_dashboard.json`
4. **添加报警** → 参考 `alarms/alarm_config.json`

---

## 💡 进阶技巧

### 使用 Claude Code 快速生成配置

```
"帮我根据温度传感器数据生成一个 FUXA HMI 配置，
包含3个仪表盘和1个趋势图，深色主题"
```

Claude Code 会自动生成：
- ✅ 设备配置文件
- ✅ 视图布局代码
- ✅ 控件绑定配置
- ✅ 报警规则

### 批量创建相似控件

```javascript
// 使用 JavaScript 批量生成配置
const gauges = [1, 2, 3].map(i => ({
  type: 'gauge',
  name: `temp_${i}`,
  property: { tag: `\${TEMP_0${i}}` }
}));
```

---

## 📞 获取帮助

- 🐛 Bug 报告: https://github.com/frangoteam/FUXA/issues
- 💬 讨论区: https://github.com/frangoteam/FUXA/discussions
- 📖 文档: https://github.com/frangoteam/FUXA/wiki

---

**开始监控你的生产线吧！🚀**
