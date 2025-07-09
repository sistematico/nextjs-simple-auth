// import { useState } from "react";

export function DatabaseAlert() {
  // const [isActive, setIsActive] = useState(false);
  
  return (
    // <div className="bg-red-500 text-white px-4 py-3 text-center">
    //   <p className="font-medium">
    //     ⚠️ Sistema temporariamente indisponível. Por favor, tente novamente mais tarde.
    //   </p>
    // </div>

    <div
      id="alert-2"
      className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-zinc-800 dark:text-zinc-300"
      role="alert"
    >
      <svg
        className="shrink-0 w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div className="mx-3 text-sm font-medium">
        Sistema temporariamente indisponível. Por favor, tente novamente mais tarde.
        {/* A simple info alert with an{" "}
        <a href="#" className="font-semibold underline hover:no-underline">
          example link
        </a>
        . Give it a click if you like. */}
      </div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-zinc-500 rounded-lg focus:ring-2 focus:ring-zinc-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
        data-dismiss-target="#alert-2"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
}