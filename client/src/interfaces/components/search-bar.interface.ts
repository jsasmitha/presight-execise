// Props interface for the SearchBar component, which represents a search input field with a search term, placeholder, and event handler for search actions
export interface SearchBarProps {
  searchTerm: string;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;

  onSearch: (searchTerm: string) => void;
}
