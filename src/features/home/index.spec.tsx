import React from 'react';

import { countriesApi } from '@/services/api/countries';
import { jsonResponse, listResponse } from '@/test/http.ts';
import { fireEvent, renderWithProviders, screen } from '@/test/render.tsx';

import { Home } from '../Home';
import {
  antarctica,
  greece,
  italy,
} from '@/services/api/countries/__fixtures__';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: mockNavigate }),
}));

describe('Home', () => {
  let fetchSpy: jest.SpyInstance;
  let store:
    | Awaited<ReturnType<typeof renderWithProviders>>['store']
    | undefined;

  const renderHome = async () => {
    const result = await renderWithProviders(<Home />);
    store = result.store;
    return result;
  };

  /**
   * Renders Home and waits until the countries are on screen.
   */
  const renderLoadedHome = async () => {
    fetchSpy.mockResolvedValueOnce(listResponse([greece, italy, antarctica]));
    await renderHome();
    await screen.findByText('Greece');
  };

  beforeEach(() => {
    fetchSpy = jest.spyOn(globalThis, 'fetch');
    mockNavigate.mockClear();
  });

  afterEach(() => {
    store?.dispatch(countriesApi.util.resetApiState());
    store = undefined;
    fetchSpy.mockRestore();
  });

  describe('data states', () => {
    it('shows the loading view while fetching', async () => {
      fetchSpy.mockReturnValueOnce(new Promise(() => {}));
      await renderHome();

      expect(screen.getByTestId('loading-indicator')).toBeOnTheScreen();
    });

    it('shows the countries once loaded', async () => {
      await renderLoadedHome();

      expect(screen.getByText('Greece')).toBeOnTheScreen();
      expect(screen.getByText('Italy')).toBeOnTheScreen();
      expect(screen.getByText('Antarctica')).toBeOnTheScreen();
    });

    it('shows the error view and retries', async () => {
      fetchSpy
        .mockResolvedValueOnce(
          jsonResponse({ errors: [{ message: 'boom' }] }, 500),
        )
        .mockResolvedValueOnce(listResponse([greece]));
      await renderHome();

      await fireEvent.press(await screen.findByTestId('retry'));

      expect(await screen.findByText('Greece')).toBeOnTheScreen();
      expect(fetchSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('search', () => {
    it('filters by name', async () => {
      await renderLoadedHome();

      await fireEvent.changeText(
        screen.getByPlaceholderText('Search countries'),
        'GRE',
      );

      expect(screen.getByText('Greece')).toBeOnTheScreen();
      expect(screen.queryByText('Italy')).not.toBeOnTheScreen();
      expect(screen.queryByText('Antarctica')).not.toBeOnTheScreen();
    });

    it('shows the empty view when nothing matches', async () => {
      await renderLoadedHome();

      await fireEvent.changeText(
        screen.getByPlaceholderText('Search countries'),
        'zzz',
      );

      expect(screen.getByText('No countries found')).toBeOnTheScreen();
    });

    it('restores the full list when cleared', async () => {
      await renderLoadedHome();
      await fireEvent.changeText(
        screen.getByPlaceholderText('Search countries'),
        'gre',
      );

      await fireEvent.press(screen.getByTestId('clear-search'));

      expect(screen.getByText('Italy')).toBeOnTheScreen();
      expect(screen.getByText('Antarctica')).toBeOnTheScreen();
    });
  });

  describe('Stats panel', () => {
    it('Should collapse panel when panel pressable is pressed', async () => {
      await renderLoadedHome();
      expect(screen.getByText('Top 5 by population')).toBeOnTheScreen();
      const expandButton = screen.getByTestId('stats-button');
      await fireEvent.press(expandButton);
      expect(screen.queryByText('Top 5 by population')).not.toBeOnTheScreen();
    });
  });

  describe('continent tabs', () => {
    it('filters by continent', async () => {
      await renderLoadedHome();

      await fireEvent.press(screen.getByTestId('Antarctic'));

      expect(screen.getByText('Antarctica')).toBeOnTheScreen();
      expect(screen.queryByText('Greece')).not.toBeOnTheScreen();
    });

    it('shows everything again on All', async () => {
      await renderLoadedHome();
      await fireEvent.press(screen.getByTestId('Antarctic'));

      await fireEvent.press(screen.getByText('All'));

      expect(screen.getByText('Greece')).toBeOnTheScreen();
      expect(screen.getByText('Antarctica')).toBeOnTheScreen();
    });

    it('combines continent and search', async () => {
      await renderLoadedHome();

      await fireEvent.press(screen.getByTestId('Europe'));
      await fireEvent.changeText(
        screen.getByPlaceholderText('Search countries'),
        'ita',
      );

      expect(screen.getByText('Italy')).toBeOnTheScreen();
      expect(screen.queryByText('Greece')).not.toBeOnTheScreen();
      expect(screen.queryByText('Antarctica')).not.toBeOnTheScreen();
    });
  });

  describe('navigation', () => {
    it('opens the country detail on press', async () => {
      await renderLoadedHome();

      await fireEvent.press(screen.getByText('Greece'));

      expect(mockNavigate).toHaveBeenCalledWith('CountryDetail', {
        code: 'GRC',
      });
    });
  });
});
