import { useCallback, useMemo, useState } from 'react';

/**
 *  pagination:
 *  shows the first `page * pageSize` items.
 */
export function usePagination<T>(items: T[], pageSize: number) {
  const [page, setPage] = useState(1);

  const visibleItems = useMemo(
    () => items.slice(0, page * pageSize),
    [items, page, pageSize],
  );
  const hasMore = visibleItems.length < items.length;

  const loadMore = useCallback(() => {
    if (hasMore) {
      setPage(current => current + 1);
    }
  }, [hasMore]);

  const reset = useCallback(() => setPage(1), []);

  return { visibleItems, hasMore, loadMore, reset };
}
