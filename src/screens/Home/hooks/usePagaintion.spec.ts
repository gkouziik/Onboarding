import { act, renderHook } from '@testing-library/react-native';
import { usePagination } from '@/screens/Home/hooks/usePagination.ts';

const items = Array.from({ length: 45 }, (_, i) => i);

describe('usePagination', () => {
  it('shows the first page', async () => {
    const { result } = await renderHook(() => usePagination(items, 20));

    expect(result.current.visibleItems).toHaveLength(20);
    expect(result.current.hasMore).toBe(true);
  });

  it('loads the next page', async () => {
    const { result } = await renderHook(() => usePagination(items, 20));

    await act(() => result.current.loadMore());

    expect(result.current.visibleItems).toHaveLength(40);
  });

  it('stops at the end', async () => {
    const { result } = await renderHook(() => usePagination(items, 20));

    await act(() => result.current.loadMore());
    await act(() => result.current.loadMore());
    await act(() => result.current.loadMore());

    expect(result.current.visibleItems).toHaveLength(45);
    expect(result.current.hasMore).toBe(false);
  });

  it('resets to the first page', async () => {
    const { result } = await renderHook(() => usePagination(items, 20));
    await act(() => result.current.loadMore());

    await act(() => result.current.reset());

    expect(result.current.visibleItems).toHaveLength(20);
  });
  it('shows everything when the list fits on one page', async () => {
    const { result } = await renderHook(() =>
      usePagination(items.slice(0, 3), 20),
    );

    expect(result.current.visibleItems).toHaveLength(3);
    expect(result.current.hasMore).toBe(false);
  });
});
