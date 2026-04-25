import { Box, Card, CardContent, Container, Skeleton, Stack } from '@mui/material';

function HeaderSkeleton() {
  return (
    <Box>
      <Skeleton variant="text" width={200} height={48} />
      <Skeleton variant="text" width={350} height={24} />
    </Box>
  );
}

function FiltersSkeleton() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Skeleton variant="rounded" height={40} sx={{ flex: 1 }} />
          <Skeleton variant="rounded" height={40} sx={{ flex: 1 }} />
          <Skeleton variant="rounded" height={40} sx={{ flex: 1 }} />
        </Stack>
      </CardContent>
    </Card>
  );
}

function TableRowSkeleton() {
  return (
    <Box display="flex" gap={2} py={2} px={2}>
      <Skeleton variant="rectangular" width="20%" height={60} />
      <Skeleton variant="rectangular" width="10%" height={60} />
      <Skeleton variant="rectangular" width="10%" height={60} />
      <Skeleton variant="rectangular" width="20%" height={60} />
      <Skeleton variant="rectangular" width="15%" height={60} />
      <Skeleton variant="rectangular" width="8%" height={60} />
      <Skeleton variant="rectangular" width="8%" height={60} />
      <Skeleton variant="rectangular" width="12%" height={60} />
    </Box>
  );
}

function TableSkeleton() {
  return (
    <Card variant="outlined">
      <Box py={2}>
        {[...Array(5)].map((_, index) => (
          <TableRowSkeleton key={index} />
        ))}
      </Box>
    </Card>
  );
}

export function SubmissionsLoading() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack spacing={4} role="status" aria-live="polite" aria-label="Loading submissions">
        <HeaderSkeleton />
        <FiltersSkeleton />
        <TableSkeleton />
      </Stack>
    </Container>
  );
}
