export default function useTitle(data) {
  const title = ref(data.title ? `${data.title} - codepen` : "codepen");
  const author = ref(data.author || "-");
  const date = ref(data.date || "-");

  onMounted(() => {
    document.title = title.value;
  });

  watch(title, (newTitle) => {
    document.title = `${newTitle} - codepen`;
  });

  function setData(data) {
    title.value = data.title;
    author.value = data.author || "-";
    date.value = data.date || "-";
  }

  return { title, author, date, setData };
}
