import * as React from 'react';
import { useContext, useState } from 'react';
import { NotesContext } from 'src/context/notes-context/index';
import { TbCheck } from 'react-icons/tb';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from 'src/components/ui/dialog';
import { Textarea } from 'src/components/ui/textarea';
import { Button } from 'src/components/ui/button';

interface ColorOption {
  lineColor: string;
  disp: string;
  id: number;
}

interface Props {
  colors: ColorOption[];
}

const AddNotes = ({ colors }: Props) => {
  const { addNote } = useContext(NotesContext);

  const [openNoteModal, setOpenNoteModal] = useState(false);

  const [scolor, setScolor] = React.useState<string>('primary');
  const [title, setTitle] = React.useState('');

  const setColor = (e: string) => {
    setScolor(e);
  };

  return (
    <>
      <Button onClick={() => setOpenNoteModal(true)} className="rounded-md">
        Add Note
      </Button>
      <Dialog open={openNoteModal} onOpenChange={setOpenNoteModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Note</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 pt-2">
            <Textarea
              rows={5}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="description"
              className="w-full form-control-textarea"
            />

            <h6 className="text-base pt-4">Change Note Color</h6>

            <div className="flex gap-2 items-center">
              {colors?.map((color) => (
                <div
                  key={color.disp}
                  className={`h-7 w-7 flex justify-center items-center rounded-full cursor-pointer bg-${color.disp}`}
                  onClick={() => setColor(color.disp)}
                >
                  {scolor === color.disp ? <TbCheck size={18} className="text-white" /> : null}
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              disabled={title === ''}
              onClick={(e) => {
                e.preventDefault();
                addNote({
                  title,
                  color: scolor,
                  id: 0,
                  deleted: false,
                });
                setOpenNoteModal(false);
                setTitle('');
              }}
              className="rounded-md"
            >
              Save
            </Button>
            <Button
              variant="destructive"
              className="rounded-md"
              onClick={() => setOpenNoteModal(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNotes;
