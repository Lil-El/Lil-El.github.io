import{r,A as l,c as n,g as i,u as d}from"../assets/index-Dx5HCA9Y.js";const a=["srcdoc"],h={__name:"index",props:["title","author","date","project","editors"],setup(c){const e=c,s=r(p(e?JSON.stringify(e):""));console.log(e),l(()=>e.title,t=>{console.log(t)},{deep:!0});function p(t){const o=document.querySelector("#md-content-article");return`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Code Pen</title>
      <style>
        @import url("https://unpkg.com/@lil-el/codepen@latest/css");
      </style>
    </head>
    <body>
      <div id="app" style="--codepen-color: ${getComputedStyle(o).getPropertyValue("--codepen-color")};"></div>

      <script type="importmap">
        {
          "imports": {
            "vue": "https://unpkg.com/vue@3.5.13/dist/vue.esm-browser.js",
            "@lil-el/codepen": "https://unpkg.com/@lil-el/codepen@latest/dist/index.js"
          }
        }
      <\/script>
      <script src="https://unpkg.com/@tailwindcss/browser@4"><\/script>
      <script type="module">
        import { createApp, h } from "vue";
        import { codepen } from "@lil-el/codepen";

        const App = h(codepen, ${t});

        createApp(App).mount("#app");
      <\/script>
    </body>
    </html>
  `.replaceAll(/\n\s+/g,"")}return(t,o)=>(i(),n("iframe",{srcdoc:d(s),class:"size-full"},null,8,a))}};export{h as default};
