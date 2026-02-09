# 🏭 FUXA HMI 项目导入与导出指南

## 项目概述

本项目是一个完整的智能工厂生产线监控 HMI 系统，包含：
- ✅ 3个温度传感器监控
- ✅ 2个电机状态控制
- ✅ 实时趋势图显示
- ✅ 完整的报警系统
- ✅ 自动数据记录脚本

---

## 📥 导入项目到 FUXA

### 方法 1: 通过 FUXA 编辑器导入（推荐）

#### 步骤 1: 启动 FUXA

```bash
# Docker 方式
docker run -d -p 1881:1881 frangoteam/fuxa:latest

# NPM 方式
npm install -g @frangoteam/fuxa
fuxa

# 源码方式
git clone https://github.com/frangoteam/FUXA.git
cd FUXA
npm install
npm start
```

访问编辑器：`http://localhost:1881/editor`

#### 步骤 2: 创建设备连接

1. 点击左侧菜单 **"连接"** (Connections)
2. 点击 **"+ 添加设备"**
3. 选择协议类型：**MQTT**
4. 配置设备参数（参考 `devices/mqtt_devices.json`）:
   - 名称：温度传感器组
   - 主机：192.168.1.100
   - 端口：1883
   - 客户端ID：fuxa_temp_client_001
5. 添加 Tags（标签）:
   - 名称：温度传感器1
   - 地址：factory/line1/temp1
   - 数据类型：Float
6. 点击 **"保存"** 和 **"启用"**

重复上述步骤添加其他设备（电机控制单元、安全系统）

#### 步骤 3: 创建视图

1. 点击左侧菜单 **"视图"** (Views)
2. 点击 **"+ 添加视图"**
3. 设置视图属性：
   - 名称：生产监控主画面
   - 宽度：1920
   - 高度：1080
   - 背景色：#0f172a（深蓝灰色）

#### 步骤 4: 添加控件

根据 `views/main_dashboard.json` 中的配置，添加以下控件：

**温度显示区域：**
- 3个 Gauge（仪表盘）控件 - 显示温度
- 位置：x:80, y:180 等
- 绑定标签：${TEMP_01}, ${TEMP_02}, ${TEMP_03}

**趋势图：**
- 1个 Chart（图表）控件
- 位置：x:920, y:150
- 绑定三个温度标签
- 时间范围：1小时

**电机控制区域：**
- 2个 LED 指示灯 - 显示电机运行状态
- 4个 Button（按钮）- 启动/停止控制
- 2个 Panel（面板）- 电机状态卡片

**安全区域：**
- 1个 Button（急停按钮）- 红色圆形
- LED 指示灯 - 安全门、系统就绪状态

#### 步骤 5: 配置报警

1. 点击左侧菜单 **"报警"** (Alarms)
2. 点击 **"+ 添加报警"**
3. 根据 `alarms/alarm_config.json` 配置：
   - 名称：入口温度高
   - 标签：${TEMP_01}
   - 条件：High，阈值：100
   - 严重性：High

#### 步骤 6: 配置脚本

1. 点击左侧菜单 **"脚本"** (Scripts)
2. 点击 **"+ 添加脚本"**
3. 根据 `scripts/scripts.json` 复制脚本代码
4. 设置触发方式：
   - 温度报警处理：Alarm 触发
   - 生产计数器：Schedule (*/1 * * * *)
   - 数据记录：Schedule (*/5 * * * *)

---

### 方法 2: 直接导入项目文件

如果你已有 FUXA 项目文件（.fuxa 格式）：

1. 打开 FUXA 编辑器
2. 点击 **"文件"** → **"导入项目"**
3. 选择项目文件
4. 点击 **"导入"**

---

### 方法 3: 使用 Claude Code 自动生成

在 Claude Code 中运行以下命令：

```
读取 fuxa-hmi-demo 项目文件，根据配置自动生成 FUXA 项目导入脚本
```

Claude Code 可以帮助你：
- 批量创建设备配置
- 自动生成控件布局
- 创建报警规则
- 编写自定义脚本

---

## 📤 从 FUXA 导出项目

### 完整项目导出

1. 打开 FUXA 编辑器
2. 点击 **"文件"** → **"导出项目"**
3. 选择保存位置
4. 文件格式：`project_name.fuxa`

### 部分配置导出

#### 导出设备配置

1. 进入 **"连接"** 页面
2. 选择要导出的设备
3. 点击设备名称旁的菜单 → **"导出"**

#### 导出视图

1. 进入 **"视图"** 页面
2. 选择要导出的视图
3. 点击 **"导出"**

#### 导出报警配置

1. 进入 **"报警"** 页面
2. 点击 **"导出配置"**

---

## 🔧 项目文件说明

```
fuxa-hmi-demo/
├── devices/
│   └── mqtt_devices.json          # 设备连接配置（MQTT协议）
├── tags/
│   └── tag_definitions.json       # 标签/变量定义
├── views/
│   └── main_dashboard.json        # 主监控画面配置
├── alarms/
│   └── alarm_config.json          # 报警规则配置
├── scripts/
│   └── scripts.json               # 自定义脚本
├── assets/                        # 图片、图标资源
└── docs/
    ├── import_export_guide.md     # 本文件
    └── quick_start.md             # 快速启动指南
```

---

## 📝 注意事项

### 1. 设备连接

- 确保 MQTT Broker（192.168.1.100:1883）可访问
- 根据实际情况修改设备 IP 地址
- 检查防火墙设置

### 2. 标签绑定

- 确保标签名称与视图中引用的名称一致
- 使用 `${TAG_NAME}` 语法引用标签
- 数据类型必须匹配

### 3. 脚本执行

- 脚本使用 JavaScript 语法
- 内置函数：
  - `$getTag('TAG_NAME')` - 读取标签值
  - `$setTag('TAG_NAME', value)` - 写入标签值
  - `$log(message)` - 记录日志
  - `$toast(message, type)` - 显示提示
  - `$history(name, data)` - 记录历史数据

### 4. 报警配置

- 死区（Deadband）可防止报警频繁触发
- 延迟（Delay）用于消除抖动
- 严重级别：Low, Medium, High, Critical

---

## 🐛 故障排查

### 问题 1: 设备连接失败

**症状**：设备状态显示离线

**解决方案**：
1. 检查 MQTT Broker 是否运行
2. 确认 IP 地址和端口正确
3. 检查网络连接
4. 查看 FUXA 日志

### 问题 2: 标签值不更新

**症状**：画面显示数值不变化

**解决方案**：
1. 确认设备已启用
2. 检查标签地址是否正确
3. 验证 MQTT 主题有数据发布
4. 使用 MQTT 客户端（如 MQTT Explorer）测试

### 问题 3: 报警不触发

**症状**：超出阈值但未报警

**解决方案**：
1. 检查报警是否已启用
2. 确认标签绑定正确
3. 检查条件设置（High/Low/Range）
4. 查看报警历史记录

### 问题 4: 脚本不执行

**症状**：脚本逻辑未生效

**解决方案**：
1. 检查脚本是否已启用
2. 查看触发条件设置
3. 检查脚本语法错误
4. 查看系统日志

---

## 📚 参考资源

- [FUXA 官方文档](https://github.com/frangoteam/FUXA/wiki)
- [FUXA GitHub](https://github.com/frangoteam/FUXA)
- [MQTT 协议介绍](http://mqtt.org/)

---

## 📧 支持与反馈

如有问题或建议，请通过以下方式联系：
- GitHub Issues: https://github.com/frangoteam/FUXA/issues
- 官方论坛: https://github.com/frangoteam/FUXA/discussions

---

**最后更新**: 2026-02-08
**版本**: v1.0.0
