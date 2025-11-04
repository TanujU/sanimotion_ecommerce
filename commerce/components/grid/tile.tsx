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
        'group flex h-full w-full flex-col overflow-hidden rounded-xl bg-white relative shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100',
        
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        {src ? (
          <Image
            className={clsx('relative h-full w-full object-contain p-4 transition duration-300 ease-in-out', {
              'group-hover:scale-105': isInteractive
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
      </div>
      
      {/* Product Info */}
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
