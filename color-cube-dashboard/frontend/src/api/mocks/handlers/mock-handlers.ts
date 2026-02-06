import { Contacthandlers } from 'src/api/contacts/contactsdata';
import { Chathandlers } from 'src/api/chat/chatdata';
import { Ecommercehandlers } from 'src/api/ecommerce/productsdata';
import { PostHandlers } from 'src/api/userprofile/post-data';
import { UserDataHandlers } from 'src/api/userprofile/users-data';
import { Bloghandlers } from 'src/api/blog/blogdata';
import { NotesHandlers } from 'src/api/notes/notedata';
import { TicketHandlers } from 'src/api/ticket/ticket-data';
import { Emailhandlers } from 'src/api/email/emailsdata';
import { InvoiceHandlers } from 'src/api/invoice/invocelist';
import { Kanbanhandlers } from 'src/api/kanban/kanbandata';
import { accountHandlers } from 'src/api/mocks/handlers/account-handlers';
import { ChatAiHandlers } from 'src/api/chat-ai/chat';
import { ChatHistoryhandlers } from 'src/api/chat-ai/history-data';
import { ImageAiHandlers } from 'src/api/image-ai/aiimage';

export const mockHandlers = [
  ...Contacthandlers,
  ...Chathandlers,
  ...Ecommercehandlers,
  ...UserDataHandlers,
  ...PostHandlers,
  ...Bloghandlers,
  ...NotesHandlers,
  ...TicketHandlers,
  ...Emailhandlers,
  ...InvoiceHandlers,
  ...Kanbanhandlers,
  ...ChatAiHandlers,
  ...ChatHistoryhandlers,
  ...ImageAiHandlers,
  ...accountHandlers,
];
