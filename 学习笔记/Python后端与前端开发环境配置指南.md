# Python 后端与前端开发环境配置完整指南

> 适用于智能制造平台、工业互联网系统开发
> 
> 版本: v1.0 | 更新日期: 2026-02-05

---

## 📋 目录

- [1. 环境准备](#1-环境准备)
- [2. Python 后端环境配置](#2-python-后端环境配置)
- [3. 前端开发环境配置](#3-前端开发环境配置)
- [4. 代码质量工具配置](#4-代码质量工具配置)
- [5. Git 工作流配置](#5-git-工作流配置)
- [6. IDE 配置](#6-ide-配置)
- [7. 常见问题解决](#7-常见问题解决)

---

## 1. 环境准备

### 1.1 基础软件安装

#### Windows 10/11 环境

```powershell
# 检查 PowerShell 版本 (建议 5.1+)
$PSVersionTable.PSVersion

# 启用脚本执行权限
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### 必装软件清单

| 软件 | 版本要求 | 下载地址 | 用途 |
|------|---------|---------|------|
| **Python** | 3.11+ | https://www.python.org/downloads/ | 后端开发 |
| **Node.js** | 18 LTS / 20 LTS | https://nodejs.org/ | 前端开发 |
| **Git** | 2.40+ | https://git-scm.com/ | 版本控制 |
| **VS Code** | 最新版 | https://code.visualstudio.com/ | 代码编辑器 |
| **GitHub CLI** | 2.80+ | https://cli.github.com/ | Git 增强工具 |

#### 安装验证

```powershell
# 验证安装
python --version    # 应显示: Python 3.11.x 或更高
node --version      # 应显示: v18.x.x 或 v20.x.x
npm --version       # 应显示: 9.x.x 或更高
git --version       # 应显示: git version 2.40.x
code --version      # 应显示 VS Code 版本号
gh --version        # 应显示: gh version 2.x.x
```

### 1.2 包管理器配置

#### Python - pip 配置

```powershell
# 升级 pip
python -m pip install --upgrade pip

# 配置国内镜像源 (可选,提升下载速度)
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

**pip 配置文件位置**: `%APPDATA%\pip\pip.ini`

```ini
# pip.ini 内容
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
trusted-host = pypi.tuna.tsinghua.edu.cn
timeout = 120
```

#### Node.js - npm/pnpm 配置

```powershell
# 配置 npm 国内镜像 (可选)
npm config set registry https://registry.npmmirror.com

# 安装 pnpm (推荐,速度更快)
npm install -g pnpm

# 配置 pnpm 镜像
pnpm config set registry https://registry.npmmirror.com
```

---

## 2. Python 后端环境配置

### 2.1 虚拟环境管理

#### 方案一: venv (Python 内置,推荐)

```powershell
# 创建项目目录
mkdir smart-manufacturing-platform
cd smart-manufacturing-platform

# 创建虚拟环境
python -m venv .venv

# 激活虚拟环境
.\.venv\Scripts\Activate.ps1

# 验证虚拟环境
which python  # 应指向 .venv 目录
```

#### 方案二: conda (数据科学项目推荐)

```powershell
# 创建环境
conda create -n manufacturing python=3.11

# 激活环境
conda activate manufacturing

# 导出环境
conda env export > environment.yml
```

### 2.2 项目结构初始化

```powershell
# 创建标准项目结构
mkdir -p src/api src/models src/services src/utils tests docs

# 创建配置文件
New-Item -ItemType File -Path requirements.txt, .env, .gitignore
```

**推荐项目结构**:

```
smart-manufacturing-platform/
├── .venv/                    # 虚拟环境
├── src/                      # 源代码
│   ├── api/                  # API 路由
│   ├── models/               # 数据模型
│   ├── services/             # 业务逻辑
│   ├── utils/                # 工具函数
│   └── main.py               # 入口文件
├── tests/                    # 测试代码
├── docs/                     # 文档
├── requirements.txt          # 依赖列表
├── pyproject.toml            # 项目配置
├── .env                      # 环境变量
└── .gitignore                # Git 忽略文件
```

### 2.3 核心依赖安装

#### FastAPI 技术栈 (推荐用于工业系统)

```powershell
# 安装 FastAPI 及相关依赖
pip install fastapi[all] uvicorn[standard]

# 数据库
pip install sqlalchemy alembic psycopg2-binary

# 数据验证
pip install pydantic pydantic-settings

# 异步支持
pip install asyncio aiofiles httpx

# 工业通信协议
pip install pymodbus opcua asyncua

# 数据处理
pip install pandas numpy

# 日志和监控
pip install loguru prometheus-client

# 安全
pip install python-jose[cryptography] passlib[bcrypt] python-multipart
```

#### Django 技术栈 (适合大型企业系统)

```powershell
# 安装 Django
pip install django djangorestframework

# 数据库
pip install psycopg2-binary mysqlclient

# API 文档
pip install drf-yasg

# 异步任务
pip install celery redis

# 缓存
pip install django-redis
```

#### requirements.txt 示例

```txt
# requirements.txt - FastAPI 项目示例

# Web 框架
fastapi==0.109.0
uvicorn[standard]==0.27.0
pydantic==2.5.3
pydantic-settings==2.1.0

# 数据库
sqlalchemy==2.0.25
alembic==1.13.1
psycopg2-binary==2.9.9

# 工业协议
pymodbus==3.6.3
asyncua==1.0.6

# 数据处理
pandas==2.1.4
numpy==1.26.3

# 工具
python-dotenv==1.0.0
loguru==0.7.2
httpx==0.26.0

# 安全
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6

# 开发工具
pytest==7.4.4
pytest-asyncio==0.23.3
```

### 2.4 环境变量配置

**.env 文件示例**:

```env
# .env - 环境变量配置

# 应用配置
APP_NAME=SmartManufacturingPlatform
APP_VERSION=1.0.0
DEBUG=True
ENVIRONMENT=development

# 服务器配置
HOST=0.0.0.0
PORT=8000

# 数据库配置
DATABASE_URL=postgresql://user:password@localhost:5432/manufacturing_db
DB_POOL_SIZE=20
DB_MAX_OVERFLOW=10

# Redis 配置
REDIS_URL=redis://localhost:6379/0

# JWT 配置
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# PLC 配置
PLC_HOST=192.168.1.100
PLC_PORT=502

# 日志配置
LOG_LEVEL=INFO
LOG_FILE=logs/app.log
```

---

## 3. 前端开发环境配置

### 3.1 项目初始化

#### Vue 3 + TypeScript (推荐用于工业监控界面)

```powershell
# 使用 Vite 创建项目
npm create vite@latest manufacturing-frontend -- --template vue-ts

cd manufacturing-frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

#### React + TypeScript (适合复杂交互系统)

```powershell
# 使用 Vite 创建项目
npm create vite@latest manufacturing-frontend -- --template react-ts

cd manufacturing-frontend
npm install
npm run dev
```

### 3.2 核心依赖安装

#### Vue 3 技术栈

```powershell
# UI 框架
npm install element-plus
npm install @element-plus/icons-vue

# 状态管理
npm install pinia

# 路由
npm install vue-router@4

# HTTP 客户端
npm install axios

# 数据可视化 (工业大屏)
npm install echarts vue-echarts

# 工具库
npm install lodash-es
npm install dayjs

# WebSocket (实时数据)
npm install socket.io-client

# 类型定义
npm install -D @types/lodash-es
```

#### React 技术栈

```powershell
# UI 框架
npm install antd

# 状态管理
npm install zustand

# 路由
npm install react-router-dom

# HTTP 客户端
npm install axios

# 数据可视化
npm install echarts echarts-for-react

# 工具库
npm install lodash
npm install dayjs

# 类型定义
npm install -D @types/lodash
npm install -D @types/node
```

#### package.json 示例

```json
{
  "name": "manufacturing-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .vue,.js,.ts,.tsx",
    "lint:fix": "eslint src --ext .vue,.js,.ts,.tsx --fix",
    "format": "prettier --write \"src/**/*.{vue,js,ts,tsx,json,css,md}\"",
    "type-check": "vue-tsc --noEmit"
  },
  "dependencies": {
    "vue": "^3.4.15",
    "vue-router": "^4.2.5",
    "pinia": "^2.1.7",
    "element-plus": "^2.5.4",
    "axios": "^1.6.5",
    "echarts": "^5.4.3",
    "vue-echarts": "^6.6.8",
    "dayjs": "^1.11.10",
    "lodash-es": "^4.17.21",
    "socket.io-client": "^4.6.1"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.3",
    "typescript": "^5.3.3",
    "vite": "^5.0.11",
    "vue-tsc": "^1.8.27",
    "eslint": "^8.56.0",
    "prettier": "^3.2.4",
    "@types/lodash-es": "^4.17.12",
    "@types/node": "^20.11.5"
  }
}
```

### 3.3 前端项目结构

```
manufacturing-frontend/
├── public/                   # 静态资源
├── src/
│   ├── assets/               # 资源文件
│   ├── components/           # 通用组件
│   │   ├── common/           # 基础组件
│   │   └── business/         # 业务组件
│   ├── views/                # 页面组件
│   │   ├── dashboard/        # 仪表盘
│   │   ├── production/       # 生产管理
│   │   ├── equipment/        # 设备管理
│   │   └── energy/           # 能源管理
│   ├── router/               # 路由配置
│   ├── store/                # 状态管理
│   ├── api/                  # API 接口
│   ├── utils/                # 工具函数
│   ├── types/                # TypeScript 类型
│   ├── styles/               # 全局样式
│   ├── App.vue               # 根组件
│   └── main.ts               # 入口文件
├── .env.development          # 开发环境变量
├── .env.production           # 生产环境变量
├── vite.config.ts            # Vite 配置
├── tsconfig.json             # TypeScript 配置
├── package.json              # 项目配置
└── .gitignore                # Git 忽略文件
```

### 3.4 环境变量配置

**.env.development**:

```env
# 开发环境配置
VITE_APP_TITLE=智能制造平台
VITE_APP_ENV=development

# API 配置
VITE_API_BASE_URL=http://localhost:8000/api
VITE_WS_URL=ws://localhost:8000/ws

# PLC 模拟器
VITE_PLC_SIMULATOR=true

# 调试模式
VITE_DEBUG=true
```

**.env.production**:

```env
# 生产环境配置
VITE_APP_TITLE=智能制造平台
VITE_APP_ENV=production

# API 配置
VITE_API_BASE_URL=https://api.manufacturing.com/api
VITE_WS_URL=wss://api.manufacturing.com/ws

# 生产配置
VITE_PLC_SIMULATOR=false
VITE_DEBUG=false
```

---

## 4. 代码质量工具配置

### 4.1 Python Linter 配置

#### 安装工具

```powershell
# 激活虚拟环境
.\.venv\Scripts\Activate.ps1

# 安装代码质量工具
pip install ruff black mypy pytest pytest-cov
```

#### pyproject.toml 配置

```toml
# pyproject.toml - Python 项目配置

[project]
name = "smart-manufacturing-platform"
version = "1.0.0"
description = "智能制造平台后端系统"
requires-python = ">=3.11"

[tool.ruff]
# 目标 Python 版本
target-version = "py311"

# 每行最大字符数
line-length = 100

# 检查规则
select = [
    "E",      # pycodestyle errors
    "W",      # pycodestyle warnings
    "F",      # pyflakes
    "I",      # isort (import 排序)
    "N",      # pep8-naming
    "UP",     # pyupgrade
    "B",      # flake8-bugbear
    "C4",     # flake8-comprehensions
    "SIM",    # flake8-simplify
    "TCH",    # flake8-type-checking
    "PERF",   # 性能优化
]

# 忽略特定规则
ignore = [
    "E501",   # 行太长(由 Black 处理)
    "B008",   # 函数调用中的默认参数
]

# 排除目录
exclude = [
    ".git",
    "__pycache__",
    ".venv",
    "venv",
    "build",
    "dist",
    "*.egg-info",
]

# 每个文件的特定忽略
[tool.ruff.per-file-ignores]
"__init__.py" = ["F401"]  # 允许未使用的导入
"tests/*" = ["S101"]      # 允许测试中使用 assert

[tool.black]
line-length = 100
target-version = ['py311']
include = '\.pyi?$'
extend-exclude = '''
/(
  \.git
  | \.venv
  | build
  | dist
)/
'''

[tool.mypy]
python_version = "3.11"
warn_return_any = true
warn_unused_configs = true
disallow_untyped_defs = false
ignore_missing_imports = true
plugins = ["pydantic.mypy"]

[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = ["test_*.py", "*_test.py"]
python_classes = ["Test*"]
python_functions = ["test_*"]
addopts = "-v --cov=src --cov-report=html --cov-report=term"
```

### 4.2 前端 Linter 配置

#### 安装工具

```powershell
# 安装 ESLint 和 Prettier
npm install -D eslint prettier
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D eslint-plugin-vue
npm install -D eslint-config-prettier eslint-plugin-prettier
npm install -D @vue/eslint-config-typescript
```

#### .eslintrc.cjs 配置

```javascript
// .eslintrc.cjs - ESLint 配置

module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    '@vue/eslint-config-typescript',
    'plugin:prettier/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // 代码质量
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],

    // Vue 特定
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'warn',
    'vue/require-default-prop': 'off',
    'vue/require-explicit-emits': 'error',

    // TypeScript 特定
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/consistent-type-imports': 'warn',

    // 最佳实践
    'eqeqeq': ['error', 'always'],
    'prefer-const': 'error',
    'no-var': 'error',

    // 工业系统特定
    'max-lines': ['warn', 500],
    'complexity': ['warn', 15],
  },
};
```

#### .prettierrc 配置

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "vueIndentScriptAndStyle": false
}
```

#### .prettierignore

```
# .prettierignore
dist
node_modules
.venv
*.min.js
*.min.css
coverage
```

---

## 5. Git 工作流配置

### 5.1 .gitignore 配置

```gitignore
# .gitignore - 完整配置

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg
.venv/
venv/
ENV/
env/

# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
.pnpm-store/
dist/
dist-ssr/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# 环境变量
.env
.env.local
.env.*.local

# 日志
logs/
*.log

# 测试覆盖率
coverage/
.coverage
htmlcov/
.pytest_cache/

# 数据库
*.db
*.sqlite
*.sqlite3

# 临时文件
*.tmp
*.bak
*.cache
```

### 5.2 Git Hooks 配置 (Husky)

#### 安装 Husky

```powershell
# 前端项目安装
npm install -D husky lint-staged

# 初始化 Husky
npx husky install

# 添加 pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"
```

#### package.json 配置

```json
{
  "lint-staged": {
    "*.{js,ts,vue,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,css}": [
      "prettier --write"
    ]
  }
}
```

#### Python 项目 pre-commit

```powershell
# 安装 pre-commit
pip install pre-commit

# 创建配置文件
```

**.pre-commit-config.yaml**:

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.1.15
    hooks:
      - id: ruff
        args: [--fix, --exit-non-zero-on-fix]
      - id: ruff-format

  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files
      - id: check-json
      - id: check-toml

  - repo: https://github.com/pre-commit/mirrors-mypy
    rev: v1.8.0
    hooks:
      - id: mypy
        additional_dependencies: [types-all]
```

```powershell
# 安装 hooks
pre-commit install
```

---

## 6. IDE 配置

### 6.1 VS Code 扩展安装

#### Python 开发必装扩展

```powershell
# 安装 Python 扩展
code --install-extension ms-python.python
code --install-extension ms-python.vscode-pylance
code --install-extension ms-python.black-formatter
code --install-extension charliermarsh.ruff

# 其他推荐扩展
code --install-extension ms-python.debugpy
code --install-extension njpwerner.autodocstring
```

#### 前端开发必装扩展

```powershell
# Vue 开发
code --install-extension Vue.volar
code --install-extension Vue.vscode-typescript-vue-plugin

# 代码质量
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode

# 其他推荐
code --install-extension bradlc.vscode-tailwindcss
code --install-extension formulahendry.auto-rename-tag
code --install-extension christian-kohler.path-intellisense
```

### 6.2 VS Code 工作区配置

**.vscode/settings.json**:

```json
{
  // Python 配置
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.organizeImports": true
    }
  },
  "python.linting.enabled": true,
  "python.linting.ruffEnabled": true,
  "python.linting.mypyEnabled": true,
  "python.analysis.typeCheckingMode": "basic",

  // JavaScript/TypeScript/Vue 配置
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue"
  ],

  // 通用配置
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.rulers": [100],
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "files.encoding": "utf8",
  "files.eol": "\n",

  // 文件关联
  "files.associations": {
    "*.json": "jsonc",
    ".env*": "dotenv"
  },

  // 排除文件
  "files.exclude": {
    "**/__pycache__": true,
    "**/.pytest_cache": true,
    "**/node_modules": true,
    "**/.venv": true
  },

  // 终端配置
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "terminal.integrated.env.windows": {
    "PYTHONPATH": "${workspaceFolder}/src"
  }
}
```

**.vscode/launch.json** (调试配置):

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python: FastAPI",
      "type": "python",
      "request": "launch",
      "module": "uvicorn",
      "args": [
        "src.main:app",
        "--reload",
        "--host", "0.0.0.0",
        "--port", "8000"
      ],
      "jinja": true,
      "justMyCode": false,
      "env": {
        "PYTHONPATH": "${workspaceFolder}"
      }
    },
    {
      "name": "Python: Current File",
      "type": "python",
      "request": "launch",
      "program": "${file}",
      "console": "integratedTerminal",
      "justMyCode": false
    }
  ]
}
```

**.vscode/extensions.json** (推荐扩展):

```json
{
  "recommendations": [
    "ms-python.python",
    "ms-python.vscode-pylance",
    "ms-python.black-formatter",
    "charliermarsh.ruff",
    "vue.volar",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "eamodio.gitlens",
    "usernamehw.errorlens"
  ]
}
```

---

## 7. 常见问题解决

### 7.1 Python 环境问题

#### 问题: 虚拟环境激活失败

```powershell
# 错误: 无法加载文件,因为在此系统上禁止运行脚本

# 解决方案:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### 问题: pip 安装速度慢

```powershell
# 临时使用国内镜像
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple package-name

# 永久配置
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

#### 问题: 导入模块失败

```powershell
# 设置 PYTHONPATH
$env:PYTHONPATH = "${pwd}\src"

# 或在 .env 文件中配置
# PYTHONPATH=./src
```

### 7.2 Node.js 环境问题

#### 问题: npm install 失败

```powershell
# 清除缓存
npm cache clean --force

# 删除 node_modules 重新安装
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

#### 问题: 端口被占用

```powershell
# 查找占用端口的进程
netstat -ano | findstr :8000

# 结束进程
taskkill /PID <进程ID> /F

# 或修改端口
# vite.config.ts
server: {
  port: 3001
}
```

### 7.3 Git 相关问题

#### 问题: 行尾符不一致

```powershell
# 配置 Git 自动转换
git config --global core.autocrlf true

# 或在 .gitattributes 中配置
* text=auto
*.py text eol=lf
*.js text eol=lf
*.vue text eol=lf
```

#### 问题: pre-commit hook 失败

```powershell
# 跳过 hooks (不推荐)
git commit --no-verify -m "message"

# 更新 hooks
pre-commit autoupdate
pre-commit run --all-files
```

### 7.4 Linter 相关问题

#### 问题: ESLint 和 Prettier 冲突

```powershell
# 确保安装了冲突解决插件
npm install -D eslint-config-prettier

# 在 .eslintrc.cjs 中添加
extends: [
  // ... 其他配置
  'plugin:prettier/recommended'  // 必须放在最后
]
```

#### 问题: Ruff 检查过于严格

```toml
# 在 pyproject.toml 中调整规则
[tool.ruff]
ignore = [
  "E501",  # 行太长
  "F401",  # 未使用的导入
]

# 或针对特定文件
[tool.ruff.per-file-ignores]
"__init__.py" = ["F401"]
```

---

## 8. 快速启动脚本

### 8.1 Python 后端启动脚本

**start_backend.ps1**:

```powershell
# start_backend.ps1 - Python 后端启动脚本

Write-Host "🚀 启动智能制造平台后端服务..." -ForegroundColor Green

# 激活虚拟环境
.\.venv\Scripts\Activate.ps1

# 检查环境变量
if (-not (Test-Path .env)) {
    Write-Host "⚠ 警告: .env 文件不存在,使用默认配置" -ForegroundColor Yellow
}

# 运行代码检查
Write-Host "📝 运行代码检查..." -ForegroundColor Cyan
ruff check src/
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 代码检查失败,请修复后重试" -ForegroundColor Red
    exit 1
}

# 启动服务
Write-Host "✅ 代码检查通过,启动服务..." -ForegroundColor Green
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

### 8.2 前端启动脚本

**start_frontend.ps1**:

```powershell
# start_frontend.ps1 - 前端启动脚本

Write-Host "🚀 启动智能制造平台前端服务..." -ForegroundColor Green

# 检查依赖
if (-not (Test-Path node_modules)) {
    Write-Host "📦 安装依赖..." -ForegroundColor Cyan
    npm install
}

# 运行 Lint 检查
Write-Host "📝 运行代码检查..." -ForegroundColor Cyan
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠ 代码检查发现问题,尝试自动修复..." -ForegroundColor Yellow
    npm run lint:fix
}

# 启动开发服务器
Write-Host "✅ 启动开发服务器..." -ForegroundColor Green
npm run dev
```

### 8.3 完整项目初始化脚本

**init_project.ps1**:

```powershell
# init_project.ps1 - 完整项目初始化脚本

param(
    [string]$ProjectName = "smart-manufacturing-platform"
)

Write-Host "🎉 初始化项目: $ProjectName" -ForegroundColor Green

# 创建项目目录
mkdir $ProjectName
cd $ProjectName

# ========== 后端初始化 ==========
Write-Host "`n📦 初始化 Python 后端..." -ForegroundColor Cyan

# 创建后端目录结构
mkdir backend
cd backend
mkdir -p src/api, src/models, src/services, src/utils, tests, docs

# 创建虚拟环境
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# 安装依赖
pip install fastapi uvicorn[standard] sqlalchemy pydantic ruff black mypy pytest

# 创建配置文件
@"
[tool.ruff]
target-version = "py311"
line-length = 100
select = ["E", "W", "F", "I", "N", "UP", "B"]

[tool.black]
line-length = 100
"@ | Out-File -FilePath pyproject.toml -Encoding UTF8

# 创建 requirements.txt
pip freeze > requirements.txt

cd ..

# ========== 前端初始化 ==========
Write-Host "`n📦 初始化前端..." -ForegroundColor Cyan

npm create vite@latest frontend -- --template vue-ts
cd frontend

# 安装依赖
npm install
npm install element-plus axios pinia vue-router
npm install -D eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin

cd ..

Write-Host "`n✅ 项目初始化完成!" -ForegroundColor Green
Write-Host "📁 项目结构:" -ForegroundColor Yellow
tree /F

Write-Host "`n🚀 下一步:" -ForegroundColor Cyan
Write-Host "  1. cd $ProjectName/backend && .\.venv\Scripts\Activate.ps1"
Write-Host "  2. cd $ProjectName/frontend && npm run dev"
```

---

## 9. 总结与检查清单

### ✅ 环境配置检查清单

#### Python 后端

- [ ] Python 3.11+ 已安装
- [ ] 虚拟环境已创建并激活
- [ ] requirements.txt 已配置
- [ ] pyproject.toml 已配置
- [ ] Ruff + Black + mypy 已安装
- [ ] .env 文件已配置
- [ ] .gitignore 已配置
- [ ] pre-commit hooks 已安装

#### 前端开发

- [ ] Node.js 18+ 已安装
- [ ] 项目已初始化 (Vite/Vue/React)
- [ ] package.json 依赖已安装
- [ ] ESLint + Prettier 已配置
- [ ] TypeScript 已配置
- [ ] 环境变量文件已创建
- [ ] Husky + lint-staged 已配置

#### IDE 配置

- [ ] VS Code 已安装
- [ ] Python 扩展已安装
- [ ] Vue/React 扩展已安装
- [ ] ESLint/Prettier 扩展已安装
- [ ] .vscode/settings.json 已配置
- [ ] .vscode/launch.json 已配置

#### Git 工作流

- [ ] Git 已安装并配置
- [ ] GitHub CLI 已安装
- [ ] .gitignore 已配置
- [ ] Git hooks 已配置
- [ ] 行尾符配置正确

---

## 📚 参考资源

### 官方文档

- [Python 官方文档](https://docs.python.org/3/)
- [FastAPI 文档](https://fastapi.tiangolo.com/)
- [Vue 3 文档](https://vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Vite 文档](https://vitejs.dev/)

### 工具文档

- [Ruff 文档](https://docs.astral.sh/ruff/)
- [Black 文档](https://black.readthedocs.io/)
- [ESLint 文档](https://eslint.org/)
- [Prettier 文档](https://prettier.io/)

### 社区资源

- [Python 包索引 (PyPI)](https://pypi.org/)
- [npm 包管理](https://www.npmjs.com/)
- [GitHub](https://github.com/)

---

## 📞 技术支持

如遇到问题,请按以下顺序排查:

1. **查看错误日志**: 仔细阅读终端输出的错误信息
2. **检查配置文件**: 确认所有配置文件格式正确
3. **验证环境**: 运行 `python --version` 和 `node --version`
4. **清除缓存**: 删除缓存文件重新安装依赖
5. **查阅文档**: 参考官方文档和本指南
6. **搜索问题**: 在 Stack Overflow 或 GitHub Issues 搜索

---

**文档版本**: v1.0  
**最后更新**: 2026-02-05  
**适用范围**: Windows 10/11, Python 3.11+, Node.js 18+  
**维护者**: 智能制造平台开发团队