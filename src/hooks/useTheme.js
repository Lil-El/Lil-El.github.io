export const themeColors = {
  yellowgreen: "#99cd32",
  purple: "#a948ff",
  cyan: "#00d0ff",
  amber: "#ffb300",
  pink: "#ff00c6",
};

function persistTheme(theme) {
  localStorage.setItem("theme", JSON.stringify(theme));
}

export default function useTheme() {
  const modeArr = ["system", "light", "dark"];

  const themeArr = readonly(Object.entries(themeColors).map((i) => ({ name: i[0], color: i[1] })));

  const cacheTheme = localStorage.getItem("theme") ? JSON.parse(localStorage.getItem("theme")) : null;

  const initTheme = {
    mode: "system",
    isDark: false,
    name: themeArr[0].name,
    color: themeArr[0].color,
  };

  const theme = reactive(cacheTheme || initTheme);

  provide("theme", theme);
  provide("toggleMode", toggleMode);
  provide("changeColor", changeColor);

  onMounted(() => {
    setThemeMode(theme.mode);
    changeColor(theme.name);

    if (theme.mode === "system") {
      const systemMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setThemeMode(systemMode);
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handleSysModeChange);
  });

  onUnmounted(() => {
    window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", handleSysModeChange);
  });

  function handleSysModeChange(e) {
    if (theme.mode === "system") {
      setThemeMode(e.matches ? "dark" : "light");
    }
  }

  function toggleMode() {
    theme.mode = modeArr[(modeArr.indexOf(theme.mode) + 1) % modeArr.length];
    if (theme.mode === "system") {
      const systemMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setThemeMode(systemMode);
    } else {
      setThemeMode(theme.mode);
    }
  }

  function setThemeMode(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    if (mode === "dark") theme.isDark = true;
    else theme.isDark = false;

    persistTheme(theme);
  }

  function changeColor(name) {
    theme.color = themeArr.find((c) => c.name === name)?.color || "";
    theme.name = name;
    document.documentElement.style.setProperty("--data-theme-color", theme.color);

    persistTheme(theme);
  }
}
