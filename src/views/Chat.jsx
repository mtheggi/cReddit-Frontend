import useChat from "@/Components/chat/Effects/useChat";
import ChatSide from "@/Components/chat/ChatSide";
import { useContext, useEffect } from "react";
import ChatBox from "@/Components/chat/ChatBox";
import { ChatContext } from "@/context/ChatContext";
import CreateChannel from "@/Components/chat/CreateChannel";
import LandingOnChat from "@/Components/chat/LandingOnChat";
const Chat = ({ setIsChat }) => {
    useChat(setIsChat);
    const { isAddChat } = useContext(ChatContext);
    const { isChannelSelected } = useContext(ChatContext);

    console.log("chat component started");
    console.log("selected channel", isChannelSelected);
    return (
        <div className="flex flex-row overflow-x-auto sm:overflow-x-hidden h-screen ">
            <div className="w-57 min-w-57 sm:w-77  sm:min-w-77  h-screen border-r border-gray-800 overflow-y-hidden ">
                <ChatSide />
            </div>

            <div className="min-w-100 sm:w-full h-screen overflow-x-auto ">
                {isAddChat ? <CreateChannel /> :
                    isChannelSelected ? <ChatBox /> : <LandingOnChat />
                }
            </div>
        </div>
    );
}

export default Chat;