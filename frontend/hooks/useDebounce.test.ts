import { act, renderHook } from '@testing-library/react';
import { DEFAULT_DEBOUNCE_TIME } from '@/constants';
import { useDebounce } from './useDebounce';

jest.useFakeTimers();

const DELAY = DEFAULT_DEBOUNCE_TIME;

function renderDebounce<T>(initialValue: T, delay?: number) {
  return renderHook(({ value }) => useDebounce(value, delay), {
    initialProps: { value: initialValue },
  });
}

describe('useDebounce', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('returns the initial value immediately', () => {
    const { result } = renderDebounce('initial');

    expect(result.current).toBe('initial');
  });

  it('does not update the value before the delay has passed', () => {
    const { result, rerender } = renderDebounce('initial');

    rerender({ value: 'updated' });
    jest.advanceTimersByTime(DELAY - 1);

    expect(result.current).toBe('initial');
  });

  it('updates the value after the delay has passed', () => {
    const { result, rerender } = renderDebounce('initial');

    rerender({ value: 'updated' });

    act(() => {
      jest.advanceTimersByTime(DELAY);
    });

    expect(result.current).toBe('updated');
  });

  it('works with non-string types', () => {
    const { result, rerender } = renderDebounce(1);

    rerender({ value: 42 });

    act(() => {
      jest.advanceTimersByTime(DELAY);
    });

    expect(result.current).toBe(42);
  });

  it('can use custom delay', () => {
    const CUSTOM_DELAY = 100;
    const { result, rerender } = renderDebounce('initial', CUSTOM_DELAY);

    rerender({ value: 'updated' });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(CUSTOM_DELAY);
    });

    expect(result.current).toBe('updated');
  });
});
