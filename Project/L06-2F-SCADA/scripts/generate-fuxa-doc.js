const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, BorderStyle, WidthType, ShadingType, PageOrientation, AlignmentType, LevelFormat, PageBreak, PageNumber, Header, Footer } = require('docx');
const fs = require('fs');

// 创建文档
const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 22 }
      }
    },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 44, bold: true, font: "Arial", color: "1F4E78" },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Arial", color: "2E75B6" },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840, orientation: PageOrientation.PORTRAIT },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: "FUXA 中文使用手册", font: "Arial", size: 18, color: "666666" })]
          })
        ]
      })
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "页码: ", font: "Arial", size: 18 }),
              new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 18 }),
              new TextRun({ text: " / ", font: "Arial", size: 18 }),
              new TextRun({ children: [PageNumber.TOTAL_PAGES], font: "Arial", size: 18 })
            ]
          })
        ]
      })
    },
    children: [
      // 封面
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: " ", size: 60 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 }, children: [new TextRun({ text: " ", size: 60 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 }, children: [new TextRun({ text: " ", size: 60 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 }, children: [new TextRun({ text: "FUXA", size: 80, bold: true, color: "1F4E78" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 }, children: [new TextRun({ text: "中文使用手册", size: 48, color: "2E75B6" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: " ", size: 36 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "基于 Web 的开源 SCADA/HMI/Dashboard/IIoT 系统", size: 24, color: "666666" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 800 }, children: [new TextRun({ text: "版本: 1.0", size: 20, color: "666666" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "frangoteam 出品", size: 20, color: "666666" })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // 目录
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("目录")] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "1. FUXA 简介 ", font: "Arial", size: 20 })] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "2. 入门指南 ", font: "Arial", size: 20 })] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "3. 安装和运行 ", font: "Arial", size: 20 })] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "4. 设备和标签配置 ", font: "Arial", size: 20 })] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "5. 控件绑定 ", font: "Arial", size: 20 })] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "6. 图表控件 ", font: "Arial", size: 20 })] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "7. UI 布局设置 ", font: "Arial", size: 20 })] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "8. 报警配置 ", font: "Arial", size: 20 })] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "9. 形状定义 ", font: "Arial", size: 20 })] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "10. 管道动画 ", font: "Arial", size: 20 })] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "11. 调度器 ", font: "Arial", size: 20 })] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "12. Node-RED 集成 ", font: "Arial", size: 20 })] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "13. 项目保存和加载 ", font: "Arial", size: 20 })] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "14. 事件配置 ", font: "Arial", size: 20 })] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "15. 视图复用 ", font: "Arial", size: 20 })] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "16. 脚本配置 ", font: "Arial", size: 20 })] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "17. ODBC 配置 ", font: "Arial", size: 20 })] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "18. 小部件开发 ", font: "Arial", size: 20 })] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "19. WebSocket 集成 ", font: "Arial", size: 20 })] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "20. 服务器设置 ", font: "Arial", size: 20 })] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "21. 技巧和快捷键 ", font: "Arial", size: 20 })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // 第1章 FUXA 简介
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("1. FUXA 简介")] }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "FUXA 是一款强大的基于 Web 的开源软件，用于快速构建和部署可扩展的 SCADA、HMI、Dashboard 或 IIoT 系统。使用 FUXA，您可以为机器创建具有个性化设计的现代流程可视化，以及自动化工业工厂的实时数据显示和控制仪器。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.1 用户界面")] }),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "FUXA 由两个不同的视图组成：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• FUXA-editor：用于编辑项目", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• FUXA-view：用于显示可视化项目的产品", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.2 核心特性")]}),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("无许可证费用")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "FUXA 不需要任何运行时许可证。您可以构建任意数量和大小的 HMI 项目，无需担心后续的运行时环境许可问题。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("1.2.1 通信协议")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "FUXA 平台包含以下连接器以实现直接通信：", size: 22 })] }),

      // 通信协议表格
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3000, 6360],
        rows: [
          new TableRow({
            children: [
              new TableCell({ shading: { fill: "D5E8F0", type: ShadingType.CLEAR }, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "协议类型", bold: true })] })] }),
              new TableCell({ shading: { fill: "D5E8F0", type: ShadingType.CLEAR }, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "说明", bold: true })] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("OPC UA")] })] }),
              new TableCell({ width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("OPC UA 连接客户端")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("S7 Protocol")] })] }),
              new TableCell({ width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("通过以太网与西门子 CPU 200、300、400、1200 和 1500 通信")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Modbus RTU/TCP")] })] }),
              new TableCell({ width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Modbus 通信协议")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("BACnet IP")] })] }),
              new TableCell({ width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("建筑自动化协议")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("MQTT")] })] }),
              new TableCell({ width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("消息队列遥测传输")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Ethernet/IP")] })] }),
              new TableCell({ width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Allen Bradley 以太网/IP")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("WebAPI")] })] }),
              new TableCell({ width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Web 应用程序接口")] })] })
            ]
          })
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("1.2.2 跨平台全栈")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "该系统设计为可在各种操作系统上运行，安装简便。后端使用 NodeJs 开发。用户界面是可扩展的 HTML5 Web 前端，使用 Web 技术（HTML5、CSS、Javascript、Angular、SVG）开发，与所有现代浏览器兼容。", size: 22 })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // 第2章 入门指南
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("2. 入门指南")] }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "本教程的目标是演示 FUXA 最常用功能的基本用法。您将学习如何：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• 连接设备到 FUXA", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• 将数据从设备推送到 FUXA", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• 构建实时 GUI SCADA/HMI/Dashboard", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• 定义阈值并触发报警", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.1 前提条件")] }),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "您需要先启动 FUXA 服务器。请参考安装指南安装 FUXA。FUXA UI 可通过以下 URL 访问：http://localhost:1881", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "FUXA Web 服务器主要提供两个页面：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• 可视化页面（最终用户）：http://localhost:1881/home", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• 编辑器（项目设计和编辑）：http://localhost:1881/editor", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.2 步骤1：连接设备并配置标签")] }),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "要连接设备，您需要先获取设备凭据。FUXA 支持各种设备：Modbus RTU/TCP、Siemens S7 Protocol、OPC-UA、BACnet IP、MQTT、Ethernet/IP (Allen Bradley)。连接设备后，您可以配置实时值订阅、标签（Tags）、传感器等。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.3 步骤2：创建可视化")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "我们将创建一个视图并添加最常用的小部件。", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "2.3.1 创建空白视图", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "2.3.2 将控件绑定到视图", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "2.3.3 将形状绑定到视图", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "2.3.4 将图表控件绑定到视图", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.4 步骤3：配置UI布局")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "参考 HowTo UI Layout 文档。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.5 步骤4：配置报警")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "参考 HowTo setup Alarms 文档。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.6 步骤5：激活并创建客户用户")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "（内容待补充）", size: 22 })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // 第3章 安装和运行
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("3. 安装和运行")] }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "FUXA 是由 NodeJS（后端）和 Angular（前端）开发的软件。以下介绍多种安装和运行方式：", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.1 预构建 Electron 应用")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "需要登录 GitHub 才能访问下载按钮。访问 Electron Action Builds 页面，点击对应系统的 Artifacts 下载图标。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.2 网页浏览器访问")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "完成安装后，通过默认端口 1881 访问 FUXA Web 界面。可使用 localhost:1881 或主机 IP:1881 访问。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.3 Docker Compose")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "提供 Docker Compose 安装方式，包括创建目录、编辑 compose 文件等步骤。示例配置使用 host 网络模式，并配置了卷挂载用于持久化存储。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.4 Docker")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "命令安装：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "docker pull frangoteam/fuxa:latest", size: 20, font: "Consolas" })] }),
      new Paragraph({ children: [new TextRun({ text: "docker run -d -p 1881:1881 frangoteam/fuxa:latest", size: 20, font: "Consolas" })] }),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "带持久化存储的完整命令：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "docker run -d -p 1881:1881 -v fuxa_db:/usr/src/app/fuxa/server/db frangoteam/fuxa:latest", size: 20, font: "Consolas" })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.5 从源码构建自定义 Docker 镜像")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "从最新 master 分支构建自定义 Docker 镜像的步骤。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.6 使用 Node 和 NPM 安装")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "需要安装 Node.js Version 18。提供了两种选择：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• NPM 全局安装", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• 下载最新 release 包并手动安装", size: 22 })] }),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "警告：在 Linux 上使用 Node.js Version 18 安装可能存在挑战。", size: 22, color: "C00000" })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.7 设置为 HMI（仅 Linux）")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "仅在 Linux 上测试过的 HMI 设置方法。使用 Electron 替代网页浏览器，适合触摸屏使用。包含完整的服务自启动配置步骤。", size: 22 })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // 第4章 设备和标签配置
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("4. 设备和标签配置")] }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "要添加设备和标签，请前往编辑器中的 Connections（连接）。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.1 OPCUA 设备")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "添加并连接一个 OPCUA 设备。要添加 OPCUA 标签，设备必须已连接。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.2 Modbus 连接")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "添加 Modbus 连接需要先在 Plugins 中安装驱动。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.3 MQTT 连接")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "添加一个 MQTT 连接和主题订阅。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.4 WebAPI 连接")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "添加一个 WebAPI 连接和 JSON 结果的标签。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.5 标签选项")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "如果存在未定义数据类型的标签类型，可以进行设置。例如：TIME 数据类型不是预定义类型，但其基础数据类型通常是 int64 或 uint64，时间单位为毫秒。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.6 缩放脚本")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "可使用缩放脚本进行任何数据类型转换。例如：TIME 数据是一个包含 LOW 和 HIGH 的数组，可以创建简单的脚本来获取数组元素并将其作为数字类型返回。写操作时也可以返回实际的标签值。", size: 22 })] }),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "重要提示：脚本参数必须命名为 \"value\"，因为存在一个过滤器用于显示相关脚本以供选择。不支持在脚本中使用注释。", size: 22, color: "C00000" })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // 第5章 控件绑定
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("5. 控件绑定")] }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "本章节介绍如何将各种控件绑定到设备标签（变量）。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.1 绑定 Output 控件")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "要将 Output 控件绑定到设备标签（变量），需要进入编辑器并选择视图。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.2 绑定 Input 控件")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "要将 Input 控件绑定到设备标签。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.3 绑定 Select 控件")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "要将 Select 控件绑定到设备标签。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.4 绑定 Slider 控件")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "要将 Slider 控件绑定到设备标签。", size: 22 })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // 第6章 图表控件
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("6. 图表控件")] }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "要向视图添加图表控件，请进入编辑器并选择该视图。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.1 折线图配置")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "在折线图中，您可以定义要附加到图表控件的图表。", size: 22 })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // 第7章 UI布局设置
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("7. UI 布局设置")] }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "本页面描述如何通过编辑器中的 Layout settings（布局设置）来定义最终用户界面的布局。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("7.1 General（常规）选项卡设置")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "在 General 选项卡中，您可以定义：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• Start View：访问应用时显示的第一个视图（主页）", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• Zoom：启用后，可以使用鼠标滚轮缩放视图，使用鼠标左键移动视图", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• Dialog Mode of input field：启用后，将显示输入值控制的对话框", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• Show Navigation：设置显示或隐藏标题栏和导航菜单", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• 隐藏开发按钮以在编辑和主页之间切换", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("7.2 Navigation Side Menu（导航侧边栏）选项卡")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "在 Navigation Side Menu 选项卡中，您可以定义：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• 菜单项", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• 不同的样式属性", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("7.3 Header Navigation Bar（标题导航栏）选项卡")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "在 Header Navigation Bar 选项卡中，您可以定义：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• 是否以及如何显示报警通知项", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• 不同的样式属性", size: 22 })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // 第8章 报警配置
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("8. 报警配置")] }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "本章节介绍如何在 FUXA 中配置报警功能。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("8.1 配置报警")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "要配置报警，请在编辑器中进入 Alarms 选项。报警绑定到一个标签，可以定义四种类型的条件，分别对应不同的级别（High High、High、Low 和 Message）。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("8.2 查看报警")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "活动报警和历史记录可以通过菜单或标题栏按钮配置视图来显示。请参考 Layout settings。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("8.3 报警操作")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "还可以为每个报警配置多个操作，例如显示弹出对话框或设置标签的值。", size: 22 })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // 第9章 形状定义
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("9. 形状定义")] }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "本章节介绍如何在 FUXA 项目中定义自定义 SVG 形状。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("9.1 形状文件夹位置")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "• 生产环境：client/dist/assets/lib/svgeditor/shapes", size: 20, font: "Consolas" })] }),
      new Paragraph({ children: [new TextRun({ text: "• 开发环境：client/src/lib/svgeditor/shapes", size: 20, font: "Consolas" })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("9.2 定义新形状")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "创建新的 JavaScript 文件（建议复制 my-shapes.js 作为模板），需要定义以下内容：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "1. 形状组名称：var shapesGroupName = 'Shapes';", size: 20, font: "Consolas" })] }),
      new Paragraph({ children: [new TextRun({ text: "2. 类型标识符：var typeId = 'shapes';", size: 20, font: "Consolas" })] }),
      new Paragraph({ children: [new TextRun({ text: "3. 形状数据数组", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("9.3 加载新形状")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "编辑 shapesLoader.js 文件，将新形状文件添加到加载列表：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "var shapesLoader = ['my-shapes.js', 'your shape file name.js'];", size: 20, font: "Consolas" })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("9.4 自定义组件")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "如需创建新形状类型（例如自定义动画），需要实现相应的 Angular 组件，可参考 client/src/app/gauges/shapes/ 目录下的文件。", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "建议使用 Inkscape 应用程序设计形状，可通过 XML 编辑器查看元素和节点属性。", size: 22 })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // 第10章 管道动画
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("10. 管道动画")] }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "首先设计管道的形状，然后通过将设备标签（变量）与动画绑定来定义动作。", size: 22 })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // 第11章 调度器
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("11. 调度器")] }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "调度器是 FUXA 中基于时间的强大自动化系统，允许您创建基于星期几、月份和日期的特定时间触发的事件。它提供定时器模式（开关时段）和事件模式（持续时间触发），具有完整的设备控制能力。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("11.1 调度模式")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "星期模式：默认调度模式，允许您选择一周中的特定日子。", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "月份模式：高级调度，结合月份和日期选择进行精确控制。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("11.2 定时器模式 vs 事件模式")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "定时器模式：定义开始和结束时间，标签在时间段内保持开启。", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "事件模式：设置持续时间，标签在指定持续时间后自动关闭。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("11.3 授权")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "调度设备自动获得主授权级别，用户必须至少具有主授权才能与调度设备交互。", size: 22 })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // 第12章 Node-RED集成
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("12. Node-RED 集成")] }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "FUXA 包含完整的 Node-RED 集成，用于创建与 SCADA 系统交互的自动化流程。Node-RED 自动包含在 FUXA 中，无需额外安装。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("12.1 设置和安装")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "• Node-RED in FUXA：自动包含；通过 FUXA 设置菜单访问", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• Dashboard 2：必须通过 Node-RED 的 Manage Palette 单独安装", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• 所需依赖：@flowfuse/node-red-dashboard 和 node-red-contrib-fuxa（自动包含）", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("12.2 FUXA 贡献节点")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "标签节点：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• get-tag：获取当前标签值", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• set-tag：向标签写入值", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• get-tag-change：监控标签值变化", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• get-historical-tags：获取多个标签的历史数据", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "设备节点：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• enable-device：启用/禁用设备连接", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• get-device：获取设备信息", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "报警节点：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• get-alarms：获取当前活动报警", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• get-history-alarms：获取历史报警数据", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• ack-alarm：确认报警", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "视图节点：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• set-view：更改当前视图", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• open-card：打开特定卡片/对话框", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "脚本节点：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• execute-script：执行 FUXA 脚本", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("12.3 访问 Node-RED")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "• 编辑器：Settings → Node-RED section → Open Node-RED Editor", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• Dashboard 2：通过 FUXA 视图中的 iframe 访问，使用 URL /dashboard 或 /dashboard/page1", size: 22 })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // 第13章 项目保存和加载
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("13. 项目保存和加载")] }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "13.1 创建项目", size: 22 })] }),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "您可以创建新项目，当前项目将被新的空白项目覆盖（仅包含空白 MainView）。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("13.2 保存项目")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "项目将在每次设置更改后自动保存在内部数据库中（对话框确认后）。视图在选择另一个或离开编辑器时会自动保存。", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "通过 Save Project（保存项目）可以强制执行内部保存过程。", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "通过 Save Project As…（另存为）可以将整个项目导出为 JSON 格式文件（MyProject.json），用于制作项目备份。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("13.3 打开项目")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "您可以从导出的文件（MyProject.json）打开项目。", size: 22 })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // 第14章 事件配置
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("14. 事件配置")] }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "在 Shapes 和 button control 中，您可以配置鼠标 Events（点击、mouseDown、mouseUp）来执行任务。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("14.1 事件类型")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "1. Open Page（打开页面）：用于在主窗口中显示 View。", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "2. Open Card（打开卡片）：用于将 View 显示为弹出窗口。Card 会在事件触发时显示在鼠标旁边。", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "3. Open Dialog（打开对话框）：用于将 View 显示为对话框，通常用于配置数值。", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "4. Open iframe（打开嵌入式窗口）：用于打开外部 HTML 文档作为 iframe。", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "5. Open Window（打开新窗口）：用于在新的浏览器窗口中打开窗口。", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "6. Set Value（设置值）：用于设置标签值或增加/减少当前值。", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "7. Toggle Value（切换值）：用于切换标签值（如果为 1 则设为 0，如果为 0 则设为 1）。", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "8. Set from Input and Close（输入后设置并关闭）：组合使用可通过带有确认对话框设置一些数值。", size: 22 })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // 第15章 视图复用
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("15. 视图复用")] }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "您可以将相同的视图重用于重复的组件，例如泵和阀门。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("15.1 定义内部设备")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "• 将设备定义为内部设备", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• 创建一些变量（标签）", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• 将这些变量绑定到可重用视图的控件", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("15.2 配置事件")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "• 在每个组件中定义事件以打开对话框", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• 在事件中定义内部标签与设备标签的连接", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("15.3 添加确认按钮（可选）")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "如有需要，可以添加确认按钮。", size: 22 })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // 第16章 脚本配置
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("16. 脚本配置")] }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "要配置脚本，请前往编辑器中的 Scripts。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("16.1 创建脚本")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "添加新脚本（脚本是一个 JavaScript 函数），配置函数名和参数，有两种类型的参数：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• Tag ID", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• Value, number or string", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("16.2 系统调用")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "您可以在函数中编写逻辑，可以使用以下系统调用：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• $setTag：设置标签的值", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• $getTag：获取当前标签值", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("16.3 测试脚本")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "您可以测试脚本，使用 console.log 方法验证其正确性。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("16.4 定时器清理")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "如果脚本中使用 setInterval，正确的处理方式非常重要。例如：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "if (typeof globalThis.myTimer === 'undefined') globalThis.myTimer = null;", size: 18, font: "Consolas" })] }),
      new Paragraph({ children: [new TextRun({ text: "if (!globalThis.myTimer) globalThis.myTimer = setInterval(myTimerFunction, 1000);", size: 18, font: "Consolas" })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // 第17章 ODBC配置
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("17. ODBC 配置")] }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "（内容待补充）", size: 22 })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // 第18章 小部件开发
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("18. 小部件开发")] }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Fuxa.widgets 使用纯 SVG 结合 JavaScript（通过 script 标签）实现互动功能。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("18.1 数据传输变量")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "FUXA 提供四种参数类型用于数据交换：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• _pb_ — 布尔值参数（true 或 false）", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• _pn_ — 数字参数（整数、浮点数等）", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• _ps_ — 字符串参数", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• _pc_ — 颜色参数（十六进制颜色码，如 #00ff00ff）", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("18.2 变量导出规则")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "变量必须包裹在特定注释中才能被 FUXA 识别：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "//!export-start", size: 18, font: "Consolas" })] }),
      new Paragraph({ children: [new TextRun({ text: "let _pn_value = 50;", size: 18, font: "Consolas" })] }),
      new Paragraph({ children: [new TextRun({ text: "//!export-end", size: 18, font: "Consolas" })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("18.3 数据传输函数")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "发送数据至 FUXA：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "function postValue(id, value) { ... }", size: 18, font: "Consolas" })] }),
      new Paragraph({ children: [new TextRun({ text: "从 FUXA 接收数据：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "function putValue(id, value) { ... }", size: 18, font: "Consolas" })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("18.4 定时器清理")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "使用 setInterval 时，必须在离开页面或进入编辑器时清除计时器。", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "必须为 SVG 设定 ID：<svg id=\"svgIdName\">", size: 20, font: "Consolas" })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // 第19章 WebSocket集成
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("19. WebSocket 集成")] }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "WebSocket 是一种与 Node-Red 等其他 Web 应用程序通信的简单方式。我们可以直接在 FUXA 脚本中使用 WebSocket。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("19.1 重要前提")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "• 脚本必须是服务器端脚本（Server side script）", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• 必须设置为启动时运行（on Startup）", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "• 需要已运行的 WebSocket 服务器", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("19.2 代码示例")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "以下是一个双向数据传输的示例：将所有 FUXA 标签和值包装成带有时间戳和 Payload 的 JSON 数据对象。", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "const WebSocket = require('/usr/src/app/FUXA/server/node_modules/ws');", size: 16, font: "Consolas" })] }),
      new Paragraph({ children: [new TextRun({ text: "// 更多代码见 FUXA 官方 Wiki", size: 18, font: "Consolas" })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("19.3 JSON 数据格式")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "发送和接收的数据格式如下：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "{", size: 18, font: "Consolas" })] }),
      new Paragraph({ children: [new TextRun({ text: "  \"data\": {", size: 18, font: "Consolas" })] }),
      new Paragraph({ children: [new TextRun({ text: "    \"timestamp\": \"2024-11-19T12:00:00.000Z\",", size: 18, font: "Consolas" })] }),
      new Paragraph({ children: [new TextRun({ text: "    \"payload\": { \"yourTagName1\": \"value1\" }", size: 18, font: "Consolas" })] }),
      new Paragraph({ children: [new TextRun({ text: "  }", size: 18, font: "Consolas" })] }),
      new Paragraph({ children: [new TextRun({ text: "}", size: 18, font: "Consolas" })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // 第20章 服务器设置
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("20. 服务器设置")] }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "服务器设置位于 server_appdata/settings.js 文件中。更改后需要重启服务器。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("20.1 身份验证")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "启用和配置身份验证的设置：", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "secureEnabled: true,            // 启用或禁用", size: 18, font: "Consolas" })] }),
      new Paragraph({ children: [new TextRun({ text: "secretCode: 'frangoteam751',    // 编码令牌的密钥", size: 18, font: "Consolas" })] }),
      new Paragraph({ children: [new TextRun({ text: "tokenExpiresIn: '1h'           // 令牌过期延迟", size: 18, font: "Consolas" })] }),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "默认用户 'admin' 的密码为 '123456'，当然可以自行更改。", size: 22, color: "C00000" })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // 第21章 技巧和快捷键
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("21. 技巧和快捷键")] }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "本章节介绍 FUXA 编辑器的键盘快捷键。", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("21.1 编辑器键盘快捷键")]}),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "Ctrl + Left / Right：旋转选中的项目", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "Ctrl + Shift + Left / Right：大幅旋转选中的项目", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "Shift + O / P：选择上一个/下一个项目", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "Tab / Shift + Tab：选择上一个/下一个项目", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "Ctrl + Up / Down：中心缩放", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "Ctrl + Z / Y：撤销/重做", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "Shift + '用鼠标调整选中的项目大小'：锁定宽度和高度", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "Shift + Up / Down / Left / Right：移动选中的项目", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "Shift + SCROLLER：根据鼠标位置缩放", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "Ctrl + A：选择所有项目", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "Ctrl + G：组合或取消组合选中的项目", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "Ctrl + D：复制选中的项目", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "Shift + '绘制线条'：线条水平、垂直、45度对角渐变", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "Ctrl + X：剪切选中的项目", size: 22 })] }),
      new Paragraph({ children: [new TextRun({ text: "Ctrl + C / V：复制/粘贴选中的项目", size: 22 })] }),

      // 文档结束
    ]
  }]
});

// 生成文档
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('E:/AI_Code_Learning/Claude_Code/Project/L06-2F-SCADA/docs/FUXA-使用手册.docx', buffer);
  console.log('文档已生成: FUXA-使用手册.docx');
}).catch(err => {
  console.error('生成文档时出错:', err);
});
