<template>
  <div class="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
    <header class="relative overflow-hidden bg-[#1f2028] py-10">
      <div class="container mx-auto max-w-screen-xl bg-[#202028] pt-16 text-center">
        <svg
          width="140"
          height="230"
          viewBox="0 0 300 467"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="relative z-10 mx-auto animate-float"
          aria-hidden="true"
        >
          <path
            d="M142 348.5C141 361.167 141.6 390.3 152 405.5C165 424.5 178 456.5 181 464.5"
            stroke="black"
            stroke-width="5"
            stroke-linecap="round"
            class="animate-string"
            style="transform-origin: 40% 92%"
          ></path>
          <path
            d="M140.844 339.077C142.001 337.094 144.867 337.094 146.025 339.077L151.297 348.107C152.465 350.107 151.022 352.62 148.706 352.62H138.162C135.846 352.62 134.404 350.107 135.572 348.107L140.844 339.077Z"
            fill="#AD3A56"
          ></path>
          <path
            d="M300 161.326C300 251.5 220.707 328.146 143.939 343.13C66.6667 329.145 4.0404 244.736 -1.52588e-05 158.329C1.54128e-07 64.93 76.2185 0 154.04 0C231.862 0 300 63.4316 300 161.326Z"
            fill="url(#paint0_radial_201_2)"
          ></path>
          <ellipse cx="76.7677" cy="184.801" rx="25.2525" ry="24.9731" fill="#CD0031" fill-opacity="0.5"></ellipse>
          <ellipse cx="214.141" cy="184.801" rx="25.2525" ry="24.9731" fill="#CD0031" fill-opacity="0.4"></ellipse>
          <ellipse cx="191.919" cy="163.823" rx="13.1313" ry="12.986" fill="#222222"></ellipse>
          <ellipse cx="98.9899" cy="163.823" rx="13.1313" ry="12.986" fill="#222222"></ellipse>
          <mask
            id="mask0_201_2"
            style="mask-type: alpha"
            maskUnits="userSpaceOnUse"
            x="123"
            y="180"
            width="46"
            height="32"
          >
            <path
              d="M123.232 183.805C123.232 182.148 124.575 180.805 126.232 180.805H165.687C167.344 180.805 168.687 182.148 168.687 183.805V208.772C168.687 210.429 167.344 211.772 165.687 211.772H126.232C124.575 211.772 123.232 210.429 123.232 208.772V183.805Z"
              fill="#C4C4C4"
            ></path>
          </mask>
          <g mask="url(#mask0_201_2)">
            <path
              d="M168.687 182.304C168.687 194.717 158.512 204.779 145.96 204.779C133.408 204.779 123.232 194.717 123.232 182.304C123.232 169.891 133.408 159.828 145.96 159.828C158.512 159.828 168.687 169.891 168.687 182.304Z"
              fill="#222222"
            ></path>
          </g>
          <defs>
            <radialGradient
              id="paint0_radial_201_2"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(32.3232 221.761) rotate(-30.6138) scale(283.446 246.147)"
            >
              <stop stop-color="#FF3767"></stop>
              <stop offset="0.807292" stop-color="#F36D76"></stop>
              <stop offset="1" stop-color="#FFE1DA"></stop>
            </radialGradient>
          </defs>
        </svg>
        <div
          class="absolute top-[-1rem] w-full overflow-hidden"
          style="left: 50%; transform: translateX(-50%); width: max-content"
        >
          <img
            role="presentation"
            class="select-none"
            src="data:image/png;base64,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"
            width="1167"
            height="648"
          /><img
            role="presentation"
            class="absolute select-none transition-all duration-500 top-0 scale-100"
            :class="flag ? 'scale-95 opacity-0' : 'scale-100'"
            width="1167"
            height="648"
            src="@/assets/floating-ui.jpg"
            @load="flag = false"
          />
        </div>
        <div class="z-1 relative top-25">
          <h1
            class="tracking-widest inline-block bg-gradient-to-br from-rose-400 via-purple-500 to-cyan-500 bg-clip-text py-1 text-4xl font-bold text-transparent dark:mt-0 dark:from-rose-400 dark:via-purple-400 dark:to-cyan-400"
          >
            <span
              id="welcome-txt"
              :style="{ '--ti-cursor-color': 'var(--color-purple-200)' }"
              title="欢迎访问Mino的网站"
            ></span>
          </h1>
        </div>
        <div class="z-1 relative mt-34 flex flex-row justify-center gap-x-4">
          <a
            class="hover:saturate-110 flex items-center gap-2 whitespace-nowrap rounded bg-gradient-to-br from-red-300 via-violet-300 to-cyan-400 px-4 py-3 font-bold text-gray-900 shadow-lg transition hover:shadow-xl hover:brightness-110 sm:text-lg"
            href="#/blogs"
            >Get Started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline></svg></a
          ><a
            href="https://blog.csdn.net/qq_36157085"
            class="flex items-center gap-2 rounded bg-gray-50 px-4 py-3 font-bold text-gray-900 shadow-lg transition hover:shadow-xl sm:text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span><span class="text-red-600">C</span><span>SDN</span></span>
          </a>
        </div>
        <p
          class="z-1 relative mx-auto mt-10 px-4 text-center text-xl leading-relaxed text-purple-200 dark:prose-invert lg:text-2xl"
        >
          <span title="代码是充满激情的艺术🎨✨">"Code is Art, Crafted with Passion"​ 🎨✨</span>
        </p>
      </div>
    </header>

    <main class="mx-auto max-w-7xl">
      <section>
        <div class="container mx-auto max-w-screen-xl px-4 md:px-8">
          <h2
            class="mt-12 mb-4 inline-block bg-gradient-to-br from-rose-400 via-purple-500 to-cyan-500 bg-clip-text py-1 text-3xl font-bold text-transparent dark:mt-0 dark:from-rose-400 dark:via-purple-400 dark:to-cyan-400 lg:mt-16 lg:text-4xl lg:[line-height:3.5rem] dark:lg:mt-4"
          >
            最近发布
          </h2>
          <p class="text-left text-xl dark:prose-invert lg:text-2xl lg:leading-relaxed">Latest blogs.</p>
        </div>
        <div
          class="container mx-auto grid max-w-screen-xl gap-4 py-10 dark:text-black sm:grid-cols-2 px-4 lg:grid-cols-3"
        >
          <div
            class="flex h-[18rem] flex-col justify-between bg-white p-10 shadow dark:bg-gray-700 dark:text-gray-100 sm:h-[19rem] rounded-lg md:h-[18rem] transition hover:shadow-xl max-sm:p-5 max-md:p-8"
            v-for="item in latest"
            :key="item.id"
          >
            <div>
              <h3 class="mb-6 text-3xl font-bold">{{ item.title }}</h3>
              <p class="line-clamp-3">{{ item.description }}</p>
            </div>
            <div class="text-right text-sm text-gray-600 dark:text-gray-400">
              <span>{{ item.date }}</span>
            </div>
            <div class="flex justify-end">
              <a
                class="flex items-center gap-2 text-xl font-bold text-rose-600 dark:text-rose-300"
                :href="`#/blogs/${item.id}`"
                >See...
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline></svg
              ></a>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="container mx-auto max-w-screen-xl px-4 md:px-8">
          <h2
            class="mt-12 mb-4 inline-block bg-gradient-to-br from-rose-400 via-purple-500 to-cyan-500 bg-clip-text py-1 text-3xl font-bold text-transparent dark:mt-0 dark:from-rose-400 dark:via-purple-400 dark:to-cyan-400 lg:mt-16 lg:text-4xl lg:[line-height:3.5rem] dark:lg:mt-4"
          >
            在线工具
          </h2>
          <p class="text-left text-xl dark:prose-invert lg:text-2xl lg:leading-relaxed">
            Powered by <span class="font-bold">Mino</span>.
          </p>
        </div>
        <div
          class="container mx-auto grid max-w-screen-xl gap-4 py-10 dark:text-black sm:grid-cols-2 px-4 lg:grid-cols-3"
        >
          <div
            class="flex h-[18rem] flex-col justify-between bg-white p-10 shadow dark:bg-gray-700 dark:text-gray-100 sm:h-[19rem] rounded-lg md:h-[18rem] transition hover:shadow-xl max-sm:p-5 max-md:p-8"
          >
            <div>
              <h3 class="mb-6 text-3xl font-bold">Code Pen</h3>
              <p>在线代码编辑器，支持 javascript、vue3、react 等。</p>
            </div>
            <div class="flex justify-end">
              <a class="flex items-center gap-2 text-xl font-bold text-rose-600 dark:text-rose-300" href="#/codepen"
                >Coding...
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline></svg
              ></a>
            </div>
          </div>
          <div
            class="flex h-[18rem] flex-col justify-between bg-white p-10 shadow dark:bg-gray-700 dark:text-gray-100 sm:h-[19rem] rounded-lg md:h-[18rem] transition hover:shadow-xl max-sm:p-5 max-md:p-8"
          >
            <div>
              <h3 class="mb-6 text-3xl font-bold">Markdown</h3>
              <p>Markdown 解析工具，内置 CodePen 插件。</p>
            </div>
            <div class="flex justify-end">
              <a class="flex items-center gap-2 text-xl font-bold text-rose-600 dark:text-rose-300" href="#/markdown"
                >Writing...
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline></svg
              ></a>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="container mx-auto max-w-screen-xl px-4 md:px-8">
          <h2
            class="mt-12 mb-4 inline-block bg-gradient-to-br from-rose-400 via-purple-500 to-cyan-500 bg-clip-text py-1 text-3xl font-bold text-transparent dark:mt-0 dark:from-rose-400 dark:via-purple-400 dark:to-cyan-400 lg:mt-16 lg:text-4xl lg:[line-height:3.5rem] dark:lg:mt-4"
          >
            其他站点
          </h2>
          <p class="text-left text-xl dark:prose-invert lg:text-2xl lg:leading-relaxed">
            Powered by <span class="font-bold">Mino</span>.
          </p>
        </div>
        <div
          class="container mx-auto grid max-w-screen-xl gap-4 py-10 dark:text-black sm:grid-cols-2 max-md:mb-0 px-4 lg:grid-cols-3"
        >
          <div
            class="flex h-[18rem] flex-col justify-between bg-white p-10 shadow dark:bg-gray-700 dark:text-gray-100 sm:h-[19rem] rounded-lg md:h-[18rem] transition hover:shadow-xl max-sm:p-5 max-md:p-8"
          >
            <div>
              <h3 class="mb-6 text-3xl font-bold">Gis Measure</h3>
              <p>ArcGIS 三维场景下实现沿地表进行距离、面积、体积的测量。</p>
            </div>
            <div class="flex justify-end">
              <a
                class="flex items-center gap-2 text-xl font-bold text-rose-600 dark:text-rose-300"
                href="https://lil-el.github.io/gis-measure/"
                target="_blank"
                >Measuring...
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline></svg
              ></a>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="container mx-auto max-w-screen-xl px-4 md:px-8">
          <h2
            class="mt-12 mb-4 inline-block bg-gradient-to-br from-rose-400 via-purple-500 to-cyan-500 bg-clip-text py-1 text-3xl font-bold text-transparent dark:mt-0 dark:from-rose-400 dark:via-purple-400 dark:to-cyan-400 lg:mt-16 lg:text-4xl lg:[line-height:3.5rem] dark:lg:mt-4"
          >
            技术栈
          </h2>
        </div>
        <div class="max-w-screen-xl flex justify-center pt-10 px-4 mb-12">
          <img class="sm:w-7/12 w-auto" src="@/assets/cloud.png" alt="" />
        </div>
      </section>
    </main>
    <footer class="bg-[#1f2028] py-10 text-xs text-gray-400 max-md:hidden">
      <div class="mx-auto max-w-7xl grid grid-cols-2 gap-x-10">
        <div class="flex flex-col gap-y-6">
          <div class="flex items-center gap-x-2 h-12">
            <img src="/ico.svg" width="60" alt="" />
            <span class="text-base font-[MapleMono]">Mino部落格</span>
          </div>
          <p>本站由 <span class="font-[MapleMono]">Mino</span> 搭建，用于个人博客、代码、示例记录和展示。</p>
          <p class="font-[MapleMono]">©Mino, powered by Mino.</p>
        </div>
        <div class="flex flex-col gap-y-6">
          <div class="flex items-center gap-x-2 h-12">
            <span class="text-base">联系方式</span>
          </div>
          <div class="flex items-center gap-x-4">
            <div class="group h-8.5 flex items-center cursor-pointer relative">
              <span class="iconfont icon-weixin" style="font-size: 34px"></span>
              <div class="hidden group-hover:block absolute w-[200px] -top-52">
                <img src="@/assets/weixin.png" alt="" />
              </div>
            </div>
            <div class="h-8.5 flex items-center cursor-pointer">
              <a href="mailto:yxd99324@qq.com">
                <span class="iconfont icon-youxiang" style="font-size: 34px"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import TypeIt from "typeit";
import { articles } from "@/blogs";

/*
https://blog.csdn.net/qq_36157085/article/details/119383264 调试

codepen 类型校验：只支持js、vue、react，对内容进行校验和错误提示
codepen 改造支持 iframe，可以url自定义属性 https://codepen.io/iamkun/embed/YzWMaVr?height=469&theme-id=light&default-tab=html,result
博客首页进行归档

主题配色/mode
app 读取目录生成左侧目录，点击目录跳转对应md文件，左侧目录做面包屑，添加目录层级进入、退出的切换动画效果
年度任务：
  - 微前端
  - ArcGIS + Three.js
  - Three.js
  - D3.js 大数据渲染
  - 断点上传、下载；

  飞线、波纹扩散
  https://blog.csdn.net/qq_37155408/article/details/124456096
  https://blog.csdn.net/qq_37155408/article/details/145520997
  https://blog.csdn.net/qq_37155408/article/details/105295877
*/

const flag = ref(true);

const latest = articles.slice(-5);

onMounted(() => {
  document.documentElement.style.overflow = "auto";

  new TypeIt("#welcome-txt", {
    speed: 50,
    startDelay: 900,
    afterComplete: (instance) => {
      setTimeout(() => {
        instance.destroy();
      }, 500);
    },
  })
    .type("Welcome to here, ", { delay: 500 })
    .pause(200)
    .type("Mini site.", { delay: 400 })
    .pause(500)
    .move(-6, { delay: 500 })
    .delete(1, { delay: 200 })
    .type("o", { delay: 100 })
    .type("'", { delay: 100 })
    .type("s", { delay: 100 })
    .move(null, { to: "END" })
    .go();
});
</script>

<style scoped>
.animate-string {
  animation: 0.25s ease-in-out 0s infinite normal none running string;
}
@keyframes string {
  25% {
    transform: translate(0.02rem, -0.05rem) scaleY(1.03) scaleX(1.02);
  }
  50% {
    transform: translate(0.1rem, 0.1rem) scaleY(1.05) scaleX(0.95);
  }
  75% {
    transform: translate(0.05rem, 0.05rem) scaleY(0.96) scaleX(1);
  }
}
.animate-float {
  animation: 8s ease 0s infinite normal none running float;
}
@keyframes float {
  0%,
  100% {
    transform: rotate(-1deg) translate(-0.1rem, 1rem);
  }
  50% {
    transform: rotate(2deg);
  }
  75% {
    transform: rotate(0.5deg) translate(0.25rem, 0.5rem);
  }
}
</style>
