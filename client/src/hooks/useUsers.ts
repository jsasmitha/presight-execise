import { useInfiniteQuery } from "@tanstack/react-query";
import { UseUsersFilters } from "../interfaces/hooks/use-users.interface";
import { getUsers } from "../services/user.service";
import { PAGE_SIZE } from "../constants/pagination.constants";

export function useUsers(filters: UseUsersFilters) {
  return useInfiniteQuery({
    queryKey: ["users", filters],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getUsers({
        search: filters.searchTerm,
        hobbies: filters.hobbies,
        nationalities: filters.nationalities,
        sortField: filters.sort.sortField,
        sortDirection: filters.sort.sortDirection,
        page: pageParam,
        pageSize: PAGE_SIZE,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasNext) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    retry: false,

    refetchOnWindowFocus: false,
  });
}
