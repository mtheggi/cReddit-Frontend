import { ChatContext } from "@/context/ChatContext";
import { useContext } from "react";
import LandingImg from '@/assets/Chatlanding.png';
const LandingOnChat = () => {

    const { isAddChat, setIsAddChat } = useContext(ChatContext);
    return (

        <div className="landing w-full h-full flex flex-col flex-grow items-center justify-center gap-2 min-h-[250px]">
            <img src={LandingImg} className="h-40 w-40" />
            <p className="text-white text-xl font-bold">Welcome to chat! </p>
            <p className="text-white text-lg">select channel or create one with other redditors.</p>
            <button
                id="landing-creat-channel"
                data-testid="landing-creat-channel"
                onClick={() => { setIsAddChat(true); }}
                className={`flex flex-row px-2 py-2 h-8 justify-between rounded-full text-sm items-center mr-3 bg-reddit_blue hover:bg-reddit_light_blue`}
            >
                <p className="font-bold text-white " data-testid="cancel-create-chat" >Create Chat</p>
            </button>

        </div >
    );
}

export default LandingOnChat;