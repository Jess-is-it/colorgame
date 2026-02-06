import { useState } from 'react';
import { ChatProvider } from 'src/context/chat-context';
import ChatListing from './ChatListing';
import ChatContent from './ChatContent';
import ChatMsgSent from './ChatMsgSent';
import { Card } from 'src/components/ui/card';
import { Sheet, SheetContent } from 'src/components/ui/sheet';

const ChatsApp = () => {
  const [isOpenChat, setIsOpenChat] = useState(false);
  // const handleClose = () => setIsOpenChat(false);
  return (
    <>
      <ChatProvider>
        <Card className="p-0 h-full">
          <div className="flex h-[calc(100vh-300px)]">
            {/* ------------------------------------------- */}
            {/* Left Part */}
            {/* ------------------------------------------- */}
            <Sheet open={isOpenChat} onOpenChange={(open) => setIsOpenChat(open)}>
              <SheetContent
                side="left"
                className="max-w-[300px] sm:max-w-[350px] w-full h-full lg:z-0 lg:hidden block"
              >
                <ChatListing />
              </SheetContent>
            </Sheet>
            <div className="max-w-[300px] sm:max-w-[350px] w-full h-full lg:block hidden">
              <ChatListing />
            </div>
            {/* ------------------------------------------- */}
            {/* Right part */}
            {/* ------------------------------------------- */}
            <div className="grow w-[70%] flex flex-col h-full">
              <div className="flex-1 min-h-0 overflow-hidden">
                <ChatContent onClickMobile={() => setIsOpenChat(true)} />
              </div>
              <div className="shrink-0">
                <div className="h-px bg-gray-200 dark:bg-gray-700 my-0" />
                <ChatMsgSent />
              </div>
            </div>
          </div>
        </Card>
      </ChatProvider>
    </>
  );
};

export default ChatsApp;
