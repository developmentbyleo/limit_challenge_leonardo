import { Card, CardContent, Typography } from '@mui/material';

interface SubmissionSummaryCardProps {
  summary: string;
}

export function SubmissionSummaryCard({ summary }: SubmissionSummaryCardProps) {
  return (
    <Card variant="outlined" component="section" aria-labelledby="summary-heading">
      <CardContent>
        <Typography id="summary-heading" variant="h6" gutterBottom>
          Summary
        </Typography>
        <Typography variant="body1" paragraph>
          {summary}
        </Typography>
      </CardContent>
    </Card>
  );
}
