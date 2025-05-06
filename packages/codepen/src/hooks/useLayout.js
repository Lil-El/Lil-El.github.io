function getDeviceType() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return isMobile;
}

/**
 * test:
 * - mobile: pure、unPure => rotate
 * - web: pure、unPure => resize
 */
export default function useLayout(mainAreaID, isPure = false) {
  let observer, element;

  const mobile = readonly(getDeviceType());

  // false：左右布局；true：上下布局
  const layout = ref(isPure ? false : true);

  let single = isPure || mobile ? readonly(true) : ref(false);

  const top = ref(0);

  function mainAreaResize() {
    element = document.getElementById(mainAreaID);

    observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        if (width < 640) {
          if (isPure || mobile) layout.value = true;
          else {
            single.value = true;
            top.value = 0;
          }
        } else {
          if (isPure || mobile) layout.value = false;
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
    mobile,
  };
}
