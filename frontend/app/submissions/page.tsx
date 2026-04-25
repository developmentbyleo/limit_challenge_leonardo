'use client';

import { Box, Container, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';

import { useBrokerOptions } from '@/lib/hooks/useBrokerOptions';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { useSubmissionsList } from '@/lib/hooks/useSubmissions';
import { SubmissionStatus } from '@/lib/types';

import { SubmissionsFilters } from './components/SubmissionsFilters';
import { SubmissionsLoading } from './components/SubmissionsLoading';
import { SubmissionsError } from './components/SubmissionsError';
import { SubmissionsEmpty } from './components/SubmissionsEmpty';
import { SubmissionsTable } from './components/SubmissionsTable';

export default function SubmissionsPage() {
  const [status, setStatusFilter] = useState<SubmissionStatus | ''>('');
  const [brokerIdFilter, setBrokerIdFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [page, setPage] = useState(1);

  // Debounce the company filter to prevent unnecessary re-renders
  const debouncedCompanyFilter = useDebounce(companyFilter);

  // Handle status filter change and reset page to 1
  const handleStatusChange = (value: string) => {
    setStatusFilter(value as SubmissionStatus | '');
    setPage(1);
  };

  // Handle broker filter change and reset page to 1
  const handleBrokerChange = (value: string) => {
    setBrokerIdFilter(value);
    setPage(1);
  };

  // Handle company filter change and reset page to 1
  const handleCompanyChange = (value: string) => {
    setCompanyFilter(value);
    setPage(1);
  };

  // Memoize the current filters to prevent unnecessary re-renders
  const currentFilters = useMemo(
    () => ({
      status: status || undefined,
      brokerId: brokerIdFilter || undefined,
      companySearch: debouncedCompanyFilter || undefined,
      page: page > 1 ? page : undefined,
    }),
    [status, brokerIdFilter, debouncedCompanyFilter, page],
  );

  // Fetch submissions with the current filters
  const { isLoading, isError, isSuccess, data, refetch } = useSubmissionsList(currentFilters);

  // Fetch broker options to populate the broker filter
  const brokerQuery = useBrokerOptions();

  // Show loading state for the whole page
  if (isLoading) {
    return <SubmissionsLoading />;
  }

  // show error state for the whole page
  if (isError) {
    return <SubmissionsError onRetry={refetch} />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4" component="h1">
            Submissions
          </Typography>
          <Typography color="text.secondary">
            Browse and filter broker-submitted opportunities
          </Typography>
        </Box>

        {isSuccess && (
          <SubmissionsFilters
            status={status}
            brokerIdFilter={brokerIdFilter}
            companyFilter={companyFilter}
            brokerOptions={brokerQuery.data || []}
            isBrokersLoading={brokerQuery.isLoading}
            onStatusChange={handleStatusChange}
            onBrokerChange={handleBrokerChange}
            onCompanyChange={handleCompanyChange}
          />
        )}

        {isSuccess && data.results.length === 0 && <SubmissionsEmpty />}

        {isSuccess && data.results.length > 0 &&
          <SubmissionsTable
            submissions={data.results}
            totalCount={data.count}
            currentPage={page}
            onPageChange={setPage}
          />
        }
      </Stack>
    </Container>
  );
}
