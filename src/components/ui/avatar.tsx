import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', ...props }, ref) => {
    const sizes = {
      sm: 'h-10 w-10 text-sm',
      md: 'h-12 w-12 text-base',
      lg: 'h-16 w-16 text-lg',
    };

    if (src) {
      return (
        <div
          ref={ref}
          className={cn(
            'relative flex shrink-0 overflow-hidden rounded-full',
            sizes[size],
            className
          )}
          {...props}
        >
          <img
            src={src}
            alt={alt}
            className="aspect-square h-full w-full object-cover"
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-2 text-text-primary font-medium',
          sizes[size],
          className
        )}
        {...props}
      >
        {fallback}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };
