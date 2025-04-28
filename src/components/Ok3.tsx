import React from 'react';

const App = () => {
  return (
    <div className="font-sans">
      {/* Navigation */}
      <nav className="flex justify-start space-x-4 p-4">
        <a href="#" className="hover:text-blue-500">Travel</a>
        <a href="#" className="hover:text-blue-500">Home</a>
        <a href="#" className="hover:text-blue-500">About</a>
      </nav>

      {/* Hero Section */}
      <section className="p-8">
        <h1 className="text-2xl font-semibold mb-4">My travel website</h1>
        <div className="flex items-center border border-gray-300 rounded-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 focus:outline-none rounded-md"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Cards Section */}
      <section className="grid grid-cols-3 gap-4 p-8">
        {/* Card 1 */}
        <div className="border border-gray-300 rounded-md shadow-sm overflow-hidden">
          <div className="h-40 bg-gray-100"></div>
          <div className="p-4">
            <h2 className="text-lg font-semibold">Card Title</h2>
            <p className="text-gray-600">Short description of the card.</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="border border-gray-300 rounded-md shadow-sm overflow-hidden">
          <div className="h-40 bg-gray-100"></div>
          <div className="p-4">
            <h2 className="text-lg font-semibold">Card Title</h2>
            <p className="text-gray-600">Short description of the card.</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="border border-gray-300 rounded-md shadow-sm overflow-hidden">
          <div className="h-40 bg-gray-100"></div>
          <div className="p-4">
            <h2 className="text-lg font-semibold">Card Title</h2>
            <p className="text-gray-600">Short description of the card.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;