import {
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Email as EmailIcon, Phone as PhoneIcon } from '@mui/icons-material';
import { Contact } from '@/lib/types';

interface ContactsSectionProps {
  contacts: Contact[];
}

function EmptyContacts() {
  return (
    <Box py={3} textAlign="center">
      <Typography color="text.secondary">No contacts added</Typography>
    </Box>
  );
}

function ContactsTableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Role</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Phone</TableCell>
      </TableRow>
    </TableHead>
  );
}

function ContactEmail({ email }: { email: string }) {
  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      <EmailIcon fontSize="small" color="action" />
      <Typography variant="body2">{email}</Typography>
    </Box>
  );
}

function ContactPhone({ phone }: { phone: string }) {
  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      <PhoneIcon fontSize="small" color="action" />
      <Typography variant="body2">{phone}</Typography>
    </Box>
  );
}

function ContactRow({ contact }: { contact: Contact }) {
  return (
    <TableRow key={contact.id}>
      <TableCell>
        <Typography variant="body2" fontWeight="medium">
          {contact.name}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{contact.role}</Typography>
      </TableCell>
      <TableCell>
        <ContactEmail email={contact.email} />
      </TableCell>
      <TableCell>
        <ContactPhone phone={contact.phone} />
      </TableCell>
    </TableRow>
  );
}

function ContactsTable({ contacts }: { contacts: Contact[] }) {
  return (
    <TableContainer>
      <Table aria-label="Contacts list">
        <ContactsTableHeader />
        <TableBody>
          {contacts.map((contact) => (
            <ContactRow key={contact.id} contact={contact} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ContactsSection({ contacts }: ContactsSectionProps) {
  const hasContacts = contacts.length > 0;

  return (
    <Card variant="outlined" component="section" aria-labelledby="contacts-heading">
      <CardContent>
        <Typography id="contacts-heading" variant="h6" gutterBottom>
          Contacts
        </Typography>

        {hasContacts ? <ContactsTable contacts={contacts} /> : <EmptyContacts />}
      </CardContent>
    </Card>
  );
}
