import { IconName } from "@constants/icons.constant";

// Props interface for the Icon component, which represents an icon with a specified name, optional className, and optional alt text
export interface IconProps {
  name: IconName;
  className?: string;
  alt?: string;
}
