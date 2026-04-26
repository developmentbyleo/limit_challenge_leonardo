import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { apiClient } from '@/lib/api-client';
import { useBrokerOptions } from './useBrokerOptions';

jest.mock('@/lib/api-client', () => ({
  apiClient: { get: jest.fn() },
}));

const mockGet = jest.mocked(apiClient.get);

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useBrokerOptions', () => {
  afterEach(() => jest.resetAllMocks());

  it('unwraps the paginated response and returns only the brokers array', async () => {
    const brokers = [
      { id: 1, name: 'Broker A', primaryContactEmail: 'a@test.com' },
      { id: 2, name: 'Broker B', primaryContactEmail: null },
    ];
    const paginatedResponse = { count: 2, next: null, previous: null, results: brokers };
    
    mockGet.mockResolvedValueOnce({ data: paginatedResponse });

    const { result } = renderHook(() => useBrokerOptions(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(brokers);
  });
});
