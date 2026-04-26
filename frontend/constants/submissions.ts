import { SubmissionPriority, SubmissionStatus } from '@/types';

export const STATUS_COLORS: Record<SubmissionStatus, 'default' | 'primary' | 'success' | 'error'> =
  {
    new: 'primary',
    in_review: 'default',
    closed: 'success',
    lost: 'error',
  };

export const PRIORITY_COLORS: Record<SubmissionPriority, 'error' | 'warning' | 'default'> = {
  high: 'error',
  medium: 'warning',
  low: 'default',
};

export const STATUS_OPTIONS: { label: string; value: SubmissionStatus | '' }[] = [
  { label: 'All statuses', value: '' },
  { label: 'New', value: 'new' },
  { label: 'In Review', value: 'in_review' },
  { label: 'Closed', value: 'closed' },
  { label: 'Lost', value: 'lost' },
];

export const DEFAULT_SUBMISSIONS_PAGE_SIZE = 10;
