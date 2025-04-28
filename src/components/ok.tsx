import React from 'react';

function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-800 flex flex-col space-y-4 p-4">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span>Playground</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h14M5 12a2 2 0 01-2-2V8a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h2"
            />
          </svg>
          <span>AI Canvas</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>Image</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m12 0a2 2 0 100-4m0 4a2 2 0 110-4M6 18h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <span>Builder</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top */}
        <div className="flex bg-gray-800 p-4">
          <div className="relative mr-4">
            <div className="bg-purple-500 text-white p-2 rounded text-sm absolute top-0 left-0 transform -translate-y-1/2">
              website for travel
            </div>
          </div>
        </div>

        {/* Website Generation and Edits */}
        <div className="flex flex-col items-start space-y-4 p-4">
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-green-500">Generated Plan</p>
            <p className="text-green-400">Plan approved</p>
          </div>

          <div className="bg-purple-500 text-white p-2 rounded">
            Generating approved plan
          </div>

          <div className="bg-gray-700 p-4 rounded">
            <p className="text-green-500">Website generated successfully!</p>
          </div>

          <button className="bg-purple-500 text-white p-2 rounded">
            Save Edits
          </button>

          {/* Describe Website */}
          <div className="w-full">
            <div className="flex items-center border border-gray-700 rounded p-2">
              <input
                type="text"
                placeholder="Describe your website..."
                className="flex-1 bg-transparent border-none text-white focus:outline-none"
              />
              <button className="bg-purple-500 text-white rounded p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L13.657 10l1.171 1.172a4 4 0 11-5.656 5.656L10 13.657l-1.172 1.171a4 4 0 11-5.656-5.656L6.343 10 5.172 8.828a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-around  items-center bg-gray-800 p-4">
        <button className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.003m-6.692 1.128a2.25 2.25 0 01-.897-1.545c0-.52.23-1.046.617-1.408a2.25 2.25 0 011.598-.931m0 3.75a2.25 2.25 0 01-.897.315c0 .52.23 1.046.617 1.408a2.25 2.25 0 011.598.931m0-3.75a2.25 2.25 0 011.598-.931c.52 0 1.046.23 1.408.617a2.25 2.25 0 01.315.897m-1.5 3.75a2.25 2.25 0 01.315.897c.52 0 1.046.23 1.408.617a2.25 2.25 0 01.931 1.598m-6.75-1.5a2.25 2.25 0 01-.931-1.598c0-.52.23-1.046.617-1.408a2.25 2.25 0 011.598-.931m6.75 3.75a2.25 2.25 0 01.931 1.598c0 .52.23 1.046.617 1.408a2.25 2.25 0 011.598.931m-3-6.75a2.25 2.25 0 01-1.598.931c-.52 0-1.046-.23-1.408-.617a2.25 2.25 0 01-.315-.897m3 3.75a2.25 2.25 0 011.598.931c.52 0 1.046-.23 1.408-.617a2.25 2.25 0 01.315-.897" />
</svg>

          <span>Publish</span>
        </button>
        <button className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.591 1.591m-1.5-1.5l-5.159 5.159m6-6L20.25 4.5m-1.5 11.25l-5.159-5.159m-12 3.75l1.591 1.591L5.25 15.75m11.25-11.25l-1.591-1.591L18.75 4.5" />
</svg>
          <span>Create Repo</span>
        </button>
        <button className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>

          <span>View Files</span>
        </button>
        </div>
      </div>
    </div>
  );
}

export default App;