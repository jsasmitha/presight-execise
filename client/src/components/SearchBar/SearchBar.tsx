import { Icon } from "@components/Icon";
import { SearchBarProps } from "@interfaces/components/search-bar.interface";

import "./SearchBar.scss";

// Function to render a search bar with an icon, input field, and optional placeholder, disabled state, and autofocus
export function SearchBar({
  searchTerm,
  placeholder = "Search...",
  disabled = false,
  autoFocus = false,
  onSearch,
}: SearchBarProps) {
  // Handle the change in the input field and call the onSearch callback with the new value
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="search-bar">
      <Icon name="search" className="search-bar-icon" alt="Search Icon" />
      <input
        className="search-bar-input"
        type="text"
        value={searchTerm}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        onChange={handleInputChange}
      />
    </div>
  );
}
