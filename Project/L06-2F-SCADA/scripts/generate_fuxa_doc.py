# -*- coding: utf-8 -*-
"""
FUXA 中文使用手册生成脚本
使用 python-docx 生成包含图片的 Word 文档
"""

from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
import os
import requests

# 确保图片目录存在
IMAGE_DIR = "images"
if not os.path.exists(IMAGE_DIR):
    os.makedirs(IMAGE_DIR)

# FUXA Wiki 图片 URLs (从 wiki 仓库获取)
IMAGE_URLS = {
    "fuxa-editor": "https://raw.githubusercontent.com/frangoteam/FUXA.wiki/master/images/fuxa-editor.png",
    "fuxa-view": "https://raw.githubusercontent.com/frangoteam/FUXA.wiki/master/images/fuxa-view.png",
    "fuxa-project": "https://raw.githubusercontent.com/frangoteam/FUXA.wiki/master/images/fuxa-project.png",
    "fuxa-chart": "https://raw.githubusercontent.com/frangoteam/FUXA.wiki/master/images/fuxa-chart.gif",
    "setup-charts": "https://raw.githubusercontent.com/frangoteam/FUXA.wiki/master/images/setup-charts.png",
    "fuxa-pipe": "https://raw.githubusercontent.com/frangoteam/FUXA.wiki/master/images/fuxa-pipe.gif",
}

def download_image(name, url):
    """下载图片并返回本地路径"""
    filepath = os.path.join(IMAGE_DIR, f"{name}.png")
    if os.path.exists(filepath):
        return filepath
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            with open(filepath, 'wb') as f:
                f.write(response.content)
            print(f"下载成功: {name}")
            return filepath
    except Exception as e:
        print(f"下载失败 {name}: {e}")
    return None

# 尝试下载图片
print("正在下载 Wiki 图片...")
for name, url in IMAGE_URLS.items():
    download_image(name, url)

# 创建 Word 文档
doc = Document()

# 设置中文字体
style = doc.styles['Normal']
style.font.name = 'Arial'
style.font.size = Pt(11)
style._element.rPr.rFonts.set(qn('w:eastAsia'), '微软雅黑')

# 封面
title = doc.add_paragraph()
title.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = title.add_run("\n\n\n\n")
run.font.size = Pt(60)
run.bold = True
run.font.color.rgb = RGBColor(31, 78, 120)

run = title.add_run("FUXA\n")
run.font.size = Pt(60)
run.bold = True
run.font.color.rgb = RGBColor(31, 78, 120)

run = title.add_run("中文使用手册")
run.font.size = Pt(40)
run.font.color.rgb = RGBColor(46, 117, 182)

doc.add_paragraph()

subtitle = doc.add_paragraph()
subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = subtitle.add_run("基于 Web 的开源 SCADA/HMI/Dashboard/IIoT 系统\n\n")
run.font.size = Pt(18)

run = subtitle.add_run("版本: 1.0\n")
run.font.size = Pt(14)
run = subtitle.add_run("frangoteam 出品")
run.font.size = Pt(14)

doc.add_page_break()

# 目录
doc.add_heading('目 录', level=1)
toc_items = [
    "1. FUXA 简介",
    "2. 入门指南",
    "3. 安装和运行",
    "4. 设备和标签配置",
    "5. 控件绑定",
    "6. 图表控件",
    "7. UI 布局设置",
    "8. 报警配置",
    "9. 形状定义",
    "10. 管道动画",
    "11. 调度器",
    "12. Node-RED 集成",
    "13. 项目保存和加载",
    "14. 事件配置",
    "15. 视图复用",
    "16. 脚本配置",
    "17. ODBC 配置",
    "18. 小部件开发",
    "19. WebSocket 集成",
    "20. 服务器设置",
    "21. 技巧和快捷键",
]
for item in toc_items:
    p = doc.add_paragraph(item)
    p.paragraph_format.space_after = Pt(6)

doc.add_page_break()

# 第1章 FUXA 简介
doc.add_heading('1. FUXA 简介', level=1)
doc.add_paragraph("FUXA 是一款强大的基于 Web 的开源软件，用于快速构建和部署可扩展的 SCADA、HMI、Dashboard 或 IIoT 系统。使用 FUXA，您可以为机器创建具有个性化设计的现代流程可视化，以及自动化工业工厂的实时数据显示和控制仪器。")

doc.add_heading('1.1 用户界面', level=2)
doc.add_paragraph("FUXA 由两个不同的视图组成：")
doc.add_paragraph("• FUXA-editor：用于编辑项目", style='List Bullet')
doc.add_paragraph("• FUXA-view：用于显示可视化项目的产品", style='List Bullet')

doc.add_heading('1.2 核心特性', level=2)

doc.add_heading('无许可证费用', level=3)
doc.add_paragraph("FUXA 不需要任何运行时许可证。您可以构建任意数量和大小的 HMI 项目，无需担心后续的运行时环境许可问题。")

doc.add_heading('1.2.1 通信协议', level=3)
doc.add_paragraph("FUXA 平台包含以下连接器以实现直接通信：")

# 通信协议表格
table = doc.add_table(rows=9, cols=2)
table.style = 'Light Grid Accent 1'
hdr_cells = table.rows[0].cells
hdr_cells[0].text = '协议类型'
hdr_cells[1].text = '说明'

protocols = [
    ("OPC UA", "OPC UA 连接客户端"),
    ("S7 Protocol", "通过以太网与西门子 CPU 200、300、400、1200 和 1500 通信"),
    ("Modbus RTU/TCP", "Modbus 通信协议"),
    ("BACnet IP", "建筑自动化协议"),
    ("MQTT", "消息队列遥测传输"),
    ("Ethernet/IP", "Allen Bradley 以太网/IP"),
    ("WebAPI", "Web 应用程序接口"),
]
for i, (proto, desc) in enumerate(protocols):
    row = table.rows[i+1].cells
    row[0].text = proto
    row[1].text = desc

doc.add_heading('1.2.2 跨平台全栈', level=3)
doc.add_paragraph("该系统设计为可在各种操作系统上运行，安装简便。后端使用 NodeJs 开发。用户界面是可扩展的 HTML5 Web 前端，使用 Web 技术（HTML5、CSS、Javascript、Angular、SVG）开发，与所有现代浏览器兼容。")

doc.add_page_break()

# 第2章 入门指南
doc.add_heading('2. 入门指南', level=1)
doc.add_paragraph("本教程的目标是演示 FUXA 最常用功能的基本用法。您将学习如何：")
doc.add_paragraph("• 连接设备到 FUXA", style='List Bullet')
doc.add_paragraph("• 将数据从设备推送到 FUXA", style='List Bullet')
doc.add_paragraph("• 构建实时 GUI SCADA/HMI/Dashboard", style='List Bullet')
doc.add_paragraph("• 定义阈值并触发报警", style='List Bullet')

doc.add_heading('2.1 前提条件', level=2)
doc.add_paragraph("您需要先启动 FUXA 服务器。请参考安装指南安装 FUXA。FUXA UI 可通过以下 URL 访问：http://localhost:1881")
doc.add_paragraph("FUXA Web 服务器主要提供两个页面：")
doc.add_paragraph("• 可视化页面（最终用户）：http://localhost:1881/home", style='List Bullet')
doc.add_paragraph("• 编辑器（项目设计和编辑）：http://localhost:1881/editor", style='List Bullet')

doc.add_heading('2.2 步骤1：连接设备并配置标签', level=2)
doc.add_paragraph("要连接设备，您需要先获取设备凭据。FUXA 支持各种设备：Modbus RTU/TCP、Siemens S7 Protocol、OPC-UA、BACnet IP、MQTT、Ethernet/IP (Allen Bradley)。连接设备后，您可以配置实时值订阅、标签（Tags）、传感器等。")

doc.add_heading('2.3 步骤2：创建可视化', level=2)
doc.add_paragraph("我们将创建一个视图并添加最常用的小部件。")
doc.add_paragraph("2.3.1 创建空白视图")
doc.add_paragraph("2.3.2 将控件绑定到视图")
doc.add_paragraph("2.3.3 将形状绑定到视图")
doc.add_paragraph("2.3.4 将图表控件绑定到视图")

doc.add_heading('2.4 步骤3：配置UI布局', level=2)
doc.add_paragraph("参考 HowTo UI Layout 文档。")

doc.add_heading('2.5 步骤4：配置报警', level=2)
doc.add_paragraph("参考 HowTo setup Alarms 文档。")

doc.add_heading('2.6 步骤5：激活并创建客户用户', level=2)
doc.add_paragraph("（内容待补充）")

doc.add_page_break()

# 第3章 安装和运行
doc.add_heading('3. 安装和运行', level=1)
doc.add_paragraph("FUXA 是由 NodeJS（后端）和 Angular（前端）开发的软件。以下介绍多种安装和运行方式：")

doc.add_heading('3.1 预构建 Electron 应用', level=2)
doc.add_paragraph("需要登录 GitHub 才能访问下载按钮。访问 Electron Action Builds 页面，点击对应系统的 Artifacts 下载图标。")

doc.add_heading('3.2 网页浏览器访问', level=2)
doc.add_paragraph("完成安装后，通过默认端口 1881 访问 FUXA Web 界面。可使用 localhost:1881 或主机 IP:1881 访问。")

doc.add_heading('3.3 Docker Compose', level=2)
doc.add_paragraph("提供 Docker Compose 安装方式，包括创建目录、编辑 compose 文件等步骤。示例配置使用 host 网络模式，并配置了卷挂载用于持久化存储。")

doc.add_heading('3.4 Docker', level=2)
doc.add_paragraph("命令安装：")
p = doc.add_paragraph()
p.add_run("docker pull frangoteam/fuxa:latest").font.name = 'Consolas'
p = doc.add_paragraph()
p.add_run("docker run -d -p 1881:1881 frangoteam/fuxa:latest").font.name = 'Consolas'

doc.add_paragraph("带持久化存储的完整命令：")
p = doc.add_paragraph()
p.add_run("docker run -d -p 1881:1881 -v fuxa_db:/usr/src/app/fuxa/server/db frangoteam/fuxa:latest").font.name = 'Consolas'

doc.add_heading('3.5 从源码构建自定义 Docker 镜像', level=2)
doc.add_paragraph("从最新 master 分支构建自定义 Docker 镜像的步骤。")

doc.add_heading('3.6 使用 Node 和 NPM 安装', level=2)
doc.add_paragraph("需要安装 Node.js Version 18。提供了两种选择：")
doc.add_paragraph("• NPM 全局安装", style='List Bullet')
doc.add_paragraph("• 下载最新 release 包并手动安装", style='List Bullet')
doc.add_paragraph("警告：在 Linux 上使用 Node.js Version 18 安装可能存在挑战。")

doc.add_heading('3.7 设置为 HMI（仅 Linux）', level=2)
doc.add_paragraph("仅在 Linux 上测试过的 HMI 设置方法。使用 Electron 替代网页浏览器，适合触摸屏使用。包含完整的服务自启动配置步骤。")

doc.add_page_break()

# 第4章 设备和标签配置
doc.add_heading('4. 设备和标签配置', level=1)
doc.add_paragraph("要添加设备和标签，请前往编辑器中的 Connections（连接）。")

doc.add_heading('4.1 OPCUA 设备', level=2)
doc.add_paragraph("添加并连接一个 OPCUA 设备。要添加 OPCUA 标签，设备必须已连接。")

doc.add_heading('4.2 Modbus 连接', level=2)
doc.add_paragraph("添加 Modbus 连接需要先在 Plugins 中安装驱动。")

doc.add_heading('4.3 MQTT 连接', level=2)
doc.add_paragraph("添加一个 MQTT 连接和主题订阅。")

doc.add_heading('4.4 WebAPI 连接', level=2)
doc.add_paragraph("添加一个 WebAPI 连接和 JSON 结果的标签。")

doc.add_heading('4.5 标签选项', level=2)
doc.add_paragraph("如果存在未定义数据类型的标签类型，可以进行设置。例如：TIME 数据类型不是预定义类型，但其基础数据类型通常是 int64 或 uint64，时间单位为毫秒。")

doc.add_heading('4.6 缩放脚本', level=2)
doc.add_paragraph("可使用缩放脚本进行任何数据类型转换。例如：TIME 数据是一个包含 LOW 和 HIGH 的数组，可以创建简单的脚本来获取数组元素并将其作为数字类型返回。写操作时也可以返回实际的标签值。")
doc.add_paragraph("重要提示：脚本参数必须命名为 \"value\"，因为存在一个过滤器用于显示相关脚本以供选择。不支持在脚本中使用注释。")

doc.add_page_break()

# 第5章 控件绑定
doc.add_heading('5. 控件绑定', level=1)
doc.add_paragraph("本章节介绍如何将各种控件绑定到设备标签（变量）。")

doc.add_heading('5.1 绑定 Output 控件', level=2)
doc.add_paragraph("要将 Output 控件绑定到设备标签（变量），需要进入编辑器并选择视图。")

doc.add_heading('5.2 绑定 Input 控件', level=2)
doc.add_paragraph("要将 Input 控件绑定到设备标签。")

doc.add_heading('5.3 绑定 Select 控件', level=2)
doc.add_paragraph("要将 Select 控件绑定到设备标签。")

doc.add_heading('5.4 绑定 Slider 控件', level=2)
doc.add_paragraph("要将 Slider 控件绑定到设备标签。")

doc.add_page_break()

# 第6章 图表控件
doc.add_heading('6. 图表控件', level=1)
doc.add_paragraph("要向视图添加图表控件，请进入编辑器并选择该视图。")

doc.add_heading('6.1 折线图配置', level=2)
doc.add_paragraph("在折线图中，您可以定义要附加到图表控件的图表。")

doc.add_page_break()

# 第7章 UI布局设置
doc.add_heading('7. UI 布局设置', level=1)
doc.add_paragraph("本页面描述如何通过编辑器中的 Layout settings（布局设置）来定义最终用户界面的布局。")

doc.add_heading('7.1 General（常规）选项卡设置', level=2)
doc.add_paragraph("在 General 选项卡中，您可以定义：")
doc.add_paragraph("• Start View：访问应用时显示的第一个视图（主页）", style='List Bullet')
doc.add_paragraph("• Zoom：启用后，可以使用鼠标滚轮缩放视图，使用鼠标左键移动视图", style='List Bullet')
doc.add_paragraph("• Dialog Mode of input field：启用后，将显示输入值控制的对话框", style='List Bullet')
doc.add_paragraph("• Show Navigation：设置显示或隐藏标题栏和导航菜单", style='List Bullet')
doc.add_paragraph("• 隐藏开发按钮以在编辑和主页之间切换", style='List Bullet')

doc.add_heading('7.2 Navigation Side Menu（导航侧边栏）选项卡', level=2)
doc.add_paragraph("在 Navigation Side Menu 选项卡中，您可以定义：")
doc.add_paragraph("• 菜单项", style='List Bullet')
doc.add_paragraph("• 不同的样式属性", style='List Bullet')

doc.add_heading('7.3 Header Navigation Bar（标题导航栏）选项卡', level=2)
doc.add_paragraph("在 Header Navigation Bar 选项卡中，您可以定义：")
doc.add_paragraph("• 是否以及如何显示报警通知项", style='List Bullet')
doc.add_paragraph("• 不同的样式属性", style='List Bullet')

doc.add_page_break()

# 第8章 报警配置
doc.add_heading('8. 报警配置', level=1)
doc.add_paragraph("本章节介绍如何在 FUXA 中配置报警功能。")

doc.add_heading('8.1 配置报警', level=2)
doc.add_paragraph("要配置报警，请在编辑器中进入 Alarms 选项。报警绑定到一个标签，可以定义四种类型的条件，分别对应不同的级别（High High、High、Low 和 Message）。")

doc.add_heading('8.2 查看报警', level=2)
doc.add_paragraph("活动报警和历史记录可以通过菜单或标题栏按钮配置视图来显示。请参考 Layout settings。")

doc.add_heading('8.3 报警操作', level=2)
doc.add_paragraph("还可以为每个报警配置多个操作，例如显示弹出对话框或设置标签的值。")

doc.add_page_break()

# 第9章 形状定义
doc.add_heading('9. 形状定义', level=1)
doc.add_paragraph("本章节介绍如何在 FUXA 项目中定义自定义 SVG 形状。")

doc.add_heading('9.1 形状文件夹位置', level=2)
doc.add_paragraph("• 生产环境：client/dist/assets/lib/svgeditor/shapes")
doc.add_paragraph("• 开发环境：client/src/lib/svgeditor/shapes")

doc.add_heading('9.2 定义新形状', level=2)
doc.add_paragraph("创建新的 JavaScript 文件（建议复制 my-shapes.js 作为模板），需要定义以下内容：")
doc.add_paragraph("1. 形状组名称：var shapesGroupName = 'Shapes';")
doc.add_paragraph("2. 类型标识符：var typeId = 'shapes';")
doc.add_paragraph("3. 形状数据数组")

doc.add_heading('9.3 加载新形状', level=2)
doc.add_paragraph("编辑 shapesLoader.js 文件，将新形状文件添加到加载列表：")
doc.add_paragraph("var shapesLoader = ['my-shapes.js', 'your shape file name.js'];")

doc.add_heading('9.4 自定义组件', level=2)
doc.add_paragraph("如需创建新形状类型（例如自定义动画），需要实现相应的 Angular 组件，可参考 client/src/app/gauges/shapes/ 目录下的文件。")
doc.add_paragraph("建议使用 Inkscape 应用程序设计形状，可通过 XML 编辑器查看元素和节点属性。")

doc.add_page_break()

# 第10章 管道动画
doc.add_heading('10. 管道动画', level=1)
doc.add_paragraph("首先设计管道的形状，然后通过将设备标签（变量）与动画绑定来定义动作。")

doc.add_page_break()

# 第11章 调度器
doc.add_heading('11. 调度器', level=1)
doc.add_paragraph("调度器是 FUXA 中基于时间的强大自动化系统，允许您创建基于星期几、月份和日期的特定时间触发的事件。它提供定时器模式（开关时段）和事件模式（持续时间触发），具有完整的设备控制能力。")

doc.add_heading('11.1 调度模式', level=2)
doc.add_paragraph("星期模式：默认调度模式，允许您选择一周中的特定日子。")
doc.add_paragraph("月份模式：高级调度，结合月份和日期选择进行精确控制。")

doc.add_heading('11.2 定时器模式 vs 事件模式', level=2)
doc.add_paragraph("定时器模式：定义开始和结束时间，标签在时间段内保持开启。")
doc.add_paragraph("事件模式：设置持续时间，标签在指定持续时间后自动关闭。")

doc.add_heading('11.3 授权', level=2)
doc.add_paragraph("调度设备自动获得主授权级别，用户必须至少具有主授权才能与调度设备交互。")

doc.add_page_break()

# 第12章 Node-RED集成
doc.add_heading('12. Node-RED 集成', level=1)
doc.add_paragraph("FUXA 包含完整的 Node-RED 集成，用于创建与 SCADA 系统交互的自动化流程。Node-RED 自动包含在 FUXA 中，无需额外安装。")

doc.add_heading('12.1 设置和安装', level=2)
doc.add_paragraph("• Node-RED in FUXA：自动包含；通过 FUXA 设置菜单访问", style='List Bullet')
doc.add_paragraph("• Dashboard 2：必须通过 Node-RED 的 Manage Palette 单独安装", style='List Bullet')
doc.add_paragraph("• 所需依赖：@flowfuse/node-red-dashboard 和 node-red-contrib-fuxa（自动包含）", style='List Bullet')

doc.add_heading('12.2 FUXA 贡献节点', level=2)
doc.add_paragraph("标签节点：")
doc.add_paragraph("• get-tag：获取当前标签值", style='List Bullet')
doc.add_paragraph("• set-tag：向标签写入值", style='List Bullet')
doc.add_paragraph("• get-tag-change：监控标签值变化", style='List Bullet')
doc.add_paragraph("• get-historical-tags：获取多个标签的历史数据", style='List Bullet')
doc.add_paragraph("设备节点：")
doc.add_paragraph("• enable-device：启用/禁用设备连接", style='List Bullet')
doc.add_paragraph("• get-device：获取设备信息", style='List Bullet')
doc.add_paragraph("报警节点：")
doc.add_paragraph("• get-alarms：获取当前活动报警", style='List Bullet')
doc.add_paragraph("• get-history-alarms：获取历史报警数据", style='List Bullet')
doc.add_paragraph("• ack-alarm：确认报警", style='List Bullet')
doc.add_paragraph("视图节点：")
doc.add_paragraph("• set-view：更改当前视图", style='List Bullet')
doc.add_paragraph("• open-card：打开特定卡片/对话框", style='List Bullet')
doc.add_paragraph("脚本节点：")
doc.add_paragraph("• execute-script：执行 FUXA 脚本", style='List Bullet')

doc.add_heading('12.3 访问 Node-RED', level=2)
doc.add_paragraph("• 编辑器：Settings → Node-RED section → Open Node-RED Editor")
doc.add_paragraph("• Dashboard 2：通过 FUXA 视图中的 iframe 访问，使用 URL /dashboard 或 /dashboard/page1")

doc.add_page_break()

# 第13章 项目保存和加载
doc.add_heading('13. 项目保存和加载', level=1)
doc.add_heading('13.1 创建项目', level=2)
doc.add_paragraph("您可以创建新项目，当前项目将被新的空白项目覆盖（仅包含空白 MainView）。")

doc.add_heading('13.2 保存项目', level=2)
doc.add_paragraph("项目将在每次设置更改后自动保存在内部数据库中（对话框确认后）。视图在选择另一个或离开编辑器时会自动保存。")
doc.add_paragraph("通过 Save Project（保存项目）可以强制执行内部保存过程。")
doc.add_paragraph("通过 Save Project As…（另存为）可以将整个项目导出为 JSON 格式文件（MyProject.json），用于制作项目备份。")

doc.add_heading('13.3 打开项目', level=2)
doc.add_paragraph("您可以从导出的文件（MyProject.json）打开项目。")

doc.add_page_break()

# 第14章 事件配置
doc.add_heading('14. 事件配置', level=1)
doc.add_paragraph("在 Shapes 和 button control 中，您可以配置鼠标 Events（点击、mouseDown、mouseUp）来执行任务。")

doc.add_heading('14.1 事件类型', level=2)
doc.add_paragraph("1. Open Page（打开页面）：用于在主窗口中显示 View。")
doc.add_paragraph("2. Open Card（打开卡片）：用于将 View 显示为弹出窗口。Card 会在事件触发时显示在鼠标旁边。")
doc.add_paragraph("3. Open Dialog（打开对话框）：用于将 View 显示为对话框，通常用于配置数值。")
doc.add_paragraph("4. Open iframe（打开嵌入式窗口）：用于打开外部 HTML 文档作为 iframe。")
doc.add_paragraph("5. Open Window（打开新窗口）：用于在新的浏览器窗口中打开窗口。")
doc.add_paragraph("6. Set Value（设置值）：用于设置标签值或增加/减少当前值。")
doc.add_paragraph("7. Toggle Value（切换值）：用于切换标签值（如果为 1 则设为 0，如果为 0 则设为 1）。")
doc.add_paragraph("8. Set from Input and Close（输入后设置并关闭）：组合使用可通过带有确认对话框设置一些数值。")

doc.add_page_break()

# 第15章 视图复用
doc.add_heading('15. 视图复用', level=1)
doc.add_paragraph("您可以将相同的视图重用于重复的组件，例如泵和阀门。")

doc.add_heading('15.1 定义内部设备', level=2)
doc.add_paragraph("• 将设备定义为内部设备", style='List Bullet')
doc.add_paragraph("• 创建一些变量（标签）", style='List Bullet')
doc.add_paragraph("• 将这些变量绑定到可重用视图的控件", style='List Bullet')

doc.add_heading('15.2 配置事件', level=2)
doc.add_paragraph("• 在每个组件中定义事件以打开对话框", style='List Bullet')
doc.add_paragraph("• 在事件中定义内部标签与设备标签的连接", style='List Bullet')

doc.add_heading('15.3 添加确认按钮（可选）', level=2)
doc.add_paragraph("如有需要，可以添加确认按钮。")

doc.add_page_break()

# 第16章 脚本配置
doc.add_heading('16. 脚本配置', level=1)
doc.add_paragraph("要配置脚本，请前往编辑器中的 Scripts。")

doc.add_heading('16.1 创建脚本', level=2)
doc.add_paragraph("添加新脚本（脚本是一个 JavaScript 函数），配置函数名和参数，有两种类型的参数：")
doc.add_paragraph("• Tag ID")
doc.add_paragraph("• Value, number or string")

doc.add_heading('16.2 系统调用', level=2)
doc.add_paragraph("您可以在函数中编写逻辑，可以使用以下系统调用：")
doc.add_paragraph("• $setTag：设置标签的值")
doc.add_paragraph("• $getTag：获取当前标签值")

doc.add_heading('16.3 测试脚本', level=2)
doc.add_paragraph("您可以测试脚本，使用 console.log 方法验证其正确性。")

doc.add_heading('16.4 定时器清理', level=2)
doc.add_paragraph("如果脚本中使用 setInterval，正确的处理方式非常重要。例如：")
p = doc.add_paragraph()
p.add_run("if (typeof globalThis.myTimer === 'undefined') globalThis.myTimer = null;").font.name = 'Consolas'
p = doc.add_paragraph()
p.add_run("if (!globalThis.myTimer) globalThis.myTimer = setInterval(myTimerFunction, 1000);").font.name = 'Consolas'

doc.add_page_break()

# 第17章 ODBC配置
doc.add_heading('17. ODBC 配置', level=1)
doc.add_paragraph("（内容待补充）")

doc.add_page_break()

# 第18章 小部件开发
doc.add_heading('18. 小部件开发', level=1)
doc.add_paragraph("Fuxa.widgets 使用纯 SVG 结合 JavaScript（通过 script 标签）实现互动功能。")

doc.add_heading('18.1 数据传输变量', level=2)
doc.add_paragraph("FUXA 提供四种参数类型用于数据交换：")
doc.add_paragraph("• _pb_ — 布尔值参数（true 或 false）", style='List Bullet')
doc.add_paragraph("• _pn_ — 数字参数（整数、浮点数等）", style='List Bullet')
doc.add_paragraph("• _ps_ — 字符串参数", style='List Bullet')
doc.add_paragraph("• _pc_ — 颜色参数（十六进制颜色码，如 #00ff00ff）", style='List Bullet')

doc.add_heading('18.2 变量导出规则', level=2)
doc.add_paragraph("变量必须包裹在特定注释中才能被 FUXA 识别：")
p = doc.add_paragraph()
p.add_run("//!export-start").font.name = 'Consolas'
p = doc.add_paragraph()
p.add_run("let _pn_value = 50;").font.name = 'Consolas'
p = doc.add_paragraph()
p.add_run("//!export-end").font.name = 'Consolas'

doc.add_heading('18.3 数据传输函数', level=2)
doc.add_paragraph("发送数据至 FUXA：")
doc.add_paragraph("function postValue(id, value) { ... }")
doc.add_paragraph("从 FUXA 接收数据：")
doc.add_paragraph("function putValue(id, value) { ... }")

doc.add_heading('18.4 定时器清理', level=2)
doc.add_paragraph("使用 setInterval 时，必须在离开页面或进入编辑器时清除计时器。")
doc.add_paragraph("必须为 SVG 设定 ID：<svg id=\"svgIdName\">")

doc.add_page_break()

# 第19章 WebSocket集成
doc.add_heading('19. WebSocket 集成', level=1)
doc.add_paragraph("WebSocket 是一种与 Node-Red 等其他 Web 应用程序通信的简单方式。我们可以直接在 FUXA 脚本中使用 WebSocket。")

doc.add_heading('19.1 重要前提', level=2)
doc.add_paragraph("• 脚本必须是服务器端脚本（Server side script）", style='List Bullet')
doc.add_paragraph("• 必须设置为启动时运行（on Startup）", style='List Bullet')
doc.add_paragraph("• 需要已运行的 WebSocket 服务器", style='List Bullet')

doc.add_heading('19.2 代码示例', level=2)
doc.add_paragraph("以下是一个双向数据传输的示例：将所有 FUXA 标签和值包装成带有时间戳和 Payload 的 JSON 数据对象。")
p = doc.add_paragraph()
p.add_run("const WebSocket = require('/usr/src/app/FUXA/server/node_modules/ws');").font.name = 'Consolas'

doc.add_heading('19.3 JSON 数据格式', level=2)
doc.add_paragraph("发送和接收的数据格式如下：")
p = doc.add_paragraph()
p.add_run("{").font.name = 'Consolas'
p = doc.add_paragraph()
p.add_run('  "data": {').font.name = 'Consolas'
p = doc.add_paragraph()
p.add_run('    "timestamp": "2024-11-19T12:00:00.000Z",').font.name = 'Consolas'
p = doc.add_paragraph()
p.add_run('    "payload": { "yourTagName1": "value1" }').font.name = 'Consolas'
p = doc.add_paragraph()
p.add_run("  }").font.name = 'Consolas'
p = doc.add_paragraph()
p.add_run("}").font.name = 'Consolas'

doc.add_page_break()

# 第20章 服务器设置
doc.add_heading('20. 服务器设置', level=1)
doc.add_paragraph("服务器设置位于 server_appdata/settings.js 文件中。更改后需要重启服务器。")

doc.add_heading('20.1 身份验证', level=2)
doc.add_paragraph("启用和配置身份验证的设置：")
p = doc.add_paragraph()
p.add_run("secureEnabled: true,            // 启用或禁用").font.name = 'Consolas'
p = doc.add_paragraph()
p.add_run("secretCode: 'frangoteam751',    // 编码令牌的密钥").font.name = 'Consolas'
p = doc.add_paragraph()
p.add_run("tokenExpiresIn: '1h'           // 令牌过期延迟").font.name = 'Consolas'
doc.add_paragraph("默认用户 'admin' 的密码为 '123456'，当然可以自行更改。")

doc.add_page_break()

# 第21章 技巧和快捷键
doc.add_heading('21. 技巧和快捷键', level=1)
doc.add_paragraph("本章节介绍 FUXA 编辑器的键盘快捷键。")

doc.add_heading('21.1 编辑器键盘快捷键', level=2)
doc.add_paragraph("Ctrl + Left / Right：旋转选中的项目")
doc.add_paragraph("Ctrl + Shift + Left / Right：大幅旋转选中的项目")
doc.add_paragraph("Shift + O / P：选择上一个/下一个项目")
doc.add_paragraph("Tab / Shift + Tab：选择上一个/下一个项目")
doc.add_paragraph("Ctrl + Up / Down：中心缩放")
doc.add_paragraph("Ctrl + Z / Y：撤销/重做")
doc.add_paragraph("Shift + '用鼠标调整选中的项目大小'：锁定宽度和高度")
doc.add_paragraph("Shift + Up / Down / Left / Right：移动选中的项目")
doc.add_paragraph("Shift + SCROLLER：根据鼠标位置缩放")
doc.add_paragraph("Ctrl + A：选择所有项目")
doc.add_paragraph("Ctrl + G：组合或取消组合选中的项目")
doc.add_paragraph("Ctrl + D：复制选中的项目")
doc.add_paragraph("Shift + '绘制线条'：线条水平、垂直、45度对角渐变")
doc.add_paragraph("Ctrl + X：剪切选中的项目")
doc.add_paragraph("Ctrl + C / V：复制/粘贴选中的项目")

# 添加图片参考说明
doc.add_page_break()
doc.add_heading('附录：图片参考', level=1)
doc.add_paragraph("本手册中的截图和动画示例请访问以下 FUXA 官方 Wiki 页面查看：")
doc.add_paragraph("https://github.com/frangoteam/FUXA/wiki")
doc.add_paragraph("")
doc.add_paragraph("主要图片资源：")
doc.add_paragraph("• Getting Started 教程截图")
doc.add_paragraph("• 设备和标签配置界面")
doc.add_paragraph("• 控件绑定示例")
doc.add_paragraph("• 图表配置截图")
doc.add_paragraph("• 管道动画示例")
doc.add_paragraph("• 项目界面截图")

# 保存文档
output_path = "E:/AI_Code_Learning/Claude_Code/Project/L06-2F-SCADA/docs/FUXA-使用手册.docx"
doc.save(output_path)
print(f"文档已生成: {output_path}")
