# Ollama 安装与使用 [!toc hide]

```markdown [!tip:info]
如果你厌倦了把数据上传到云端,或者受够了 ChatGPT 的付费墙和网络波动,那么 Ollama 绝对是你的菜。它就像是一个"本地 AI 容器",能让你在 Windows 电脑上轻松跑起 Llama 3、DeepSeek 这些顶尖大模型,而且数据完全不出域,隐私性拉满。

这篇文章就手把手教你在 Windows 上搞定它,顺便解决新手最头疼的"C盘爆红"问题。
```

## 一、🥢准备动作:别急着点安装

在下载之前,先确认下你的"硬件地基"够不够稳:

<!-- 这里可以添加硬件要求列表 -->

## 二、🍲安装:一键傻瓜式操作

现在的 **Ollama** 对 Windows 支持已经非常友好了,不需要去折腾复杂的 Linux 命令。

1. ​下载：打开 ollama官网，点击大大的 "Download for Windows"，拿到 OllamaSetup.exe。
2. 安装：双击运行，一路点 "Install" 即可。它会自动帮你配好环境变量，省心得很。
3. 安装完别急着关，按 Win + R输入 cmd 打开命令提示符，输入：

    ```bash
    ollama --version
    ```
    如果蹦出类似  ollama version 0.xx.x 的字样，恭喜你，第一步成了 。

    > Ollama 默认安装在 C 盘，输入以下命令可以将其安装在 D 盘指定目录下：
    > ```bash
    >   OllamaSetup.exe /DIR="D:\Ollama"
    > ```
4. 在 [localhost:11434](!notation:underline:red) 可以查看 Ollama  的运行状态


## 三、🚧避坑指南:拯救你的 C 盘

这是最关键的一步。Ollama 默认把模型塞进 C 盘用户目录(`C:\Users\<你>\.ollama\models`)。现在的模型动辄 5GB、10GB,C 盘瞬间爆炸是迟早的事。

我们需要手动改一下"仓库地址":打开 Ollama 的设置,修改大模型地址到 D 盘;

## 四、🚗安装你的第一个模型

环境搭好了,是时候安装我们的大模型了。

### 1. Ollama 应用安装

我们可以在 Ollama 应用中直接选择模型;

### 2. 命令行安装

在 ollama 网站查看更多的模型和版本:

在命令行中输入对应的模型名称进行安装:

```bash
ollama pull qwen3:latest
```

其他常用指令备忘:

```bash
# 查看已安装的模型
ollama list

# 删除模型
ollama rm <model-name>

# 运行模型
ollama run <model-name>
```

搞定这些,你就拥有了一个完全属于你自己的、离线且隐私的 AI 助手了。😊

## 五、🤖和本地大模型对话

### 1. Ollama

打开 Ollama 应用可以直接和 LLM 对话

### 2. 命令行窗口:`ollama run xxx`

在命令行窗口执行命令:

```bash
ollama run qwen3
```

### 3. LangChain

```javascript
import { ChatOllama } from "@langchain/ollama";
import chalk from "chalk";

const model = new ChatOllama({
  model: "qwen3",
  baseUrl: "http://127.0.0.1:11434",
});

const response = await model.invoke("你好,你是谁?");

console.log(chalk.yellow("🤖️ 模型推理:\n"));
console.log(chalk.yellow(response.additional_kwargs.reasoning_content));

console.log(chalk.blue("🤖️ 模型输出:"));
console.log(chalk.blue(response.content));
```

## 六、🤖本地大模型并发

Ollama 本地部署的模型在多个客户端并发访问时出现不响应或卡顿，通常是因为默认的并发处理能力不足或资源限制导致的。

你可以通过调整 Ollama 的环境变量来优化其并发性能，并结合一些应用层策略来解决问题。

### ⚙️ 调整 Ollama 环境变量

Ollama 提供了一些关键的环境变量来控制其并发行为。你需要在启动 ollama serve 服务之前设置这些变量。

以下是几个最重要的参数：

- [**OLLAMA_NUM_PARALLEL**](!notation:underline:red)：控制单个模型可以同时处理的最大并发请求数。根据你的硬件资源（尤其是内存）进行设置。例如，设置为 4 可以允许一个模型同时处理 4 个请求。增加此值会显著提高内存占用，因为每个并发请求都需要独立的内存来存储模型状态和上下文。

- [**OLLAMA_MAX_QUEUE**](!notation:underline:green)：设置请求队列的最大长度。当并发请求数超过 OLLAMA_NUM_PARALLEL 时，多余的请求会进入队列等待。默认为 512

- [**OLLAMA_MAX_LOADED_MODELS**](!notation:underline:purple)：控制内存中最多可以同时加载多少个不同的模型。如果你有多个不同的模型需要被并发访问，需要调高此值。Ollama 会在内存不足时自动卸载不活跃的模型。

### Windows

在任务栏右下角退出 Ollama 应用。

打开“系统属性” -> “高级” -> “环境变量”。

在“系统变量”区域，点击“新建”，添加上述变量名和值。

保存后，重新启动 Ollama。