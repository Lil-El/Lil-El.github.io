export default function useLayout(mainAreaID, isPure = false) {
  let observer, element;

  // false：左右布局；true：上下布局
  const layout = ref(isPure ? false : true);

  let single = isPure ? readonly(true) : ref(false);

  const top = ref(0);

  function mainAreaResize() {
    element = document.getElementById(mainAreaID);

    observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        if (width < 640) {
          if (isPure) layout.value = true;
          else {
            single.value = true;
            top.value = 0;
          }
        } else {
          if (isPure) layout.value = false;
          else single.value = false;
        }
      }
    });

    observer.observe(element);
  }

  onMounted(() => {
    mainAreaResize();
  });

  onUnmounted(() => {
    observer?.unobserve(element);
  });

  return {
    layout,
    single,
    top,
  };
}
