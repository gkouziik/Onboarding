import React from 'react';

import { CountrySummary } from '@/models/countries.ts';
import { toCountrySummary } from '@/services/api/countries/utils.ts';
import { greece, italy } from '@/services/api/countries/__fixtures__';
import { selectIsVisited } from '@/store/selectors/visitedSelectors.ts';
import { fireEvent, renderWithProviders, screen } from '@/test/render.tsx';
import { Visited } from '@/features/visited/index.tsx';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: mockNavigate }),
}));

const greeceSummary = toCountrySummary(greece);
const italySummary = toCountrySummary(italy);

const visitedState = (...countries: CountrySummary[]) => ({
  visited: {
    byCode: Object.fromEntries(
      countries.map(country => [country.code, country]),
    ),
  },
});

describe('Visited', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('shows the empty state when nothing is visited', async () => {
    await renderWithProviders(<Visited />);

    expect(screen.getByText('No visited countries yet')).toBeOnTheScreen();
  });

  it('lists visited countries sorted by name, with the count', async () => {
    await renderWithProviders(<Visited />, {
      preloadedState: visitedState(italySummary, greeceSummary),
    });

    expect(screen.getByText('Visited (2)')).toBeOnTheScreen();
    expect(
      screen
        .getAllByText(/^(Greece|Italy)$/)
        .map(element => element.props.children),
    ).toEqual(['Greece', 'Italy']);
  });

  it('removes a country', async () => {
    const { store } = await renderWithProviders(<Visited />, {
      preloadedState: visitedState(greeceSummary, italySummary),
    });

    await fireEvent.press(screen.getByTestId('Greece-remove-button'));

    expect(screen.queryByText('Greece')).not.toBeOnTheScreen();
    expect(screen.getByText('Italy')).toBeOnTheScreen();
    expect(selectIsVisited(store.getState(), 'GRC')).toBe(false);
  });

  it('shows the empty state after removing the last country', async () => {
    await renderWithProviders(<Visited />, {
      preloadedState: visitedState(greeceSummary),
    });

    await fireEvent.press(screen.getByTestId('Greece-remove-button'));

    expect(screen.getByText('No visited countries yet')).toBeOnTheScreen();
  });

  it('opens the country detail on press', async () => {
    await renderWithProviders(<Visited />, {
      preloadedState: visitedState(greeceSummary),
    });

    await fireEvent.press(screen.getByText('Greece'));

    expect(mockNavigate).toHaveBeenCalledWith('CountryDetail', { code: 'GRC' });
  });

  it('removing does not open the detail', async () => {
    await renderWithProviders(<Visited />, {
      preloadedState: visitedState(greeceSummary),
    });

    await fireEvent.press(screen.getByTestId('Greece-remove-button'));

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
