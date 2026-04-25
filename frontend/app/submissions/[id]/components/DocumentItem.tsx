import { Box, Button, ListItem, ListItemText, Typography } from '@mui/material';
import { AttachFile as AttachFileIcon } from '@mui/icons-material';
import { formatDateShort } from '@/lib/utils';

interface DocumentItemProps {
  title: string;
  docType: string;
  uploadedAt: string;
  fileUrl: string;
}

function DocumentTitle({ title }: { title: string }) {
  return (
    <Typography variant="body1" fontWeight="medium" component="span">
      {title}
    </Typography>
  );
}

function DocumentMetadata({ docType, uploadedAt }: { docType: string; uploadedAt: string }) {
  return (
    <Typography variant="body2" color="text.secondary" component="span">
      {docType} • Uploaded {formatDateShort(uploadedAt)}
    </Typography>
  );
}

function ViewDocumentButton({ fileUrl }: { fileUrl: string }) {
  if (!fileUrl) return null;

  return (
    <Button
      component="a"
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      size="small"
      variant="outlined"
    >
      View
    </Button>
  );
}

export function DocumentItem({ title, docType, uploadedAt, fileUrl }: DocumentItemProps) {
  return (
    <ListItem>
      <Box display="flex" alignItems="center" gap={2} width="100%" px={2}>
        <AttachFileIcon color="action" />

        <ListItemText
          primary={<DocumentTitle title={title} />}
          secondary={<DocumentMetadata docType={docType} uploadedAt={uploadedAt} />}
        />

        <ViewDocumentButton fileUrl={fileUrl} />
      </Box>
    </ListItem>
  );
}
