import { ICONS } from "@constants/icons.constant";
import { IconProps } from "@interfaces/components/icon.interface";

import "./Icon.scss";

// Function to render an icon based on the provided name, className, and alt text
export function Icon({ name, className = "", alt }: IconProps) {
  const IconComponent = ICONS[name];

  if (!IconComponent) {
    console.error(`Icon "${name}" not found.`);
    return null;
  }

  return (
    <img
      src={IconComponent}
      className={`icon ${className}`}
      alt={alt ?? name}
    />
  );
}
