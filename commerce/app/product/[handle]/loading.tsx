export default function Loading() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8">
        <div className="h-full w-full basis-full lg:basis-4/6">
          <div className="aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
        </div>

        <div className="basis-full lg:basis-2/6">
          <div className="mb-6 flex flex-col border-b pb-6">
            <div className="h-8 w-3/4 bg-gray-200 animate-pulse rounded mb-4"></div>
            <div className="h-6 w-1/2 bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="mt-8 h-12 bg-gray-200 animate-pulse rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

