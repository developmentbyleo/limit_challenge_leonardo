import { Box, Card, CardContent, Paper, Stack, Typography } from '@mui/material';
import { NoteDetail } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface NotesSectionProps {
  notes: NoteDetail[];
}

function EmptyNotes() {
  return (
    <Box py={3} textAlign="center">
      <Typography color="text.secondary">No notes yet</Typography>
    </Box>
  );
}

function NoteHeader({ authorName, createdAt }: { authorName: string; createdAt: string }) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
      <Typography variant="subtitle2" fontWeight="medium">
        {authorName}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {formatDate(createdAt)}
      </Typography>
    </Box>
  );
}

function NoteBody({ body }: { body: string }) {
  return (
    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
      {body}
    </Typography>
  );
}

function NoteCard({ note, isLatest }: { note: NoteDetail; isLatest: boolean }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        bgcolor: isLatest ? 'action.hover' : 'background.paper',
      }}
    >
      <NoteHeader authorName={note.authorName} createdAt={note.createdAt} />
      <NoteBody body={note.body} />
    </Paper>
  );
}

function NotesList({ notes }: { notes: NoteDetail[] }) {
  return (
    <Stack spacing={2} mt={2}>
      {notes.map((note, index) => (
        <NoteCard key={note.id} note={note} isLatest={index === 0} />
      ))}
    </Stack>
  );
}

export function NotesSection({ notes }: NotesSectionProps) {
  const hasNotes = notes.length > 0;

  return (
    <Card variant="outlined" component="section" aria-labelledby="notes-heading">
      <CardContent>
        <Typography id="notes-heading" variant="h6" gutterBottom>
          Notes
        </Typography>

        {hasNotes ? <NotesList notes={notes} /> : <EmptyNotes />}
      </CardContent>
    </Card>
  );
}
