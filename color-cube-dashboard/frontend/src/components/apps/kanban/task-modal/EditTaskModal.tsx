import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import { AllassignedTo, TaskProperties } from 'src/api/kanban/kanbandata';
import { Button } from 'src/components/ui/button';
import { Label } from 'src/components/ui/label';
import { Checkbox } from 'src/components/ui/checkbox';
import { Input } from 'src/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from 'src/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'src/components/ui/dropdown-menu';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from 'src/components/ui/select';

function EditTaskModal({ show, onHide, editedTask, onSave }: any) {
  const [tempEditedTask, setTempEditedTask] = useState(editedTask);
  const [newtaskImage, setNewtaskImage] = useState(editedTask?.taskImage || '');
  const [imagePreview, setImagePreview] = useState(editedTask?.taskImage || '');
  const [assignedUsers, setAssignedUsers] = useState(editedTask?.assignedTo || []);

  useEffect(() => {
    setTempEditedTask(editedTask);
    setNewtaskImage(editedTask?.taskImage || '');
    setImagePreview(editedTask?.taskImage || '');
    setAssignedUsers(editedTask?.assignedTo || []);
  }, [editedTask]);

  // Function to handle changes in the task input fields
  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setTempEditedTask({ ...tempEditedTask, [name]: value });
  };

  // Function to handle changes in the task property
  const handlePropertyChange = (property: string) => {
    setTempEditedTask({ ...tempEditedTask, priority: property });
  };
  // Function to handle saving the changes made to the task and hiding the modal
  const handleSaveChanges = () => {
    const updatedTask = {
      ...tempEditedTask,
      taskImage: newtaskImage,
      assignedTo: assignedUsers,
    };
    onSave(updatedTask);
    onHide();
  };

  // Function to handle new image URL input
  const handleNewtaskImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setNewtaskImage(url);
    setImagePreview(url);
  };
  return (
    <Dialog open={show} onOpenChange={onHide}>
      <DialogContent className="max-w-md">
        <DialogHeader className="pb-0">
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-12 gap-5 py-4">
          {/* Task Title */}
          <div className="col-span-12">
            <Label htmlFor="task" className="mb-2 block capitalize">
              Task
            </Label>
            <Input
              name="taskTitle"
              id="task"
              value={tempEditedTask.taskTitle}
              className="!form-control"
              onChange={handleChange}
            />
          </div>

          {/* Task Text or Image */}
          <div className="col-span-12">
            {tempEditedTask.taskImage ? (
              <>
                {/* Image URL Input */}
                <div className="mb-5">
                  <Label htmlFor="taskImage" className="mb-2 block capitalize">
                    Image URL
                  </Label>
                  <Input
                    id="taskImage"
                    className="!form-control"
                    value={newtaskImage}
                    onChange={handleNewtaskImageChange}
                  />
                </div>
                {/* Image Preview */}
                {imagePreview && (
                  <div>
                    <Label htmlFor="taskImage">Image Preview:</Label>
                    <img
                      src={imagePreview}
                      alt="Selected"
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        marginTop: '8px',
                        borderRadius: '4px',
                      }}
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <Label htmlFor="tasktext" className="mb-2 block capitalize">
                  Description
                </Label>
                <Input
                  name="taskText"
                  id="tasktext"
                  className="!form-control"
                  value={tempEditedTask.taskText}
                  onChange={handleChange}
                />
              </>
            )}
          </div>

          {/* Category Select */}
          <div className="col-span-12">
            <Label htmlFor="taskProperty" className="mb-2 block capitalize">
              Category
            </Label>
            <Select value={tempEditedTask.taskProperty} onValueChange={handlePropertyChange}>
              <SelectTrigger className="select-md" id="taskProperty">
                <SelectValue placeholder="Select a property" />
              </SelectTrigger>
              <SelectContent>
                {TaskProperties.map((property) => (
                  <SelectItem key={property} value={property}>
                    {property}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Assign Users */}
          <div className="col-span-12 w-fit flex flex-col gap-2">
            <Label>Assign To</Label>
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1">
                {assignedUsers.map(
                  (user: { avatar: string | undefined; name: string | undefined }, idx: number) => (
                    <div key={idx} className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        title={user.name}
                        width={36}
                        height={36}
                        className="rounded-full bg-gray-300 dark:bg-neutral-500 border border-white dark:border-white/40"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setAssignedUsers(assignedUsers.filter((_: any, i: number) => i !== idx))
                        }
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center -mt-1 -mr-1 hover:cursor-pointer"
                      >
                        <Icon icon={'solar:close-circle-line-duotone'} width={36} height={36} />
                      </button>
                    </div>
                  ),
                )}
              </div>

              {/* Add New User */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span>
                    <div className="!btn-circle-hover cursor-pointer p-0 ">
                      <Icon icon={'solar:add-circle-line-duotone'} width={30} height={30} />
                    </div>
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-40 overflow-y-auto">
                  {AllassignedTo.map((user, index) => {
                    const isChecked = assignedUsers.some(
                      (u: { name: string; avatar: string }) =>
                        u.name === user.name && u.avatar === user.avatar,
                    );
                    return (
                      <DropdownMenuItem key={index} asChild>
                        <div className="flex items-center gap-2 cursor-pointer w-full">
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setAssignedUsers([...assignedUsers, user]);
                              } else {
                                setAssignedUsers(
                                  assignedUsers.filter(
                                    (u: { name: string; avatar: string }) =>
                                      !(u.name === user.name && u.avatar === user.avatar),
                                  ),
                                );
                              }
                            }}
                          />
                          <img
                            src={user.avatar}
                            alt={user.name}
                            width={36}
                            height={36}
                            className="rounded-full bg-gray-300 dark:bg-neutral-500 border border-white dark:border-white/40"
                          />
                          <h6 className="text-sm">{user.name}</h6>
                        </div>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="lighterror">Close</Button>
          </DialogClose>
          <Button onClick={handleSaveChanges} variant="success">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default EditTaskModal;
