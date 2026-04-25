import { Card, CardContent, MenuItem, Stack, TextField } from '@mui/material';
import { SubmissionStatus } from '@/lib/types';
import { STATUS_OPTIONS } from '@/lib/constants';

interface SubmissionsFiltersProps {
  status: SubmissionStatus | '';
  brokerIdFilter: string;
  companyFilter: string;
  brokerOptions: Array<{ id: number; name: string }>;
  isBrokersLoading: boolean;
  onStatusChange: (value: string) => void;
  onBrokerChange: (value: string) => void;
  onCompanyChange: (value: string) => void;
}

export function SubmissionsFilters({
  status,
  brokerIdFilter,
  companyFilter,
  brokerOptions,
  isBrokersLoading,
  onStatusChange,
  onBrokerChange,
  onCompanyChange,
}: SubmissionsFiltersProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            select
            label="Status"
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            fullWidth
            size="small"
          >
            {STATUS_OPTIONS.map((option) => (
              <MenuItem key={option.value || 'all'} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Broker"
            value={brokerIdFilter}
            onChange={(event) => onBrokerChange(event.target.value)}
            fullWidth
            size="small"
            disabled={isBrokersLoading}
          >
            <MenuItem value="">All brokers</MenuItem>
            {brokerOptions?.map((broker) => (
              <MenuItem key={broker.id} value={String(broker.id)}>
                {broker.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Company search"
            value={companyFilter}
            onChange={(event) => onCompanyChange(event.target.value)}
            fullWidth
            size="small"
            placeholder="Search by company name..."
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
