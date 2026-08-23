import { useSearchParams } from "react-router";
import { parseArray, parseUserSortField } from "../utils/user-filter.utils";
import { use, useCallback, useMemo } from "react";
import { Sort, SortOrder } from "../interfaces/models/sort.interface";
import { User } from "../interfaces/models/user.interface";
import { UserSortField } from "../interfaces/components/user-directory.interface";

export function useUserFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

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

  const setSearchTerm = useCallback(
    (searchTerm: string): void => {
      updateParams({ search: searchTerm.trim() || null });
    },
    [updateParams],
  );

  const setHobbies = useCallback(
    (hobbies: string[]): void => {
      updateParams({ hobbies: hobbies.length ? hobbies.join(",") : null });
    },
    [updateParams],
  );

  const setNationalities = useCallback(
    (nationalities: string[]): void => {
      updateParams({
        nationalities: nationalities.length ? nationalities.join(",") : null,
      });
    },
    [updateParams],
  );

  const setSort = useCallback(
    (sort: Sort<UserSortField>): void => {
      updateParams({
        sortField: sort.sortField,
        sortDirection: sort.sortDirection,
      });
    },
    [updateParams],
  );

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
