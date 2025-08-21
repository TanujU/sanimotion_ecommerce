'use client';

import { useEffect } from 'react';

export default function Error({ 
  error, 
  reset 
}: { 
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to the console for debugging
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="mx-auto my-4 flex max-w-xl flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 dark:border-neutral-800 dark:bg-black">
      <h2 className="text-xl font-bold">Oh nein!</h2>
      <p className="my-2">
        Es gab ein Problem mit unserem Shop. Dies könnte ein vorübergehendes Problem sein, bitte versuchen Sie Ihre
        Aktion erneut.
      </p>
      
      {/* Show error details in development */}
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <summary className="cursor-pointer font-semibold">Error Details (Development)</summary>
          <pre className="mt-2 text-sm text-red-600 dark:text-red-400 whitespace-pre-wrap">
            {error.message}
            {error.stack && `\n\nStack trace:\n${error.stack}`}
          </pre>
        </details>
      )}
      
      <button
        className="mx-auto mt-4 flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white hover:opacity-90"
        onClick={() => reset()}
      >
        Erneut versuchen
      </button>
    </div>
  );
}
