import { createContext, useState, useEffect } from "react";
export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const [isAddChat, setIsAddChat] = useState(false);


    return <ChatContext.Provider value={{
        isAddChat,
        setIsAddChat
    }}>
        {children}
    </ChatContext.Provider>
}
