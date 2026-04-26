import {
  Box,
  Chip,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { SubmissionListItem } from '@/types';
import { DEFAULT_SUBMISSIONS_PAGE_SIZE, PRIORITY_COLORS, STATUS_COLORS } from '@/constants';
import { formatDate } from '../../utils/date';;

interface SubmissionsTableProps {
  submissions: SubmissionListItem[];
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function SubmissionsTable({
  submissions,
  totalCount,
  currentPage,
  onPageChange,
}: SubmissionsTableProps) {
  const router = useRouter();

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" color="text.secondary">
          {totalCount} total submission{totalCount !== 1 ? 's' : ''}
        </Typography>
      </Box>

      <TableContainer component={Paper} variant="outlined">
        <Table aria-label="Submissions list">
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Broker</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell align="center">Docs</TableCell>
              <TableCell align="center">Notes</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow
                key={submission.id}
                hover
                onClick={() => router.push(`/submissions/${submission.id}`)}
                sx={{
                  cursor: 'pointer',
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      {submission.company.legalName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {submission.company.industry} • {submission.company.headquartersCity}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={submission.status.replace('_', ' ')}
                    size="small"
                    color={STATUS_COLORS[submission.status]}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={submission.priority}
                    size="small"
                    color={PRIORITY_COLORS[submission.priority]}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{submission.broker.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{submission.owner.fullName}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{submission.documentCount}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{submission.noteCount}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{formatDate(submission.createdAt)}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {totalCount > DEFAULT_SUBMISSIONS_PAGE_SIZE && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={Math.ceil(totalCount / DEFAULT_SUBMISSIONS_PAGE_SIZE)}
            page={currentPage}
            onChange={(_, value) => onPageChange(value)}
            color="primary"
            showFirstButton
            showLastButton
            aria-label="Submissions pagination"
          />
        </Box>
      )}
    </>
  );
}
