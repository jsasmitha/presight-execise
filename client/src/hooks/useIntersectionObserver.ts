import { use, useCallback, useEffect, useRef, useState } from "react";
import { UseIntersectionObserverOptions } from "../interfaces/hooks/use-intersection-observer.interface";

export function useIntersectionObserver<T extends Element>({
  root,
  rootMargin = "0px",
  threshold = 0,
  onIntersect,
}: UseIntersectionObserverOptions) {
  const [element, setElement] = useState<T | null>(null);

  const onIntersectRef = useRef(onIntersect);

  useEffect(() => {
    onIntersectRef.current = onIntersect;
  }, [onIntersect]);

  const elementRef = useCallback((node: T | null): void => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    // const element = elementRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersectRef.current();
        }
      },
      { root: root?.current ?? null, rootMargin, threshold },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element, root, rootMargin, threshold]);

  return { elementRef };
}
