import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref to attach to an element and a boolean that becomes true
 * once the element enters the viewport (fires once by default).
 */
export function useInView(options = { threshold: 0.2, once: true }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (options.once) observer.unobserve(node);
      } else if (!options.once) {
        setInView(false);
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
}
