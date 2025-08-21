export default function TestPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-8">
          Test Page
        </h1>
        
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
              Basic Functionality Test
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              This page is working correctly if you can see this text.
            </p>
          </div>
          
          <div className="p-6 bg-red-500 dark:bg-blue-500 text-white rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Theme Test
            </h2>
            <p>
              This should be RED in light mode and BLUE in dark mode.
            </p>
          </div>
          
          <div className="p-6 bg-yellow-500 dark:bg-purple-500 text-black dark:text-white rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Theme Test 2
            </h2>
            <p>
              This should be YELLOW in light mode and PURPLE in dark mode.
            </p>
          </div>
          
          <div className="p-6 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
              Navigation Test
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Try using the theme toggle in the navbar to switch between light and dark modes.
            </p>
            <a 
              href="/" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
