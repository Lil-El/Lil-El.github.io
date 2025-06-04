import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/blogs",
    name: "blogs",
    component: () => import("@/layouts/layout.vue"),
    children: [
      {
        path: "",
        name: "started",
        component: () => import("@/views/blogs/started.vue"),
      },
      {
        path: ":id",
        name: "blog",
        component: () => import("@/views/blogs/blog.vue"),
      },
    ],
  },
  {
    path: "/codepen",
    name: "codepen",
    component: () => import("@/views/Codepen.vue"),
  },
  {
    path: "/markdown",
    name: "markdown",
    component: () => import("@/views/Markdown.vue"),
    meta: { title: "Markdown" },
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + " - " + __APP_TITLE__;
  } else {
    document.title = __APP_TITLE__;
  }
  next();
});

export default router;
