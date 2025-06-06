import { createApp } from "vue";
import "./style.css";
import "@/assets/css/iconfont.css";
import "@lil-el/codepen/css";
import "@lil-el/markdown/css";

import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");
