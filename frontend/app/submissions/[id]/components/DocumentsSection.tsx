import { Box, Card, CardContent, Divider, List, Typography } from '@mui/material';
import { Document } from '@/lib/types';
import { DocumentItem } from './DocumentItem';

interface DocumentsSectionProps {
  documents: Document[];
}

function EmptyDocuments() {
  return (
    <Box py={3} textAlign="center">
      <Typography color="text.secondary">No documents uploaded</Typography>
    </Box>
  );
}

function DocumentsList({ documents }: { documents: Document[] }) {
  return (
    <List>
      {documents.map((doc, index) => (
        <div key={doc.id}>
          <DocumentItem
            title={doc.title}
            docType={doc.docType}
            uploadedAt={doc.uploadedAt}
            fileUrl={doc.fileUrl}
          />
          {index < documents.length - 1 && <Divider />}
        </div>
      ))}
    </List>
  );
}

export function DocumentsSection({ documents }: DocumentsSectionProps) {
  const hasDocuments = documents.length > 0;

  return (
    <Card variant="outlined" component="section" aria-labelledby="documents-heading">
      <CardContent>
        <Typography id="documents-heading" variant="h6" gutterBottom>
          Documents
        </Typography>

        {hasDocuments ? <DocumentsList documents={documents} /> : <EmptyDocuments />}
      </CardContent>
    </Card>
  );
}
