const themeColors = {
  yellowgreen: "#99cd32",
  purple: "#a948ff",
  cyan: "#00d0ff",
  amber: "#ffb300",
  pink: "#ff00c6",
};

export default function useTheme() {
  const themeArr = readonly(Object.entries(themeColors).map((i) => ({ name: i[0], color: i[1] })));

  const theme = reactive({
    mode: "light",
    name: themeArr[0].name,
    color: themeArr[0].color,
  });

  function toggleMode() {
    theme.mode = theme.mode === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme.mode);
  }

  function changeColor(e) {
    theme.name = themeArr.find((c) => c.color === e.target.value).name;
    theme.color = e.target.value;
    document.documentElement.style.setProperty("--data-theme-color", theme.color);
  }

  return { themeArr, toggleMode, changeColor };
}
