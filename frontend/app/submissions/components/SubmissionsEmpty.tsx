import { Box, Card, CardContent, Typography } from '@mui/material';

export function SubmissionsEmpty() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box textAlign="center" py={6}>
          <Typography variant="h6" gutterBottom>
            No submissions found
          </Typography>
          <Typography color="text.secondary">
            Try adjusting your filters to see more results
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
