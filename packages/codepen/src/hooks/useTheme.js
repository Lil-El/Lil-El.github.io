const themes = [
  { value: 1, color: "#2196F3" },
  { value: 2, color: "#3CA978" },
  { value: 3, color: "#F26D6D" },
  { value: 4, color: "#FB9B5F" },
  { value: 5, color: "#f700ff" },
  { value: 6, color: "#ff0000" },
];

export default function useTheme() {
  const local = Number(localStorage.getItem("theme")) || 1;

  const theme = ref(local);

  onMounted(() => {
    setTheme(theme.value);
  });

  const setTheme = (v) => {
    const theme = themes.find((c) => c.value === v);
    document.documentElement.style.setProperty("--theme-color", theme.color);
    document.documentElement.style.setProperty("--el-color-primary", theme.color);

    localStorage.setItem("theme", v);
  };

  const getAllThemes = () => {
    return themes;
  };

  return {
    theme,
    setTheme,
    getAllThemes,
  };
}
