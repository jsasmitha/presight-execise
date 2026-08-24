import { SearchBar } from "@components/SearchBar";
import { UserDirectoryHeaderProps } from "@interfaces/components/user-directory-header.interface";
import { UserSortField } from "@interfaces/models/user.interface";
import { SortControls } from "@components/SortControls";

import "./UserDirectoryHeader.scss";

// Function to render the header for the user directory with title, search bar, and sort controls
export function UserDirectoryHeader({
  title,
  searchTerm,
  sort,
  sortFieldOptions,
  onSearch,
  onSortChange,
}: UserDirectoryHeaderProps<UserSortField>) {
  return (
    <header className="user-directory-header">
      <div className="user-directory-header-brand">
        <div className="user-directory-header-brand-logo">P</div>
        <h1 className="user-directory-header-title">{title}</h1>
      </div>
      <div className="user-directory-header-actions">
        <SearchBar
          searchTerm={searchTerm}
          onSearch={onSearch}
          placeholder="Seach users..."
        />
        <SortControls
          value={sort}
          fieldOptions={sortFieldOptions}
          onSortChange={onSortChange}
        />
      </div>
    </header>
  );
}
