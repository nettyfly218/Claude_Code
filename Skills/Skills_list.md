# 全局可用 Skills 列表

该列表基于当前 Claude Code 环境加载的技能库 (System Skills) 及本地项目技能库 (Project Skills)。这些技能扩展了 Claude 的核心能力，涵盖设计、文档、开发、思维工具等多个领域。**（当前共收录 51 个 Skills，分为 6 大类）**

## 🎨 提示词与创意 (Prompt & Creative)
*用于生成高质量的提示词，辅助 AI 绘画、视频生成及设计。*

- **prompt-master**: 提示词主控 - 智能调度器，根据需求自动选择垂直领域的提示词生成工具。
- **intelligent-prompt-generator**: 智能提示词生成器 v2.0 - 支持人像、跨域、设计模式，具备语义理解与一致性检查。
- **art-master**: 艺术风格主控 - 自动生成水墨、油画、超现实等艺术风格提示词。
- **design-master**: 平面设计主控 - 生成海报、Logo、插画等设计类提示词。
- **product-master**: 产品摄影主控 - 商业拍摄与电商场景提示词专家。
- **video-master**: 视频生成主控 - 视频场景、运镜、转场效果提示词生成。
- **universal-learner**: 通用学习器 - 从任意 Prompt 中提取可复用元素。
- **prompt-analyzer**: 提示词分析 - 洞察、对比、优化提示词结构。
- **prompt-xray**: 提示词 X 光 - 逆向工程优秀提示词。
- **domain-classifier**: 领域分类器 - 智能判断需求所属领域。
- **reverse-prompt-generator**: 提示词逆向 - 逆向工程提示词生成器，从文本或范例倒推 Prompt 结构。

## 🧠 深度思考与交互 (Deep Thinking & Interaction)
*用于增强 Claude 的逻辑分析、辩论与多视角思考能力。*

- **ai-debater**: 辩论专家 - 利用逻辑与事实挑战用户观点，证明错误。
- **dissenter**: 反对者 - 扮演"魔鬼代言人" (Devil's Advocate)，寻找逻辑漏洞与风险。
- **project-premortem**: 失败预演 - 假设项目失败，反向推导原因以识别致命风险。
- **dual-explanation**: 双层解释 - 同时提供"通俗易懂"与"深度专业"两种视角的解释。
- **expert-lens**: 专家视角 - 模拟特定领域的顶级专家进行深度探讨。

## 📄 文档与办公 (Document & Office)
*用于处理企业级文档、演示文稿与表格。*

- **docx**: Word 文档全能工具 - 创建、编辑、修订、批注、分析 .docx 文件。
- **xlsx**: Excel 表格专家 - 公式计算、数据分析、格式化、图表生成。
- **pptx**: PPT 演示文稿 - 创建幻灯片、布局设计、备注添加。
- **pdf**: PDF 工具箱 - 文本/表格提取、表单填充、合并分割、生成 PDF。
- **doc-coauthoring**: 文档共创 - 引导式编写技术规格、提案、决策文档。
- **internal-comms**: 内部沟通 - 撰写周报、通知、FAQ、项目更新。
- **brand-guidelines**: 品牌规范 - 确保文档符合 Anthropic 品牌视觉标准。

## 🖌️ 设计与前端 (Design & Frontend)
*用于生成视觉素材及前端代码。*

- **web-artifacts-builder**: Web 组件构建 - 使用 React, Tailwind, shadcn/ui 构建复杂的交互式组件。
- **frontend-design**: 前端设计 - 创建生产级、高审美的前端界面代码。
- **canvas-design**: 视觉设计 - 生成 PNG/PDF 格式的海报、艺术图、设计稿。
- **algorithmic-art**: 算法艺术 - 使用 p5.js 代码生成生成艺术与粒子系统。
- **slack-gif-creator**: Slack GIF - 创建适合 Slack 沟通的动画表情。
- **web-design-guidelines**: UI/UX 审查 - 检查网页设计的可访问性与规范性。
- **ui-ux-pro-max**: UI/UX 专家 - 专业的 UI/UX 设计方案生成与优化工具。

## 💻 开发与工程 (Development & Engineering)
*用于辅助代码开发、测试与架构设计。*

- **feature-dev**: 功能开发 - 深度理解代码库，辅助架构设计与功能实现。
- **code-review**: 代码审查 - 审查 Pull Request，提供改进建议。
- **webapp-testing**: Web 测试 - 使用 Playwright 对本地应用进行端到端测试。
- **vercel-react-best-practices**: React 最佳实践 - 性能优化与代码规范指南。
- **vercel-composition-patterns**: 组件模式 - React 组合模式与架构建议。
- **vercel-react-native-skills**: React Native 开发 - 移动端开发最佳实践。
- **mcp-builder**: MCP 构建 - 辅助开发 Model Context Protocol 服务器。
- **github-trending-reporter**: 热榜日报 - 自动抓取 GitHub 热榜并生成科技风格日报。
- **pake**: 网页打包 - 将网页打包成轻量级桌面应用。

## ⚙️ 管理与工具 (Management & Tools)
*用于技能管理、任务规划与系统实用工具。*

- **planning-with-files**: 任务规划 - 基于文件 (Manus 风格) 的复杂任务规划与追踪。
- **skill-manager**: 技能管理 - 扫描、更新与管理本地/GitHub 技能。
- **skill-evolution-manager**: 技能进化 - 基于对话反馈迭代优化现有技能。
- **github-to-skills**: 仓库转技能 - 将 GitHub Repo 转换为标准 Skill 结构。
- **find-skills**: 技能发现 - 搜索与安装新技能。
- **hot-topic-tracker**: 热点追踪 - 新媒体热点挖掘与内容生成。
- **hookify**: 钩子管理 - 配置 Claude Code 的行为规则钩子。
- **claude-hud**: 界面配置 - 自定义终端状态栏显示。
- **skill-translator**: 技能翻译 - 批量扫描并自动翻译 Skill 的名称和描述为中文。
- **convertx**: 格式转换 - 通用文件格式转换工具。
- **yt-dlp**: 视频下载 - 强大的命令行音视频下载工具。
- **lossless-cut**: 无损剪辑 - 视频与音频的无损裁剪工具。

## ⚠️ 注意事项
*部分技能可能存在功能重叠（如 prompt-generator 与 intelligent-prompt-generator），建议优先使用功能更强的版本（如 v2.0）。*
