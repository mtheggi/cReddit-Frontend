import ChatChannels from "./ChatChannels";
import ChatSideHeader from "./ChatSideHeader";
import ThreadsIcon from "./ThreadsIcon";

const ChatSide = () => {
    return (
        <div className="flex flex-col gap-2">
            <ChatSideHeader />
            <ThreadsIcon />
            <ChatChannels />
        </div>

    );
}

export default ChatSide;