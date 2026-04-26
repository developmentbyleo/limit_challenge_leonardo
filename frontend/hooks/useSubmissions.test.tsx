import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { apiClient } from '@/lib/api-client';
import { useSubmissionDetail, useSubmissionsList } from './useSubmissions';
import { SubmissionStatus } from '@/types';

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

describe('useSubmissionsList', () => {
  afterEach(() => jest.resetAllMocks());

  it('passes filters as query params', async () => {
    const paginatedResponse = { count: 0, next: null, previous: null, results: [] };
    const queryParams = { status: 'new' as SubmissionStatus, brokerId: '5', companySearch: 'acme', page: 2 };

    mockGet.mockResolvedValueOnce({ data: paginatedResponse });

    const { result } = renderHook(() => useSubmissionsList(queryParams), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockGet).toHaveBeenCalledWith('/submissions/', {
      params: queryParams,
    });
  });
});

describe('useSubmissionDetail', () => {
  afterEach(() => jest.resetAllMocks());

  it('does not fetch when id is empty', () => {
    const emptySubmissionId = '';

    const { result } = renderHook(() => useSubmissionDetail(emptySubmissionId), { wrapper: createWrapper() });

    expect(result.current.fetchStatus).toBe('idle');
    expect(mockGet).not.toHaveBeenCalled();
  });

  it('fetches the correct endpoint when id is provided', async () => {
    const submissionId = 42;
    const submissionIdInString = submissionId.toString();

    mockGet.mockResolvedValueOnce({ data: { id: submissionId } });

    const { result } = renderHook(() => useSubmissionDetail(submissionIdInString), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockGet).toHaveBeenCalledWith(`/submissions/${submissionIdInString}/`);
  });
});
