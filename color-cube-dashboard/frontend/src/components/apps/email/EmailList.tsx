import { EmailContext } from 'src/context/email-context/index';
import { formatDistanceToNowStrict } from 'date-fns';
import SimpleBar from 'simplebar-react';
import { Icon } from '@iconify/react';
import { Badge } from 'src/components/ui/badge';
import { Checkbox } from 'src/components/ui/checkbox';
import AnimatedItem from 'src/components/animated-component/ListAnimation';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { EmailType } from 'src/types/apps/email';

type MailListProps = {
  openMail: Dispatch<SetStateAction<boolean>>;
};

const EmailList = ({ openMail }: MailListProps) => {
  const {
    emails,
    selectedEmail,
    setSelectedEmailId,
    deleteEmail,
    filter,
    toggleStar,
    toggleImportant,
    searchQuery,
  } = useContext(EmailContext);

  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});

  const handleCheckboxChange = (emailId: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [emailId]: !prev[emailId],
    }));
  };

  const handleDelete = (emailId: number) => {
    deleteEmail(emailId);
  };

  const filteredEmails = searchQuery
    ? emails.filter((e) => e.from.toLowerCase().includes(searchQuery.toLowerCase()))
    : emails.filter((email) => {
        if (filter === 'starred') return email.starred;
        if (['Promotional', 'Social', 'Health'].includes(filter)) {
          return email.label === filter;
        }
        return (email as Record<string, any>)[filter];
      });

  const handleSelectEmail = (email: EmailType) => {
    setSelectedEmailId(email.id);
    setCheckedItems({});
    if (window.innerWidth < 1024) openMail(true);
  };

  const selectedId = selectedEmail?.id ?? null;

  return (
    <SimpleBar className="h-[520px]">
      <div
        className="h-full w-full
 "
      >
        {filteredEmails.map((email, index) => (
          <div
            key={email.id}
            className={`cursor-pointer py-4 px-6 gap-3 items-center group bg-hover border-b border-ld ${
              selectedId === email.id ? 'bg-lightprimary' : ''
            }`}
          >
            <AnimatedItem index={index}>
              <div className="flex gap-3" onClick={() => handleSelectEmail(email)}>
                <Checkbox
                  checked={checkedItems[email.id]}
                  onCheckedChange={() => handleCheckboxChange(email.id)}
                />

                <div className="w-full">
                  <div className="flex justify-between">
                    <h6
                      className={`text-sm ${
                        selectedId === email.id ? 'text-primary' : 'group-hover:text-primary'
                      }`}
                    >
                      {email.from}
                    </h6>

                    {/* Badge */}
                    <Badge
                      variant={
                        email.label === 'Promotional'
                          ? 'primary'
                          : email.label === 'Social'
                          ? 'error'
                          : email.label === 'Health'
                          ? 'success'
                          : 'primary'
                      }
                      className="rounded-md"
                    >
                      {email.label}
                    </Badge>
                  </div>

                  <p className="text-sm line-clamp-1 mt-2 mb-3">{email.subject}</p>

                  <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                      {/* Star toggle */}
                      {email.starred ? (
                        <Icon
                          icon="tabler:star-filled"
                          height="16"
                          className="text-warning"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStar(email.id);
                          }}
                        />
                      ) : (
                        <Icon
                          icon="tabler:star"
                          height="16"
                          className="text-dark dark:text-darklink"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStar(email.id);
                          }}
                        />
                      )}

                      {/* Important toggle */}
                      <div className="btn-circle-hover cursor-pointer group">
                        <Icon
                          icon="tabler:alert-circle"
                          className={`text-dark dark:text-darklink group-hover:text-primary ${
                            email.important ? 'text-info dark:text-info' : ''
                          }`}
                          height={18}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleImportant(email.id);
                          }}
                        />
                      </div>

                      {/* Trash icon when checked */}
                      {checkedItems[email.id] && (
                        <Icon
                          icon="solar:trash-bin-minimalistic-outline"
                          height="17"
                          className="text-dark dark:text-darklink"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(email.id);
                          }}
                        />
                      )}
                    </div>

                    <p className="text-xs font-medium mt-0.5">
                      {formatDistanceToNowStrict(new Date(email.time))} ago
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedItem>
          </div>
        ))}
      </div>
    </SimpleBar>
  );
};

export default EmailList;
