import { useState } from 'react';
import { NotesProvider } from 'src/context/notes-context/index';
import NotesSidebar from 'src/components/apps/notes/NotesSidebar';
import NoteContent from 'src/components/apps/notes/NoteContent';
import AddNotes from 'src/components/apps/notes/AddNotes';
import { Icon } from '@iconify/react';
import { Button } from 'src/components/ui/button';
import { Card } from 'src/components/ui/card';
import { Sheet, SheetContent } from 'src/components/ui/sheet';

interface colorsType {
  lineColor: string;
  disp: string | any;
  id: number;
}

const NotesApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const colorvariation: colorsType[] = [
    {
      id: 1,
      lineColor: 'warning',
      disp: 'warning',
    },
    {
      id: 2,
      lineColor: 'primary',
      disp: 'primary',
    },
    {
      id: 3,
      lineColor: 'error',
      disp: 'error',
    },
    {
      id: 4,
      lineColor: 'success',
      disp: 'success',
    },
    {
      id: 5,
      lineColor: 'secondary',
      disp: 'secondary',
    },
  ];
  return (
    <>
      <NotesProvider>
        <Card className="p-0 overflow-hidden">
          <div className="flex">
            {/* NOTES SIDEBAR */}
            <div>
              <Sheet open={isOpen} onOpenChange={handleClose}>
                <SheetContent
                  side="left"
                  className="max-w-[320px] sm:max-w-[320px] w-full h-full lg:z-0 lg:hidden block"
                >
                  <NotesSidebar />
                </SheetContent>
              </Sheet>
              <div className="w-full h-auto lg:block hidden">
                <NotesSidebar />
              </div>
            </div>

            {/* NOTES CONTENT */}
            <div className="w-full">
              <div className="flex justify-between items-center border-b border-ld py-4 px-6">
                <div className="flex gap-3 items-center">
                  <Button
                    variant={'lightprimary'}
                    onClick={() => setIsOpen(true)}
                    className="btn-circle p-0 lg:!hidden flex "
                  >
                    <Icon icon="tabler:menu-2" height={18} />
                  </Button>
                  <h6 className="text-base"> Edit Note</h6>
                </div>
                <AddNotes colors={colorvariation} />
              </div>
              <NoteContent />
            </div>
          </div>
        </Card>
      </NotesProvider>
    </>
  );
};

export default NotesApp;
