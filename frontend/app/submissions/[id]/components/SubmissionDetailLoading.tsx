import { Box, Card, CardContent, Container, Grid, Skeleton, Stack } from '@mui/material';

function HeaderSkeleton() {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box>
        <Box display="flex" alignItems="center" gap={2} mb={1}>
          <Skeleton variant="text" width={200} height={48} />
          <Skeleton variant="rounded" width={80} height={32} />
          <Skeleton variant="rounded" width={80} height={32} />
        </Box>
        <Skeleton variant="text" width={300} height={24} />
      </Box>
      <Skeleton variant="rounded" width={120} height={40} />
    </Box>
  );
}

function SummaryCardSkeleton() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Skeleton variant="text" width={100} height={32} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="70%" />
      </CardContent>
    </Card>
  );
}

function InfoCardSkeleton() {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={80} height={28} />
        </Box>
        <Stack spacing={1}>
          <Skeleton variant="text" width="80%" height={24} />
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="50%" height={20} />
        </Stack>
      </CardContent>
    </Card>
  );
}

function ContactsTableSkeleton() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Skeleton variant="text" width={120} height={32} sx={{ mb: 2 }} />
        <Stack spacing={2}>
          {[...Array(3)].map((_, index) => (
            <Box key={index} display="flex" gap={2}>
              <Skeleton variant="rectangular" width="25%" height={40} />
              <Skeleton variant="rectangular" width="20%" height={40} />
              <Skeleton variant="rectangular" width="30%" height={40} />
              <Skeleton variant="rectangular" width="25%" height={40} />
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

function DocumentsSkeleton() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Skeleton variant="text" width={120} height={32} sx={{ mb: 2 }} />
        <Stack spacing={2}>
          {[...Array(2)].map((_, index) => (
            <Box key={index} display="flex" alignItems="center" gap={2}>
              <Skeleton variant="circular" width={24} height={24} />
              <Box flex={1}>
                <Skeleton variant="text" width="40%" height={24} />
                <Skeleton variant="text" width="30%" height={20} />
              </Box>
              <Skeleton variant="rounded" width={80} height={36} />
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

function NotesSkeleton() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Skeleton variant="text" width={80} height={32} sx={{ mb: 2 }} />
        <Stack spacing={2}>
          {[...Array(2)].map((_, index) => (
            <Card key={index} variant="outlined">
              <CardContent>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Skeleton variant="text" width={150} height={24} />
                  <Skeleton variant="text" width={120} height={20} />
                </Box>
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="text" width="60%" />
              </CardContent>
            </Card>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export function SubmissionDetailLoading() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack spacing={4} role="status" aria-live="polite" aria-label="Loading submission details">
        <HeaderSkeleton />
        <SummaryCardSkeleton />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <InfoCardSkeleton />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <InfoCardSkeleton />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <InfoCardSkeleton />
          </Grid>
        </Grid>

        <ContactsTableSkeleton />
        <DocumentsSkeleton />
        <NotesSkeleton />
      </Stack>
    </Container>
  );
}
