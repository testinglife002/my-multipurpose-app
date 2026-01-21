// 📄 src/hooks/useWheelScroll.js
import { useEffect } from "react";

export default function useWheelScroll(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: true });

    return () => el.removeEventListener("wheel", onWheel);
  }, [ref]);
}
