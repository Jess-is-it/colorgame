import { AllassignedTo, TaskProperties } from 'src/api/kanban/kanbandata';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from 'src/components/ui/dialog';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from 'src/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'src/components/ui/dropdown-menu';
import { Checkbox } from 'src/components/ui/checkbox';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';

import { Icon } from '@iconify/react/dist/iconify.js';

function AddNewList({ show, onHide, onSave, newTaskData, setNewTaskData, updateTasks }: any) {
  const { taskTitle, taskText, priority, taskImage } = newTaskData;

  const handleSave = () => {
    onSave();
    updateTasks();
    onHide();
  };

  const isFormValid = () => {
    return taskTitle && taskText && priority;
  };

  return (
    <Dialog open={show} onOpenChange={(open) => !open && onHide()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <Input
              id="task"
              value={taskTitle}
              placeholder="Task"
              onChange={(e) => setNewTaskData({ ...newTaskData, taskTitle: e.target.value })}
            />
          </div>
          <div className="col-span-12">
            <Input
              id="taskText"
              value={taskText}
              placeholder="Description"
              onChange={(e) => setNewTaskData({ ...newTaskData, taskText: e.target.value })}
            />
          </div>
          <div className="col-span-12">
            <Input
              id="taskImage"
              value={taskImage}
              placeholder="Task Image URL"
              onChange={(e) => setNewTaskData({ ...newTaskData, taskImage: e.target.value })}
            />
            {taskImage !== undefined && (
              <img
                src={taskImage}
                alt="Selected"
                style={{ width: '45%', height: 'auto', marginTop: '8px' }}
              />
            )}
          </div>
          <div className="col-span-12">
            <Select
              value={priority}
              onValueChange={(value) => setNewTaskData({ ...newTaskData, priority: value })}
            >
              <SelectTrigger className="select-md" id="askProperty-label">
                <SelectValue placeholder="Select Task Priority" />
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

          <div className="col-span-12 w-fit flex flex-col gap-2">
            <Label>Assign To</Label>
            <div className="flex items-center">
              {/* Assigned Users Preview */}
              {newTaskData.assignedTo.length > 0 && (
                <div className="flex -space-x-2">
                  {newTaskData.assignedTo.map((user: { name: string; avatar: string }) => (
                    <img
                      key={user.name}
                      src={user.avatar || '/images/users/user-1.jpg'}
                      alt={user.name}
                      width={36}
                      height={36}
                      className="rounded-full bg-gray-300 dark:bg-neutral-500 border border-white dark:border-white/40"
                    />
                  ))}
                </div>
              )}

              {/* Add Assignee Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span>
                    <div className="!btn-circle-hover cursor-pointer p-0 ">
                      <Icon icon={'solar:add-circle-line-duotone'} width={30} height={30} />
                    </div>
                  </span>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="max-h-40 overflow-y-auto w-56">
                  {AllassignedTo.map((user) => {
                    const isChecked = newTaskData.assignedTo.some(
                      (u: { name: string }) => u.name === user.name,
                    );

                    const handleToggle = () => {
                      const updatedList = isChecked
                        ? newTaskData.assignedTo.filter(
                            (u: { name: string }) => u.name !== user.name,
                          )
                        : [...newTaskData.assignedTo, user];

                      setNewTaskData({
                        ...newTaskData,
                        assignedTo: updatedList,
                      });
                    };

                    return (
                      <DropdownMenuItem
                        key={user.name}
                        className="cursor-pointer"
                        onSelect={(e) => {
                          e.preventDefault();
                          handleToggle();
                        }}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <Checkbox checked={isChecked} onCheckedChange={handleToggle} />
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

        <DialogFooter className="mt-6">
          <Button variant="ghosterror" onClick={onHide}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isFormValid()}>
            Add Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default AddNewList;
