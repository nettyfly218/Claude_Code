# Planning with Files 使用说明

## 简介
**Planning with Files** 是一个 Claude Code 技能插件，实现了 **Manus AI** 风格的持久化 Markdown 规划工作流。通过将上下文存储在文件中，解决上下文丢失、目标漂移等问题。

## 核心概念：3 文件模式
对于每个复杂任务，系统会自动创建三个文件：

1. **`task_plan.md`** (计划)：跟踪任务目标、阶段检查清单和当前状态。
2. **`findings.md`** (知识)：存储研究发现、技术选型、代码片段和参考资料。
3. **`progress.md`** (记录)：会话日志、测试结果和错误记录。

## 安装
### 推荐：插件安装
`bash
claude plugins install OthmanAdi/planning-with-files
`

### 验证
输入 `/plan` 或 `/planning-with-files:plan` 检查是否可用。

## 使用方法
### 1. 启动规划
`bash
/planning-with-files:plan
# 或简写 /plan
`
激活后会自动创建上述三个文件。

### 2. 工作流程
1. **执行任务**：Claude 会自动更新计划、记录发现和日志。
2. **上下文恢复**：当上下文满时，执行 `/clear`，再次运行 `/plan`，系统会自动读取文件恢复进度。
3. **完成任务**：所有阶段勾选完成后，任务结束。

## 关键规则 (Manus Principles)
1. **先创建计划**：绝不在没有 `task_plan.md` 的情况下开始复杂任务。
2. **2-动作规则**：每进行 2 次查看/操作后，必须保存发现到 `findings.md`。
3. **记录所有错误**：失败必须记录，避免重复犯错。
4. **绝不重复失败**：如果方法失败，改变策略并记录在案。

## 常见问题
- **命令未找到**：检查插件安装 `claude plugins list` 或重启 Claude。
- **文件未创建**：确保在项目根目录运行，且有写入权限。
- **恢复失败**：确保使用的是 v2.2.0+ 版本，且规划文件近期有更新。

## 资源
- **GitHub**: [OthmanAdi/planning-with-files](https://github.com/OthmanAdi/planning-with-files)
