import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 dark:bg-gray-800">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600 dark:text-gray-400">
         Error - 404
        </p>
        <a 
          href="/" 
          className="text-purple-600 dark:text-purple-400 underline hover:text-purple-600/90 dark:hover:text-purple-400/90"
        >
          Volta pra Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
