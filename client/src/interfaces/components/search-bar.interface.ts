export interface SearchBarProps {
  searchTerm: string;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  
  onSearch: (searchTerm: string) => void;
}