import * as React from 'react';
import { CustomizerContext } from 'src/context/CustomizerContext';

import { cn } from 'src/lib/utils';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    // The upstream template expects CustomizerContextProvider at the app root.
    // For this MVP we intentionally stripped most template providers, so we
    // fall back to sane defaults when the context isn't mounted.
    const ctx = React.useContext(CustomizerContext);
    const isCardShadow: boolean = typeof ctx?.isCardShadow === 'boolean' ? ctx.isCardShadow : true;
    const isBorderRadius: number = Number.isFinite(ctx?.isBorderRadius) ? Number(ctx.isBorderRadius) : 16;
    return (
      <div
        ref={ref}
        style={{
          borderRadius: `${isBorderRadius}px`,
        }}
        className={cn(
          `p-6 border-0 bg-white dark:bg-dark ${
            isCardShadow ? 'shadow-md dark:shadow-dark-md' : 'shadow-none border border-ld'
          }`,
          className,
        )}
        {...props}
      />
    );
  },
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 ', className)} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  ),
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-15 mt-2', className)} {...props} />
  ),
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('mt-4', className)} {...props} />,
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center mt-4', className)} {...props} />
  ),
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
