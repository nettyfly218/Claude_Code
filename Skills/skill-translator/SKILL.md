---
name: skill-translator 技能翻译助手
description: 批量扫描并自动翻译所有 Skill 的名称和描述为中文，标准化格式。
---

# Skill Translator (技能翻译助手)

此技能用于批量扫描工作区内的所有 Claude Code Skills，并将它们的 `name` 和 `description` 字段自动翻译成中文标准格式。

## 核心任务

1.  **扫描 (Scan)**
    - 扫描 `Skills/` 目录
    - 扫描 `~/.claude/skills/` (即 `C:/Users/Administrator/.claude/skills/`)
    - 寻找所有的 `SKILL.md` 文件

2.  **检查 (Check)**
    - 读取每个文件的 YAML Frontmatter (头部 `---` 之间的内容)。
    - 检查 `name` 和 `description` 字段是否包含中文字符。
    - 如果**都已经**包含中文，跳过该文件。

3.  **翻译与更新 (Translate & Update)**
    - 如果需要翻译，请按以下格式修改 YAML Frontmatter：

    **Name 字段格式**:
    ```yaml
    name: <原英文名> <中文说明>
    ```
    *要求*:
    - 保留原有英文名。
    - 在英文名后添加一个空格，然后添加中文说明。
    - 中文说明需简短精炼，控制在 4-6 个汉字。

    **Description 字段格式**:
    ```yaml
    description: <完整的中文描述>
    ```
    *要求*:
    - 将原有英文描述完整翻译成中文。
    - 描述要详细一点，准确反映 Skill 的功能。

4.  **报告 (Report)**
    - 任务完成后，输出一个列表，告知用户修改了哪些 Skill。

## 示例

**修改前**:
```yaml
name: git-commit
description: Automatically generate git commit messages based on staged changes.
```

**修改后**:
```yaml
name: git-commit 智能提交助手
description: 基于暂存区的变更内容，自动生成符合规范的 Git 提交信息。
```

## 执行指南 (对于 Agent)

当你执行此 Skill 时，请遵循以下步骤：
1.  使用 `find` 或 `Glob` 工具查找所有 `SKILL.md`。
2.  对于每个文件，先使用 `Read` 读取。
3.  在内存中检查是否需要翻译（是否存在中文）。
4.  如果需要，使用 `Edit` 工具应用上述格式变更。**注意保留 Frontmatter 中的其他字段（如 version, author 等）不变**。
5.  所有文件处理完毕后，向用户汇报结果。
