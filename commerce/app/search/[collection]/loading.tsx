export default function Loading() {
  return (
    <section>
      <div className="mb-8 animate-pulse">
        <div className="h-9 w-64 bg-gray-200 rounded mb-2"></div>
        <div className="h-5 w-96 bg-gray-200 rounded"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

