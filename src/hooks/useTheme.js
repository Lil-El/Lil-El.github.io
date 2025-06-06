const themeColors = {
  yellowgreen: "#99cd32",
  purple: "#a948ff",
  cyan: "#00d0ff",
  amber: "#ffb300",
  pink: "#ff00c6",
};

export default function useTheme() {
  const modeArr = ["system", "light", "dark"];

  const themeArr = readonly(Object.entries(themeColors).map((i) => ({ name: i[0], color: i[1] })));

  const theme = reactive({
    mode: "system",
    isDark: false,
    name: themeArr[0].name,
    color: themeArr[0].color,
  });

  provide("theme", theme);
  provide("toggleMode", toggleMode);

  onMounted(() => {
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
  }

  function changeColor(e) {
    theme.name = themeArr.find((c) => c.color === e.target.value).name;
    theme.color = e.target.value;
    document.documentElement.style.setProperty("--data-theme-color", theme.color);
  }
}
