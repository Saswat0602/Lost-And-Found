import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ProjectCotext = () => useContext(StateContext);

export const StateProvider = ({ children }) => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [showResponseModal, setResponseModal] = useState(false);
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  return (
    <StateContext.Provider
      value={{
        showPostModal,
        setShowPostModal,
        showResponseModal,
        setResponseModal,
        lostItems, setLostItems,
        foundItems, setFoundItems
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
