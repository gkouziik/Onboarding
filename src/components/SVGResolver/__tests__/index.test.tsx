import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { SvgResolver } from '@/components/SVGResolver';

describe('SVGResolver', () => {
  it('uses a numeric size for width and height', async () => {
    await render(<SvgResolver name="home" size={32} />);
    const icon = screen.getByTestId('icon-home');

    expect(icon).toHaveProp('width', 32);
    expect(icon).toHaveProp('height', 32);
  });

  it('lets width , height override size', async () => {
    await render(<SvgResolver name="heart" size={24} width={20} height={18} />);
    const icon = screen.getByTestId('icon-heart');

    expect(icon).toHaveProp('width', 20);
    expect(icon).toHaveProp('height', 18);
  });
});
