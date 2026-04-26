import { formatDate, formatDateShort } from './date';

const ISO_DATE = '2026-04-25T13:29:00.000Z';

describe('formatDate', () => {
  it('formats a date with full month, day, year, and time', () => {
    const result = formatDate(ISO_DATE);
    
    expect(result).toBe('April 25, 2026 at 1:29 PM');
  });

});

describe('formatDateShort', () => {
  it('formats a date with abbreviated month, day, and year', () => {
    const result = formatDateShort(ISO_DATE);

    expect(result).toBe('Apr 25, 2026');
  });

  it('does not include a time component', () => {
    const result = formatDateShort(ISO_DATE);

    expect(result).not.toMatch(/\d{1,2}:\d{2}/);
  });
});
