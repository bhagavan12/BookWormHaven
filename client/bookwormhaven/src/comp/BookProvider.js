import React, { createContext, useState } from 'react';

// Create a context
export const BookContext = createContext();

// Provider component
export const BookProvider = ({ children }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <BookContext.Provider value={{ selectedBook, setSelectedBook }}>
      {children}
    </BookContext.Provider>
  );
};
