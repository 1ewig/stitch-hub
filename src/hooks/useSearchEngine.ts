import { useEffect, useState } from "react";

export function useSearchEngine<T>(
  query: string,
  dataset: T[],
  searchKeys: Array<keyof T>
) {
  const [filteredResults, setFilteredResults] = useState<T[]>(dataset);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsSearching(true);
    const handler = setTimeout(() => {
      if (!query.trim()) {
        setFilteredResults(dataset);
        setIsSearching(false);
        return;
      }

      const lowerQuery = query.toLowerCase();
      const results = dataset.filter((item) => {
        return searchKeys.some((key) => {
          const val = item[key];
          if (val === undefined || val === null) return false;
          return String(val).toLowerCase().includes(lowerQuery);
        });
      });

      setFilteredResults(results);
      setIsSearching(false);
    }, 150); // Debounce matching operations by 150ms to protect frames

    return () => clearTimeout(handler);
  }, [query, dataset, searchKeys]);

  return {
    filteredResults,
    isSearching
  };
}
