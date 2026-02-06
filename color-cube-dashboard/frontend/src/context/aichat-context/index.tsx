import { createContext, useState, useEffect, ReactNode, SetStateAction, Dispatch } from 'react';
import useSWR from 'swr';
import { getFetcher, postFetcher } from 'src/api/global-fetcher';
import { ChatAIMessage, ChatSession } from 'src/types/apps/ai-chat';
import { sendMessageToGemini } from 'src/api/chat-ai/gemini';

type ChatAIContextType = {
  chatList: ChatAIMessage[];
  setChatList: Dispatch<SetStateAction<ChatAIMessage[]>>;
  loading: boolean;
  error: string;
  sendMessage: (text: string, useGemini: boolean) => Promise<void>;
  typing: boolean;
  chatSessions: ChatSession[];
  saveSession: (userText: string, aiText: string) => void;
  setChatSessions: Dispatch<SetStateAction<ChatSession[]>>;
  setTyping: Dispatch<SetStateAction<boolean>>;
};

// Create context
export const ChatAIContext = createContext<ChatAIContextType | undefined>(undefined);

// Provider
export const ChatAIProvider = ({ children }: { children: ReactNode }) => {
  const [chatList, setChatList] = useState<ChatAIMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [typing, setTyping] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const { data, error: swrError } = useSWR('/api/chat/messages', getFetcher);

  // On fetch success
  useEffect(() => {
    if (data?.data) {
      setChatList(data.data);
      setLoading(false);
    }
    if (swrError) {
      setError('Failed to fetch chat.');
      setLoading(false);
    }
  }, [data, swrError]);

  //for save  history

  const saveSession = (userText: string, aiText: string) => {
    const sessionTimestamp = Date.now();

    const newSession: ChatSession = {
      id: sessionTimestamp.toString(),
      title: userText,
      messages: [
        { id: sessionTimestamp, sender: 'user', text: userText },
        { id: sessionTimestamp + 1, sender: 'ai', text: aiText },
      ],
      timestamp: sessionTimestamp,
      status: 'active',
    };

    setChatSessions((prev) => [...prev, newSession]);
  };

  const sendMessage = async (text: string, useGemini = true) => {
    try {
      setTyping(true);

      if (useGemini) {
        // Generate unique IDs
        const userMessage: ChatAIMessage = {
          id: Date.now(),
          sender: 'user',
          text,
        };
        setChatList((prev) => [...prev, userMessage]);

        const aiResponse = await sendMessageToGemini(text);

        const aiMessage: ChatAIMessage = {
          id: Date.now() + 1,
          sender: 'ai',
          text: aiResponse,
        };

        saveSession(text, aiResponse);
        setChatList((prev) => [...prev, aiMessage]);
      } else {
        const response = await postFetcher('/api/chat/postmessages', { text });

        const [userMsg, aiReply] = response.data;

        setChatList((prev) => [...prev, userMsg, aiReply]);

        saveSession(userMsg.text, aiReply.text);
      }
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
    } finally {
      setTyping(false);
    }
  };

  return (
    <ChatAIContext.Provider
      value={{
        setTyping,
        setChatSessions,
        saveSession,
        chatSessions,
        chatList,
        setChatList,
        loading,
        error,
        typing,
        sendMessage,
      }}
    >
      {children}
    </ChatAIContext.Provider>
  );
};
