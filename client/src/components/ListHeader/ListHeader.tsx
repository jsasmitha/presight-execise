import { ListHeaderProps } from "../../interfaces/components/list-header.interface";

import "./ListHeader.scss";

export function ListHeader({ label, count }: ListHeaderProps) {
  return (
    <div className="list-header">
      <h2 className="list-header-label">
        {count.toLocaleString()} {label}
      </h2>
    </div>
  );
}
