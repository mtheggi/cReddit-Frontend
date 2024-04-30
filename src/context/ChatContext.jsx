import { createContext, useState, useEffect } from "react";
export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const [isAddChat, setIsAddChat] = useState(false);
    const [isChannelSelected, setIsChannelSelected] = useState(false);
    const [tags, setTags] = useState([]);

    return <ChatContext.Provider value={{
        isAddChat,
        setIsAddChat,
        isChannelSelected,
        setIsChannelSelected,
        tags,
        setTags
    }}>
        {children}
    </ChatContext.Provider>
}
