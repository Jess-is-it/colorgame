import * as React from 'react';

import { cn } from 'src/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-lg border border-ld focus:border-primary dark:focus:border-primary bg-transparent px-3 py-2 ring-offset-background placeholder:text-bodytext dark:placeholder:text-white/30 disabled:cursor-not-allowed disabled:opacity-50 text-ld text-sm focus:ring-0 focus-visible:outline-0 focus-visible:border-primary dark:focus-visible:border-primary focus-visible:ring-0',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
