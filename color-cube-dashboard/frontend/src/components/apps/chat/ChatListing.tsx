import React from 'react';
import { useContext } from 'react';
import { ChatsType } from 'src/types/apps/chat';
import { ChatContext } from 'src/context/chat-context';
import SimpleBar from 'simplebar-react';
import { last } from 'lodash';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { Icon } from '@iconify/react';
import { formatDistanceToNowStrict } from 'date-fns';
import profileImg from '/src/assets/images/profile/user-1.jpg';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from 'src/components/ui/dropdown-menu';
import { Badge } from 'src/components/ui/badge';
import { Input } from 'src/components/ui/input';

const ChatListing = () => {
  const DropdownAction = [
    {
      icon: 'solar:settings-outline',
      listtitle: 'Setting',
      divider: true,
    },
    {
      icon: 'solar:question-circle-outline',
      listtitle: 'Helpand feedback',
      divider: false,
    },
    {
      icon: 'solar:align-horizonta-spacing-line-duotone',
      listtitle: 'Enable split View mode',
      divider: false,
    },
    {
      icon: 'solar:keyboard-outline',
      listtitle: 'Keyboard shortcut',
      divider: true,
    },
    {
      icon: 'solar:logout-2-outline',
      listtitle: 'Sign Out',
      divider: false,
    },
  ];
  const lastActivity = (chat: ChatsType) => last(chat.messages)?.createdAt;

  const getDetails = (conversation: ChatsType) => {
    let displayText = '';

    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (lastMessage) {
      const sender = lastMessage.senderId === conversation.id ? 'You: ' : '';
      const message = lastMessage.type === 'image' ? 'Sent a photo' : lastMessage.msg;
      displayText = `${sender}${message}`;
    }

    return displayText;
  };
  const { chatData, chatSearch, setChatSearch, setSelectedChat, setActiveChatId, activeChatId } =
    useContext(ChatContext);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatSearch(event.target.value);
  };

  const filteredChats = chatData.filter((chat) =>
    chat.name.toLowerCase().includes(chatSearch.toLowerCase()),
  );

  const handleChatSelect = (chat: ChatsType) => {
    const chatId = typeof chat.id === 'string' ? parseInt(chat.id, 10) : chat.id;
    setSelectedChat(chat);
    setActiveChatId(chatId);
  };

  return (
    <>
      <div className="left-part w-full flex flex-col h-full overflow-hidden px-0 ">
        <div>
          <div className="flex justify-between items-center px-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={profileImg} height={56} width={56} alt="user" className="rounded-full" />
                <Badge variant={'success'} className="p-0 h-2 w-2 absolute bottom-1 end-0" />
              </div>

              <div>
                <h5 className="text-sm mb-1">Mathew Anderson</h5>
                <p className="text-darklink dark:text-bodytext text-xs">Designer</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                  <HiOutlineDotsVertical size={22} />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {DropdownAction.map((item, index) => (
                  <React.Fragment key={index}>
                    <DropdownMenuItem className="flex items-center gap-3 cursor-pointer">
                      <Icon icon={item.icon} height={18} />
                      <span>{item.listtitle}</span>
                    </DropdownMenuItem>
                    {item.divider && <DropdownMenuSeparator />}
                  </React.Fragment>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="px-6">
            {/* Search box  */}
            <div className="flex gap-3 py-5 items-center ">
              <div className="relative w-full">
                <Icon
                  icon="solar:magnifer-line-duotone"
                  height={18}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <Input
                  type="text"
                  className="pl-8"
                  onChange={handleSearchChange}
                  placeholder="Search"
                />
              </div>
            </div>

            {/* Sorting */}
            <div className="sorting mb-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 cursor-pointer text-sm font-medium text-dark hover:text-primary dark:text-white">
                    Recent Chats
                    <Icon icon="ci:chevron-down" width={16} height={16} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem>Sort by Time</DropdownMenuItem>
                  <DropdownMenuItem>Sort by Unread</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sort by Favourites</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Listing */}
        <div>
          <SimpleBar className="lg:h-[calc(100vh_-_520px)] h-[calc(100vh_-_200px)]">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`cursor-pointer py-4 px-6 gap-0 flex justify-between group bg-hover ${
                  activeChatId === chat.id ? 'bg-lightprimary dark:bg-lightprimary' : 'initial'
                }`}
                onClick={() => handleChatSelect(chat)}
              >
                <div className="flex items-center gap-3 max-w-[235px] w-full">
                  <div className="relative min-w-12">
                    <img
                      src={chat.thumb}
                      height={48}
                      width={48}
                      alt="user"
                      className="rounded-full"
                    />
                    <Badge
                      variant={
                        chat.status === 'online'
                          ? 'success'
                          : chat.status === 'busy'
                          ? 'error'
                          : chat.status === 'away'
                          ? 'warning'
                          : 'primary'
                      }
                      className="p-0 h-2 w-2 absolute bottom-1 end-0"
                    />
                  </div>
                  <div>
                    <h5 className="text-sm mb-1">{chat.name}</h5>
                    <div className="text-sm text-ld opacity-90 line-clamp-1">
                      {getDetails(chat)}
                    </div>
                  </div>
                </div>
                <div className="text-xs pt-1">
                  {lastActivity(chat)
                    ? formatDistanceToNowStrict(new Date(lastActivity(chat)!), {
                        addSuffix: false,
                      })
                    : null}
                </div>
              </div>
            ))}
          </SimpleBar>
        </div>
      </div>
    </>
  );
};
export default ChatListing;
