'use client';

import { Container, Grid, Stack } from '@mui/material';
import { useParams } from 'next/navigation';

import { useSubmissionDetail } from '@/lib/hooks/useSubmissions';

import { SubmissionDetailLoading } from './components/SubmissionDetailLoading';
import { SubmissionDetailError } from './components/SubmissionDetailError';
import { SubmissionDetailHeader } from './components/SubmissionDetailHeader';
import { SubmissionSummaryCard } from './components/SubmissionSummaryCard';
import { CompanyInfoCard } from './components/CompanyInfoCard';
import { BrokerInfoCard } from './components/BrokerInfoCard';
import { OwnerInfoCard } from './components/OwnerInfoCard';
import { ContactsSection } from './components/ContactsSection';
import { DocumentsSection } from './components/DocumentsSection';
import { NotesSection } from './components/NotesSection';

export default function SubmissionDetailPage() {
  const params = useParams<{ id: string }>();
  const submissionId = params?.id ?? '';

  const {isLoading, isError, data, refetch} = useSubmissionDetail(submissionId);

  if (isLoading) {
    return <SubmissionDetailLoading />;
  }

  if (isError) {
    return <SubmissionDetailError onRetry={refetch} />;
  }

  if (!data) {
    return null;
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
