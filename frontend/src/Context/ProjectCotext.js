
import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ProjectCotext = () => useContext(StateContext);

export const StateProvider = ({ children }) => {
  const [showPostModal, setShowPostModal] = useState(false);
console.log(showPostModal,"showPostModal")

  return (
    <StateContext.Provider
      value={{
        showPostModal,
        setShowPostModal,

      }}
    >
      {children}
    </StateContext.Provider>
  );
};
