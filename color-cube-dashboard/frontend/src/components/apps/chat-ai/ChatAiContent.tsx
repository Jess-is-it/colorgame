import SimpleBar from 'simplebar-react';
import { Icon } from '@iconify/react';
import { Button } from 'src/components/ui/button';

type Props = {
  onClickMobile: (event: React.MouseEvent<HTMLElement>) => void;
  setShowChatWindow: (show: boolean) => void;
  handleStartChat: (text: string) => void;
};
const ChatAiContent = ({ onClickMobile, handleStartChat }: Props) => {
  const promptList = [
    {
      icon: 'solar:code-2-linear',
      title: 'Write clean code snippets',
      desc: '💻 efficient and readable code',
      iconColor: 'bg-lightinfo text-info',
    },
    {
      icon: 'solar:mailbox-linear',
      title: 'Write a reply to this email',
      desc: '🖊️ professional response',
      iconColor: 'bg-lightwarning text-warning',
    },
    {
      icon: 'solar:bug-linear',
      title: 'Help me debug this code',
      desc: '⚡ fix bugs quickly',
      iconColor: 'bg-lighterror text-error',
    },
  ];

  return (
    <>
      <SimpleBar className="flex-1 min-h-0">
        <div className="p-5">
          <div className="flex flex-col gap-4">
            {/* hamburger */}
            <div className="lg:hidden flex">
              <Button variant={'lightprimary'} onClick={onClickMobile}>
                <Icon icon="solar:hamburger-menu-outline" height={18} />
              </Button>
            </div>
            {/* hamburger end */}
            <h2 className="font-bold text-4xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent w-fit leading-normal">
              Hey there!
            </h2>
            <p className="font-semibold text-link dark:text-darklink text-2xl">
              What would you like to explore today?
            </p>
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {promptList.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-6 border rounded-xl border-ld p-6 hover:cursor-pointer"
                    onClick={() => handleStartChat(item.title)}
                  >
                    <div className={`p-4 rounded-xl w-fit ${item.iconColor}`}>
                      <Icon icon={item.icon} width={24} height={24} />
                    </div>
                    <h6 className="text-base font-semibold">{item.title}</h6>
                    <p className="text-xs font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SimpleBar>
    </>
  );
};

export default ChatAiContent;
