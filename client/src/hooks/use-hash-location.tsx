import { useState, useEffect } from 'react';

// A custom hook for using hash-based routing with wouter
const useHashLocation = () => {
  const [loc, setLoc] = useState(window.location.hash.slice(1) || "/");

  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash.slice(1);
      setLoc(hash || "/");
    };

    window.addEventListener("hashchange", handler);
    if (!window.location.hash) {
      window.location.hash = "#/";
    }

    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = (to: string) => {
    window.location.hash = "#" + to;
  };

  return [loc, navigate];
};

export default useHashLocation;
