import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { Person as PersonIcon, Email as EmailIcon } from '@mui/icons-material';
import { TeamMember } from '@/types';
import { InfoCardHeader } from './InfoCardHeader';

interface OwnerInfoCardProps {
  owner: TeamMember;
}

function OwnerName({ name }: { name: string }) {
  return (
    <Typography variant="body1" fontWeight="medium">
      {name}
    </Typography>
  );
}

function OwnerEmail({ email }: { email: string }) {
  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      <EmailIcon fontSize="small" color="action" />
      <Typography variant="body2" color="text.secondary">
        {email}
      </Typography>
    </Box>
  );
}

export function OwnerInfoCard({ owner }: OwnerInfoCardProps) {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <InfoCardHeader icon={<PersonIcon color="primary" />} title="Owner" />

        <Stack spacing={1}>
          <OwnerName name={owner.fullName} />
          <OwnerEmail email={owner.email} />
        </Stack>
      </CardContent>
    </Card>
  );
}
