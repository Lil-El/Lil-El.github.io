# Monorepo 架构与 pnpm Workspace 完全指南 [!toc hide]

---

## 什么是 Monorepo

**Monorepo**（单体仓库）是一种将多个项目的代码存储在单个 Git 仓库中的开发模式。与每个项目独立仓库的 **Multirepo** 模式相对。

### Monorepo vs Multirepo

```markdown
# Monorepo 结构
my-monorepo/
├── packages/
│   ├── package-a/
│   ├── package-b/
│   └── package-c/
├── package.json
└── pnpm-workspace.yaml

# Multirepo 结构
repo-a/          repo-b/          repo-c/
├── package.json   ├── package.json   └── package.json
└── src/           └── src/
```

---

## Monorepo 的优点

- **代码共享与复用**：子包间可直接导入工具函数、组件或配置，避免重复
- **原子化提交**：跨包修改在一次提交中完成，保证一致性
- **统一依赖管理**：共享依赖，减少重复安装，便于版本维护
- **简化重构**：跨包重构在一个仓库内完成，无需多仓库同步
- **改进的 CI/CD**：检测跨包破坏性变更，支持增量构建和测试
- **更好的协作体验**：集中查看所有相关代码，降低多仓库切换负担

---

## 快速开始

### 初始化项目

```bash
# 1. 创建项目目录
mkdir my-monorepo
cd my-monorepo

# 2. 初始化根 package.json
pnpm init

# 3. 创建 packages 目录
mkdir packages
```

### 配置 pnpm-workspace.yaml

在项目根目录创建 `pnpm-workspace.yaml`：

```yaml
packages:
  # 所有 packages 下的子目录都是 workspace 包
  - 'packages/*'
  # 也可以指定其他目录
  - 'apps/*'
  - 'libs/*'
```

### 创建子包

```bash
# 创建第一个子包
mkdir packages/package-a
cd packages/package-a
pnpm init

# 编辑 packages/package-a/package.json
{
  "name": "@my-org/package-a",
  "version": "1.0.0",
  "description": "Package A in monorepo",
  "main": "index.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "vue": "^3.5.13"
  }
}

# 创建第二个子包
mkdir packages/package-b
cd packages/package-b
pnpm init

# 编辑 packages/package-b/package.json
{
  "name": "@my-org/package-b",
  "version": "1.0.0",
  "description": "Package B in monorepo",
  "main": "index.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "lodash": "^4.17.21"
  }
}
```

### 完整示例结构

```markdown
my-monorepo/
├── packages/
│   ├── package-a/
│   │   ├── src/
│   │   │   └── index.js
│   │   ├── package.json
│   │   └── vite.config.js
│   ├── package-b/
│   │   ├── src/
│   │   │   └── index.js
│   │   ├── package.json
│   │   └── vite.config.js
│   └── package-c/
│       ├── src/
│       │   └── index.js
│       ├── package.json
│       └── README.md
├── package.json
├── pnpm-workspace.yaml
└── pnpm-lock.yaml
```

---

## 依赖管理

### 安装外部依赖

#### 为特定子包安装依赖

```bash
# 进入子包目录安装
cd packages/package-a
pnpm add vue

# 或者从根目录使用 --filter 参数
pnpm add vue --filter @my-org/package-a

# 安装开发依赖
pnpm add -D vite --filter @my-org/package-a

# 安装全局通用的开发依赖（所有包共享）
pnpm add -D typescript eslint prettier -w
```

#### 常用命令

```bash
# 查看某个包的依赖树
pnpm why vue

# 列出所有 workspace 包
pnpm ls -r

# 在所有包中执行命令
pnpm run build -r

# 只在包含该脚本的包中执行
pnpm run dev --filter @my-org/package-a
```

### 子包之间的引用

这是 Monorepo 最强大的功能之一！

#### 步骤 1：在 package-b 中引用 package-a

```json
// packages/package-b/package.json
{
  "name": "@my-org/package-b",
  "version": "1.0.0",
  "dependencies": {
    // 使用 workspace:* 协议引用本地包
    "@my-org/package-a": "workspace:*"
  }
}
```

#### 步骤 2：安装 workspace 依赖

```bash
# 在 package-b 目录中
cd packages/package-b
pnpm install

# 或者从根目录
pnpm install
```

#### 步骤 3：在代码中使用

```javascript
// packages/package-b/src/index.js
import { someFunction } from '@my-org/package-a'

// 现在可以使用 package-a 导出的内容
someFunction()
```

#### 完整的跨包调用示例

```javascript
// packages/package-a/src/utils.js
export function formatDate(date) {
  return new Date(date).toLocaleDateString('zh-CN')
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// packages/package-a/index.js
export * from './src/utils'

// packages/package-b/src/service.js
import { formatDate, capitalize } from '@my-org/package-a'

export function getUserInfo(user) {
  return {
    ...user,
    name: capitalize(user.name),
    createdAt: formatDate(user.createdAt)
  }
}

// packages/package-b/index.js
export * from './src/service'
```

### 依赖提升

某些情况下，你可能希望某些依赖在根级别共享：

```json
// 根 package.json
{
  "private": true,
  "devDependencies": {
    "vite": "^5.0.0",
    "typescript": "^5.0.0",
    "eslint": "^8.0.0"
  }
}
```

然后在子包中可以直接使用这些依赖，无需重复安装。


### 限制依赖版本

```json
{
  "pnpm": {
    "overrides": {
      "react": "18.2.0",
      "typescript": "^4.9.0"
    }
  }
}

```

---

## 脚本命令

### 根 package.json 配置

```json
{
  "name": "my-monorepo",
  "private": true,
  "scripts": {
    "dev": "pnpm -r --parallel run dev",
    "build": "pnpm -r run build",
    "lint": "pnpm -r run lint",
    "test": "pnpm -r run test",
    "clean": "pnpm -r run clean && rm -rf node_modules",
    "changeset": "changeset",
    "version": "changeset version",
    "release": "changeset publish"
  },
  "devDependencies": {
    "@changesets/cli": "^2.29.2"
  }
}
```

### 并行执行 vs 顺序执行

```bash
# 并行执行所有包的 dev 命令
pnpm run dev

# 按依赖顺序执行 build（推荐）
pnpm run build

# 只在特定包及其依赖中执行
pnpm run build --filter @my-org/package-b...

# 排除某些包
pnpm run build --filter '!@my-org/excluded-package'
```

---

## 使用 Changeset 进行版本管理

Changeset 是一个强大的版本管理工具，专为 Monorepo 设计。

### 安装和配置 Changeset

```bash
# 安装 changeset
pnpm add -D @changesets/cli

# 初始化 changeset
pnpm changeset init
```

这会生成 `.changeset/config.json`：

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

### 配置说明

```json
{
  "changelog": ["@changesets/cli/changelog", { "repo": "your-org/your-repo" }],
  // 是否提交 changelog 到 git

  "commit": false,
  // 是否自动提交 commit

  "fixed": [
    ["@my-org/package-a", "@my-org/package-b"]
  ],
  // 固定版本的包组，这些包总是使用相同版本号

  "linked": [
    ["@my-org/package-c", "@my-org/package-d"]
  ],
  // 关联的包组，一起发布但版本号可以不同

  "access": "public",
  // 发布权限：public 或 restricted

  "baseBranch": "main",
  // 默认分支

  "updateInternalDependencies": "patch",
  // 内部依赖更新策略：patch 或 minor

  "ignore": ["@my-org/docs"]
  // 忽略发布的包（如文档包）
}
```

### 创建变更集

当你修改了某个包的代码后：

```bash
# 运行 changeset 命令
pnpm changeset
```

交互式提示：

```markdown
🦋  Which packages would you like to include?
◉ @my-org/package-a
◯ @my-org/package-b
◯ @my-org/package-c

🦋  Which packages should have a major bump?
◯ @my-org/package-a
◯ @my-org/package-b

🦋  Which packages should have a minor bump?
● @my-org/package-a
◯ @my-org/package-b

🦋  Which packages should have a patch bump?
◯ @my-org/package-a
◯ @my-org/package-b

🦋  What kind of change is this for @my-org/package-a?
❯ feature
  bugfix
  documentation
  performance
  chore

🦋  Please enter a summary for this change (this will be in the changelogs).
> 添加新的工具函数
```

生成的变更集文件（`.changeset/xxx-yyy-zzz.md`）：

```markdown
---
'@my-org/package-a': minor
---

feat: 添加新的工具函数

- 新增 formatDate 函数
- 新增 capitalize 函数
```

### 版本发布流程

#### 1. 日常开发流程

```bash
# 开发完成后，创建变更集
git add .
pnpm changeset

# 提交变更集
git add .
git commit -m "docs: add changeset for new features"
git push
```

#### 2. 发布新版本

```bash
# 1. 根据变更集更新版本号
pnpm changeset version

# 这会：
# - 更新所有受影响包的 package.json version
# - 更新 CHANGELOG.md
# - 删除已应用的变更集文件

# 2. 提交版本更新
git add .
git commit -m "release: version updates"

# 3. 打标签
git tag -a "v1.2.0" -m "Release v1.2.0"

# 4. 推送到远程
git push
git push origin --tags

# 5. 发布到 npm
pnpm changeset publish

# 或者发布 beta 版本
pnpm changeset publish --tag beta
```


在发布时使用 filter，只发布单个package：

```bash
pnpm changeset publish --filter @my-org/package-a
```

#### 3. 发布到npm上

在各个子包的 package.json 中添加：

```json
"publishConfig": {
  "access": "public",
  "registry": "https://registry.npmjs.org/"
}
```

---

## 最佳实践

### 1. 包命名规范

```json
{
  "name": "@my-org/package-name",
  "version": "1.0.0"
}
```

- 使用作用域前缀（如 `@my-org/`）
- 使用小写字母和连字符
- 保持命名清晰一致

### 2. 导出结构

```javascript
// packages/package-a/index.js
// 主入口文件
export * from './src/utils'
export * from './src/components'
export { default as MainComponent } from './src/MainComponent.vue'
```

### 3. 共享配置

```javascript
// packages/config/vite.base.js
// 基础 Vite 配置
export default {
  resolve: {
    alias: {
      '@': './src'
    }
  }
}

// packages/package-a/vite.config.js
import baseConfig from '@my-org/config/vite.base.js'

export default {
  ...baseConfig,
  build: {
    lib: {
      entry: './index.js',
      name: 'PackageA'
    }
  }
}
```

### 4. TypeScript 配置

```json
// tsconfig.base.json（根目录）
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true
  }
}

// packages/package-a/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

### 5. 依赖版本锁定

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'

catalog:
  # 统一依赖版本（pnpm v9+）
  vue: ^3.5.13
  vite: ^5.0.0
  lodash: ^4.17.21
```

## 总结

Monorepo + pnpm + Changeset 的组合为现代前端项目提供了强大的基础设施：

✅ **代码复用** - 子包之间轻松共享代码
✅ **统一管理** - 集中式依赖和版本控制
✅ **高效开发** - 原子提交和简化的重构流程
✅ **可靠发布** - Changeset 提供可预测的版本管理

开始构建你的 Monorepo 项目吧！🚀

---

## 参考资源

- [pnpm 官方文档](https://pnpm.io/)
- [Changeset 官方文档](https://github.com/changesets/changesets)
- [Monorepo 最佳实践](https://monorepo.tools/)
- [TurboRepo](https://turbo.build/repo) - 高性能 Monorepo 构建系统
- [Nx](https://nx.dev/) - 下一代 Monorepo 工具链
