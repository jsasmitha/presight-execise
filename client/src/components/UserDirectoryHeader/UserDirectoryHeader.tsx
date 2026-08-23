import { UserDirectoryHeaderProps } from "../../interfaces/components/user-directory-header.interface";
import { UserSortField } from "../../interfaces/components/user-directory.interface";
import { SortOrder } from "../../interfaces/models/sort.interface";
import { SearchBar } from "../SearchBar";
import { SortControls } from "../SortControls";

import "./UserDirectoryHeader.scss";

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
        <div className="user-directory-header-brand-logo">
          {/* <img src="/logo.png" alt="Logo" /> */}P
        </div>
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
    // <div className="user-directory-header">
    //   <h1>{title}</h1>
    //   <input
    //     type="text"
    //     placeholder="Search..."
    //     value={searchTerm}
    //     onChange={handleSearchChange}
    //   />
    //   <div className="sort-buttons">
    //     <button onClick={() => handleSortChange('firstName')}>
    //       Sort by First Name {sort.field === 'firstName' ? (sort.order === 'asc' ? '↑' : '↓') : ''}
    //     </button>
    //     <button onClick={() =>  handleSortChange('lastName')}>
    //         Sort by Last Name {sort.field === 'lastName' ? (sort.order === 'asc' ? '↑' : '↓') : ''}
    //     </button>
    //     <button onClick={() => handleSortChange('age')}>
    //         Sort by Age {sort.field === 'age' ? (sort.order === 'asc' ? '↑' : '↓') : ''}
    //     </button>
    //     <button onClick={() => handleSortChange('nationality')}>
    //         Sort by Nationality {sort.field === 'nationality' ? (sort.order === 'asc' ? '↑' : '↓') : ''}
    //     </button>
    //   </div>
    // </div>
  );
}
