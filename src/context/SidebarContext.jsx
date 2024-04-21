import { createContext, useState, useRef } from "react";

export const SidebarContext = createContext();

export const SidebarContextProvider = ({ children }) => {
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [userHistoryRes, setUserHistoryRes] = useState(null);
  const communityButtonRef = useRef(null);
  const sidebarRef = useRef();

  return (
    <SidebarContext.Provider
      value={{
        isCommunityOpen,
        setIsCommunityOpen,
        communityButtonRef,
        userHistoryRes,
        setUserHistoryRes,
        sidebarRef,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
