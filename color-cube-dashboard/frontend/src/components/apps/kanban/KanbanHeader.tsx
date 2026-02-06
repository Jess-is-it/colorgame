import { useState, useContext } from 'react';
import { KanbanDataContext } from 'src/context/kanban-context/index';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from 'src/components/ui/dialog';
import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';

function KanbanHeader() {
  const { addCategory, setError } = useContext(KanbanDataContext);
  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState('');

  //Handles Add a new category.
  const handleSave = async () => {
    try {
      addCategory(listName);
      setListName('');
      setOpen(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const isAddButtonDisabled = listName.trim().length === 0;

  return (
    <>
      <div className="sm:flex justify-between items-center">
        <h5 className="card-title">Improving Work Processes</h5>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="sm:mt-0 mt-3">Add List</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add List</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Input
                autoFocus
                type="text"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="destructive">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSave} disabled={isAddButtonDisabled} variant="success">
                Add List
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
export default KanbanHeader;
