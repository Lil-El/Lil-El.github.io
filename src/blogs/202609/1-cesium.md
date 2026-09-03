# ArcGIS 影像服务 layerDefs 过滤参数编码问题 [!toc hide]

## 问题描述

通过 `ArcGisMapServerImageryProvider` 加载 ArcGIS MapServer 影像服务时，使用 `_resource.appendQueryParameters` 添加 `layerDefs` 过滤参数，请求返回 [**400**](!notation:highlight:red)。

## 涉及文件

| 文件 | 说明 |
|------|------|
| [src/layer.js](src/layer.js#L31-L35) | 设置 `layerDefs` 请求参数 |
| [node_modules/.vite/deps/cesium.js](node_modules\.pnpm\cesium@1.144.0\node_modules\@cesium\engine\Source\Core\Resource.js#552) | Cesium 源码中的 URL 构建逻辑（Vite 预构建版本） |

## 根因分析

### 请求参数对比

**正常 URI 编码**：`layerDefs=%7B%221%22%3A%22ksbm+%3D+%27C123%27%22%7D`

**实际编码**：`layerDefs={%221%22%3A%22ksbm%3D%27C123%27%22}`

关键差异：`{` 和 `}` 分别应为 [`%7B`](!notation:highlight:green) 和 [`%7D`](!notation:highlight:green)，实际却保留了原始字符。

### 代码根因

Cesium 的 `Resource.prototype.getUrlComponent` 方法中有以下逻辑：

```javascript [!title:Resource.js - getUrlComponent]
// 原始代码
url = url.replace(/%7B/g, "{").replace(/%7D/g, "}");
```

**目的**：Cesium 使用 `{` `}` 作为 URL 模板占位符（如 `{x}`、`{y}`、`{z}`、`{quadkey}`），而 `encodeURIComponent` 会将它们编码为 `%7B` 和 `%7D`，所以需要还原。

[**副作用**](!notation:underline:red)：`layerDefs` 参数值是 JSON 字符串（如 `{"1":"ksbm='C123'"}`），其中的 `{` `}` 也被还原，导致 ArcGIS Server 收到非法 JSON 格式，返回 400。

**编码流程**：

``` [!title:编码流程]
JSON.stringify → {"1":"ksbm='C123'"}
     ↓ appendQueryParameters
_resource._queryParameters.layerDefs = '{"1":"ksbm=\'C123\'"}'
     ↓ objectToQuery → encodeURIComponent
%7B%221%22%3A%22ksbm%3D%27C123%27%22%7D
     ↓ getUrlComponent → replace %7B/%7D 还原
{%221%22%3A%22ksbm%3D%27C123%27%22}   ← 非法的 JSON 格式 → 400
```

## 解决方案

### 当前修改（[临时](!notation:box:orange)）

[cesium.js](/node_modules/.vite/deps/cesium.js)

**修改前**

```javascript [!title:修改前]
url2 = url2.replace(/%7B/g, "{").replace(/%7D/g, "}");
```

**修改后**

```javascript [!title:修改后]
if (!url2.includes("portal.beidouhj.com")) url2 = url2.replace(/%7B/g, "{").replace(/%7D/g, "}");
```

### 持久化方案：pnpm patch

当前修改位于 `node_modules/.vite/deps/cesium.js`（Vite 预构建缓存），删除 `.vite` 目录或 `pnpm install` 后会丢失。使用 `pnpm patch` 将补丁持久化到原始源码。

#### 步骤

```bash [!title:终端]
# 1. 修改原始源码（而非 .vite/deps 缓存）
#    文件路径：
#    node_modules/.pnpm/cesium@1.144.0/node_modules/@cesium/engine/Source/Core/Resource.js
#    第 552 行，改为：
#    if (!url.includes("portal.beidouhj.com")) url = url.replace(/%7B/g, "{").replace(/%7D/g, "}");

# 2. 生成补丁
pnpm patch @cesium/engine
# 输出：Patch: You can now edit the package at:
#   D:\BDHJ\cesium\node_modules\.pnpm_patches\@cesium\engine@26.2.0

# 3. 在临时目录中修改 Resource.js（同上）

# 4. 提交补丁
vnpm patch-commit "D:\BDHJ\cesium\node_modules\.pnpm_patches\@cesium\engine@26.2.0"

# 5. 清除 Vite 缓存，重新预构建
rm -rf node_modules/.vite

# 6. 重新启动
pnpm dev
```

#### 执行后自动生成

`package.json` 中自动添加：

```json [!title:package.json]
{
  "pnpm": {
    "patchedDependencies": {
      "@cesium/engine": "patches/@cesium/engine.patch"
    }
  }
}
```

`patches/` 目录下生成补丁文件，提交到 Git 后团队成员 `pnpm install` 即可自动应用。

### 为什么用域名判断而不是全局去掉

```markdown [!tip:info]
不能直接删除这行代码，因为 Cesium 内部有很多使用 URL 模板的功能（如 `UrlTemplateImageryProvider`、`IonImageryProvider` 等），它们依赖 `{x}`、`{y}`、`{z}` 等占位符。去掉会导致这些功能失效。
```

因此采用域名白名单方式：仅对 `portal.beidouhj.com` 的请求跳过还原，不影响其他 Cesium 功能。

## 影响范围

| 影响项 | 说明                                                                               |
| ------ | ---------------------------------------------------------------------------------- |
| 受影响 | 仅 `portal.beidouhj.com` 域名的 ArcGIS MapServer 请求                              |
| 不影响 | 其他 Cesium 影像提供器、3D Tiles、地形等功能的 URL 模板                            |
| 风险   | 如果 `portal.beidouhj.com` 有其他请求也依赖 `{` `}` 模板占位符，需要进一步细化判断 |

## 注意事项

```markdown [!tip:warning]
- 补丁文件 `patches/@cesium/engine.patch` 需纳入 Git 版本管理，`pnpm install` 后自动应用。
```