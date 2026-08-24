import { useMemo, useState } from "react";

import { FilterSectionProps } from "@interfaces/components/filter-section.interface";
import { SearchBar } from "@components/SearchBar";

import "./FilterSection.scss";
import { MultiSelectionList } from "@components/MultiSelectionList";

// Function to render a filter section with a title, search bar, and multi-selection list
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
