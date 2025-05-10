// src/context/LoadingProvider.jsx
import React from 'react';
import { LoadingContext, LoadingState } from './LoadingContext';

export const LoadingProvider = ({ children }) => {
  const value = LoadingState();
  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};