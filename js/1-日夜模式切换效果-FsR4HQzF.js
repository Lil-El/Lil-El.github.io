const n=`# 日夜模式切换涟漪效果实现 [!toc hide]\r
\r
---\r
\r
# 背景\r
\r
在 [element-plus](https://element-plus.org/) 网站中，点击日夜模式切换时，有[从中心向外扩散](!notation:underline:greenyellow)的颜色的平滑过渡效果；\r
\r
所以我们可以基于 \`CSS 圆心渐变\` 实现一下；\r
\r
# 实现\r
\r
## 核心\r
\r
1. [通过 \`radial-gradient\` 实现圆形样式；](!notation:underline:red)\r
2. [需要在点击按钮时调整圆心的位置；](!notation:underline:red)\r
3. [使用\`@property\`实现 \`background-image\` 的动画过渡效果；](!notation:underline:red)\r
\r
    \`\`\`markdown [!tip:primary]\r
    由于 \`background-image\` 的样式无法使用 \`transition\` 动画，所以只能使用 \`@property\` 实现动画效果；\r
\r
    每次只需要调整 \`--size\` 的值，就可以实现动画效果；\r
    \`\`\`\r
\r
## 代码\r
\r
\`\`\`html [!title:index.html]\r
<!DOCTYPE html>\r
<html lang="en">\r
  <head>\r
    <meta charset="UTF-8" />\r
    <title>light</title>\r
    <style>\r
      * {\r
        margin: 0;\r
        padding: 0;\r
      }\r
      @property --size {\r
        syntax: "<length>";\r
        initial-value: 0;\r
        inherits: false;\r
      }\r
      body {\r
        --size: 0px;\r
        width: 100vw;\r
        height: 100vh;\r
        background-repeat: no-repeat;\r
        transition: --size 0.8s ease-in;\r
      }\r
      .dark {\r
        --size: 2000px;\r
      }\r
\r
      .btn {\r
        position: absolute;\r
        top: 10%;\r
        left: 90%;\r
        color: aqua;\r
        cursor: pointer;\r
      }\r
    </style>\r
  </head>\r
  <body>\r
    <div class="btn" onclick="toggle(event)">toggle</div>\r
\r
    <script>\r
      function toggle(evt) {\r
        document.body.style.backgroundImage = \`radial-gradient(circle at \${evt.clientX}px \${evt.clientY}px, white var(--size), black var(--size))\`;\r
        document.body.classList.toggle("dark");\r
      }\r
    <\/script>\r
  </body>\r
</html>\r
\`\`\`\r
`;export{n as default};
