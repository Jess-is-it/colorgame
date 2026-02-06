import React, { useState, useEffect, ChangeEvent, useContext } from 'react';
import { ContactContext } from 'src/context/conatact-context/index';
import { ContactType } from 'src/types/apps/contact';
import { CustomizerContext } from 'src/context/CustomizerContext';
import SimpleBar from 'simplebar-react';
import { Icon } from '@iconify/react';
import emailSv from 'src/assets/images/backgrounds/emailSv.png';
import { Button } from 'src/components/ui/button';
import { Label } from 'src/components/ui/label';
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from 'src/components/ui/tooltip';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from 'src/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from 'src/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from 'src/components/ui/dialog';
import { Input } from 'src/components/ui/input';
import { Sheet, SheetContent } from 'src/components/ui/sheet';

// Define the props interface
interface ContactListItemProps {
  openContactValue: boolean;
  onCloseContact: () => void;
}

const ContactListItem: React.FC<ContactListItemProps> = ({ openContactValue, onCloseContact }) => {
  const {
    selectedContact,
    deleteContact,
    updateContact,
    starredContacts,
    toggleStarred,
    openModal,
    setOpenModal,
  } = useContext(ContactContext);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<ContactType | null>(null);
  const [showAlert, setShowAlert] = useState(false); // State for showing alert
  const { activeDir } = useContext(CustomizerContext);

  useEffect(() => {
    setFormData(selectedContact);
  }, [selectedContact]);

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveClick = () => {
    if (formData) {
      updateContact(formData);
    }
    setIsEditMode(false);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData((prevData) => ({
        ...(prevData as ContactType),
        [name]: value,
      }));
    }
  };

  const handleDeleteClick = () => {
    if (selectedContact) {
      deleteContact(selectedContact.id);
      setOpenModal(true);
    }
  };

  const handleDepartmentChange = (value: string) => {
    if (formData) {
      setFormData((prevData) => ({
        ...(prevData as ContactType),
        department: value,
      }));
    }
  };

  if (!selectedContact) {
    return (
      <div className="w-full text-center p-5">
        <div className="px-6 pt-3">
          <Alert variant="lighterror">
            <Icon icon="tabler:info-circle" height={18} color="red" />
            <AlertTitle className="pl-2 text-left text-error">Please Select a Contact</AlertTitle>
          </Alert>
        </div>
        <h4></h4>
        <img src={emailSv} alt="Email Icon" width="250" height="250" className="mx-auto" />
      </div>
    );
  }

  return (
    <>
      <Sheet open={openContactValue} onOpenChange={onCloseContact}>
        <SheetContent
          side={`${activeDir === 'rtl' ? 'left' : 'right'}`}
          className="w-full lg:relative lg:translate-none lg:h-auto lg:bg-transparent lg:z-[0]"
        >
          <div className="lg:hidden block p-6 pb-2">
            <Button variant={'outline'} onClick={onCloseContact} className="py-0">
              <Icon icon="solar:round-arrow-left-linear" height={18} className="me-2"></Icon>Back
            </Button>
          </div>

          <div className="w-full">
            <div className="flex justify-between items-center py-4 px-5">
              <h5 className="card-title">Contact Details</h5>
              <TooltipProvider>
                <div className="ms-auto flex gap-1 items-center">
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        className="btn-circle-hover cursor-pointer"
                        onClick={() => toggleStarred(selectedContact.id)}
                      >
                        {starredContacts.includes(selectedContact.id) ? (
                          <Icon icon="tabler:star-filled" className="text-warning" height="18" />
                        ) : (
                          <Icon icon="tabler:star" height="18" />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>important</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        onClick={isEditMode ? handleSaveClick : handleEditClick}
                        className="btn-circle-hover cursor-pointer"
                      >
                        {isEditMode ? (
                          <Icon icon="tabler:brand-appgallery" height="18" />
                        ) : (
                          <Icon icon="tabler:edit" height="18" />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>{!isEditMode ? 'Edit' : 'Save'}</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        onClick={() => setOpenModal(true)}
                        className="btn-circle-hover cursor-pointer"
                      >
                        <Icon icon="tabler:trash" height="18" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>Delete</TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>

            <hr className="border-border" />

            <SimpleBar className="max-h-[600px] h-[calc(100vh_-_100px)]">
              <div className="py-5 ">
                {isEditMode && formData ? (
                  <div className="pt-1 px-5">
                    {[
                      {
                        id: 1,
                        title: 'First Name',
                        value: formData.firstname,
                        name: 'firstname',
                      },
                      {
                        id: 2,
                        title: 'Last Name',
                        value: formData.lastname,
                        name: 'lastname',
                      },
                      {
                        id: 3,
                        title: 'Company',
                        value: formData.company,
                        name: 'company',
                      },
                      {
                        id: 4,
                        title: 'Department',
                        value: formData.department,
                        name: 'department',
                      },
                      {
                        id: 5,
                        title: 'Email',
                        value: formData.email,
                        name: 'email',
                      },
                      {
                        id: 6,
                        title: 'Phone',
                        value: formData.phone,
                        name: 'phone',
                      },
                      {
                        id: 7,
                        title: 'Address',
                        value: formData.address,
                        name: 'address',
                      },
                      {
                        id: 8,
                        title: 'Notes',
                        value: formData.notes,
                        name: 'notes',
                      },
                    ].map((data) => (
                      <div key={data.id} className="flex flex-col gap-5">
                        <div>
                          <Label className="font-semibold block mb-2">{data.title}</Label>
                          {data.name !== 'department' && (
                            <Input
                              type="text"
                              className="form-control"
                              name={data.name}
                              value={data.value}
                              onChange={handleInputChange}
                            />
                          )}

                          {data.name === 'department' && (
                            <>
                              <div className="mb-2 block">
                                <Label htmlFor="department" />
                              </div>

                              <Select
                                value={formData.department || ''}
                                onValueChange={handleDepartmentChange}
                                required
                              >
                                <SelectTrigger className="select-md-contact">
                                  <SelectValue placeholder="Select a department" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Sales">Sales</SelectItem>
                                  <SelectItem value="Engineering">Engineering</SelectItem>
                                  <SelectItem value="HR">HR</SelectItem>
                                </SelectContent>
                              </Select>
                            </>
                          )}
                        </div>
                        <div></div>
                      </div>
                    ))}
                    <div className="mt-2">
                      <Button color="primary" className="rounded-md" onClick={handleSaveClick}>
                        Save Contact
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="p-5">
                      <div className="flex gap-3 items-center">
                        <img
                          alt={`${selectedContact.firstname} ${selectedContact.lastname}`}
                          src={selectedContact.image}
                          height={70}
                          width={70}
                          className="rounded-full"
                        />
                        <div>
                          <h6 className="text-base">
                            {selectedContact.firstname} {selectedContact.lastname}
                          </h6>
                          <p className="text-darklink text-sm">{selectedContact.department}</p>
                          <p className="text-darklink text-sm">{selectedContact.company}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-5 mt-8">
                        <div className="col-span-4">
                          <p className="text-darklink text-sm">Phone Number</p>
                          <h5 className="font-semibold mb-0.5">{selectedContact.phone}</h5>
                        </div>
                        <div className="col-span-8">
                          <p className="text-darklink text-sm">Email address</p>
                          <h5 className="font-semibold mb-0.5">{selectedContact.email}</h5>
                        </div>
                        <div className="col-span-12">
                          <p className="text-darklink text-sm">Address</p>
                          <h5 className="font-semibold mb-0.5">{selectedContact.address}</h5>
                        </div>
                        <div className="col-span-4">
                          <p className="text-darklink text-sm">Department</p>
                          <h5 className="font-semibold mb-0.5">{selectedContact.department}</h5>
                        </div>
                        <div className="col-span-8">
                          <p className="text-darklink text-sm">Company</p>
                          <h5 className="font-semibold mb-0.5">{selectedContact.company}</h5>
                        </div>
                        <div className="col-span-12">
                          <p className="text-darklink text-sm mb-1">Notes</p>
                          <h5 className="font-medium mb-0.5">{selectedContact.notes}</h5>
                        </div>
                      </div>
                    </div>
                    <hr className="border-border my-2" />
                    <div className="py-4 px-5 gap-2 flex">
                      <Button className="rounded-md" onClick={handleEditClick}>
                        Edit
                      </Button>
                      <Button
                        variant={'lighterror'}
                        className="rounded-md"
                        onClick={() => {
                          setOpenModal(true);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </SimpleBar>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full lg:block hidden">
        <div className="flex justify-between items-center py-4 px-5">
          <h5 className="card-title">Contact Details</h5>
          <TooltipProvider>
            <div className="ms-auto flex gap-1 items-center">
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="btn-circle-hover cursor-pointer"
                    onClick={() => toggleStarred(selectedContact.id)}
                  >
                    {starredContacts.includes(selectedContact.id) ? (
                      <Icon icon="tabler:star-filled" className="text-warning" height="18" />
                    ) : (
                      <Icon icon="tabler:star" height="18" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>important</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    onClick={isEditMode ? handleSaveClick : handleEditClick}
                    className="btn-circle-hover cursor-pointer"
                  >
                    {isEditMode ? (
                      <Icon icon="tabler:brand-appgallery" height="18" />
                    ) : (
                      <Icon icon="tabler:edit" height="18" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>{!isEditMode ? 'Edit' : 'Save'}</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    onClick={() => setOpenModal(true)}
                    className="btn-circle-hover cursor-pointer"
                  >
                    <Icon icon="tabler:trash" height="18" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>

        <hr className="border-border" />

        <SimpleBar className="max-h-[600px] h-[calc(100vh_-_100px)]">
          <div className="py-5 ">
            {isEditMode && formData ? (
              <div className="pt-1 px-5">
                {[
                  {
                    id: 1,
                    title: 'First Name',
                    value: formData.firstname,
                    name: 'firstname',
                  },
                  {
                    id: 2,
                    title: 'Last Name',
                    value: formData.lastname,
                    name: 'lastname',
                  },
                  {
                    id: 3,
                    title: 'Company',
                    value: formData.company,
                    name: 'company',
                  },
                  {
                    id: 4,
                    title: 'Department',
                    value: formData.department,
                    name: 'department',
                  },
                  {
                    id: 5,
                    title: 'Email',
                    value: formData.email,
                    name: 'email',
                  },
                  {
                    id: 6,
                    title: 'Phone',
                    value: formData.phone,
                    name: 'phone',
                  },
                  {
                    id: 7,
                    title: 'Address',
                    value: formData.address,
                    name: 'address',
                  },
                  {
                    id: 8,
                    title: 'Notes',
                    value: formData.notes,
                    name: 'notes',
                  },
                ].map((data) => (
                  <div key={data.id} className="flex flex-col gap-5">
                    <div>
                      <Label className="font-semibold block mb-2">{data.title}</Label>
                      {data.name !== 'department' && (
                        <Input
                          type="text"
                          className="form-control"
                          name={data.name}
                          value={data.value}
                          onChange={handleInputChange}
                        />
                      )}

                      {data.name === 'department' && (
                        <>
                          <div className="mb-2 block">
                            <Label htmlFor="department" />
                          </div>
                          <Select
                            value={formData.department}
                            onValueChange={handleDepartmentChange}
                            required
                          >
                            <SelectTrigger className="select-md-contact" id="countries">
                              <SelectValue placeholder="Select a department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Sales">Sales</SelectItem>
                              <SelectItem value="Engineering">Engineering</SelectItem>
                              <SelectItem value="HR">HR</SelectItem>
                            </SelectContent>
                          </Select>
                        </>
                      )}
                    </div>
                    <div></div>
                  </div>
                ))}
                <div className="mt-2">
                  <Button color="primary" className="rounded-md" onClick={handleSaveClick}>
                    Save Contact
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="p-5">
                  <div className="flex gap-3 items-center">
                    <img
                      alt={`${selectedContact.firstname} ${selectedContact.lastname}`}
                      src={selectedContact.image}
                      height={70}
                      width={70}
                      className="rounded-full"
                    />
                    <div>
                      <h6 className="text-base">
                        {selectedContact.firstname} {selectedContact.lastname}
                      </h6>
                      <p className="text-darklink text-sm">{selectedContact.department}</p>
                      <p className="text-darklink text-sm">{selectedContact.company}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-5 mt-8">
                    <div className="col-span-4">
                      <p className="text-darklink text-sm">Phone Number</p>
                      <h5 className="font-semibold mb-0.5">{selectedContact.phone}</h5>
                    </div>
                    <div className="col-span-8">
                      <p className="text-darklink text-sm">Email address</p>
                      <h5 className="font-semibold mb-0.5">{selectedContact.email}</h5>
                    </div>
                    <div className="col-span-12">
                      <p className="text-darklink text-sm">Address</p>
                      <h5 className="font-semibold mb-0.5">{selectedContact.address}</h5>
                    </div>
                    <div className="col-span-4">
                      <p className="text-darklink text-sm">Department</p>
                      <h5 className="font-semibold mb-0.5">{selectedContact.department}</h5>
                    </div>
                    <div className="col-span-8">
                      <p className="text-darklink text-sm">Company</p>
                      <h5 className="font-semibold mb-0.5">{selectedContact.company}</h5>
                    </div>
                    <div className="col-span-12">
                      <p className="text-darklink text-sm mb-1">Notes</p>
                      <h5 className="font-medium mb-0.5">{selectedContact.notes}</h5>
                    </div>
                  </div>
                </div>
                <hr className="border-border my-2" />
                <div className="py-4 px-5 gap-2 flex">
                  <Button className="rounded-md" onClick={handleEditClick}>
                    Edit
                  </Button>
                  <Button
                    variant={'lighterror'}
                    className="rounded-md"
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        </SimpleBar>
      </div>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              <Icon icon="tabler:info-circle" className="mx-auto mb-4 h-14 w-14 text-error" />
              Are you sure you want to delete this contact?
            </DialogTitle>
            <DialogDescription className="text-center text-gray-500 dark:text-gray-400">
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-center gap-4 pt-4">
            <Button
              className="rounded-md"
              onClick={() => {
                handleDeleteClick();
                setOpenModal(false);
              }}
            >
              Yes
            </Button>
            <Button variant="error" className="rounded-md" onClick={() => setOpenModal(false)}>
              No, cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {showAlert && (
        <Alert className="fixed mx-auto start-0 end-0 top-3 w-fit z-50 bg-green-500 text-white rounded-md shadow-md flex items-center gap-2 px-4 py-2">
          <AlertDescription className="font-medium">
            <div className="flex items-center gap-2">
              <Icon icon="tabler:square-rounded-check" height={22} />
              Contact updated successfully.
            </div>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default ContactListItem;
