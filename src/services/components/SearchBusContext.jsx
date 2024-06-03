import React, { createContext, useState } from 'react';

export const SearchBusContext = createContext();

export const SearchBusProvider = ({ children }) => {
  const [searchBusList, setSearchBusList] = useState([]);

  return (
    <SearchBusContext.Provider value={{ searchBusList, setSearchBusList }}>
      {children}
    </SearchBusContext.Provider>
  );
};
