import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { Person as PersonIcon, Email as EmailIcon } from '@mui/icons-material';
import { Broker } from '@/lib/types';
import { InfoCardHeader } from './InfoCardHeader';

interface BrokerInfoCardProps {
  broker: Broker;
}

function BrokerName({ name }: { name: string }) {
  return (
    <Typography variant="body1" fontWeight="medium">
      {name}
    </Typography>
  );
}

function BrokerEmail({ email }: { email: string | null }) {
  if (!email) return null;

  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      <EmailIcon fontSize="small" color="action" />
      <Typography variant="body2" color="text.secondary">
        {email}
      </Typography>
    </Box>
  );
}

export function BrokerInfoCard({ broker }: BrokerInfoCardProps) {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <InfoCardHeader icon={<PersonIcon color="primary" />} title="Broker" />

        <Stack spacing={1}>
          <BrokerName name={broker.name} />
          <BrokerEmail email={broker.primaryContactEmail} />
        </Stack>
      </CardContent>
    </Card>
  );
}
