import { use, useMemo, useState } from "react";
import { FilterSectionProps } from "../../interfaces/components/filter-section.interface";
import { SearchBar } from "../SearchBar";

import "./FilterSection.scss";
import { MultiSelectionList } from "../MultiSelectionList/MultiSelectionList";

export function FilterSection({
  title,
  items,
  selectedItems,
  searchPlaceholder,
  onChange,
}: FilterSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();

    if (!lowerCaseSearchTerm) {
      return items;
    }

    return items.filter((item) =>
      item.label.toLowerCase().includes(lowerCaseSearchTerm),
    );
  }, [items, searchTerm]);

  return (
    <div className="filter-section">
      <h3 className="filter-section-title">{title}</h3>

      <SearchBar
        searchTerm={searchTerm}
        placeholder={searchPlaceholder || "Search..."}
        onSearch={setSearchTerm}
      />

      <MultiSelectionList
        items={filteredItems}
        selectedItems={selectedItems}
        onSelectionChange={onChange}
      />
    </div>
  );
}
