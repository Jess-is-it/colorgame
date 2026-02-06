import React, { useState, useContext } from 'react';
import { EmailContext } from 'src/context/email-context/index';
import SimpleBar from 'simplebar-react';
import { Icon } from '@iconify/react';
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from 'src/components/ui/tooltip';
import { Alert, AlertDescription } from 'src/components/ui/alert';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { Textarea } from 'src/components/ui/textarea';
import { Sheet, SheetContent, SheetTitle } from 'src/components/ui/sheet';
import emailbg from 'src/assets/images/backgrounds/emailSv.png';
import { CustomizerContext } from 'src/context/CustomizerContext';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

// Define the props interface
interface MailListItemProps {
  openMailValue: boolean;
  onCloseMail: () => void;
}

const EmailContent: React.FC<MailListItemProps> = ({ openMailValue, onCloseMail }) => {
  const [isTextboxVisible, setIsTextboxVisible] = useState(false);
  const { selectedEmail, deleteEmail, toggleStar, toggleImportant } = useContext(EmailContext);
  const { activeDir } = useContext(CustomizerContext);

  const handleButtonClick = () => {
    setIsTextboxVisible(!isTextboxVisible);
  };

  const handleDelete = () => {
    if (selectedEmail) {
      deleteEmail(selectedEmail.id);
    }
  };

  if (!selectedEmail) {
    return (
      <div className="w-full text-center p-5">
        <div className="px-6 pt-3 ">
          <Alert variant="lighterror">
            <Icon icon="tabler:info-circle" width={18} height={18} className="text-error!" />
            <AlertDescription className="ps-2 text-base text-left">
              Please Select an Email
            </AlertDescription>
          </Alert>
        </div>
        <img src={emailbg} alt="Email Icon" width="250" height="250" className="mx-auto" />
      </div>
    );
  }

  const hasAttachments = selectedEmail.attchments && selectedEmail.attchments.length > 0;

  return (
    <>
      <Sheet open={openMailValue} onOpenChange={onCloseMail}>
        <SheetContent
          side={`${activeDir === 'rtl' ? 'left' : 'right'}`}
          className="w-full lg:relative lg:translate-none lg:h-auto lg:bg-transparent lg:z-0"
        >
          <VisuallyHidden>
            <SheetTitle>title</SheetTitle>
          </VisuallyHidden>
          {/* Mobile Back Button */}
          <div className="lg:hidden block p-6">
            <Button variant={'outline'} onClick={onCloseMail} className="py-0">
              <Icon icon="solar:round-arrow-left-linear" height={18} /> Back
            </Button>
          </div>

          <div className="w-full">
            {/* Star / Important / Delete Buttons */}
            <div className="w-full border-y border-ld">
              <TooltipProvider>
                <div className="flex items-center gap-2 py-4 px-5">
                  {/* Star */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="btn-circle-hover cursor-pointer group"
                        onClick={() => toggleStar(selectedEmail.id)}
                      >
                        {selectedEmail.starred ? (
                          <Icon icon="solar:star-bold" className="text-warning" height="18" />
                        ) : (
                          <Icon
                            icon="solar:star-line-duotone"
                            height="17"
                            className="text-dark dark:text-bodytext group-hover:text-primary"
                          />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>Star</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="btn-circle-hover cursor-pointer group">
                        <Icon
                          icon="tabler:alert-circle"
                          className={`text-dark dark:text-darklink group-hover:text-primary ${
                            selectedEmail.important ? 'text-info dark:text-info' : ''
                          }`}
                          height={18}
                          onClick={() => toggleImportant(selectedEmail.id)}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>Important</TooltipContent>
                  </Tooltip>

                  {/* Delete */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="btn-circle-hover cursor-pointer group">
                        <Icon
                          icon="solar:trash-bin-minimalistic-outline"
                          className="text-dark dark:text-bodytext group-hover:text-primary"
                          height="18"
                          onClick={handleDelete}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>Delete</TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>

            {/* Main Email Content */}
            <SimpleBar className="h-[calc(100vh-200px)]">
              <div className="py-5 px-5">
                <div className="flex items-center w-full">
                  <div className="flex items-center gap-2 w-full">
                    <img
                      alt="user"
                      src={selectedEmail.thumbnail}
                      height={48}
                      width={48}
                      className="rounded-full"
                    />
                    <div>
                      <h6 className="text-sm">{selectedEmail.from}</h6>
                      <p className="text-darklink text-sm">{selectedEmail.To}</p>
                    </div>
                  </div>
                  <div>
                    <Badge
                      variant={
                        selectedEmail.label === 'Promotional'
                          ? 'primary'
                          : selectedEmail.label === 'Social'
                          ? 'error'
                          : selectedEmail.label === 'Health'
                          ? 'success'
                          : 'primary'
                      }
                      className="rounded-md"
                    >
                      {selectedEmail.label}
                    </Badge>
                  </div>
                </div>

                <div className="mt-8">
                  <h5 className="text-xl">{selectedEmail.subject}</h5>
                  <div
                    className="email-content"
                    dangerouslySetInnerHTML={{
                      __html: selectedEmail.emailContent,
                    }}
                  ></div>

                  {/* Attachments */}
                  {hasAttachments && (
                    <>
                      <hr className="border-border my-6" />
                      <h6 className="text-sm">Attachments</h6>
                      <div className="grid grid-cols-12 gap-6 mt-4">
                        {selectedEmail.attchments?.map((attach) => (
                          <div className="lg:col-span-4 md:col-span-6 col-span-12" key={attach.id}>
                            <div className="flex items-center gap-3 group cursor-pointer">
                              <div className="bg-lightgray dark:bg-lightprimary p-3 rounded-md">
                                <img src={attach.image} height={24} width={24} alt="download" />
                              </div>
                              <div>
                                <h5 className="text-sm group-hover:text-primary">{attach.title}</h5>
                                <p className="text-sm text-ld">{attach.fileSize}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <hr className="border-border my-6" />
                    </>
                  )}
                </div>
              </div>

              {/* Reply / Forward */}
              <div className="px-5">
                <div className="flex gap-6">
                  <span
                    className="cursor-pointer text-sm hover:text-primary text-ld text-bodytext dark:text-darklink flex items-center"
                    onClick={handleButtonClick}
                  >
                    <Icon icon="solar:undo-left-outline" height={18} className="me-1" />
                    Reply
                  </span>
                  <span className="cursor-pointer hover:text-primary text-sm text-ld text-bodytext flex items-center">
                    <Icon icon="solar:undo-right-outline" height={18} className="me-1" />
                    Forward
                  </span>
                </div>
                {isTextboxVisible && (
                  <Textarea className="form-control-textarea mt-4" required rows={4} />
                )}
              </div>
            </SimpleBar>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full lg:block hidden">
        {/* Star / Important / Delete Buttons */}
        <div className="w-full border-b border-ld">
          <TooltipProvider>
            <div className="flex items-center gap-2 py-4 px-5">
              {/* Star */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="btn-circle-hover cursor-pointer group"
                    onClick={() => toggleStar(selectedEmail.id)}
                  >
                    {selectedEmail.starred ? (
                      <Icon icon="tabler:star-filled" className="text-warning" height={18} />
                    ) : (
                      <Icon
                        icon="tabler:star"
                        height={17}
                        className="text-dark dark:text-darklink group-hover:text-primary"
                      />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>Star</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="btn-circle-hover cursor-pointer group">
                    <Icon
                      icon="tabler:alert-circle"
                      className={`text-dark dark:text-darklink group-hover:text-primary ${
                        selectedEmail.important ? 'text-info dark:text-info' : ''
                      }`}
                      height={18}
                      onClick={() => toggleImportant(selectedEmail.id)}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>Important</TooltipContent>
              </Tooltip>

              {/* Delete */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="btn-circle-hover cursor-pointer group">
                    <Icon
                      icon="tabler:trash"
                      className="text-dark dark:text-darklink group-hover:text-primary"
                      height={18}
                      onClick={handleDelete}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>

        {/* Main Email Content */}
        <SimpleBar className="h-[520px]">
          <div className="p-5">
            <div className="flex flex-col gap-5">
              <div className="flex items-center w-full">
                <div className="flex items-center gap-2 w-full">
                  <img
                    alt="user"
                    src={selectedEmail.thumbnail}
                    height={48}
                    width={48}
                    className="rounded-full"
                  />
                  <div>
                    <h6 className="text-sm">{selectedEmail.from}</h6>
                    <p className="text-link text-sm">{selectedEmail.To}</p>
                  </div>
                </div>
                <div>
                  <Badge
                    variant={
                      selectedEmail.label === 'Promotional'
                        ? 'primary'
                        : selectedEmail.label === 'Social'
                        ? 'error'
                        : selectedEmail.label === 'Health'
                        ? 'success'
                        : 'primary'
                    }
                    className="rounded-md"
                  >
                    {selectedEmail.label}
                  </Badge>
                </div>
              </div>

              <div>
                <h5 className="text-xl">{selectedEmail.subject}</h5>
                <div
                  className="email-content"
                  dangerouslySetInnerHTML={{ __html: selectedEmail.emailContent }}
                ></div>

                {/* Attachments */}
                {hasAttachments && (
                  <>
                    <hr className="border-border my-6" />
                    <h6 className="text-sm">Attachments</h6>
                    <div className="grid grid-cols-12 gap-6 mt-4">
                      {selectedEmail.attchments?.map((attach) => (
                        <div className="lg:col-span-4 md:col-span-6 col-span-12" key={attach.id}>
                          <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="bg-lightgray dark:bg-lightprimary p-3 rounded-md">
                              <img src={attach.image} height={24} width={24} alt="download" />
                            </div>
                            <div>
                              <h5 className="text-sm group-hover:text-primary">{attach.title}</h5>
                              <p className="text-sm text-darklink">{attach.fileSize}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <hr className="border-border my-6" />
                  </>
                )}
              </div>
            </div>

            {/* Reply / Forward */}
            <div>
              <div className="flex gap-6">
                <span
                  className="cursor-pointer text-sm hover:text-primary text-ld text-bodytext dark:text-darklink flex items-center"
                  onClick={handleButtonClick}
                >
                  <Icon icon="tabler:arrow-back-up" height={18} className="me-1" />
                  Reply
                </span>
                <span className="cursor-pointer hover:text-primary text-sm text-ld text-bodytext dark:text-darklink flex items-center">
                  <Icon icon="tabler:arrow-forward-up" height={18} className="me-1" />
                  Forward
                </span>
              </div>
              {isTextboxVisible && (
                <Textarea className="form-control-textarea mt-4" required rows={4} />
              )}
            </div>
          </div>
        </SimpleBar>
      </div>
    </>
  );
};

export default EmailContent;
