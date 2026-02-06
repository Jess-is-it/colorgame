import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { ContactContext } from 'src/context/conatact-context/index';
import { ContactType } from 'src/types/apps/contact';
import SimpleBar from 'simplebar-react';
import { Icon } from '@iconify/react';
import { Alert, AlertTitle } from 'src/components/ui/alert';
import { Button } from 'src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from 'src/components/ui/dialog';
import AnimatedItem from 'src/components/animated-component/ListAnimation';

type ContactListProps = {
  openContact: Dispatch<SetStateAction<boolean>>; // or specify the exact type of the function
};

function ContactList({ openContact }: ContactListProps) {
  const {
    selectedDepartment,
    contacts,
    deleteContact,
    starredContacts,
    toggleStarred,
    setSelectedContact,
    selectedContact,
    searchTerm,
  } = useContext(ContactContext);

  // Handle click on delete contact
  const handleDeleteClick = (contactId: number) => {
    deleteContact(contactId);
  };
  const [openContactModal, setOpenContactModal] = useState(false);
  const [contactId, setContactId] = useState<any>(null);

  // Filter contacts based on selected department and search query
  const filterContacts = (
    contacts: ContactType[],
    selectedDepartment: string,
    search: string,
  ): ContactType[] => {
    let filteredContacts = [...contacts];

    if (selectedDepartment !== 'All') {
      if (selectedDepartment === 'Frequent') {
        filteredContacts = filteredContacts.filter((contact) => contact.frequentlycontacted);
      } else if (selectedDepartment === 'Starred') {
        filteredContacts = filteredContacts.filter((contact) =>
          starredContacts.includes(contact.id),
        );
      } else {
        filteredContacts = filteredContacts.filter(
          (contact) => contact.department === selectedDepartment,
        );
      }
    }

    if (searchTerm.trim() !== '') {
      const searchTermLower = search.toLowerCase();
      filteredContacts = filteredContacts.filter(
        (contact) =>
          contact.firstname.toLowerCase().includes(searchTermLower) ||
          contact.lastname.toLowerCase().includes(searchTermLower),
      );
    }

    return filteredContacts;
  };

  // Get filtered contacts based on selected department and search query
  const filteredContacts = filterContacts(contacts, selectedDepartment, searchTerm);

  // Handle click on a contact to view details
  const handleContactClick = (contact: ContactType) => {
    setSelectedContact(contact);
  };
  return (
    <>
      <SimpleBar className="max-h-[600px] h-[calc(100vh_-_100px)]">
        <div className="border-right border-color-divider  h-full w-full ">
          {selectedDepartment === 'Starred' && filteredContacts.length === 0 ? (
            <div className="px-6 pt-3">
              <Alert variant="lighterror">
                <Icon icon="tabler:alert-circle" height={18} color="red" />
                <AlertTitle className="ml-2 text-error">No starred contacts available.</AlertTitle>
              </Alert>
            </div>
          ) : searchTerm !== '' && filteredContacts.length === 0 ? (
            <div className="px-6 pt-3">
              <Alert variant="lighterror">
                <Icon icon="tabler:alert-circle" height={18} color="red" />
                <AlertTitle className="ml-2 text-error">No contact found.</AlertTitle>
              </Alert>
            </div>
          ) : (
            <div>
              {filteredContacts.map((contact, index) => (
                <AnimatedItem key={contact.id} index={index}>
                  <div
                    key={contact.id}
                    className={`cursor-pointer flex py-4 px-6 gap-3 items-center group bg-hover  mb-0.5 ${
                      selectedContact && selectedContact.id === contact.id
                        ? 'bg-lightprimary'
                        : 'bg-transparent'
                    }`}
                    onClick={() => {
                      handleContactClick(contact);
                      if (window.innerWidth < 1024) {
                        openContact(true);
                      }
                    }}
                  >
                    <img
                      src={contact.image}
                      width={40}
                      height={40}
                      alt="name"
                      className="rounded-full"
                    />
                    <div>
                      <h6
                        className={`text-sm ${
                          selectedContact && selectedContact.id === contact.id
                            ? 'text-primary'
                            : 'group-hover:text-primary'
                        }`}
                      >
                        {contact.firstname} {contact.lastname}
                      </h6>
                      <p className="text-xs text-bodytext dark:text-darklink font-medium mt-0.5">
                        {contact.department}
                      </p>
                    </div>

                    <div className="flex ms-auto">
                      <div className="me-2" onClick={() => toggleStarred(contact.id)}>
                        {starredContacts.includes(contact.id) ? (
                          <Icon
                            icon="tabler:star-filled"
                            className="text-warning"
                            height="15"
                            fill="rgb(255, 193, 7)"
                          />
                        ) : (
                          <Icon icon="tabler:star" height="15" />
                        )}
                      </div>
                      <div
                        onClick={() => {
                          {
                            setContactId(contact.id);
                            setOpenContactModal(true);
                          }
                        }}
                      >
                        <Icon icon="tabler:trash" height={15} className="hover:text-error" />
                      </div>
                    </div>
                  </div>
                </AnimatedItem>
              ))}
            </div>
          )}
        </div>
      </SimpleBar>
      <Dialog open={openContactModal} onOpenChange={setOpenContactModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex flex-col items-center justify-center text-center py-4">
              <Icon icon="tabler:alert-circle" className="mx-auto mb-4 h-14 w-14 text-error" />
            </div>
            <DialogTitle className="text-center">
              Are you sure you want to delete this contact?
            </DialogTitle>
          </DialogHeader>

          <DialogFooter className="flex justify-center gap-4">
            <Button
              className="rounded-md"
              onClick={() => {
                handleDeleteClick(contactId);
                setOpenContactModal(false);
              }}
            >
              Yes
            </Button>
            <Button
              variant="error"
              className="rounded-md"
              onClick={() => setOpenContactModal(false)}
            >
              No, cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ContactList;
