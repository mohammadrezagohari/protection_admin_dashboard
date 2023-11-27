// SortableContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const SortableContext = createContext();

export const useSortableContext = () => {
  return useContext(SortableContext);
};

  export const SortableProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const localStorageKey = "sortableItems";
  
    useEffect(() => {
      // Load items from localStorage on component mount
      const savedItems = JSON.parse(localStorage.getItem(localStorageKey));
      if (savedItems) {
        setItems(savedItems);
      }
    }, []);
  
    const updateItems = (newItems) => {
      setItems(newItems);
      // Save items to localStorage whenever they change
      localStorage.setItem(localStorageKey, JSON.stringify(newItems));
    };
  
    return (
      <SortableContext.Provider value={{ items, updateItems }}>
        {children}
      </SortableContext.Provider>
    );
  };
  
  export default SortableProvider;