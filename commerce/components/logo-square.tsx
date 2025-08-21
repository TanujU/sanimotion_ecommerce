import clsx from 'clsx';
import LogoIcon from './icons/logo';

interface LogoSquareProps {
  size?: 'sm' | undefined;
  siteName?: string;
}

export default function LogoSquare({ size, siteName }: LogoSquareProps) {
  return (
    <div
      className={clsx(
        'flex flex-none items-center justify-center border border-neutral-200 bg-gray-50 shadow-sm',
        {
          'h-[40px] w-[40px] rounded-xl': !size,
          'h-[30px] w-[30px] rounded-lg': size === 'sm'
        }
      )}
    >
      <LogoIcon
        siteName={siteName}
        className={clsx({
          'h-[16px] w-[16px]': !size,
          'h-[14px] w-[14px]': size === 'sm'
        })}
      />
    </div>
  );
}
