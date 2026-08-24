import SearchIcon from "@assets/icons/search.svg";
import ChevronDownIcon from "@assets/icons/chevron-down.svg";
import ArrowUpIcon from "@assets/icons/arrow-up.svg";
import ArrowDownIcon from "@assets/icons/arrow-down.svg";

// Mapping of icon names to their corresponding SVG components
export const ICONS = {
  search: SearchIcon,
  chevronDown: ChevronDownIcon,
  arrowUp: ArrowUpIcon,
  arrowDown: ArrowDownIcon,
};

export type IconName = keyof typeof ICONS;
