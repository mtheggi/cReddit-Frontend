import useChat from "@/Components/chat/Effects/useChat";
import ChatSide from "@/Components/chat/ChatSide";
import { useEffect } from "react";

const Chat = ({ setIsChat }) => {
    useChat(setIsChat);

    console.log("chat component started");
    return (
        <div className="flex flex-row">
            <div className="w-57 min-w-57 sm:w-77  sm:min-w-77  h-screen border-r border-gray-800">
                <ChatSide />
            </div>
            <div className="w-full  h-screen ">
                {/* <ChatMain /> */}
            </div>
        </div>



    );
}

export default Chat;