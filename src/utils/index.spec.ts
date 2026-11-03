import formatCurrency from '@/utils/index.ts';

describe('formatCurrency', () => {
  it('includes the symbol when there is one', () => {
    expect(formatCurrency({ code: 'EUR', name: 'Euro', symbol: '€' })).toBe(
      'Euro (EUR, €)',
    );
  });

  it('leaves out the symbol when there is none', () => {
    expect(formatCurrency({ code: 'XDR', name: 'Some example' })).toBe(
      'Some example (XDR)',
    );
  });
});
