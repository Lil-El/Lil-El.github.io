import { createApp } from "vue";
import "@/assets/css/iconfont.css";
import "@lil-el/codepen/css";
import "@lil-el/markdown/css";
import "./style.css";

import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");
