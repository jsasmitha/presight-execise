import { User } from "../models/user.interface";

export interface UserListProps {
  users: User[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;

  onLoadMore: () => void;
}
