import React from 'react';
import App from '../App';
import { render, screen } from '@testing-library/react-native';

describe('App', () => {
  it('renders the smoke screen', async () => {
    await render(<App />);
    expect(screen.getByText('Text is OK')).toBeOnTheScreen();
  });
});
