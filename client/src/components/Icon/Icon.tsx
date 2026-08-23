import { ICONS } from "../../constants/icons.constant";
import { IconProps } from "../../interfaces/components/icon.interface";

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
