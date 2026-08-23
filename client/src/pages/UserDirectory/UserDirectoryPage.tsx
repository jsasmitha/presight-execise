import { use, useEffect, useMemo, useState } from "react";
import { UserDirectoryHeader } from "../../components/UserDirectoryHeader";
import { Sort } from "../../interfaces/models/sort.interface";

import "./UserDirectoryPage.scss";
import { UserSortField } from "../../interfaces/components/user-directory.interface";
import { USER_SORT_FIELDS } from "../../constants/user-directory.constant";
import { FilterSidebar } from "../../components/FilterSidebar";
import { ListHeader } from "../../components/ListHeader/ListHeader";
import { UserList } from "../../components/UserList/UserList";
import { User } from "../../interfaces/models/user.interface";
import { useUserFilters } from "../../hooks/useUserFilters";
import { useDebounce } from "../../hooks/useDebounce";
import { useUsers } from "../../hooks/useUsers";

export function UserDirectoryPage() {
  const {
    filters,
    setSearchTerm,
    setHobbies,
    setNationalities,
    setSort,
    clearFilters,
  } = useUserFilters();

  const [searchTermState, setSearchTermState] = useState(filters.searchTerm);
  const debouncedSearchTerm = useDebounce(searchTermState, 300);

  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchTerm]);

  // useEffect(() => {
  //   setSearchTermState(filters.searchTerm);
  // }, [filters.searchTerm]);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUsers(filters);

  const users = useMemo(() => {
    return data?.pages.flatMap((page) => page.users) ?? [];
  }, [data]);

  const firstPage = data?.pages[0];

  const hobbyItems =
    firstPage?.filters.hobbies.map((filter) => ({
      value: filter.value,
      label: filter.value,
      count: filter.count,
    })) ?? [];

  const nationalityItems =
    firstPage?.filters.nationalities.map((filter) => ({
      value: filter.value,
      label: filter.value,
      count: filter.count,
    })) ?? [];

  const totalUsers = firstPage?.pagination.total ?? 0;

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
        <FilterSidebar
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
