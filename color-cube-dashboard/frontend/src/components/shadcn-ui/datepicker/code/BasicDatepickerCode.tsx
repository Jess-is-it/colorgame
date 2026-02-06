import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Button } from 'src/components/ui/button';
import { Calendar } from '../../../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover';
import React from 'react';

const BasicDatepickerCode = () => {
  const [date, setDate] = React.useState<Date>();
  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'max-w-sm justify-start text-left font-normal group',
                !date && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-primary group-hover:text-white" />
              {date ? (
                format(date, 'PPP')
              ) : (
                <span className="text-primary group-hover:text-white">Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default BasicDatepickerCode;
