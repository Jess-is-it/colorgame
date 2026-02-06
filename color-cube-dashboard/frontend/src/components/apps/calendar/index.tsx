import React from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Events from 'src/api/calendar/eventdata';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { TbCheck } from 'react-icons/tb';
import { Calendar as DatePickerCalendar } from 'src/components/ui/calendar';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from 'src/components/ui/dialog';
import { Popover, PopoverTrigger, PopoverContent } from 'src/components/ui/popover';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Button } from 'src/components/ui/button';
import { Card } from 'src/components/ui/card';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

type EvType = {
  title?: string;
  start?: Date;
  end?: Date;
  color?: string;
};

const CalendarApp = () => {
  const [calevents, setCalEvents] = React.useState<EvType[]>(Events);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [color, setColor] = React.useState('primary');
  const [start, setStart] = React.useState<Date | undefined>(undefined);
  const [end, setEnd] = React.useState<Date | undefined>(undefined);
  const [update, setUpdate] = React.useState<EvType | null>(null);

  const ColorVariation = [
    { id: 1, eColor: 'primary', value: 'primary' },
    { id: 2, eColor: 'success', value: 'green' },
    { id: 3, eColor: 'error', value: 'red' },
    { id: 4, eColor: 'secondary', value: 'default' },
    { id: 5, eColor: 'warning', value: 'warning' },
  ];

  const eventColors = (event: EvType) => ({ className: `event-${event.color ?? 'default'}` });

  const addNewEvent = (slotInfo: {
    start: React.SetStateAction<Date | undefined>;
    end: React.SetStateAction<Date | undefined>;
  }) => {
    setOpen(true);
    setUpdate(null);
    setTitle('');
    setColor('primary');
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
  };

  const editEvent = (event: EvType) => {
    setOpen(true);
    setUpdate(event);
    setTitle(event.title || '');
    setColor(event.color || 'primary');
    setStart(event.start);
    setEnd(event.end);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!start || !end || !title) return;

    if (update) {
      setCalEvents((evts) =>
        evts.map((evt) =>
          evt.title === update.title ? { ...evt, title, start, end, color } : evt,
        ),
      );
    } else {
      setCalEvents((evts) => [...evts, { title, start, end, color }]);
    }
    handleClose();
  };

  const deleteEvent = () => {
    if (update) {
      setCalEvents((evts) => evts.filter((evt) => evt.title !== update.title));
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setColor('primary');
    setStart(undefined);
    setEnd(undefined);
    setUpdate(null);
  };

  return (
    <>
      <Card>
        <Calendar
          selectable
          events={calevents}
          defaultView="month"
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          localizer={localizer}
          onSelectSlot={addNewEvent}
          onSelectEvent={editEvent}
          eventPropGetter={eventColors}
          className="min-h-[900px]"
        />
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{update ? 'Update Event' : 'Add Event'}</DialogTitle>
              <DialogDescription>
                {update
                  ? 'Edit the fields below and click Update or Delete'
                  : 'Fill in to create a new event'}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {/* Title Field */}
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>

              {/* Start Date Picker */}
              <div>
                <Label className="mb-2">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {start ? format(start, 'PPP') : 'Select start date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <DatePickerCalendar mode="single" selected={start} onSelect={setStart} />
                  </PopoverContent>
                </Popover>
              </div>

              {/* End Date Picker */}
              <div>
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {end ? format(end, 'PPP') : 'Select end date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <DatePickerCalendar mode="single" selected={end} onSelect={setEnd} />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Color Picker */}
              <div>
                <Label>Event Color</Label>
                <div className="flex gap-2 mt-2">
                  {ColorVariation.map((c) => (
                    <div
                      key={c.id}
                      className={`h-6 w-6 rounded-full cursor-pointer bg-${c.eColor} flex items-center justify-center`}
                      onClick={() => setColor(c.value)}
                    >
                      {color === c.value && <TbCheck className="text-white" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="flex justify-between pt-4">
              {update && (
                <Button variant="destructive" type="button" onClick={deleteEvent}>
                  Delete
                </Button>
              )}
              <div className="ml-auto flex gap-2">
                <Button type="submit" disabled={!title || !start || !end}>
                  {update ? 'Update Event' : 'Add Event'}
                </Button>
                <Button variant="outlineerror" type="button" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CalendarApp;
