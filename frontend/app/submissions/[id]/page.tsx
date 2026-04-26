'use client';

import { Container, Grid, Stack } from '@mui/material';
import { useParams } from 'next/navigation';

import { useSubmissionDetail } from '@/hooks/useSubmissions';

import {
  BrokerInfoCard,
  CompanyInfoCard,
  ContactsSection,
  DocumentsSection,
  NotesSection,
  OwnerInfoCard,
  SubmissionDetailError,
  SubmissionDetailHeader,
  SubmissionDetailLoading,
  SubmissionSummaryCard,
} from '@/components/submission-detail';

export default function SubmissionDetailPage() {
  const params = useParams<{ id: string }>();
  const submissionId = params?.id ?? '';

  // Fetch submission details
  const { isLoading, isError, data, refetch } = useSubmissionDetail(submissionId);

  // Show loading state for the whole page
  if (isLoading) {
    return <SubmissionDetailLoading />;
  }

  // show error state for the whole page
  // empty data is also an error, since we expect data to be defined
  if (isError || !data) {
    return <SubmissionDetailError onRetry={refetch} />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack spacing={4}>
        <SubmissionDetailHeader
          id={data.id}
          status={data.status}
          priority={data.priority}
          createdAt={data.createdAt}
          updatedAt={data.updatedAt}
        />

        <SubmissionSummaryCard summary={data.summary} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <CompanyInfoCard company={data.company} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <BrokerInfoCard broker={data.broker} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <OwnerInfoCard owner={data.owner} />
          </Grid>
        </Grid>

        <ContactsSection contacts={data.contacts} />

        <DocumentsSection documents={data.documents} />

        <NotesSection notes={data.notes} />
      </Stack>
    </Container>
  );
}
