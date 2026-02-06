import { cn } from 'src/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-lightprimary dark:bg-neutral-50/40',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
