import ChatAppAi from 'src/components/apps/chat-ai';
import { ChatAIProvider } from 'src/context/aichat-context';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '',
    title: 'Chat-AI',
  },
];

const ChatAi = () => {
  return (
    <>
      <ChatAIProvider>
        <BreadcrumbComp title="Chat-AI" items={BCrumb} />
        <ChatAppAi />
      </ChatAIProvider>
    </>
  );
};

export default ChatAi;
