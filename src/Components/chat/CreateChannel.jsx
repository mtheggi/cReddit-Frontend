import { useContext, useEffect } from "react";
import SearchChat from "./SearchChat";
import { ChatContext } from "@/context/ChatContext";

const CreateChannel = () => {
    const { setIsAddChat,
        tags,
        setTags,
        setIsChannelSelected,
        groupName,
        setGroupName,
        handleCreateChat,
        creationError,
        creationMsg,
        setCreationMsg,
        setCreationError,
        setProfilePictureTag,
        setReRenderSide,

    } = useContext(ChatContext)

    useEffect(() => {
        const cleanup = () => {
            setTags([]);
            setGroupName("");
            setCreationError(false);
            setCreationMsg("");
            setProfilePictureTag([]);
            setReRenderSide(false);
        }

        return () => { cleanup(); }
    }, [])

    return (


        <div className="flex flex-col items-center w-full h-full">

            <div className="flex flex-row justify-start items-center w-full py-2 px-3">
                <p className="text-white font-bold text-md"> New Chat </p>
            </div>

            <SearchChat />


            {
                <div className={`w-full flex flex-row justify-center items-center ${creationError ? 'bg-red-800' : 'bg-green-700'}`} >
                    <p className={`text-sm my-1 text-white font-bold`}> {creationMsg} </p>
                </div>
            }

            <div className='flex flex-row justify-end items-center gap-3 bg-reddit_dark_search_chat w-full h-15'>
                <button id="cancel-creat-channel" data-testid="cancel-creat-channel" onClick={() => { setIsAddChat(false); setIsChannelSelected(false); setTags([]); setGroupName(""); }} className={`flex flex-row px-2 py-2 h-8 justify-between rounded-full text-sm items-center bg-reddit_dark_Chat_Create`}>
                    <p className="font-bold text-white " data-testid="cancel-create-chat" >Cancel</p>
                </button>
                <button
                    id="btn-creat-channel"
                    data-testid="cancel-creat-channel"
                    onClick={handleCreateChat}
                    className={`flex flex-row px-2 py-2 h-8 justify-between rounded-full text-sm items-center mr-3 bg-reddit_blue hover:bg-reddit_light_blue ${(tags.length === 0 || (groupName === "" && tags.length > 1)) ? " cursor-not-allowed" : ""}`}
                    disabled={tags.length === 0 || (groupName === "" && tags.length > 1)}
                >
                    <p className="font-bold text-white " data-testid="cancel-create-chat" >Create Chat</p>
                </button>

            </div>



        </div >);
}

export default CreateChannel;