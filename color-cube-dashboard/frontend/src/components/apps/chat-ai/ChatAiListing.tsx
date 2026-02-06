import React, { useContext, useState, useEffect } from 'react';
import { ChatAIContext } from 'src/context/aichat-context';
import { ChatHistoryItem, ChatSession } from 'src/types/apps/ai-chat';
import FullLogo from 'src/layouts/full/shared/logo/FullLogo';
import SimpleBar from 'simplebar-react';
import { Icon } from '@iconify/react';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';

type ChatSidebarProps = {
  setShowChatWindow: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatAiListing = ({ setShowChatWindow }: ChatSidebarProps) => {
  const { sendMessage, setChatList, chatSessions, setChatSessions } = useContext(ChatAIContext)!;

  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarData, setSidebarData] = useState<ChatHistoryItem[]>([]);
  const [deletedQuestions, setDeletedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchSidebar() {
      try {
        const res = await fetch('/api/data/chat/history');
        const json = await res.json();
        if (res.ok) {
          setSidebarData(json.data);
        } else {
          console.log('Failed to load sidebar questions');
        }
      } catch {
        console.log('Failed to load sidebar questions');
      }
    }
    fetchSidebar();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredChats = sidebarData
    .filter((chat) => chat.status !== 'deleted')
    .filter((chat) => chat.que.toLowerCase().includes(searchTerm.toLowerCase()));

  // 2. Get unique sessions
  const uniqueSessions = Array.from(
    new Map(chatSessions.map((session) => [session.messages[0]?.text ?? '', session])).values(),
  );

  // 3. Remove duplicates from history that are already in saved
  const savedQuestions = new Set(filteredChats.map((chat) => chat.que));

  const filteredHistory = uniqueSessions.filter((session) => {
    const question = session.messages[0]?.text ?? '';
    return !savedQuestions.has(question) && !deletedQuestions.has(question);
  });

  // 4. Merge both
  const unifiedChats = [
    ...filteredChats.map((chat) => ({
      ...chat,
      source: 'saved',
    })),
    ...filteredHistory.map((session) => ({
      id: session.id,
      que: session.messages[0]?.text || '',
      preview: session.messages[1]?.text || '',
      status: session.status || 'active',
      source: 'session',
    })),
  ];

  const handleNewChat = () => {
    setChatList([]);
    setShowChatWindow(false);
  };

  const handleDelete = (index: number | null) => {
    if (index === null) return;

    const selected = unifiedChats[index];

    if (!selected?.que) return;

    setDeletedQuestions((prev) => new Set(prev).add(selected.que));

    if (selected.source === 'saved') {
      // Find by ID instead of index
      const updated = sidebarData.map((item) =>
        item.id === selected.id ? ({ ...item, status: 'deleted' } as ChatHistoryItem) : item,
      );
      setSidebarData(updated);
    } else if (selected.source === 'session') {
      const updated = chatSessions.map((item) =>
        item.id === selected.id ? ({ ...item, status: 'deleted' } as ChatSession) : item,
      );
      setChatSessions(updated);
    }
  };

  return (
    <>
      <div className="left-part p-0 w-full h-full flex flex-col">
        <div className="flex justify-center items-center p-6">
          <FullLogo />
        </div>
        <hr className="border-border" />
        <div className="p-6">
          {/* Search Input */}
          <div className="relative">
            <Icon
              icon="solar:magnifer-line-duotone"
              width={18}
              height={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="search"
              placeholder="Search Chat"
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </div>
        {/* Listing */}
        <SimpleBar className="flex-1 min-h-0">
          {unifiedChats.length === 0 ? (
            <div className="text-center text-sm text-gray-500 py-6">No chat history found.</div>
          ) : (
            unifiedChats.map((chat, index) => (
              <div key={chat.id} className="relative px-5 group">
                <div
                  className={`cursor-pointer py-4 px-4 gap-0 flex justify-between  rounded-xl group-hover:bg-lightprimary dark:group-hover:bg-lightprimary `}
                  onClick={(e) => {
                    e.stopPropagation();
                    setChatList([]);
                    sendMessage(chat.que, true);
                    setShowChatWindow(true);
                  }}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="group-hover:w-60 overflow-hidden">
                      <h5 className="text-base font-semibold mb-1 truncate">{chat?.que}</h5>
                      <p className="text-xs font-semibold truncate">{chat?.preview}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-5 right-6 invisible group-hover:visible">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghostprimary">
                        <Icon icon="solar:menu-dots-linear" width={20} height={20} />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" sideOffset={5}>
                      <DropdownMenuItem>
                        <Button
                          onClick={() => handleDelete(index)}
                          variant="lighterror"
                          className="flex gap-3"
                        >
                          <Icon icon="solar:trash-bin-minimalistic-linear" width={18} height={18} />
                          <span className="text-sm">Delete</span>
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </SimpleBar>

        <div className="p-6 flex items-center justify-center z-50">
          <Button className="w-full" onClick={handleNewChat}>
            New Chat
          </Button>
        </div>
      </div>
    </>
  );
};
export default ChatAiListing;
