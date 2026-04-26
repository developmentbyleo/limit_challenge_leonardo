import { Card, CardContent, Stack, Typography } from '@mui/material';
import { Business as BusinessIcon } from '@mui/icons-material';
import { Company } from '@/types';
import { InfoCardHeader } from './InfoCardHeader';

interface CompanyInfoCardProps {
  company: Company;
}

function CompanyName({ name }: { name: string }) {
  return (
    <Typography variant="body1" fontWeight="medium">
      {name}
    </Typography>
  );
}

function CompanyIndustry({ industry }: { industry: string }) {
  return (
    <Typography variant="body2" color="text.secondary">
      {industry}
    </Typography>
  );
}

function CompanyLocation({ city }: { city: string }) {
  return (
    <Typography variant="body2" color="text.secondary">
      {city}
    </Typography>
  );
}

export function CompanyInfoCard({ company }: CompanyInfoCardProps) {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <InfoCardHeader icon={<BusinessIcon color="primary" />} title="Company" />

        <Stack spacing={1}>
          <CompanyName name={company.legalName} />
          <CompanyIndustry industry={company.industry} />
          <CompanyLocation city={company.headquartersCity} />
        </Stack>
      </CardContent>
    </Card>
  );
}
