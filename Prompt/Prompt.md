# Prompt
    常用提示词记录

## 使用 pdf skill
    使用 /pdf skill 将@e:\AI_Code_Learning\Claude_Code\Prompt\三上语文王朝霞培优100分.pdf 的 第43~46页 拆分为一份独立的pdf文件 

## 安装 github mcp
    @https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-claude.md  
    参考网页内容安装 GitHub 官方提供的远程 MCP 服务，使用 --scope user 参数进行全局安装，我的 Personal access tokens 为 GITHUB_PAT

## 提交 git
    使用 github mcp 把 e:\AI_Code_Learning\Claude_Code 上传到 github ，自动编写更改描述
    git add -A && git commit -m "docs: 重命名 Claude Code 使用入门指南文档" && git push

## 编写README.md
    重新编写 README.md，并提交所有修改，自动编写更新日志

## 测试 superpower
### 测试 1: TDD 工作流
    用 TDD 方式写一个温度转换函数（摄氏度转华氏度）

### 测试 2: 代码审查
    审查这段代码并给出改进建议：
    def calc(a,b):
        return a+b

### 测试 3: 系统化调试
    这个函数有性能问题，帮我系统化地分析：
    for i in range(1000000):
        result = expensive_operation(i)

## 小品策划
    帮我策划一个IT部门年会春酒的小品，要贴合IT人的特色并迎合当前AI发展的潮流，使用幽默风趣、轻松逗乐话术

## 创建技能 (skill-creator)
### 1.专家视角技能 （expert-lens）
    使用 skills-creator 生成一个【专家视角】技能 （expert-lens），要求：
    当我输入：“我想探讨【xx 领域】里的【xx 问题】”时，你先不急于回答，而是按下面步骤执行
    - 先选一位最适合的领域顶尖名人专家来思考它。可以是活人或历史人物，名字可以小众，但必须在该细分领域很专业。
    - 如果你不确定该选谁，可以先反问我2个定位问题再选。
    - 先输出：
        1.你选谁，他对应的细分领域
        2.为啥选他，三句话然后再让我描述详细的问题。

### 2.双层解释法技能 (dual-explanation)
    使用 skills-creator 创建一个【双层解释法】技能，要求：
    当输入问题时，分别使用两种方式进行回答：
    1. 初学者版本：面向对象是洗脚城的大爷，用大爷也能听得懂的话语为他进行详细解释。
    2. 深度专业版本： 面向对象是专业人群，一定不能出现事实错误。
   
### 3.反向提示词生成器技能 (reverse-prompt-generator)
    使用 skills-creator 创建一个【反向提示词生成器】技能，要求：
    1.根据我输入的文本或提供的成品范例文档倒推一个提示词，让我能用它稳定生成同风格的内容。
    2.简要说明这个提示词里每一句的作用。

### 4.预演失败技能 ()
    使用 skills-creator 创建一个【预演失败】技能，要求：
    1. 首先假设，我输入的【xx 项目】到时候失败了拉了大跨。
    2. 然后回答以下问题：
        什么时间点开始出现衰退信号？
        最致命的决策错误是什么？
        忽视的核心风险是什么？
        如果能重来，第一个应该改的是什么？
    3. 最后写一篇"失败复盘文章"，要基于真实的类似项目失败案例。
   
### 5.AI辩论专家
    使用 skills-creator 创建一个【AI辩论专家】技能，要求：
    1. 这是一场辩论赛，你是我的辩论对手
    2. 我输入的内容就是我的观点，我希望你来挑战它
    3. 你是一个辩论专家也是学者，你需要用尽一切论据、细节和逻辑，来挑战我、反驳我。你的唯一目标，就是证明我是错的
    4. 输出你反驳的内容

### 6.反对者
    使用 skills-creator 创建一个【反对者】技能，要求：
    1. 我输入的内容就是我观点
    2. 请你扮演一个"反对者角色"，从不同角度攻击我的想法，帮我完善我的观点，不用客气，直接指出漏洞