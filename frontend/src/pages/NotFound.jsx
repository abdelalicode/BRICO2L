import React from "react";
import "../../src/App.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <div class="container flex flex-col items-center mt-24">
        <div class="flex flex-col gap-6 max-w-md text-center">
          <h2 class="font-extrabold text-9xl text-gray-600 dark:text-gray-100">
            <span class="sr-only">Error</span>404
          </h2>
          <p class="text-2xl md:text-3xl dark:text-gray-300">
            Sorry, we couldn't find this page.
          </p>
          <Link to="/" className="link_404">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
