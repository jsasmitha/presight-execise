import { useRef } from "react";

import { useVirtualizer } from "@tanstack/react-virtual";

import { UserListProps } from "@interfaces/components/user-list.interface";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";
import { UserCard } from "@components/UserCard";

import "./UserList.scss";

// Function to render a virtualized list of user cards with infinite scrolling
export function UserList({
  users,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: UserListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const itemCount = hasNextPage ? users.length + 1 : users.length;

  //  Create a virtualizer instance to manage the virtualized list
  const virtualizer = useVirtualizer({
    count: itemCount,
    getScrollElement: () => listRef.current,
    estimateSize: () => 140,
    overscan: 5, // Number of items to render outside the viewport for smoother scrolling
  });

  //   Set up an intersection observer to detect when the user has scrolled near the end of the list
  const { elementRef: loadMoreRef } = useIntersectionObserver<HTMLDivElement>({
    root: listRef,
    rootMargin: "200px",
    threshold: 0,
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        onLoadMore();
      }
    },
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div className="user-list" ref={listRef}>
      <div
        className="user-list-container"
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        {virtualItems.map((virtualItem) => {
          const isLoader = virtualItem.index === users.length;

          return (
            <div
              key={virtualItem.key}
              ref={virtualizer.measureElement}
              data-index={virtualItem.index}
              className="user-list-row"
              style={{ transform: `translateY(${virtualItem.start}px)` }}
            >
              {isLoader ? (
                <div className="user-list-loader" ref={loadMoreRef}>
                  {isFetchingNextPage ? "Loading more users..." : "Load more"}
                </div>
              ) : (
                <UserCard user={users[virtualItem.index]} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
