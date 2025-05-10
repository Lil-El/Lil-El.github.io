const templates = [
  {
    title: "JavaScript",
    author: "Mino",
    date: "2025-05-03",
    icon: "javascript",
    editors: [
      {
        id: "0c5fb22f-e174-4fb3-be97-c4a0dd366ba5",
        name: "HTML",
        icon: "html",
        suffix: "html",
        language: "html",
        code: `<script src="//unpkg.com/vue@2/dist/vue.js"></script>
<script src="//unpkg.com/element-ui@2.15.14/lib/index.js"></script>
<script src="//unpkg.com/jquery@3.7.1/dist/jquery.js"></script>

<div id="app">
  <template>
    <div>
      <p>Vue2</p>

      <el-divider></el-divider>

      <el-button type="success" @click="handler">Click Me.</el-button>
    </div>
  </template>
</div>`,
      },
      {
        id: "8b50fb1e-c840-41a4-9f99-38820d642852",
        name: "CSS",
        icon: "css",
        suffix: "css",
        language: "css",
        code: `@import url("//unpkg.com/element-ui@2.15.14/lib/theme-chalk/index.css");`,
      },
      {
        id: "a0f1b8c4-3d2e-4c5b-9f7d-6a0e1f8b2c3d",
        name: "JavaScript",
        icon: "javascript",
        suffix: "javascript",
        language: "javascript",
        code: `const Main = {
  data() {
    return {};
  },
  mounted(){
    $("body").css("background", "#cccccc66");
  },
  methods: {
    handler() {
      this.$message({
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      });
    }
  }
};

const Ctor = Vue.extend(Main);
new Ctor().$mount("#app");`,
      },
    ],
  },
  {
    title: "Vue3",
    author: "Mino",
    date: "2025-05-03",
    icon: "vue",
    editors: [
      {
        id: "a01397c4-3d2e-4c5b-9f7d-6a0e1f8b2c3d",
        name: "main.js",
        icon: "javascript",
        suffix: "javascript",
        language: "javascript",
        code: `import { createApp } from "vue";
import App from "App.vue";

import ElementPlus from "https://unpkg.com/element-plus@2.9.9/dist/index.full.mjs";
const { ElMessage } = ElementPlus;

const app = createApp(App);
app.config.globalProperties.$message = ElMessage;

app.use(ElementPlus);
app.mount("#app");`,
      },
      {
        id: "ea1b6d0f-80d2-4256-b466-756cf5622ad2",
        name: "App.vue",
        icon: "vue",
        suffix: "vue",
        language: "html",
        code: `<template>
  <div id="hello" @click="hello">
    <el-button type="primary">{{ msg }}</el-button>
  </div>
</template>

<script setup>
  import { delay } from "https://unpkg.com/lodash-es@4.17.21/lodash.js";
  import { ref, getCurrentInstance } from 'vue';

  const { proxy } = getCurrentInstance();
  const msg = ref('Hello Vue3!');

  function hello() {
    delay(()=>{
      proxy.$message.success("这是一条延时提示.");
    }, 500);
  }
</script>

<style scoped>
  #hello {
    color: green;
    font-weight: bold;
  }
</style>
<style>
  @import url("https://unpkg.com/element-plus@2.9.9/dist/index.css");

  body {
    background: #9dcdff33;
  }
</style>`,
      },
    ],
  },
];

const demos = [
  {
    title: "Three.js",
    author: "Mino",
    date: "2025-05-04",
    icon: "javascript",
    editors: [
      {
        id: "f0b49720-6fd6-441b-878f-2195fbe0d776",
        name: "HTML",
        icon: "html",
        suffix: "html",
        language: "html",
        code: `<div id="app"></div>`,
      },
      {
        id: "4351879b-0ac0-4960-84b0-44a1bdd23bb8",
        name: "CSS",
        icon: "css",
        suffix: "css",
        language: "css",
        code: `* {
  margin: 0;
  padding: 0;
}

#app {
  width: 100vw;
  height: 100vh;
}

canvas {
  display: block;
}
`,
      },
      {
        id: "005908e4-bb7d-4b93-ac99-a6546b042780",
        name: "JavaScript",
        icon: "javascript",
        suffix: "javascript",
        language: "javascript",
        code: `import * as THREE from "https://esm.sh/three";
import { OrbitControls } from "https://esm.sh/three/examples/jsm/controls/OrbitControls";

let w = window.innerWidth;
let h = window.innerHeight;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, w / h, 0.01, 1000);
camera.position.set(0, 0, 1);
camera.lookAt(new THREE.Vector3());

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(w, h);
// renderer.setClearColor("#111111", 1);
renderer.setClearColor(0xe6fcf5, 1);

document.getElementById("app").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const vertex = /* GLSL */ \`
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
\`;

const fragment = /* GLSL */ \`
  uniform float uTime;
  uniform sampler2D uTexture;
  varying vec2 vUv;

  // https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
  float hash(float n) { return fract(sin(n) * 1e4); }

  vec2 hash(vec2 p){
    p = vec2( dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));
    return fract(sin(p)*43758.5453);
  }

  void main() {
    float block = 6.0;

    // 1. 水平方向都错位
    float x = floor(vUv.x * block) / block;

    // vec2 newUV = vUv;
    // newUV.x += x + uTime;

    // float rand = hash(x);
    // float dir = sign(rand - 0.5);
    // gl_FragColor = vec4(vec3(rand), 1.0);
    // gl_FragColor = vec4(vec3((dir)), 1.0);

    // newUV.x += x + dir * uTime;

    // 2. 水平垂直方向都错位
    vec2 offset = floor(vUv * block) / block;
    // gl_FragColor = vec4(offset, 0.0, 1.0);

    vec2 rand = hash(offset);
    vec2 dir = sign(rand - 0.5);
    // vec2 dir = vec2(sign(rand.x-0.5), sign(rand.y-0.5));
    // gl_FragColor = vec4(rand, 0.0, 1.0);
    // gl_FragColor = vec4(dir, 0.0, 1.0);

    vec2 newUV = vUv;
    // newUV += offset;
    newUV += offset + dir * uTime;

    gl_FragColor = texture2D(uTexture, newUV);
  }
\`;

const loader = new THREE.TextureLoader();
const texture = loader.load(
  "https://s2.loli.net/2025/03/26/R1en2vJ8ofGNBOL.jpg"
); // "./assets/flower.jpg"
texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping; // RepeatWrapping MirroredRepeatWrapping

const geometry = new THREE.PlaneGeometry(1, 1);

const material = new THREE.ShaderMaterial({
  vertexShader: vertex,
  fragmentShader: fragment,
  uniforms: {
    uTime: { value: 0 },
    uTexture: { value: texture },
  },
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// let time = 0;
let clock = new THREE.Clock();
function render() {
  // time += 0.05;
  // material.uniforms.uTime.value += time;
  let time = clock.getElapsedTime();
  material.uniforms.uTime.value = time * 0.3;

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

function resize() {
  w = window.innerWidth;
  h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", resize);`,
      },
    ],
  },
];

export default function useCode(init, callback = () => {}) {
  const code = ref(init ? templates[0].title : null);

  watch(
    code,
    (title) => {
      const data = [...templates, ...demos].find((d) => d.title === title);
      callback(data);
    },
    {
      immediate: true,
    }
  );

  function getAllTemplates() {
    return templates;
  }

  function getAllDemos() {
    return demos;
  }

  return {
    code,
    getAllTemplates,
    getAllDemos,
  };
}
