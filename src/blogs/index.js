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
    children: [
      {
        id: 1,
        title: "tailwindcss",
        description: "vite + vue 使用 tailwindcss。",
        author: "Mino",
        date: "2025-06-12",
        component: () => import("./202506/2-tailwindcss.md?raw"),
      },
      {
        id: 2,
        title: "涟漪效果",
        description: "页面日夜切换的涟漪效果实现。",
        author: "Mino",
        date: "2025-07-03",
        component: () => import("./202507/1-日夜模式切换效果.md?raw"),
      },
    ],
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
    ],
  },
];

export const articles = flattenTree(directory)
  .filter((item) => item.component)
  .sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; // 按日期降序排序
  });
