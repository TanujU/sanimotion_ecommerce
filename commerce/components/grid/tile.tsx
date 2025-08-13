import clsx from 'clsx';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  src,
  alt,
  fill,
  sizes,
  priority,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
  src?: string;
  alt?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={clsx(
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800',
        {
          'border-2 border-blue-600': active
        }
      )}
    >
      {src ? (
        <img
          className={clsx('relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
          })}
          src={src}
          alt={alt || ''}
          {...props}
        />
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}
