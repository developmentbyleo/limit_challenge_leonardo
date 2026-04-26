import { Box, Button, Chip, Typography } from '@mui/material';
import Link from 'next/link';
import { SubmissionPriority, SubmissionStatus } from '@/types';
import { PRIORITY_COLORS, STATUS_COLORS } from '@/constants';
import { formatDateShort } from '../../utils/date';

interface SubmissionDetailHeaderProps {
  id: number;
  status: SubmissionStatus;
  priority: SubmissionPriority;
  createdAt: string;
  updatedAt: string;
}

function SubmissionTitle({ id }: { id: number }) {
  return (
    <Typography variant="h4" component="h1">
      Submission #{id}
    </Typography>
  );
}

function StatusBadge({ status }: { status: SubmissionStatus }) {
  return <Chip label={status.replace('_', ' ')} color={STATUS_COLORS[status]} size="medium" />;
}

function PriorityBadge({ priority }: { priority: SubmissionPriority }) {
  return (
    <Chip label={priority} color={PRIORITY_COLORS[priority]} variant="outlined" size="medium" />
  );
}

function TitleWithBadges({
  id,
  status,
  priority,
}: {
  id: number;
  status: SubmissionStatus;
  priority: SubmissionPriority;
}) {
  return (
    <Box display="flex" alignItems="center" gap={2} mb={1} flexWrap="wrap">
      <SubmissionTitle id={id} />
      <StatusBadge status={status} />
      <PriorityBadge priority={priority} />
    </Box>
  );
}

function TimestampMetadata({ createdAt, updatedAt }: { createdAt: string; updatedAt: string }) {
  return (
    <Typography color="text.secondary" variant="body2">
      Created {formatDateShort(createdAt)} • Last updated {formatDateShort(updatedAt)}
    </Typography>
  );
}

function BackButton() {
  return (
    <Button
      component={Link}
      href="/submissions"
      variant="outlined"
      fullWidth
      sx={{ width: { sm: 'auto' } }}
    >
      Back to list
    </Button>
  );
}

export function SubmissionDetailHeader({
  id,
  status,
  priority,
  createdAt,
  updatedAt,
}: SubmissionDetailHeaderProps) {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      justifyContent="space-between"
      gap={2}
    >
      <Box flex={1}>
        <TitleWithBadges id={id} status={status} priority={priority} />
        <TimestampMetadata createdAt={createdAt} updatedAt={updatedAt} />
      </Box>
      <Box sx={{ alignSelf: { xs: 'stretch', sm: 'center' } }}>
        <BackButton />
      </Box>
    </Box>
  );
}
