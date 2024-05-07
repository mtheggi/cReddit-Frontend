import { useContext, useEffect, useState, useRef } from "react";
import Separator from "../sidebar/Nav-Icons/Separator";
import { Cog6ToothIcon, CameraIcon, PaperAirplaneIcon, UserMinusIcon } from "@heroicons/react/24/outline";
import InputEmoji from "react-input-emoji"
import Message from "./Message";
import { ChatContext } from "@/context/ChatContext";
import { deleteRequest, getRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";
import Loading from "../Loading/Loading";
import { UserContext } from "@/context/UserContext";
const ChatBox = () => {
    const [isOpenSetting, setIsOpenSetting] = useState(false);
    const [textMessage, setTextMessage] = useState("");
    const { selectedRoomId, selectedRoom, handleSendMessage, socket, setReRenderSide, setIsAddChat, setIsChannelSelected } = useContext(ChatContext);
    const { user, userProfilePicture } = useContext(UserContext);
    const [messages, setMessage] = useState([]);
    const [messageLoading, setMessageLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        console.log("MEssages ,  : ", messages);
    }, [messages]);


    useEffect(() => {
        const handleMessage = (data) => {
            console.log(`New message: ${data.message} from ${data.username}`);

            const newMessage = {
                content: data.message,
                profilePicture: data.profilePicture,
                username: data.username,
                createdAt: new Date().toISOString()
            }

            if (data.roomId == selectedRoomId || data.username == user) {
                setMessage(prevMessages => [...prevMessages, newMessage]);
            } else {
                setReRenderSide(prev => prev + 1);
            }
        }

        socket.current.on('newMessage', handleMessage);

        // Cleanup function
        return () => {
            socket.current.off('newMessage', handleMessage);
        }
    }, [selectedRoomId]);


    useEffect(() => {
        if (!selectedRoomId) {
            console.log('selectedRoomId is not defined');
            return;
        }
        console.log("selectedRoomId UseEffect", selectedRoomId);

        const getMessages = async () => {
            setMessageLoading(true);
            const response = await getRequest(`${baseUrl}/chat/${selectedRoomId}?page=1&limit=50`);
            if (response.status === 200) {
                const reversedData = response.data;
                setMessage(reversedData);
                setMessageLoading(false);
            } else {
                console.log(response.data.message);
            }
        };

        getMessages();
    }, [selectedRoomId]);


    const handleLeaveRoom = async () => {
        const response = await deleteRequest(`${baseUrl}/chat/leaveChat/${selectedRoomId}`);
        if (response.status === 200) {
            socket.current.emit('leaveRoom', selectedRoomId);
            setIsAddChat(false);
            setIsChannelSelected(false);
            setReRenderSide(prev => prev + 1);
        }
    }

    return (messageLoading ? <Loading /> :

        <div className="flex flex-col w-full h-full">
            {/* Chatbox Head  */}
            <div className="flex flex-row justify-between items-center w-full py-2 px-3">
                <p className="text-white font-bold text-lg "> {selectedRoom?.name} </p>
                <div id="chat-leaving" data-testid="chat-leaving" className="group relative flex flex-row justify-center items-center w-9 h-9 rounded-full hover:bg-reddit_hover cursor-pointer"
                    onClick={() => { handleLeaveRoom(); }} >
                    <UserMinusIcon className="h-6 w-6 text-white" />
                    <span className="opacity-0 inset-x-0 bottom-0 mb-2  group-hover:opacity-100 absolute bg-gray-800 text-white text-xs rounded-md px-2 py-1 transition-opacity duration-300 ease-in-out">Leave</span>

                </div>

            </div>

            <Separator />

            <div className="flex  flex-col w-full h-full overflow-y-auto">

                {/* ChatBox chat imgs */}
                <div className="user-info w-full flex flex-col flex-grow items-center justify-center gap-2 min-h-[250px]">
                    <img src={userProfilePicture} className="h-12 w-12 rounded-full" />
                    <p className="text-gray-500 text-lg font-bold">{selectedRoom?.name} </p>
                </div>
                <Separator />

                {messages && messages.map((message, index) => {
                    if (index === 0 || (index > 0 && messages[index - 1].username !== message.username)) {
                        return <Message key={index} Message={message.content} isFirstMessage={true} time={message.createdAt} username={message.username} profilePicture={message.profilePicture} />
                    } else {
                        return <Message key={index} Message={message.content} isFirstMessage={false} time={message.createdAt} username={message.username} profilePicture={message.profilePicture} />
                    }


                })
                }
                <div ref={messagesEndRef} />
            </div>
            <div className="flex h-15 flex-row p-1 justify-center items-center ">

                <CameraIcon className="h-7 w-7 ml-1 text-gray-500 cursor-pointer" />

                <InputEmoji placeholder="send message"
                    type="text"
                    onChange={(e) => { setTextMessage(e) }}
                    value={textMessage}
                    borderColor="transparent"
                    background="#1A282C"
                    placeholderColor="#415054"
                    color="#ffff"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && textMessage !== '') {
                            handleSendMessage(e, textMessage);
                            setTextMessage("");
                        }
                    }}

                />
                <PaperAirplaneIcon id="send-message-icon" data-testid="send-message-icon" onClick={(e) => { if (textMessage === '') { return } else { setTextMessage(""); handleSendMessage(e, textMessage) } }} className={`h-7 w-7  ${textMessage === '' ? 'opacity-50 cursor-not-allowed text-gray-500 ' : 'cursor-pointer text-white'}`} />
            </ div>



        </div>
    );
}

export default ChatBox;