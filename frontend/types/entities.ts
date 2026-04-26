export interface Broker {
  id: number;
  name: string;
  primaryContactEmail: string | null;
}

export interface Company {
  id: number;
  legalName: string;
  industry: string;
  headquartersCity: string;
}

export interface TeamMember {
  id: number;
  fullName: string;
  email: string;
}

export interface Contact {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
}

export interface Document {
  id: number;
  title: string;
  docType: string;
  uploadedAt: string;
  fileUrl: string;
}

export interface NoteDetail {
  id: number;
  authorName: string;
  body: string;
  createdAt: string;
}
