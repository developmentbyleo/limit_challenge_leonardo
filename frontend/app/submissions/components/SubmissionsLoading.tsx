import { Box, CircularProgress } from '@mui/material';

export function SubmissionsLoading() {
  return (
    <Box display="flex" justifyContent="center" py={8} role="status" aria-live="polite">
      <CircularProgress aria-label="Loading submissions" />
    </Box>
  );
}
