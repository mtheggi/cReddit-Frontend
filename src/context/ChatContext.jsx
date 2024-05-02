import { createContext, useState, useEffect } from "react";
export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const [isAddChat, setIsAddChat] = useState(false);
    const [isChannelSelected, setIsChannelSelected] = useState(false);
    const [tags, setTags] = useState([]);
    const [groupName, setGroupName] = useState("");


    return <ChatContext.Provider value={{
        isAddChat,
        setIsAddChat,
        isChannelSelected,
        setIsChannelSelected,
        tags,
        setTags,
        groupName,
        setGroupName
    }}>
        {children}
    </ChatContext.Provider>
}
