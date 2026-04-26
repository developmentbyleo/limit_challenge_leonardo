import { Broker, Company, Contact, Document, NoteDetail, TeamMember } from './entities';

export type SubmissionStatus = 'new' | 'in_review' | 'closed' | 'lost';
export type SubmissionPriority = 'high' | 'medium' | 'low';

export interface NoteSummary {
  authorName: string;
  bodyPreview: string;
  createdAt: string;
}

export interface SubmissionListItem {
  id: number;
  status: SubmissionStatus;
  priority: SubmissionPriority;
  summary: string;
  createdAt: string;
  updatedAt: string;
  broker: Broker;
  company: Company;
  owner: TeamMember;
  documentCount: number;
  noteCount: number;
  latestNote: NoteSummary | null;
}

export interface SubmissionDetail extends Omit<
  SubmissionListItem,
  'documentCount' | 'noteCount' | 'latestNote'
> {
  contacts: Contact[];
  documents: Document[];
  notes: NoteDetail[];
}

export interface SubmissionListFilters {
  status?: SubmissionStatus;
  brokerId?: string;
  companySearch?: string;
  page?: number;
}
