import clsx from 'clsx';
import Image from 'next/image';
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
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white relative border-neutral-200',
        
      )}
    >
      {src ? (
        <Image
          className={clsx('relative object-contain transition duration-300 ease-in-out group-hover:scale-105', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
          })}
          src={src}
          alt={alt || ''}
          {...(fill ? { fill } : { width: 995, height: 600 })}
          sizes={sizes || "(min-width: 768px) 66vw, 100vw"}
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
