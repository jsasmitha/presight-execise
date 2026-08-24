import { MultiSelectionListProps } from "@interfaces/components/multi-selection-list.interface";

import "./MultiSelectionList.scss";

// Function to render a multi-selection list with checkboxes for each item
export function MultiSelectionList<T>({
  items,
  selectedItems,
  onSelectionChange,
}: MultiSelectionListProps<T>) {
  // Handle the change in selection for a specific item
  const handleSectionChange = (value: T) => {
    const updatedSelectedItems = selectedItems.includes(value)
      ? selectedItems.filter((item) => item !== value)
      : [...selectedItems, value];

    onSelectionChange(updatedSelectedItems);
  };

  if (!items.length) {
    return <div className="multi-selection-list-empty">No options found</div>;
  }

  return (
    <div className="multi-selection-list">
      {items.map((item) => (
        <label key={String(item.value)} className="multi-selection-list-item">
          <div className="multi-selection-list-item-left">
            <input
              type="checkbox"
              className="multi-selection-list-item-checkbox"
              checked={selectedItems.includes(item.value)}
              onChange={() => handleSectionChange(item.value)}
            />
            <span className="multi-selection-list-item-label">
              {item.label}
            </span>
          </div>

          {item.count !== undefined && (
            <span className="multi-selection-list-item-count">
              ({item.count})
            </span>
          )}
        </label>
      ))}
    </div>
  );
}
