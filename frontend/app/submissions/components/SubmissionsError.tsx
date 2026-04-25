import { Alert, Button } from '@mui/material';

interface SubmissionsErrorProps {
  onRetry: () => void;
}

export function SubmissionsError({ onRetry }: SubmissionsErrorProps) {
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
