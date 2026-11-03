import { CONTINENTS } from '@/models/countries.ts';
import { ContinentFilter } from '@/features/home/types.ts';

export const CONTINENT_TABS: ContinentFilter[] = ['All', ...CONTINENTS];

export const PAGE_SIZE = 20;
