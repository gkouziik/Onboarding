import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from '@/components/Button';

describe('Button', () => {
  it('renders the label and fires onPress', async () => {
    const onPress = jest.fn();
    await render(<Button label="Retry" onPress={onPress} testID="button" />);

    await fireEvent.press(screen.getByTestId('button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire onPress when disabled', async () => {
    const onPress = jest.fn();
    await render(
      <Button label="Retry" onPress={onPress} disabled testID="button" />,
    );

    const button = screen.getByTestId('button');
    expect(button).toBeDisabled();

    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });
});
