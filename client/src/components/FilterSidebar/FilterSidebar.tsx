import { FilterSidebarProps } from "@interfaces/components/filter-sidebar.interface";
import { FilterSection } from "@components/FilterSection";

import "./FilterSidebar.scss";

// Function to render a sidebar with filter sections for hobbies and nationalities
export function FilterSidebar({
  className = "",
  hobbies,
  nationalities,
  selectedHobbies,
  selectedNationalities,
  onHobbyChange,
  onNationalityChange,
  onResetFilters,
}: FilterSidebarProps) {
  return (
    <aside className={`filter-sidebar ${className}`}>
      <div className="filter-sidebar-header">
        <h2 className="filter-sidebar-title">Filters</h2>
        <button className="filter-sidebar-clear" onClick={onResetFilters}>
          Clear
        </button>
      </div>

      <div className="filter-siderbar-divider" />

      <FilterSection
        title="Hobbies"
        items={hobbies}
        selectedItems={selectedHobbies}
        onChange={onHobbyChange}
        searchPlaceholder="Search Hobbies"
      />

      <FilterSection
        title="Nationalities"
        items={nationalities}
        selectedItems={selectedNationalities}
        onChange={onNationalityChange}
        searchPlaceholder="Search Nationalities"
      />
    </aside>
  );
}
