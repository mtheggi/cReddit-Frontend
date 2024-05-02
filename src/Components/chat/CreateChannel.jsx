import { useContext } from "react";
import SearchChat from "./SearchChat";
import { ChatContext } from "@/context/ChatContext";

const CreateChannel = () => {
    const { setIsAddChat, tags, setTags, setIsChannelSelected, groupName } = useContext(ChatContext)
    console.log(tags);
    return (


        <div className="flex flex-col w-full h-full">

            <div className="flex flex-row justify-start items-center w-full py-2 px-3">
                <p className="text-white font-bold text-md"> New Chat </p>
            </div>

            <SearchChat />

            <div className='flex flex-row justify-end items-center gap-3 bg-reddit_dark_search_chat w-full h-15'>
                <button id="cancel-creat-channel" data-testid="cancel-creat-channel" onClick={() => { setIsAddChat(false); setIsChannelSelected(false); }} className={`flex flex-row px-2 py-2 h-8 justify-between rounded-full text-sm items-center bg-reddit_dark_Chat_Create`}>
                    <p className="font-bold text-white " data-testid="cancel-create-chat" >Cancel</p>
                </button>
                <button
                    id="cancel-creat-channel"
                    data-testid="cancel-creat-channel"
                    onClick={() => { }}
                    className={`flex flex-row px-2 py-2 h-8 justify-between rounded-full text-sm items-center mr-3 bg-reddit_blue hover:bg-reddit_light_blue ${tags.length === 0 ? " cursor-not-allowed" : ""}`}
                    disabled={tags.length === 0 || groupName === ""}
                >
                    <p className="font-bold text-white " data-testid="cancel-create-chat" >Create Chat</p>
                </button>

            </div>



        </div>);
}

export default CreateChannel;