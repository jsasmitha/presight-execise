import { useCallback, useEffect, useRef, useState } from "react";

import { UseIntersectionObserverOptions } from "@interfaces/hooks/use-intersection-observer.interface";

// Custom hook to observe when an element intersects with the viewport or a specified root element
export function useIntersectionObserver<T extends Element>({
  root,
  rootMargin = "0px",
  threshold = 0,
  onIntersect,
}: UseIntersectionObserverOptions) {
  const [element, setElement] = useState<T | null>(null);

  const onIntersectRef = useRef(onIntersect);

  //   Update the onIntersectRef whenever the onIntersect callback changes
  useEffect(() => {
    onIntersectRef.current = onIntersect;
  }, [onIntersect]);

  //   Create a callback ref to set the observed element
  const elementRef = useCallback((node: T | null): void => {
    setElement(node);
  }, []);

  //   Set up the intersection observer to observe the element and call the onIntersect callback when it intersects
  useEffect(() => {
    if (!element) return;

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
