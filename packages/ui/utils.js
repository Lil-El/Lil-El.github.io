import CloseSVG from "./assets/close.svg?url";
import CopySVG from "./assets/copy.svg?url";
import CssSVG from "./assets/css.svg?url";
import FolderSVG from "./assets/folder.svg?url";
import HtmlSVG from "./assets/html.svg?url";
import InfoSVG from "./assets/info.svg?url";
import JavaSVG from "./assets/java.svg?url";
import JavascriptSVG from "./assets/javascript.svg?url";
import JsonSVG from "./assets/json.svg?url";
import LayoutSVG from "./assets/layout.svg?url";
import MarkdownSVG from "./assets/markdown.svg?url";
import RefreshSVG from "./assets/refresh.svg?url";
import RunSVG from "./assets/run.svg?url";
import SettingSVG from "./assets/setting.svg?url";
import ThemeSVG from "./assets/theme.svg?url";
import TxtSVG from "./assets/txt.svg?url";
import VueSVG from "./assets/vue.svg?url";

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
