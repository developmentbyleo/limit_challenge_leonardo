import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface InfoCardHeaderProps {
  icon: ReactNode;
  title: string;
}

export function InfoCardHeader({ icon, title }: InfoCardHeaderProps) {
  return (
    <Box display="flex" alignItems="center" gap={1} mb={2}>
      {icon}
      <Typography variant="h6">{title}</Typography>
    </Box>
  );
}
