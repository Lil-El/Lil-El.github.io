import { flattenTree } from "../utils";

export const directory = [
  {
    id: "HTML",
    title: "HTML",
    children: [],
  },
  {
    id: "CSS",
    title: "CSS",
    children: [],
  },
  {
    id: "JavaScript",
    title: "JavaScript",
    children: [],
  },
  {
    id: "Vue",
    title: "Vue",
    children: [],
  },
  {
    id: "微前端",
    title: "微前端",
    children: [
      {
        id: 0,
        title: "微前端应用",
        description: "基于 qiankun + vite + vue3 构建一个微前端的应用。",
        author: "Mino",
        date: "2025-06-04",
        component: () => import("./202506/1-微前端应用.md?raw"),
      },
      {
        id: 1,
        title: "微前端应用2",
        description: "基于 qiankun + vite + vue3 构建一个微前端的应用。",
        author: "Mino",
        date: "2025-06-04",
        component: () => import("./202506/1-微前端应用.md?raw"),
      },
    ],
  },
];

export const articles = flattenTree(directory).filter((item) => item.component);
