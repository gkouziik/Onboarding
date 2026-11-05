import React, { memo } from 'react';

import ContinentTabs from '@/screens/Home/components/ContinentTabs';
import SortToggle from '@/screens/Home/components/SortToggle';
import { ContinentFilter, SortDirection } from '@/screens/Home/types.ts';

type Props = {
  /**
   * The continent filter. Contains all the continents plus 'All'
   */
  continent: ContinentFilter;
  /**
   * callback to be called to filter the countries when a continent filter
   * is pressed
   */
  onContinentSelect: (tab: ContinentFilter) => void;
  /**
   * the sort direction: asc or desc
   */
  sortDirection: SortDirection;
  /**
   * callback that is called when sort button is called
   */
  onSortToggle: () => void;
};

/**
 * Component that renders the filter continent chips where the country list
 * is filtered based on selected continent chip and the sort toggle button,
 * which when pressed sorts the countries based on population
 */
function FiltersBar({
  continent,
  onContinentSelect,
  sortDirection,
  onSortToggle,
}: Props) {
  return (
    <>
      <ContinentTabs selected={continent} onSelect={onContinentSelect} />
      <SortToggle direction={sortDirection} onToggle={onSortToggle} />
    </>
  );
}

export default memo(FiltersBar);
