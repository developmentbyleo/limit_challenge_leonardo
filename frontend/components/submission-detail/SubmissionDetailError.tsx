import { Alert, Box, Button, Container, Stack, Typography } from '@mui/material';
import Link from 'next/link';

interface SubmissionDetailErrorProps {
  onRetry: () => void;
}

function ErrorHeader() {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="h4">Submission Detail</Typography>
      <Button component={Link} href="/submissions" variant="outlined">
        Back to list
      </Button>
    </Box>
  );
}

function ErrorAlert({ onRetry }: { onRetry: () => void }) {
  return (
    <Alert
      severity="error"
      action={
        <Button color="inherit" size="small" onClick={onRetry}>
          Retry
        </Button>
      }
    >
      Failed to load submission details. Please try again.
    </Alert>
  );
}

export function SubmissionDetailError({ onRetry }: SubmissionDetailErrorProps) {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <ErrorHeader />
        <ErrorAlert onRetry={onRetry} />
      </Stack>
    </Container>
  );
}
