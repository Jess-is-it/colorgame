import { useState, useContext, useEffect } from 'react';
import { NotesContext } from 'src/context/notes-context/index';
import { notesType } from 'src/types/apps/notes';
import { Icon } from '@iconify/react';
import { Alert, AlertTitle } from 'src/components/ui/alert';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from 'src/components/ui/tooltip';
import { Input } from 'src/components/ui/input';
import AnimatedItem from 'src/components/animated-component/ListAnimation';
import SimpleBar from 'simplebar-react';

const Notelist = () => {
  const { notes, selectNote, deleteNote } = useContext(NotesContext);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeNoteId, setActiveNoteId] = useState<any | null>(null);

  useEffect(() => {
    if (notes.length > 0) {
      // Set the first note as active
      const firstNoteId = notes[0].id;
      setActiveNoteId(firstNoteId);
    }
  }, [notes]);

  const filterNotes = (notes: notesType[], nSearch: string) => {
    if (nSearch !== '')
      return notes.filter(
        (t) =>
          !t.deleted &&
          (t.title ?? '').toLocaleLowerCase().concat(' ').includes(nSearch.toLocaleLowerCase()),
      );
    return notes.filter((t) => !t.deleted);
  };

  const filteredNotes = filterNotes(notes, searchTerm);

  const handleNoteClick = (noteId: number) => {
    setActiveNoteId(noteId);
    selectNote(noteId);
  };

  return (
    <>
      <div>
        <div className="p-6 pb-2">
          <Input
            type="text"
            placeholder="Search Notes"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <h6 className="text-base mt-6">All Notes</h6>
        </div>
        <SimpleBar className="max-h-[405px] h-[calc(100vh_-_100px)]">
          <div className="flex flex-col gap-3 mt-4 p-6 pt-0">
            {filteredNotes && filteredNotes.length ? (
              filteredNotes.map((note) => (
                <AnimatedItem key={note.id} index={note.id}>
                  <div key={note.id}>
                    <div
                      className={`cursor-pointer relative p-4 rounded-md bg-light${
                        note.color
                      } dark:bg-dark${note.color}
                  ${
                    activeNoteId === note.id ? 'scale-100' : 'scale-95'
                  } transition-transform duration-200`}
                      onClick={() => handleNoteClick(note.id)}
                    >
                      <h6 className={`text-base truncate text-${note.color}`}>{note.title}</h6>
                      <div className="flex items-center justify-between">
                        <p className="text-xs">{new Date(note.datef ?? '').toLocaleDateString()}</p>
                        <div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  aria-label="delete"
                                  className="bg-transparent  text-ld p-0 flex items-center btn-circle-hover hover:bg-lighterror hover:text-error"
                                  onClick={() => deleteNote(note.id)}
                                >
                                  <Icon icon="tabler:trash" height={18} />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>Delete</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedItem>
              ))
            ) : (
              <Alert variant="lighterror">
                <Icon icon="tabler:info-circle" height={18} color="red" />
                <AlertTitle className="text-error">No Notes Found!</AlertTitle>
              </Alert>
            )}
          </div>
        </SimpleBar>
      </div>
    </>
  );
};
export default Notelist;
