import { useSearchParams } from "react-router";
import { useCallback, useMemo } from "react";

import { parseArray, parseUserSortField } from "@utils/user-filter.utils";
import { Sort, SortOrder } from "@interfaces/models/sort.interface";
import { UserSortField } from "@interfaces/models/user.interface";

// Custom hook to manage user filters using URL search parameters
export function useUserFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  //   Parse the current search parameters to extract filter values
  const filters = useMemo(
    () => ({
      searchTerm: searchParams.get("search") ?? "",
      hobbies: parseArray(searchParams.get("hobbies")),
      nationalities: parseArray(searchParams.get("nationalities")),
      sort: {
        sortField: parseUserSortField(searchParams.get("sortField")),
        sortDirection: (searchParams.get("sortDirection") === "desc"
          ? "desc"
          : "asc") as SortOrder,
      },
    }),
    [searchParams],
  );

  //   Function to update the search parameters in the URL
  const updateParams = useCallback(
    (newParams: Record<string, string | null>): void => {
      const updatedParams = new URLSearchParams(searchParams);

      Object.entries(newParams).forEach(([key, value]) => {
        if (!value) {
          updatedParams.delete(key);
          return;
        }
        updatedParams.set(key, value);
      });

      setSearchParams(updatedParams);
    },
    [searchParams, setSearchParams],
  );

  //   Functions to set search parameters
  const setSearchTerm = useCallback(
    (searchTerm: string): void => {
      updateParams({ search: searchTerm.trim() || null });
    },
    [updateParams],
  );

  //   Function to set hobbies filter
  const setHobbies = useCallback(
    (hobbies: string[]): void => {
      updateParams({ hobbies: hobbies.length ? hobbies.join(",") : null });
    },
    [updateParams],
  );

  //   Function to set nationalities filter
  const setNationalities = useCallback(
    (nationalities: string[]): void => {
      updateParams({
        nationalities: nationalities.length ? nationalities.join(",") : null,
      });
    },
    [updateParams],
  );

  //   Function to set sorting options
  const setSort = useCallback(
    (sort: Sort<UserSortField>): void => {
      updateParams({
        sortField: sort.sortField,
        sortDirection: sort.sortDirection,
      });
    },
    [updateParams],
  );

  //   Function to clear all filters
  const clearFilters = useCallback((): void => {
    updateParams({
      hobbies: null,
      nationalities: null,
    });
  }, [updateParams]);

  return {
    filters,
    setSearchTerm,
    setHobbies,
    setNationalities,
    setSort,
    clearFilters,
  };
}
