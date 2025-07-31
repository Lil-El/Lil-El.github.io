const n=`# tsconfig 配置 [!toc hide]\r
\r
\`element-plus\` 中，它打包的结果的目录结构如下：\r
\r
\`\`\`markdown\r
element-plus\r
  ├── dist/\r
  │   ├── index.css\r
  │   └── index.full.js\r
  ├── es/\r
  │   ├── components/\r
  │   │   ├── alert/\r
  │   │   │   ├── src/\r
  │   │   │   ├── style/\r
  │   │   │   ├── index.d.ts\r
  │   │   │   └── index.ts\r
  │   │   ├── index.d.ts\r
  │   │   └── index.ts\r
  │   ├── index.d.ts\r
  │   └── index.ts\r
  ├── lib/\r
  │   ├── components/\r
  │   │   ├── alert/\r
  │   │   │   ├── src/\r
  │   │   │   ├── style/\r
  │   │   │   ├── index.d.ts\r
  │   │   │   └── index.ts\r
  │   │   ├── index.d.ts\r
  │   │   └── index.ts\r
  │   ├── index.d.ts\r
  │   └── index.ts\r
  ├── global.d.ts\r
  └── package.json\r
\`\`\`\r
\r
它会将源码目录中的 \`.ts\`、\`.vue\` 文件自动生成 \`.dts\` 文件\r
\r
\`\`\`markdown [!tip:warning]\r
项目安装了 \`vue-tsc\` 插件，所以不需要按照 \`tsc\` 等插件，也无需在 \`vite\` 中配置；\r
\`\`\`\r
\r
## tsconfig\r
\r
\`es\` 和 \`cjs\` 打包结构要对原有目录结构进行保留，所以要对这两种模块的打包结果进行处理，将其中的 \`*.ts\`、\`*.vue\` 等文件进行 \`dts\` 处理；\r
\r
\`\`\`ts [!title:tsconfig.json]\r
{\r
  "files": [],\r
  "references": [\r
    { "path": "./tsconfig.app.json" },\r
    { "path": "./tsconfig.node.json" },\r
    { "path": "./tsconfig.es.json" },\r
    { "path": "./tsconfig.cjs.json" }\r
  ]\r
}\r
\`\`\`\r
\r
\`\`\`ts [!title:tsconfig.es.json]\r
{\r
  "compilerOptions": {\r
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.es.tsbuildinfo",\r
\r
    /* Linting */\r
    "strict": true,\r
    "noUnusedLocals": true,\r
    "noUnusedParameters": true,\r
    "erasableSyntaxOnly": true,\r
    "noFallthroughCasesInSwitch": true,\r
    "noUncheckedSideEffectImports": true,\r
\r
    "target": "ESNext",\r
    "module": "ESNext",\r
    "moduleResolution": "node",\r
    "types": ["vite/client"], // 如果使用 Vite\r
\r
    "outDir": "es", // 输出目录\r
    "declarationDir": "es",\r
    "declaration": true, // 生成 .d.ts 文件\r
    "emitDeclarationOnly": true, // 只生成声明文件\r
    "rootDir": "src" // 源文件根目录\r
  },\r
  "include": ["src/**/*.ts", "src/**/*.vue"],\r
  "exclude": ["src/App.vue", "src/main.ts"]\r
}\r
\r
\`\`\`\r
\r
\`\`\`ts [!title:tsconfig.cjs.ts]\r
{\r
  "compilerOptions": {\r
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.cjs.tsbuildinfo",\r
\r
    /* Linting */\r
    "strict": true,\r
    "noUnusedLocals": true,\r
    "noUnusedParameters": true,\r
    "erasableSyntaxOnly": true,\r
    "noFallthroughCasesInSwitch": true,\r
    "noUncheckedSideEffectImports": true,\r
\r
    "target": "ESNext",\r
    "module": "ESNext",\r
    "moduleResolution": "node",\r
    "types": ["vite/client"], // 如果使用 Vite\r
\r
    "outDir": "lib", // 输出目录\r
    "declarationDir": "lib",\r
    "declaration": true, // 生成 .d.ts 文件\r
    "emitDeclarationOnly": true, // 只生成声明文件\r
    "rootDir": "src" // 源文件根目录\r
  },\r
  "include": ["src/**/*.ts", "src/**/*.vue"],\r
  "exclude": ["src/App.vue", "src/main.ts"]\r
}\r
\r
\`\`\`\r
\r
\`\`\`markdown [!tip:warning]\r
\`tsBuildInfoFile\`：配置是 \`ts构建信息文件\` 的生成位置，如果不配置，每次 \`vue-tsc\` 会将信息文件生成在根目录下\r
\`\`\`\r
`;export{n as default};
