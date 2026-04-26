import { formatDate, formatDateShort } from './date';

const ISO_DATE = '2026-04-25T13:29:00.000Z';

describe('formatDate', () => {
  // Time output is timezone-dependent, so we assert the stable parts
  // (month, day, year) and only verify the time pattern, not its value.
  it('formats a date with full month, day, year, and time', () => {
    const result = formatDate(ISO_DATE);

    expect(result).toMatch(/April/);
    expect(result).toMatch(/25/);
    expect(result).toMatch(/2026/);
    expect(result).toMatch(/\d{1,2}:\d{2}/);
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
