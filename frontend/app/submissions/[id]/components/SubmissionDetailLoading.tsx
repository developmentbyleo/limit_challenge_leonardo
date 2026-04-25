import { Box, CircularProgress, Container } from '@mui/material';

export function SubmissionDetailLoading() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
        role="status"
        aria-live="polite"
      >
        <CircularProgress aria-label="Loading submission details" />
      </Box>
    </Container>
  );
}
