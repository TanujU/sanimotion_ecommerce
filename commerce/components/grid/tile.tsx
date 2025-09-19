import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';
import ImageNotAvailable from '../icons/image-not-available';

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
    dosage?: string;
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
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <ImageNotAvailable 
            className="group" 
            size={200}
          />
        </div>
      )}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          dosage={label.dosage}
          position={label.position}
        />
      ) : null}
    </div>
  );
}
