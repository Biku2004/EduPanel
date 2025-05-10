import { createContext, useState } from 'react';

// Export the context directly
export const LoadingContext = createContext();

// Create the provider state
export const LoadingState = () => {
  const [isLoading, setIsLoading] = useState(false);
  return { isLoading, setIsLoading };
};