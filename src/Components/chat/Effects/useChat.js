// useChat.js
import { useEffect } from 'react';

const useChat = (setIsChat) => {
    useEffect(() => {
        setIsChat(true);
        const originalTitle = document.title;
        document.title = "Reddit - Chat";

        return () => {
            document.title = originalTitle;
            setIsChat(false);
        }
    }, [setIsChat]); // Don't forget to include any dependencies
};

export default useChat;