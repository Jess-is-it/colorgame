import { useState } from 'react';
import { Card } from 'src/components/ui/card';
import { Label } from 'src/components/ui/label';
// ShadCN UI Date Picker components
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from 'src/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover';
import { Calendar } from 'src/components/ui/calendar';
import { Button } from 'src/components/ui/button';

const PostDate = () => {
  // Set today's date as default
  const [publishDate, setPublishDate] = useState<Date | undefined>(new Date());

  return (
    <Card>
      <h5 className="card-title mb-4">Publish Date</h5>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="publishDate">
            Select publish date <span className="text-error ms-1">*</span>
          </Label>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal',
                !publishDate && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {publishDate ? format(publishDate, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={publishDate} onSelect={setPublishDate} autoFocus />
          </PopoverContent>
        </Popover>
        <small className="text-xs text-dark dark:text-darklink">
          Choose the date when this blog post should be published.
        </small>
      </div>
    </Card>
  );
};

export default PostDate;
