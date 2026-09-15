const n=`# Cesium 拾取（Pick）方法汇总\r
\r
## 1. 场景拾取\r
\r
### \`viewer.scene.pick(windowPosition)\`\r
\r
拾取屏幕位置**最顶层**的对象。\r
\r
- **参数**: \`windowPosition\` — \`Cartesian2\`，屏幕坐标\r
- **返回**: \`{ primitive, id, collection, ... }\` 或 \`undefined\`\r
- **用途**: 获取鼠标点击处最上方的 Entity / Primitive\r
\r
\`\`\`js [!title:scene.pick]\r
const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);\r
handler.setInputAction((click) => {\r
  const picked = viewer.scene.pick(click.position);\r
  if (Cesium.defined(picked)) {\r
    console.log(picked.id); // Entity\r
  }\r
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);\r
\`\`\`\r
\r
---\r
\r
### \`viewer.scene.drillPick(windowPosition, limit)\`\r
\r
**穿透拾取**，返回该位置所有对象列表。\r
\r
- **参数**:\r
  - \`windowPosition\` — \`Cartesian2\`\r
  - \`limit\` — \`Number\`，可选，限制返回数量\r
- **返回**: \`Array<{ primitive, id, ... }>\`\r
- **用途**: 多个对象重叠时获取全部\r
\r
\`\`\`js [!title:drillPick]\r
const pickedObjects = viewer.scene.drillPick(click.position);\r
pickedObjects.forEach((obj) => {\r
  console.log(obj.id); // 所有被击中的 Entity\r
});\r
\`\`\`\r
\r
---\r
\r
### \`viewer.scene.pickPosition(windowPosition)\`\r
\r
获取屏幕坐标对应的**世界 3D 坐标**（需有地形 / 模型表面）。\r
\r
- **参数**: \`windowPosition\` — \`Cartesian2\`\r
- **返回**: \`Cartesian3\` 或 \`undefined\`\r
- **用途**: 获取点击处的地形 / 3D Tile 表面坐标\r
\r
\`\`\`js [!title:pickPosition]\r
const cartesian = viewer.scene.pickPosition(click.position);\r
if (Cesium.defined(cartesian)) {\r
  // 有效的地面坐标\r
}\r
\`\`\`\r
\r
\`\`\`markdown [!tip:warning]\r
> **注意**: 若点击处没有地形或模型表面，会返回 \`undefined\`。\r
\`\`\`\r
\r
---\r
\r
## 2. 相机拾取\r
\r
### \`viewer.camera.pickEllipsoid(windowPosition, ellipsoid, result)\`\r
\r
拾取**椭球体表面**坐标，不依赖地形数据，始终有值。\r
\r
- **参数**:\r
  - \`windowPosition\` — \`Cartesian2\`\r
  - \`ellipsoid\` — \`Ellipsoid\`，可选，默认 \`Ellipsoid.WGS84\`\r
  - \`result\` — \`Cartesian3\`，可选，复用对象\r
- **返回**: \`Cartesian3\` 或 \`undefined\`\r
- **用途**: 降级方案，当地形未加载时获取地表坐标\r
\r
\`\`\`js [!title:pickEllipsoid]\r
const position = viewer.camera.pickEllipsoid(click.position);\r
// 始终返回椭球面上的坐标\r
\`\`\`\r
\r
---\r
\r
### \`viewer.camera.getPickRay(windowPosition, result)\`\r
\r
获取从相机穿过屏幕点的**射线**。\r
\r
- **参数**:\r
  - \`windowPosition\` — \`Cartesian2\`\r
  - \`result\` — \`Ray\`，可选\r
- **返回**: \`Ray\`\r
- **用途**: 自定义射线检测（如与 Globe、模型做碰撞检测）\r
\r
\`\`\`js [!title:getPickRay]\r
const ray = viewer.camera.getPickRay(click.position);\r
const globePosition = viewer.scene.globe.pick(ray, viewer.scene);\r
\`\`\`\r
\r
---\r
\r
## 3. Globe 拾取\r
\r
### \`viewer.scene.globe.pick(ray, scene, result)\`\r
\r
传入射线，拾取 Globe 表面位置。\r
\r
- **参数**:\r
  - \`ray\` — \`Ray\`\r
  - \`scene\` — \`Scene\`\r
  - \`result\` — \`Cartesian3\`，可选\r
- **返回**: \`Cartesian3\` 或 \`undefined\`\r
\r
\`\`\`js [!title:globe.pick]\r
const ray = viewer.camera.getPickRay(click.position);\r
const globePos = viewer.scene.globe.pick(ray, viewer.scene);\r
\`\`\`\r
\r
---\r
\r
## 4. 当前选中实体\r
\r
### \`viewer.selectedEntity\`\r
\r
获取当前**已选中**的 Entity（通过点击或 \`viewer.trackedEntity\` 设置）。\r
\r
- **返回**: \`Entity\` 或 \`undefined\`\r
- **用途**: 获取当前选中的实体，无需额外事件监听\r
\r
\`\`\`js [!title:selectedEntity]\r
const selected = viewer.selectedEntity;\r
if (selected) {\r
  console.log(selected.name);\r
}\r
\`\`\`\r
\r
---\r
\r
## 5. 对比总结\r
\r
| 方法 | 依赖 | 始终有值 | 返回类型 |\r
|---|---|---|---|\r
| \`scene.pick\` | Entity / Primitive | [❌](!notation:highlight:red) | 对象信息 |\r
| \`scene.drillPick\` | Entity / Primitive | [❌](!notation:highlight:red) | 对象数组 |\r
| \`scene.pickPosition\` | 地形 / 3D Tile | [❌](!notation:highlight:red) | 世界坐标 |\r
| \`camera.pickEllipsoid\` | 无 | [✅](!notation:highlight:green) | 世界坐标 |\r
| \`camera.getPickRay\` | 无 | [✅](!notation:highlight:green) | 射线 |\r
| \`globe.pick\` | Globe | [❌](!notation:highlight:red) | 世界坐标 |\r
| \`viewer.selectedEntity\` | 选中状态 | [❌](!notation:highlight:red) | Entity |\r
\r
---\r
\r
## 6. 常见实战组合\r
\r
### 精确获取地面坐标（优先地形，降级椭球）\r
\r
\`\`\`js [!title:精确获取地面坐标]\r
let cartesian = viewer.scene.pickPosition(click.position);\r
if (!Cesium.defined(cartesian)) {\r
  cartesian = viewer.camera.pickEllipsoid(click.position);\r
}\r
\`\`\`\r
\r
### 过滤特定类型对象\r
\r
\`\`\`js [!title:过滤特定类型对象]\r
const picked = viewer.scene.pick(click.position);\r
if (Cesium.defined(picked)) {\r
  if (picked.id instanceof Cesium.Entity) {\r
    // 选中了 Entity\r
  }\r
  if (picked.primitive instanceof Cesium.Model) {\r
    // 选中了 Model 基元\r
  }\r
  if (picked.primitive instanceof Cesium.Cesium3DTileset) {\r
    // 选中了 3D Tileset\r
  }\r
}\r
\`\`\`\r
\r
### 射线 + Globe 检测\r
\r
\`\`\`js [!title:射线 + Globe 检测]\r
const ray = viewer.camera.getPickRay(click.position);\r
const position = viewer.scene.globe.pick(ray, viewer.scene);\r
\`\`\``;export{n as default};
