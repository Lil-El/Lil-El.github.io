const n=`# Cesium 双击绘制时避免相机聚焦的两种方案 [!toc hide]\r
\r
## 问题背景\r
\r
在使用 Cesium 实现自定义绘制工具（如折线、多边形）时，通常会通过 \`Cesium.ScreenSpaceEventHandler\` 监听 \`LEFT_CLICK\` 和 \`LEFT_DOUBLE_CLICK\` 事件来添加点和完成绘制。绘制过程中我们会创建一些辅助 Entity（如控制点、预览线），双击结束绘制时，Cesium 默认的双击行为会触发相机聚焦（fly-to）到被双击的 Entity 上，导致视角意外跳转，严重影响用户体验。\r
\r
下面介绍两种解决该问题的方案。\r
\r
---\r
\r
## 方案一：接管默认事件处理器（预防式）\r
\r
### 核心思路\r
\r
在进入绘制模式时，**保存并移除** Viewer 内置 \`screenSpaceEventHandler\` 上的 \`LEFT_CLICK\` 和 \`LEFT_DOUBLE_CLICK\` 默认处理函数，然后在自己的 \`ScreenSpaceEventHandler\` 中接管这些事件。绘制结束后再恢复默认处理函数。\r
\r
这种方式从根源上阻止了默认双击行为（包括 Entity 拾取选中、InfoBox 弹出、相机飞行等）的触发。\r
\r
### 代码实现\r
\r
\`\`\`javascript [!title:setupHandler]\r
#setupHandler() {\r
  if (this.#handler) return;\r
  if (!this.#viewer) return;\r
\r
  // 1. 保存默认的左键点击事件处理函数\r
  this.#savedViewerLeftClick = this.#viewer.screenSpaceEventHandler.getInputAction(\r
    Cesium.ScreenSpaceEventType.LEFT_CLICK\r
  );\r
  this.#savedViewerLeftDoubleClick = this.#viewer.screenSpaceEventHandler.getInputAction(\r
    Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK\r
  );\r
\r
  // 2. 移除默认事件处理函数，阻止默认双击行为\r
  this.#viewer.screenSpaceEventHandler.removeInputAction(\r
    Cesium.ScreenSpaceEventType.LEFT_CLICK\r
  );\r
  this.#viewer.screenSpaceEventHandler.removeInputAction(\r
    Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK\r
  );\r
\r
  // 3. 创建自己的事件处理器，接管点击和双击\r
  this.#handler = new Cesium.ScreenSpaceEventHandler(this.#viewer.scene.canvas);\r
\r
  this.#handler.setInputAction((click) => {\r
    this.#handleLeftClick(click);\r
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);\r
\r
  this.#handler.setInputAction(() => {\r
    this.#handleDbClick();\r
  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);\r
\r
  this.#handler.setInputAction((movement) => {\r
    this.#handleMouseMove(movement);\r
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);\r
}\r
\r
#teardownHandler() {\r
  // 销毁自己的事件处理器\r
  if (this.#handler) {\r
    this.#handler.destroy();\r
    this.#handler = null;\r
  }\r
\r
  // 恢复默认的事件处理函数\r
  if (this.#savedViewerLeftClick) {\r
    this.#viewer.screenSpaceEventHandler.setInputAction(\r
      this.#savedViewerLeftClick,\r
      Cesium.ScreenSpaceEventType.LEFT_CLICK,\r
    );\r
    this.#savedViewerLeftClick = null;\r
  }\r
  if (this.#savedViewerLeftDoubleClick) {\r
    this.#viewer.screenSpaceEventHandler.setInputAction(\r
      this.#savedViewerLeftDoubleClick,\r
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,\r
    );\r
    this.#savedViewerLeftDoubleClick = null;\r
  }\r
}\r
\`\`\`\r
\r
### 关键点说明\r
\r
| 步骤 | 说明 |\r
|------|------|\r
| \`getInputAction\` | 获取 Viewer 默认注册的事件处理函数，保存起来以便后续恢复 |\r
| \`removeInputAction\` | 移除默认事件处理函数，彻底阻止 Cesium 内置的双击 fly-to 行为 |\r
| \`setInputAction\`（恢复） | 绘制结束后，将保存的默认处理函数重新注册回去 |\r
\r
### 优点\r
\r
- **彻底阻止**：从根源上拦截了所有默认双击行为，不会出现任何意外的相机跳转\r
- **行为一致**：绘制期间点击和双击完全由自定义逻辑控制，不会受到 Cesium 内置行为干扰\r
\r
### 缺点\r
\r
- **实现复杂**：需要额外维护保存/恢复逻辑，代码量较大\r
- **侵入性强**：绘制期间完全禁用了 Viewer 的默认交互（如 Entity 选中、InfoBox 弹出），如果绘制过程中需要保留这些交互则不适用\r
\r
---\r
\r
## 方案二：取消相机追踪（反应式）\r
\r
### 核心思路\r
\r
不干预 Viewer 的默认事件处理，而是在双击处理函数中**立即将 \`viewer.trackedEntity\` 设置为 \`undefined\`**，从而取消由双击 Entity 触发的相机追踪动画。\r
\r
Cesium 的双击 fly-to 行为本质上是设置了 \`viewer.trackedEntity\`，我们只需要在自定义的双击回调中第一时间清除它，相机就不会飞走了。\r
\r
### 代码实现\r
\r
\`\`\`javascript [!title:handleDbClick]\r
#handleDbClick() {\r
  if (!this.#enabled) return false;\r
  if (this.#points.length === 0) return false;\r
\r
  // 取消相机聚焦 —— 一行代码解决问题\r
  this.#viewer.trackedEntity = undefined;\r
\r
  if (this.#mode === "polyline") {\r
    this.#finishPolyline();\r
  } else {\r
    this.#finishPolygon();\r
  }\r
\r
  return true;\r
}\r
\`\`\`\r
\r
### 关键点说明\r
\r
| 概念 | 说明 |\r
|------|------|\r
| \`trackedEntity\` | Cesium Viewer 的一个属性，设置为某个 Entity 后，相机会自动追踪（fly-to）该 Entity |\r
| 双击默认行为 | Cesium 在双击 Entity 时会自动将 \`trackedEntity\` 设为被双击的 Entity，从而触发相机飞行 |\r
| 清除时机 | 在自定义双击回调的**最开头**就清除 \`trackedEntity\`，确保相机不会飞走 |\r
\r
### 优点\r
\r
- **[极简实现](!notation:highlight:green)**：仅需一行代码 \`this.#viewer.trackedEntity = undefined;\`\r
- **非侵入式**：不干扰 Viewer 的其他默认行为（如 Entity 选中、InfoBox 等），绘制期间这些功能仍然可用\r
- **易于维护**：无需保存/恢复默认事件处理函数\r
\r
### 缺点\r
\r
- **并非完全阻止**：双击瞬间相机可能已经开始了极短时间的飞行，虽然立即被取消，但在性能较差的设备上可能会有微小的视觉抖动\r
- **依赖时序**：依赖于自定义双击回调在 Cesium 默认行为之后但在相机飞行完成之前执行\r
\r
---\r
\r
## 两种方案对比\r
\r
| 维度 | 方案一：接管默认事件处理器 | 方案二：取消相机追踪 |\r
|------|---------------------------|---------------------|\r
| **实现复杂度** | 较高，需要保存/恢复逻辑 | 极低，一行代码 |\r
| **代码量** | ~30 行 | ~1 行 |\r
| **侵入性** | 高，完全接管点击/双击事件 | 低，不影响其他默认行为 |\r
| **彻底性** | 完全阻止，无任何副作用 | 取消飞行，但双击行为已触发 |\r
| **适用场景** | 绘制期间不需要 Viewer 默认交互 | 绘制期间希望保留 Viewer 默认交互 |\r
| **维护成本** | 较高 | 极低 |\r
\r
---\r
\r
## 实际项目中的选择\r
\r
\`\`\`markdown [!tip:success]\r
在实际项目中，推荐**优先使用方案二（取消相机追踪）**：\r
\r
1. 代码量最小，一行搞定，维护成本极低\r
2. 不干扰 Viewer 的其他默认行为，用户体验更自然\r
3. 对于绝大多数场景，响应速度足够快，不会产生可感知的视觉抖动\r
\r
只有在方案二无法满足需求（例如确实需要完全禁用双击时的所有默认行为）时，才考虑使用方案一。\r
\`\`\`\r
\r
---\r
\r
## 参考代码\r
\r
完整实现见项目中的 \`src/draw.js\` 文件：\r
\r
- [方案一相关代码](file:///d:/BDHJ/cesium/src/draw.js#L136-L147)（\`#setupHandler\` 中注释部分）\r
- [方案一恢复代码](file:///d:/BDHJ/cesium/src/draw.js#L174-L187)（\`#teardownHandler\` 中恢复默认事件）\r
- [方案二相关代码](file:///d:/BDHJ/cesium/src/draw.js#L207)（\`#handleDbClick\` 中取消相机追踪）\r
\r
---\r
\r
\`\`\`markdown [!tip:info]\r
> **总结**：两种方案各有利弊，方案一"防患于未然"，方案二"亡羊补牢"。在实际开发中，方案二以最小的代码代价解决了最常见的问题，是更推荐的做法。\r
\`\`\``;export{n as default};
