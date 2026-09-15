# Cesium 拾取（Pick）方法汇总

## 1. 场景拾取

### `viewer.scene.pick(windowPosition)`

拾取屏幕位置**最顶层**的对象。

- **参数**: `windowPosition` — `Cartesian2`，屏幕坐标
- **返回**: `{ primitive, id, collection, ... }` 或 `undefined`
- **用途**: 获取鼠标点击处最上方的 Entity / Primitive

```js [!title:scene.pick]
const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
handler.setInputAction((click) => {
  const picked = viewer.scene.pick(click.position);
  if (Cesium.defined(picked)) {
    console.log(picked.id); // Entity
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
```

---

### `viewer.scene.drillPick(windowPosition, limit)`

**穿透拾取**，返回该位置所有对象列表。

- **参数**:
  - `windowPosition` — `Cartesian2`
  - `limit` — `Number`，可选，限制返回数量
- **返回**: `Array<{ primitive, id, ... }>`
- **用途**: 多个对象重叠时获取全部

```js [!title:drillPick]
const pickedObjects = viewer.scene.drillPick(click.position);
pickedObjects.forEach((obj) => {
  console.log(obj.id); // 所有被击中的 Entity
});
```

---

### `viewer.scene.pickPosition(windowPosition)`

获取屏幕坐标对应的**世界 3D 坐标**（需有地形 / 模型表面）。

- **参数**: `windowPosition` — `Cartesian2`
- **返回**: `Cartesian3` 或 `undefined`
- **用途**: 获取点击处的地形 / 3D Tile 表面坐标

```js [!title:pickPosition]
const cartesian = viewer.scene.pickPosition(click.position);
if (Cesium.defined(cartesian)) {
  // 有效的地面坐标
}
```

```markdown [!tip:warning]
> **注意**: 若点击处没有地形或模型表面，会返回 `undefined`。
```

---

## 2. 相机拾取

### `viewer.camera.pickEllipsoid(windowPosition, ellipsoid, result)`

拾取**椭球体表面**坐标，不依赖地形数据，始终有值。

- **参数**:
  - `windowPosition` — `Cartesian2`
  - `ellipsoid` — `Ellipsoid`，可选，默认 `Ellipsoid.WGS84`
  - `result` — `Cartesian3`，可选，复用对象
- **返回**: `Cartesian3` 或 `undefined`
- **用途**: 降级方案，当地形未加载时获取地表坐标

```js [!title:pickEllipsoid]
const position = viewer.camera.pickEllipsoid(click.position);
// 始终返回椭球面上的坐标
```

---

### `viewer.camera.getPickRay(windowPosition, result)`

获取从相机穿过屏幕点的**射线**。

- **参数**:
  - `windowPosition` — `Cartesian2`
  - `result` — `Ray`，可选
- **返回**: `Ray`
- **用途**: 自定义射线检测（如与 Globe、模型做碰撞检测）

```js [!title:getPickRay]
const ray = viewer.camera.getPickRay(click.position);
const globePosition = viewer.scene.globe.pick(ray, viewer.scene);
```

---

## 3. Globe 拾取

### `viewer.scene.globe.pick(ray, scene, result)`

传入射线，拾取 Globe 表面位置。

- **参数**:
  - `ray` — `Ray`
  - `scene` — `Scene`
  - `result` — `Cartesian3`，可选
- **返回**: `Cartesian3` 或 `undefined`

```js [!title:globe.pick]
const ray = viewer.camera.getPickRay(click.position);
const globePos = viewer.scene.globe.pick(ray, viewer.scene);
```

---

## 4. 当前选中实体

### `viewer.selectedEntity`

获取当前**已选中**的 Entity（通过点击或 `viewer.trackedEntity` 设置）。

- **返回**: `Entity` 或 `undefined`
- **用途**: 获取当前选中的实体，无需额外事件监听

```js [!title:selectedEntity]
const selected = viewer.selectedEntity;
if (selected) {
  console.log(selected.name);
}
```

---

## 5. 对比总结

| 方法 | 依赖 | 始终有值 | 返回类型 |
|---|---|---|---|
| `scene.pick` | Entity / Primitive | [❌](!notation:highlight:red) | 对象信息 |
| `scene.drillPick` | Entity / Primitive | [❌](!notation:highlight:red) | 对象数组 |
| `scene.pickPosition` | 地形 / 3D Tile | [❌](!notation:highlight:red) | 世界坐标 |
| `camera.pickEllipsoid` | 无 | [✅](!notation:highlight:green) | 世界坐标 |
| `camera.getPickRay` | 无 | [✅](!notation:highlight:green) | 射线 |
| `globe.pick` | Globe | [❌](!notation:highlight:red) | 世界坐标 |
| `viewer.selectedEntity` | 选中状态 | [❌](!notation:highlight:red) | Entity |

---

## 6. 常见实战组合

### 精确获取地面坐标（优先地形，降级椭球）

```js [!title:精确获取地面坐标]
let cartesian = viewer.scene.pickPosition(click.position);
if (!Cesium.defined(cartesian)) {
  cartesian = viewer.camera.pickEllipsoid(click.position);
}
```

### 过滤特定类型对象

```js [!title:过滤特定类型对象]
const picked = viewer.scene.pick(click.position);
if (Cesium.defined(picked)) {
  if (picked.id instanceof Cesium.Entity) {
    // 选中了 Entity
  }
  if (picked.primitive instanceof Cesium.Model) {
    // 选中了 Model 基元
  }
  if (picked.primitive instanceof Cesium.Cesium3DTileset) {
    // 选中了 3D Tileset
  }
}
```

### 射线 + Globe 检测

```js [!title:射线 + Globe 检测]
const ray = viewer.camera.getPickRay(click.position);
const position = viewer.scene.globe.pick(ray, viewer.scene);
```