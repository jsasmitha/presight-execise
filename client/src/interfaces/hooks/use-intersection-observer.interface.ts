import { RefObject } from "react";

export interface UseIntersectionObserverOptions {
  root?: RefObject<Element | null>;
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect: () => void;
}
