import React, { createContext, useState, useEffect } from "react";
import jsonData from "./Output";
export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [outputJson, setOutputJson] = useState(null);
  useEffect(() => {
   
    setOutputJson(jsonData);
  }, []); // empty dependency array to run the fetch only once on mount

  return (
    <DataContext.Provider
      value={{ outputJson }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
