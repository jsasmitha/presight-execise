import { RefObject } from "react";

// Interface for the options used in the useIntersectionObserver hook, which allows observing when an element intersects with the viewport or a specified root element
export interface UseIntersectionObserverOptions {
  root?: RefObject<Element | null>;
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect: () => void;
}
