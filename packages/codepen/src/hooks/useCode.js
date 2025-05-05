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
        code: `<div id="hello">Hello World!</div>`,
      },
      {
        id: "8b50fb1e-c840-41a4-9f99-38820d642852",
        name: "CSS",
        icon: "css",
        suffix: "css",
        language: "css",
        setting: {
          component: "css",
          value: {
            links: [],
          },
        },
        code: `#hello { color: red; }`,
      },
      {
        id: "a0f1b8c4-3d2e-4c5b-9f7d-6a0e1f8b2c3d",
        name: "JavaScript",
        icon: "javascript",
        suffix: "javascript",
        language: "javascript",
        setting: {
          component: "javascript",
          value: {
            esm: false,
            links: [],
          },
        },
        code: `function hello() {
  alert('Hello world!');
}

const ele = document.getElementById('hello');
ele.addEventListener('click', hello);
`,
      },
    ],
  },
  {
    title: "Vue",
    author: "Mino",
    date: "2025-05-03",
    icon: "vue",
    editors: [
      {
        id: "ea1b6d0f-80d2-4256-b466-756cf5622ad2",
        name: "Vue",
        icon: "vue",
        suffix: "vue",
        language: "html",
        setting: {
          component: "vue",
          value: {
            ui: true,
          },
        },
        code: `<template>
  <div id="hello" @click="hello">{{ msg }}</div>
</template>

<script setup>
  import { ref } from 'vue';

  const msg = ref('Hello World!');

  function hello() {
    alert(msg.value);
  }
<\/script>

<style scoped>
  #hello {
    color: red;
  }
<\/style>`,
      },
    ],
  },
  {
    title: "JSON",
    author: "Mino",
    date: "2025-05-03",
    icon: "json",
    suffix: "json",
    editors: [
      {
        id: "811c3406-ee71-4865-a9b5-688d5e239b89",
        name: "JSON",
        icon: "json",
        language: "json",
        code: `{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "isStudent": false,
  "courses": ["HTML", "CSS", "JavaScript"],
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "friends": [
      {
        "name": "Jane Smith",
        "age": 28,
        "city": "Los Angeles"
      },
      {
        "name": "Mike Johnson",
        "age": 32,
        "city": "Chicago"
      }
    ]
  }
}`,
      },
    ],
  },
  {
    title: "Markdown",
    author: "Mino",
    date: "2025-05-03",
    icon: "markdown",
    suffix: "markdown",
    editors: [
      {
        id: "e6a4612e-b39c-442a-a2fb-545c46f246c0",
        name: "Markdown",
        icon: "markdown",
        language: "markdown",
        code: `# Hello World

This is a **Markdown** document. by [\`Mino\`](https://lil-el.github.io/)

## Features

- code editor
- Easy to write
- Easy to learn

## Code

\`\`\`javascript
function hello() {
  alert('Hello world!');
}
\`\`\`

# End of Document

>  Thank you for reading!
`,
      },
    ],
  },
  {
    title: "TXT",
    author: "Mino",
    date: "2025-05-03",
    icon: "txt",
    suffix: "txt",
    editors: [
      {
        id: "9fb80305-6c0b-4cc8-b56d-180b6212bc6c",
        name: "TXT",
        icon: "txt",
        language: "txt",
        code: `Hello World!
This is a simple text file.
It contains plain text without any formatting.
`,
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
        setting: {
          component: "css",
          value: {
            links: [],
          },
        },
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
        setting: {
          component: "javascript",
          value: {
            esm: true,
            links: [],
          },
        },
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
      if (data) {
        callback(data);
      }
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
