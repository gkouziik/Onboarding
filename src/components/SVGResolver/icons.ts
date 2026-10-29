import Home from '@/assets/svgs/home.svg';
import Sort from '@/assets/svgs/sort.svg';
import Heart from '@/assets/svgs/heart.svg';
import Delete from '@/assets/svgs/delete.svg';
import ChevronRight from '@/assets/svgs/chevron-right.svg';

export const icons = {
  home: Home,
  heart: Heart,
  sort: Sort,
  delete: Delete,
  chevronRight: ChevronRight,
} as const;

export type IconName = keyof typeof icons;
