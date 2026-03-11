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
        title: "日夜模式背景切换效果",
        description: "页面中日夜模式切换时的背景黑白聚散效果实现。",
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
  {
    id: "Lib",
    title: "组件库系列",
    children: [
      {
        id: 3,
        title: "组件库系列-基础搭建",
        description: "组件库系列：组件库基础组件以及内容的构建。",
        author: "Mino",
        date: "2025-07-16",
        component: () => import("./202507/2-组件库-1.基础搭建.md?raw"),
      },
      {
        id: 4,
        title: "组件库系列-打包配置",
        description: "组件库系列：组件库基于 vite 打包配置。",
        author: "Mino",
        date: "2025-07-16",
        component: () => import("./202507/3-组件库-2.打包配置.md?raw"),
      },
      {
        id: 5,
        title: "组件库系列-ts配置",
        description: "组件库系列：组件库基础 ts 内容进行配置。",
        author: "Mino",
        date: "2025-07-16",
        component: () => import("./202507/4-组件库-3.ts配置.md?raw"),
      },
      {
        id: 6,
        title: "组件库系列-安装使用",
        description: "组件库系列：将组件库发布到 npm 仓库，并安装使用。",
        author: "Mino",
        date: "2025-07-31",
        component: () => import("./202507/5-组件库-4.发布安装.md?raw"),
      },
    ],
  },
  {
    id: "Monorepo",
    title: "Monorepo",
    description: "Monorepo 架构与 pnpm Workspace 完全指南。",
    author: "Mino",
    date: "2026-03-11",
    component: () => import("./202603/1-monorepo.md?raw"),
  },
];

const lateId = "Monorepo";

export const articles = flattenTree(directory)
  .filter((item) => item.component)
  .sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; // 按日期降序排序
  });