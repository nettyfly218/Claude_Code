# FUXA 中文使用指南

> 文档基于 FUXA 官方 GitHub Wiki 翻译整理
> 原文地址：https://github.com/frangoteam/FUXA/wiki
> 最后更新：2026-02-16

---

## 目录

1. [关于 FUXA](#1-关于-fuxa)
2. [安装与运行](#2-安装与运行)
3. [快速入门](#3-快速入门)
4. [用户界面与视图](#4-用户界面与视图)
5. [设备与标签配置](#5-设备与标签配置)
6. [绑定控件](#6-绑定控件)
7. [绑定形状](#7-绑定形状)
8. [图表控件](#8-图表控件)
9. [报警系统](#9-报警系统)
10. [脚本配置](#10-脚本配置)
11. [事件配置](#11-事件配置)
12. [WebSockets 通信](#12-websockets-通信)
13. [项目保存与加载](#13-项目保存与加载)
14. [调度器](#14-调度器)
15. [Node-RED 集成](#15-node-red-集成)
16. [UI 布局设置](#16-ui-布局设置)
17. [视图复用](#17-视图复用)
18. [自定义形状开发](#18-自定义形状开发)
19. [管道动画](#19-管道动画)
20. [自定义 Widget](#20-自定义-widget)
21. [服务器设置](#21-服务器设置)
22. [技巧与窍门](#22-技巧与窍门)

---

## 1. 关于 FUXA

### 1.1 概述

FUXA 是一款强大的**基于 Web 的**软件，可用于快速构建和部署可扩展的 SCADA、HMI、Dashboard 或 IIoT 系统。它允许用户创建具有现代流程可视化效果的设计，用于机器的实时数据显示以及自动化工业仪器的控制。

### 1.2 核心特性

- **无需运行时许可证**：用户可以构建任意数量和规模的 HMI 项目，无需担心额外的运行时环境授权
- **跨平台运行**：后端使用 NodeJS，前端使用 HTML5、Angular、SVG 等 Web 技术
- **双视图模式**：
  - **FUXA-editor**：用于编辑项目
  - **FUXA-view**：用于显示可视化项目的产品

### 1.3 支持的通信协议

FUXA 平台包含以下连接器以实现直接通信：

| 协议 | 说明 |
|------|------|
| **OPC UA** | 用于 OPC UA 连接 |
| **S7 协议** | 通过以太网与西门子 CPU 200、300、400、1200 和 1500 通信 |
| **Modbus RTU/TCP** | 通用工业通信协议 |
| **BACnet IP** | 楼宇自动化协议 |
| **MQTT** | 物联网消息传输协议 |
| **Ethernet/IP** | Allen Bradley 设备通信 |
| **WebAPI** | RESTful API 连接 |

---

## 2. 安装与运行

### 2.1 六种安装方式

#### 方式一：下载预构建的 Electron 应用

从 GitHub Actions 下载：
https://github.com/frangoteam/FUXA/actions/workflows/electron_latest.yml

#### 方式二：Docker Compose

```yaml
version: '3.5'
services:
    fuxa:
        image: frangoteam/fuxa:latest
        network_mode: "host"
        volumes:
            - ./fuxa_appdata:/usr/src/app/FUXA/server/_appdata
            - ./fuxa_db:/usr/src/app/FUXA/server/_db
            - ./fuxa_logs:/usr/src/app/FUXA/server/_logs
        environment:
            - TZ=America/New_York
        restart: always
```

运行命令：
```bash
sudo docker compose up -d
```

#### 方式三：Docker 快速启动

```bash
# 基础运行
docker run -d -p 1881:1881 frangoteam/fuxa:latest

# 带持久化存储
docker run -d -p 1881:1881 \
  -v fuxa_appdata:/usr/src/app/FUXA/server/_appdata \
  -v fuxa_db:/usr/src/app/FUXA/server/_db \
  -v fuxa_logs:/usr/src/app/FUXA/server/_logs \
  -v fuxa_shapes:/usr/src/app/FUXA/client/assets/lib/svgeditor/shapes \
  -v fuxa_images:/usr/src/app/FUXA/server/_images \
  frangoteam/fuxa:latest
```

#### 方式四：自定义 Docker 镜像（从源码构建）

```bash
wget https://raw.githubusercontent.com/frangoteam/FUXA/master/Dockerfile
sudo docker build -t fuxa-custom-image-name --no-cache .
```

#### 方式五：NPM 全局安装

```bash
npm install -g --unsafe-perm @frangoteam/fuxa
fuxa
```

> 注意：若不需要与西门子 PLC 通信，可安装 fuxa-min 版本：
> ```bash
> npm install -g @frangoteam/fuxa-min
> ```

#### 方式六：下载最新 Release

从 GitHub Releases 下载：
https://github.com/frangoteam/FUXA/releases

### 2.2 源码运行（适用于开发或自定义需求）

```bash
cd ./server
npm install
npm start
```

### 2.3 访问方式

安装完成后，通过浏览器访问：
```
http://localhost:1881
```

- 可视化端点：http://localhost:1881/home
- 编辑器端点：http://localhost:1881/editor

### 2.4 Linux 下设置为 HMI（仅支持 Linux）

#### 安装 Node.js 18

```bash
sudo apt-get update
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### 安装 Electron

```bash
sudo npm install -g electron --unsafe-perm=true --allow-root
```

#### 创建 Electron 应用

```bash
cd /opt/electron/fuxa-electron
sudo npm init -y
sudo npm install electron --save-dev
```

#### 创建 main.js

```javascript
const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,  // 启用全屏模式
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  });
  win.loadURL('http://localhost:1881');
}

app.whenReady().then(createWindow);
```

#### 配置 package.json

```json
{
  "name": "fuxa-electron",
  "version": "1.0.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "devDependencies": {
    "electron": "^31.3.1"
  }
}
```

#### 配置系统服务自启动

```bash
sudo nano /opt/fuxa-electron-startup.sh
# 添加内容：
#!/bin/bash
cd /opt/electron/fuxa-electron
npm start

sudo chmod +x /opt/fuxa-electron-startup.sh

systemctl edit --user --force --full fuxa-electron-startup.service
# 添加内容：
[Unit]
Description=Start Fuxa Electron Script
After=default.target

[Service]
ExecStart=/opt/fuxa-electron-startup.sh

[Install]
WantedBy=default.target

systemctl enable --user fuxa-electron-startup.service
```

---

## 3. 快速入门

### 3.1 目标

本教程将演示 FUXA 最常用功能的基本用法，包括：

- 连接设备到 FUXA
- 将数据从设备推送到 FUXA
- 构建实时 GUI SCADA/HMI/Dashboard
- 定义阈值并触发报警

### 3.2 前置条件

需要先安装并运行 FUXA 服务器，参考[安装与运行](#2-安装与运行)。

FUXA web 服务器有两个页面：
- 可视化端点：http://localhost:1881/home
- 编辑器端点：http://localhost:1881/editor

### 3.3 步骤概述

| 步骤 | 内容 |
|------|------|
| 步骤 1 | 连接设备并配置标签 |
| 步骤 2 | 创建可视化（绑定控件、形状、图表） |
| 步骤 3 | 配置 UI 布局 |
| 步骤 4 | 配置报警 |
| 步骤 5 | 激活并创建客户用户 |

---

## 4. 用户界面与视图

### 4.1 创建视图

1. 进入编辑器，点击左上角的 "+" 图标
2. 选择 "Canvas/SVG" 创建新视图

### 4.2 访问属性

点击 "Property" 访问属性面板

### 4.3 配置视图

定义视图的尺寸和背景

---

## 5. 设备与标签配置

### 5.1 添加 OPCUA 设备

1. 转到编辑器的 **Connections** 部分
2. 添加并连接一个 **OPCUA** 设备
3. 注意：设备连接后才能添加 OPCUA 标签

### 5.2 添加 Modbus 连接

需要先在 **Plugins** 中安装 Modbus 驱动

### 5.3 添加 MQTT 连接

1. 添加 MQTT 连接
2. 订阅主题

### 5.4 添加 WebAPI 连接

1. 添加 WebAPI 连接
2. 从 JSON 结果中添加标签

### 5.5 标签选项 (Tag Options)

对于没有预定义数据类型的标签类型（如 TIME），可以手动设置：
- TIME 的基础数据类型通常是 int64 或 uint64
- 时间单位为毫秒

### 5.6 缩放脚本 (Scale Script)

可以使用脚本进行数据类型转换，例如：
- TIME 数据是一个包含 LOW 和 HIGH 的数组
- 可以编写脚本提取数组元素并返回为数字类型
- 同样可以编写写回脚本

**重要提示**：
1. 脚本参数必须命名为 `value`（系统有过滤器显示相关脚本供选择）
2. 不要在脚本中使用注释，因为不被支持

---

## 6. 绑定控件

### 6.1 可用的控件类型

| 控件类型 | 说明 |
|----------|------|
| **Output Control** | 输出控件，绑定到设备标签（变量） |
| **Input Control** | 输入控件，绑定到设备标签 |
| **Select Control** | 选择控件，绑定到设备标签 |
| **Slider Control** | 滑块控件，绑定到设备标签 |

### 6.2 绑定方法

1. 进入编辑器，选择视图
2. 将控件拖拽到视图中
3. 绑定到对应的设备标签（变量）

---

## 7. 绑定形状

### 7.1 绑定形状到设备标签

1. 进入编辑器，选择视图
2. 将形状绑定到设备标签（变量）
3. 实现动态可视化效果

### 7.2 绑定过程工程形状（如储罐）

将过程工程形状（如 Tank）绑定到设备标签

---

## 8. 图表控件

### 8.1 添加图表

1. 进入编辑器，选择视图
2. 添加图表控件到视图中

### 8.2 配置折线图

在 **Line charts** 中，可以定义绑定到图表控件的图表

---

## 9. 报警系统

### 9.1 访问报警配置

进入编辑器的 "Alarms" 部分配置报警

### 9.2 报警绑定

每个报警绑定到一个标签，支持四种条件类型：
- **High High** - 极高报警
- **High** - 高报警
- **Low** - 低报警
- **Message** - 消息

### 9.3 显示报警

活动报警和历史报警可以通过以下方式显示：
- 从菜单配置视图
- 使用标题栏中的按钮通过 "Layout settings" 配置

### 9.4 报警动作

可以为每个报警配置多个动作：
- 显示弹出对话框
- 设置标签的值

---

## 10. 脚本配置

### 10.1 配置 JavaScript 脚本

1. 进入编辑器的 **Scripts** 部分
2. 添加新脚本（JavaScript 函数），设置函数名和参数（标签 ID 或值）
3. 在函数内部编写业务逻辑

### 10.2 可用的系统调用

| 函数 | 说明 |
|------|------|
| `$setTag` | 设置标签的值 |
| `$getTag` | 获取当前标签的值 |

### 10.3 测试与使用

- 使用 `console.log` 进行测试
- 在 **Events** 中配置脚本调用

### 10.4 定时器处理

测试脚本时，防止重复定时器的代码模式：

```javascript
if (typeof globalThis.myTimer === 'undefined') globalThis.myTimer = null;

if (!globalThis.myTimer) globalThis.myTimer = setInterval(myTimerFunction, 1000);

async function myTimerFunction() {
  // code here every 1 sec
}
```

---

## 11. 事件配置

### 11.1 可用的事件类型

| 事件类型 | 说明 |
|----------|------|
| **Open Page** | 在主窗口中显示一个视图 |
| **Open Card** | 在鼠标位置附近以弹出窗口显示视图，可同时显示多个卡片 |
| **Open Dialog** | 在屏幕顶部以对话框形式显示视图，通常用于配置值 |
| **Open iframe** | 以嵌入式 HTML 文档形式打开外部来源的窗口，支持尺寸和缩放 |
| **Open Window** | 打开一个新的浏览器窗口，可配置尺寸 |
| **Set Value** | 设置标签的值或增加/减少当前值 |
| **Toggle Value** | 在 1 和 0 之间切换标签值（开关状态） |
| **Set from Input and Close** | 通过对话框设置值，带确认按钮 |

### 11.2 配置方法

在形状和按钮控件上配置鼠标事件（click、mouseDown、mouseUp）来执行任务

---

## 12. WebSockets 通信

### 12.1 概述

使用 WebSockets 在 FUXA 和其他应用（如 Node-RED）之间进行通信

### 12.2 关键要求

- 使用**服务器端脚本**，设置为**启动时运行**
- 需要 `ws` 模块：`const WebSocket = require('/usr/src/app/FUXA/server/node_modules/ws');`
- 代码用于 **WebSocket 客户端**（连接到外部服务器）

### 12.3 主要特性

1. **双向数据传输** - 发送和接收标签值
2. **JSON 负载格式** - 包含时间戳和负载对象
3. **自动重连** - 如果连接关闭，5 秒后重试
4. **周期性发送** - 使用 setInterval 每 500ms 发送数据

### 12.4 代码结构

```javascript
// 定义 WebSocket URL 和标签名称数组
const wsUrl = 'ws://127.0.0.1:1880';
const tagNames = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'];

// 创建 JSON 负载
function createPayload() {
    const payload = {};
    tagNames.forEach(tag => {
        payload[tag] = $getTag(tag);
    });
    return payload;
}

// 发送数据
function sendData() {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
            timestamp: new Date().toISOString(),
            payload: createPayload()
        }));
    }
}

// 打开 WebSocket 连接
function openWebSocketConnection() {
    ws = new WebSocket(wsUrl);

    ws.on('open', () => {
        console.log('WebSocket connected');
    });

    ws.on('message', (message) => {
        const data = JSON.parse(message.data);
        // 解析接收到的 JSON 并更新 FUXA 标签
        Object.keys(data.payload).forEach(tag => {
            $setTag(tag, data.payload[tag]);
        });
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

    ws.on('close', () => {
        console.log('WebSocket closed, reconnecting in 5 seconds...');
        setTimeout(openWebSocketConnection, 5000);
    });
}

// 启动时执行
openWebSocketConnection();
setInterval(sendData, 500);
```

---

## 13. 项目保存与加载

### 13.1 创建项目

可以创建新项目。当前项目将被新的空白项目覆盖（只有一个空白 MainView）

### 13.2 保存项目

- 项目在更改设置（如设备、标签、图表）后会自动保存到内部数据库
- 视图在选择另一个视图或离开编辑器时保存
- 使用 **Save Project** 强制执行内部保存过程
- 使用 **Save Project As…** 将整个项目导出为 JSON 文件（如 MyProject.json）用于备份

### 13.3 打开项目

可以从导出的 JSON 文件打开项目

---

## 14. 调度器

### 14.1 概述

调度器是一个基于时间的自动化系统，允许用户创建在特定时间触发的事件：

- 星期几（周一至周日）
- 每月几号（1日至31日）
- 月份（1月至12月）

### 14.2 操作模式

| 模式 | 说明 |
|------|------|
| **Timer Mode** | 定义开始和结束时间；标签在这段时间内保持 ON |
| **Event Mode** | 设置持续时间；标签在指定时间后自动变为 OFF |

### 14.3 主要功能

- **设备绑定** - 每个调度控制特定设备的主标签
- **设备动作** - 配置额外动作，如设置值或运行脚本
- **两级授权** - 主授权（自动）和按设备授权
- **重复或一次性事件** - 事件可重复执行或执行一次后自动删除
- **月份模式** - 高级调度，组合特定月份和日期

### 14.4 数据存储结构

调度存储在项目数据库中，使用布尔数组表示：
- `days`：7 个元素表示周一至周日
- `months`：12 个元素表示 1 月至 12 月
- `daysOfMonth`：31 个元素表示 1 日至 31 日

### 14.5 使用示例

1. **每日水泵调度**：周一至周五，08:00-18:00，Timer Mode
2. **月度维护**：季度（1月/4月/7月/10月），15日，09:00，持续 2 小时，Event Mode
3. **节日照明**：12月，17:00-23:00 每日

---

## 15. Node-RED 集成

### 15.1 概述

FUXA 包含完整的 Node-RED 集成，用于创建与 SCADA 系统交互的自动化流程。Node-RED 会随 FUXA 自动安装。

### 15.2 设置

- **Dashboard 2**：必须通过 Node-RED 的 "Manage Palette" 单独安装，搜索 `@flowfuse/node-red-dashboard`
- **安全配置**：配置 `nodeRedAuthMode` 设置（`secure` 或 `legacy-open`）
- **访问方式**：通过 FUXA Settings → Node-RED 部分

### 15.3 FUXA Contrib 节点

#### 标签节点

| 节点 | 说明 |
|------|------|
| `get-tag` | 获取当前标签值 |
| `set-tag` | 向标签写入值 |
| `get-tag-change` | 基于设备轮询监控标签变化 |
| `get-tag-id` | 获取内部标签 ID |
| `get-historical-tags` | 获取多个标签的历史数据 |
| `get-tag-daq-settings` | 获取 DAQ 设置 |
| `set-tag-daq-settings` | 设置 DAQ 管理 |

#### 设备节点

| 节点 | 说明 |
|------|------|
| `enable-device` | 启用/禁用设备连接 |
| `get-device` | 获取设备信息 |
| `get-device-property` | 获取设备属性 |
| `set-device-property` | 设置设备属性 |

#### 报警节点

| 节点 | 说明 |
|------|------|
| `get-alarms` | 获取活动报警 |
| `get-history-alarms` | 获取历史报警数据 |
| `ack-alarm` | 确认报警 |

#### 其他节点

- 视图：`set-view`、`open-card`
- 脚本：`execute-script`
- DAQ：`get-daq`
- 事件：`emit-event`、`send-message`

### 15.4 数据格式

- 标签值：数字、字符串、布尔值、对象
- 时间戳：ISO 8601 格式
- 错误输出到调试选项卡

### 15.5 故障排除

| 问题 | 解决方案 |
|------|----------|
| Dashboard 加载失败 | 安装 Dashboard 2 |
| FUXA 节点不显示 | 检查 Node-RED 日志 |
| 下拉菜单为空 | 确保在 FUXA 中配置了设备/标签 |
| 事件不工作 | 验证事件类型正确（区分大小写） |
| 邮件不发送 | 检查 SMTP 设置 |

---

## 16. UI 布局设置

### 16.1 访问方式

在编辑器中进入 **Layout settings** 来定义终端用户的界面布局

### 16.2 General（常规）标签页

| 选项 | 说明 |
|------|------|
| **Start View** | 设置访问 http://localhost:1881 时首先显示的视图 |
| **Zoom** | 启用后可用鼠标滚轮缩放视图，鼠标左键拖动移动视图 |
| **Dialog Mode of input field** | 启用后，输入值控件将显示对话框 |
| **Show Navigation** | 控制是否显示顶部导航栏和菜单 |
| **隐藏开发按钮** | 可隐藏编辑/主页切换按钮 |

### 16.3 Navigation Side Menu（导航侧边菜单）标签页

定义菜单项及多种样式属性

### 16.4 Header Navigation Bar（顶部导航栏）标签页

配置报警通知项的显示方式及样式属性

---

## 17. 视图复用

### 17.1 概述

复用相同视图用于重复组件（如泵和阀门）

### 17.2 关键步骤

1. **定义内部设备** - 创建一个标记为 "internal" 的设备，带有绑定到可复用视图控件的变量（标签）（如标题对话框、输入值字段）

2. **配置事件** - 在每个组件中定义打开对话框的事件，将内部标签映射到特定设备的标签

3. **添加确认** - 根据需要添加确认按钮

---

## 18. 自定义形状开发

### 18.1 形状文件位置

形状文件夹位于：`client/dist/assets/lib/svgeditor/shapes`
（调试时为：`client/src/lib/svgeditor/shapes`）

添加新形状：创建新的 JavaScript 文件（最好从 `my-shapes.js` 复制）或编辑现有文件

### 18.2 JavaScript 文件中的关键变量

```javascript
var shapesGroupName = 'Shapes';  // 编辑器菜单中的分组标签，带展开/折叠

var typeId = 'shapes';  // 标识形状类型，绑定到 Angular 组件 'ShapesComponent'
                        // 对于新类型，必须实现 Angular 组件
```

### 18.3 形状对象属性

```javascript
var shapes = [{
    name: 'diamond',   // 形状类型的唯一标识
    ico: 'assets/lib/svgeditor/shapes/img/shape-diamond.svg',  // 图标路径
    content: [{
        id: '',        // Angular 组件中动画的元素 ID
        type: 'path',  // SVG 元素类型（path、text、ellipse 等）
        attr: { d: 'M 20 0 L 40 20 L 20 40 L 0 20 Z' }  // 元素属性
    }]
}];
```

### 18.4 加载新形状

添加到 `shapesLoader.js`：
```javascript
var shapesToLoad = ['my-shapes.js', 'your shape file name.js'];
```

### 18.5 自定义动画类型

对于具有自定义动画的新形状类型，在 `client/src/app/gauges/shapes/` 中实现相应的 Angular 组件

### 18.6 设计工具推荐

使用 **Inkscape** 设计形状 — 通过 XML 编辑器查看元素和节点属性，以填充 'type' 和 'attr' 字段

---

## 19. 管道动画

### 19.1 配置步骤

1. 首先设计管道形状
2. 然后通过将设备标签（变量）绑定到动画来定义动作

---

## 20. 自定义 Widget

### 20.1 概述

FUXA widgets 使用纯 SVG 与 JavaScript（通过 `<script>` 标签）构建

### 20.2 参数变量

| 变量 | 类型 |
|------|------|
| `_pb_` | 布尔值 |
| `_pn_` | 数字 |
| `_ps_` | 字符串 |
| `_pc_` | 十六进制颜色 |

变量必须包裹在 `//!export-start` 和 `//!export-end` 注释中才能在 FUXA 属性面板绑定标签

### 20.3 数据传递函数

| 函数 | 说明 |
|------|------|
| `postValue(id, value)` | 从 SVG 发送值到 FUXA |
| `putValue(id, value)` | 从 FUXA 接收值到 SVG |

### 20.4 清理定时器

使用 `setInterval` 时需用 MutationObserver 清理：

```javascript
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.removedNodes.forEach((node) => {
      if (node.id === 'svgIdName') {
        clearBlinking();
        observer.disconnect();
      }
    });
  });
});

observer.observe(document.body, { childList: true, subtree: true });
```

### 20.5 SVG 要求

SVG 必须指定 id 属性：
```html
<svg id="svgIdName">
```

完整示例见 GitHub 仓库的 `_widgets` 目录

---

## 21. 服务器设置

### 21.1 设置文件位置

服务器设置位于 `server\_appdata\settings.js` 文件中。更改后需要重启服务器。

### 21.2 身份验证 (Authentication)

启用和配置身份验证的方法：

```javascript
secureEnabled: true,            // 启用或禁用
secretCode: 'frangoteam751',   // 用于编码令牌的密钥
tokenExpiresIn: '1h'           // 令牌过期时间：'1h'=1小时，60=60秒，'1d'=1天
```

默认用户 'admin' 的密码为 '123456'，可以自行修改

---

## 22. 技巧与窍门

### 22.1 编辑器键盘快捷键

| 快捷键 | 功能 |
|--------|------|
| **Ctrl + Left / Right** | 旋转选中的项目 |
| **Ctrl + Shift + Left / Right** | 大步旋转 |
| **Shift + O / P** 或 **Tab / Shift + Tab** | 选择上一个/下一个项目 |
| **Ctrl + Up / Down** | 居中缩放 |
| **Ctrl + Z / Y** | 撤销/重做 |
| **Shift + 鼠标调整大小** | 锁定宽度和高度 |
| **Shift + 方向键** | 移动选中的项目 |
| **Shift + 鼠标滚轮** | 按鼠标位置缩放 |
| **Ctrl + A** | 全选 |
| **Ctrl + G** | 分组或取消分组选中的项目 |
| **Ctrl + D** | 复制选中的项目 |
| **Shift + 画线** | 限制线条为水平、垂直或 45° 对角线 |
| **Ctrl + X** | 剪切选中的项目 |
| **Ctrl + C / V** | 复制/粘贴选中的项目 |

---

## 附录

### 附录 A：支持的设备

支持设备：Modbus RTU/TCP、Siemens S7 Protocol、OPC-UA、BACnet IP、MQTT、Ethernet/IP (Allen Bradley)

### 附录 B：技术栈

- **后端**：NodeJS
- **前端**：HTML5、CSS、JavaScript、Angular、SVG
- **数据库**：SQLite（内置）

### 附录 C：相关资源

- 官方网站：https://frangoteam.org/
- GitHub 仓库：https://github.com/frangoteam/FUXA
- Docker 镜像：frangoteam/fuxa:latest

---

*本文档由 Claude Code 自动翻译整理，仅供学习参考。请以官方英文文档为准。*
