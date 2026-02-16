# L06-2F 二流体加湿 SCADA 系统

## 项目简介

本项目为 L06-2F 车间二流体加湿系统设计的 SCADA 监控方案，基于 FUXA 开源 HMI/SCADA 平台开发。

## 系统架构

- **SCADA 平台**: FUXA (开源 HMI/SCADA)
- **通讯协议**: Modbus-TCP
- **设备**: L06_H_2F_ELTJS 二流体加湿器
- **监控区域**: 4个独立加湿区域

## 目录结构

```
L06-2F-SCADA/
├── L06-2F-SCADA-方案.md    # 技术方案文档
├── task_plan.md             # 任务规划
├── notes.md                 # 技术笔记
├── devices/
│   └── modbus_device.json   # Modbus-TCP 设备配置
├── tags/
│   └── tag_definitions.json # 变量标签定义 (36个点位)
├── alarms/
│   └── alarm_config.json    # 报警配置 (12种报警)
├── scripts/
│   └── scripts.json         # 脚本逻辑
└── views/
    ├── overview.json        # 总览画面
    ├── zone1_detail.json    # 1#区详情
    ├── zone2_detail.json    # 2#区详情
    ├── zone3_detail.json    # 3#区详情
    ├── zone4_detail.json    # 4#区详情
    ├── alarm_center.json    # 报警中心
    ├── trend_view.json      # 趋势分析
    └── settings.json        # 参数设定
```

## 功能特性

### 监控功能
- 4个区域实时状态监控
- 温湿度数据采集与显示
- 设备运行状态监测

### 报警系统
- 气路/水路报警
- 漏水检测报警
- 传感器离线报警
- 通讯故障报警

### 控制功能
- 湿度限值设定 (高限/低限)
- 4区域独立控制

### 数据分析
- 温湿度趋势图
- 历史数据记录
- 达标率统计
- 运行时间累计

## 导入 FUXA

1. 安装 FUXA: `docker run -d --name fuxa -p 1881:1881 frangoteam/fuxa:latest`
2. 访问 http://localhost:1881
3. 手动创建项目并导入各 JSON 配置文件

## 设备信息

| 项目 | 参数 |
|------|------|
| 设备名称 | L06_H_2F_ELTJS |
| IP 地址 | 172.169.53.42 |
| 端口 | 502 |
| 设备ID | 1 |
| 协议 | Modbus-TCP |

## 寄存器点位

- **只读**: 28个 (状态、测量值、报警)
- **读写**: 8个 (湿度限值设定)
- **总计**: 36个

## 文档版本

- **版本**: 1.0.0
- **更新日期**: 2026-02-14
