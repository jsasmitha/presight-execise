import { SearchBarProps } from "../../interfaces/components/search-bar.interface";
import { Icon } from "../Icon/Icon";

import "./SearchBar.scss";

export function SearchBar({
  searchTerm,
  placeholder = "Search...",
  disabled = false,
  autoFocus = false,
  onSearch,
}: SearchBarProps) {
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
