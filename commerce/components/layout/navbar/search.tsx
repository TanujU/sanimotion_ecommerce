'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Form from 'next/form';
import { useSearchParams } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();

  const handleSearchClick = () => {
    console.log('Search clicked! Current search params:', searchParams?.get('q'));
  };

  const handleFormSubmit = (formData: FormData) => {
    const searchQuery = formData.get('q') as string;
    console.log('Search submitted with query:', searchQuery);
  };

  return (
    <Form className="w-max-[550px] relative w-full lg:w-80 xl:w-full" action={handleFormSubmit}>
      <input
        key={searchParams?.get('q')}
        type="text"
        name="q"
        placeholder="Nach Produkten suchen..."
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        className="text-md w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm focus:outline-none focus:ring-1 focus:ring-neutral-300 focus:border-neutral-300 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white dark:placeholder:text-neutral-400 dark:focus:ring-neutral-500 dark:focus:border-neutral-500"
        onClick={handleSearchClick}
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4 text-neutral-500" />
      </div>
    </Form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        placeholder="Nach Produkten suchen..."
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-300 focus:border-neutral-300 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white dark:placeholder:text-neutral-400 dark:focus:ring-neutral-500 dark:focus:border-neutral-500"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4 text-neutral-500" />
      </div>
    </form>
  );
}
