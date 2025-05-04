const templates = [
  {
    name: "JavaScript",
    author: "Mino",
    date: "2025-05-03",
    icon: "javascript",
    editors: [
      {
        id: "0c5fb22f-e174-4fb3-be97-c4a0dd366ba5",
        language: "HTML",
        code: `<div id="hello">Hello World!</div>`,
      },
      {
        id: "8b50fb1e-c840-41a4-9f99-38820d642852",
        language: "CSS",
        code: `#hello { color: red; }`,
      },
      {
        id: "a0f1b8c4-3d2e-4c5b-9f7d-6a0e1f8b2c3d",
        language: "JavaScript",
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
    name: "Vue",
    author: "Mino",
    date: "2025-05-03",
    icon: "vue",
    editors: [
      {
        id: "82311643-e555-48eb-967f-8e20d02ab11c",
        language: "HTML",
        code: `<div id="app"></div>`,
      },
      {
        id: "e82a31d9-78de-4763-97e7-19d226fd5a5a",
        language: "CSS",
        code: `:root { font-size: 14px; }`,
      },
      {
        id: "ea1b6d0f-80d2-4256-b466-756cf5622ad2",
        language: "Vue",
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
    name: "JSON",
    author: "Mino",
    date: "2025-05-03",
    icon: "json",
    editors: [
      {
        id: "811c3406-ee71-4865-a9b5-688d5e239b89",
        language: "JSON",
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
    name: "Markdown",
    author: "Mino",
    date: "2025-05-03",
    icon: "markdown",
    editors: [
      {
        id: "e6a4612e-b39c-442a-a2fb-545c46f246c0",
        language: "Markdown",
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
    name: "TXT",
    author: "Mino",
    date: "2025-05-03",
    icon: "txt",
    editors: [
      {
        id: "9fb80305-6c0b-4cc8-b56d-180b6212bc6c",
        language: "TXT",
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
    name: "Three.js",
    author: "Mino",
    date: "2025-05-04",
    icon: "javascript",
    editors: [
      {
        id: "f0b49720-6fd6-441b-878f-2195fbe0d776",
        language: "HTML",
        code: `<div id="container"></div>`,
      },
      {
        id: "4351879b-0ac0-4960-84b0-44a1bdd23bb8",
        language: "CSS",
        code: `body {
  margin: 0;
  overflow: hidden;
}

#container {
  width: 100vw;
  height: 100vh;
}
`,
      },
      {
        id: "005908e4-bb7d-4b93-ac99-a6546b042780",
        language: "JavaScript",
        code: `import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r125/build/three.module.js";

const canvas = document.querySelector("#container");
const renderer = new THREE.WebGLRenderer({ canvas });

const fov = 75;
const aspect = 2; // the canvas default
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}
function render() {
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);`,
      },
    ],
  },
];

export default function useCode(callback) {
  const code = ref(templates[0].name);

  watch(
    code,
    (name) => {
      const data = [...templates, ...demos].find((d) => d.name === name);
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
