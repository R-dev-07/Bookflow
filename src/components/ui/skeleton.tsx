import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
}

function Skeleton({ className, delay = 0, ...props }: SkeletonProps) {
  const delayClass = delay > 0 ? `skeleton-delay-${delay}` : '';
  
  return (
    <div
      className={cn('skeleton rounded-md', delayClass, className)}
      {...props}
    />
  );
}

export { Skeleton };
