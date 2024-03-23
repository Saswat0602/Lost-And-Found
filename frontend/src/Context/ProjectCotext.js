import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ProjectCotext = () => useContext(StateContext);

export const StateProvider = ({ children }) => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [showResponseModal, setResponseModal] = useState(false);

  return (
    <StateContext.Provider
      value={{
        showPostModal,
        setShowPostModal,
        showResponseModal,
        setResponseModal,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
