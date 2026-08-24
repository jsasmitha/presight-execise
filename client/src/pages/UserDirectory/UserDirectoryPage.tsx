import { useEffect, useMemo, useState } from "react";

import { UserDirectoryHeader } from "@components/UserDirectoryHeader";
import { USER_SORT_FIELDS } from "@constants/user-directory.constant";
import { UserList } from "@components/UserList/UserList";
import { useUserFilters } from "@hooks/useUserFilters";
import { useDebounce } from "@hooks/useDebounce";
import { useUsers } from "@hooks/useUsers";
import { FilterSidebar } from "@components/FilterSidebar";
import { ListHeader } from "@components/ListHeader";

import "./UserDirectoryPage.scss";

// Function to render the User Directory page, which includes a header, filter sidebar, and a list of users with infinite scrolling
export function UserDirectoryPage() {
  // Use the custom hook to manage user filters, including search term, hobbies, nationalities, and sort options
  const {
    filters,
    setSearchTerm,
    setHobbies,
    setNationalities,
    setSort,
    clearFilters,
  } = useUserFilters();

  const [searchTermState, setSearchTermState] = useState(filters.searchTerm); // State to manage the search term input in the User Directory page
  const debouncedSearchTerm = useDebounce(searchTermState, 300); // Debounce the search term input to avoid excessive API calls while the user is typing
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to manage the visibility of the filter sidebar on smaller screens
  // Update the search term in the filters whenever the debounced search term changes
  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchTerm]);

  // Use the custom hook to fetch users based on the current filters, including search term, selected hobbies and nationalities, sort options, and pagination information
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUsers(filters);

  // Use useMemo to flatten the paginated user data into a single array of users for rendering in the UserList component
  const users = useMemo(() => {
    return data?.pages.flatMap((page) => page.users) ?? [];
  }, [data]);

  const firstPage = data?.pages[0]; // Get the first page of user data to extract filter options and total user count

  // Map the hobbies and nationalities from the first page of user data into select options for the FilterSidebar component, including their respective counts
  const hobbyItems =
    firstPage?.filters.hobbies.map((filter) => ({
      value: filter.value,
      label: filter.value,
      count: filter.count,
    })) ?? [];

  // Map the nationalities from the first page of user data into select options for the FilterSidebar component, including their respective counts
  const nationalityItems =
    firstPage?.filters.nationalities.map((filter) => ({
      value: filter.value,
      label: filter.value,
      count: filter.count,
    })) ?? [];

  const totalUsers = firstPage?.pagination.total ?? 0; // Get the total number of users from the first page of user data for display in the ListHeader component

  // Function to render the content of the User Directory page based on the current state of data fetching, including loading, error, and empty states
  const renderContent = () => {
    if (isLoading) {
      return <div className="user-directory-state">Loading users...</div>;
    }

    if (isError) {
      return (
        <div className="user-directory-state user-directory-state-error">
          Error loading users.
        </div>
      );
    }

    if (!users.length) {
      return <div className="user-directory-state">No users found.</div>;
    }

    return (
      <UserList
        users={users}
        hasNextPage={Boolean(hasNextPage)}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={() => {
          void fetchNextPage();
        }}
      />
    );
  };

  return (
    <div className="user-directory">
      <UserDirectoryHeader
        title="User Directory"
        sort={filters.sort}
        searchTerm={searchTermState}
        sortFieldOptions={USER_SORT_FIELDS}
        onSearch={setSearchTermState}
        onSortChange={setSort}
      ></UserDirectoryHeader>

      <div className="user-directory-body">
        <button
          type="button"
          className="user-directory-filter-toggle"
          onClick={() => setIsFilterOpen((value) => !value)}
        >
          {isFilterOpen ? "Hide Filters" : "Filters"}
        </button>
        <FilterSidebar
          className={isFilterOpen ? "is-open" : ""}
          hobbies={hobbyItems}
          nationalities={nationalityItems}
          selectedHobbies={filters.hobbies}
          selectedNationalities={filters.nationalities}
          onHobbyChange={setHobbies}
          onNationalityChange={setNationalities}
          onResetFilters={clearFilters}
        />

        <main className="user-directory-main">
          <ListHeader label="Users" count={totalUsers} />

          {renderContent()}
        </main>
      </div>
    </div>
  );
}
