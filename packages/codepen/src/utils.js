import CloseSVG from "@/assets/close.svg";
import CopySVG from "@/assets/copy.svg";
import CssSVG from "@/assets/css.svg";
import FolderSVG from "@/assets/folder.svg";
import HtmlSVG from "@/assets/html.svg";
import InfoSVG from "@/assets/info.svg";
import JavaSVG from "@/assets/java.svg";
import JavascriptSVG from "@/assets/javascript.svg";
import JsonSVG from "@/assets/json.svg";
import LayoutSVG from "@/assets/layout.svg";
import MarkdownSVG from "@/assets/markdown.svg";
import RefreshSVG from "@/assets/refresh.svg";
import RunSVG from "@/assets/run.svg";
import SettingSVG from "@/assets/setting.svg";
import ThemeSVG from "@/assets/theme.svg";
import TxtSVG from "@/assets/txt.svg";
import VueSVG from "@/assets/vue.svg";

export function getSVG(name) {
  if (name === "run") return RunSVG;
  else if (name === "refresh") return RefreshSVG;
  else if (name === "setting") return SettingSVG;
  else if (name === "theme") return ThemeSVG;
  else if (name === "info") return InfoSVG;
  else if (name === "folder") return FolderSVG;
  else if (name === "layout") return LayoutSVG;
  else if (name === "html") return HtmlSVG;
  else if (name === "css") return CssSVG;
  else if (name === "javascript") return JavascriptSVG;
  else if (name === "java") return JavaSVG;
  else if (name === "json") return JsonSVG;
  else if (name === "txt") return TxtSVG;
  else if (name === "vue") return VueSVG;
  else if (name === "markdown") return MarkdownSVG;
  else if (name === "copy") return CopySVG;
  else if (name === "close") return CloseSVG;
  return null;
}
