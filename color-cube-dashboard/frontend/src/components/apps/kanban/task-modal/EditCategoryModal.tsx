import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from 'src/components/ui/dialog';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';

function EditCategoryModal({
  showModal,
  handleCloseModal,
  handleUpdateCategory,
  initialCategoryName,
}: any) {
  const [newCategoryName, setNewCategoryName] = useState(initialCategoryName);

  const handleSave = () => {
    handleUpdateCategory(newCategoryName);
    handleCloseModal();
  };
  return (
    <Dialog open={showModal} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>

        <div className="py-2">
          <Input value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
        </div>

        <DialogFooter>
          <Button onClick={handleCloseModal} variant="destructive">
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default EditCategoryModal;
