import { User } from "@interfaces/models/user.interface";

// Props interface for the UserList component, which represents a list of user cards with pagination and loading state
export interface UserListProps {
  users: User[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;

  onLoadMore: () => void;
}
