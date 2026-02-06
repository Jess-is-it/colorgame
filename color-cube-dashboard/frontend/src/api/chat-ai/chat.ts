import { http, HttpResponse } from 'msw';
import { chatHistory } from './history-data';
import { Message } from 'src/types/apps/ai-chat';

let ChatList: Message[] = [];

//  For resetting on browser refresh
const resetChats = [...ChatList];

export const ChatAiHandlers = [
  // GET: fetch chat messages
  http.get('/api/chat/messages', ({ request }) => {
    const isBrowserRefreshed = request.headers.get('browserrefreshed');

    if (isBrowserRefreshed === 'false') {
      return HttpResponse.json({
        status: 200,
        msg: 'Fetched current chat list',
        data: ChatList,
      });
    } else {
      ChatList = [...resetChats];
      return HttpResponse.json({
        status: 200,
        msg: 'Chat list reset on browser refresh',
        data: ChatList,
      });
    }
  }),

  // POST: add message and mock AI reply
  http.post('/api/chat/postmessages', async ({ request }) => {
    try {
      const { text } = (await request.json()) as { text: string };
      const newId = ChatList.length + 1;

      const userEntry: Message = {
        id: newId,
        sender: 'user',
        text,
      };
      ChatList.push(userEntry);

      const lowerText = text.toLowerCase();
      const matchedQA = chatHistory.find((item) => item.que.toLowerCase() === lowerText);

      let aiText = '';

      if (matchedQA) {
        aiText = matchedQA.preview;
      } else if (lowerText.includes('title')) {
        aiText = `# Example Title\n\nThis is a mock response with a title.`;
      } else if (lowerText.includes('code')) {
        aiText = `Here is a code example:\n\n\`\`\`javascript\nfunction example() {\n  console.log('This is a mock code snippet.');\n}\n\`\`\``;
      } else if (lowerText.includes('list')) {
        aiText = `This is a mock response with a list:\n\n1. First item\n2. Second item\n3. Third item`;
      } else if (lowerText.includes('alert')) {
        aiText = `⚠️ This is a mock warning. Proceed carefully.`;
      } else {
        aiText = `This is a generic mock response. Try keywords like 'title', 'code', 'list', or 'alert'.`;
      }

      const aiEntry: Message = {
        id: newId + 1,
        sender: 'ai',
        text: aiText,
      };
      ChatList.push(aiEntry);

      return HttpResponse.json({
        status: 200,
        msg: 'Message added successfully',
        data: [userEntry, aiEntry],
      });
    } catch (error) {
      return HttpResponse.json({
        status: 400,
        msg: 'Failed to add message',
      });
    }
  }),
];
