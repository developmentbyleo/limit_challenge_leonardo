import { Alert, Box, Button, Container, Stack, Typography } from '@mui/material';

interface SubmissionsErrorProps {
  onRetry: () => void;
}

function ErrorHeader() {
  return (
    <Box>
      <Typography variant="h4" component="h1">
        Submissions
      </Typography>
      <Typography color="text.secondary">
        Browse and filter broker-submitted opportunities
      </Typography>
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
      Failed to load submissions. Please try again.
    </Alert>
  );
}

export function SubmissionsError({ onRetry }: SubmissionsErrorProps) {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack spacing={4}>
        <ErrorHeader />
        <ErrorAlert onRetry={onRetry} />
      </Stack>
    </Container>
  );
}
