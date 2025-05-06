export default function useTitle(data) {
  const title = ref(data.title ? `${data.title} - codepen` : "codepen");
  const author = ref(data.author || "-");
  const date = ref(data.date || "-");

  watch(
    title,
    (newTitle) => {
      document.title = `${newTitle} - codepen`;
    },
    {
      immediate: true,
    }
  );

  function setData(data) {
    title.value = data.title;
    author.value = data.author || "-";
    date.value = data.date || "-";
  }

  return { title, author, date, setData };
}
