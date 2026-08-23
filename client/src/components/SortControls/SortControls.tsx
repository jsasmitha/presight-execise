import { SortControlsProps } from "../../interfaces/components/sort-controls.interface";
import { SortOrder } from "../../interfaces/models/sort.interface";
import { Icon } from "../Icon/Icon";

import "./SortControls.scss";

export function SortControls<T>({
  value,
  fieldOptions,
  onSortChange,
}: SortControlsProps<T>) {
  const handleFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange({ ...value, sortField: event.target.value as T });
  };

  const toggleOrder = (): void => {
    const newOrder: SortOrder = value.sortDirection === "asc" ? "desc" : "asc";
    onSortChange({ ...value, sortDirection: newOrder });
  };

  return (
    <div className="sort-controls">
      <span className="sort-controls-label">Sort by:</span>

      <div className="sort-controls-field">
        <select
          className="sort-controls-select"
          value={String(value.sortField)}
          onChange={handleFieldChange}
        >
          {fieldOptions.map((option) => (
            <option key={String(option.value)} value={String(option.value)}>
              {option.label}
            </option>
          ))}
        </select>

        <Icon name="chevronDown" className="sort-controls-chevron" />
      </div>

      <button
        className="sort-controls-order"
        onClick={toggleOrder}
        aria-label={`Sort ${value.sortDirection === "asc" ? "Descending" : "Ascending"}`}
      >
        <Icon name={value.sortDirection === "asc" ? "arrowUp" : "arrowDown"} />
      </button>
    </div>
  );
}
