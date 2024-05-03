import { useContext, useEffect, useState, useRef } from "react";
import Separator from "../sidebar/Nav-Icons/Separator";
import { Cog6ToothIcon, CameraIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import InputEmoji from "react-input-emoji"
import Message from "./Message";
import { ChatContext } from "@/context/ChatContext";
import { getRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";
import Loading from "../Loading/Loading";
const ChatBox = () => {
    const [isOpenSetting, setIsOpenSetting] = useState(false);
    const [textMessage, setTextMessage] = useState("");
    const { selectedRoomId, selectedRoom, handleSendMessage, socket } = useContext(ChatContext);
    const [messages, setMessage] = useState([]);
    const [messageLoading, setMessageLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        socket.current.on('newMessage', (data) => {
            // TODO: handle receiving of the message
            console.log(`New message: ${data.message} from ${data.username}`);
            const newMessage = {
                content: data.message,
                profilePicture: data.profilePicture,
                user: data.username,
                createdAt: new Date().toISOString()
            }
            setMessage(prevMessages => [...prevMessages, newMessage]); // Update the state of messages array using the functional form of setMessage
        });
        socket.current.on('joinedRoom', (data) => {
            console.log(`Joined rooms: ${data.rooms.join(', ')}`);
        });
    }, [])


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
                const reversedData = response.data.reverse();
                setMessage(reversedData);
                setMessageLoading(false);
            } else {
                console.log(response.data.message);
            }
        };

        getMessages();
    }, [selectedRoomId]);


    return (messageLoading ? <Loading /> :

        <div className="flex  flex-col w-full h-full">
            {/* Chatbox Head  */}
            <div className="flex flex-row justify-between items-center w-full py-2 px-3">
                <p className="text-white font-bold text-lg "> {selectedRoom?.name} </p>
                <div id="chat-setting" data-testid="chat-setting" className="flex flex-row justify-center items-center w-9 h-9 rounded-full hover:bg-reddit_hover cursor-pointer"
                    onClick={() => { setIsOpenSetting(prev => !prev) }} >
                    <Cog6ToothIcon className="h-6 w-6 text-gray-500 " />
                </div>

            </div>

            <Separator />

            <div className="flex  flex-col w-full h-full overflow-y-auto">

                {/* ChatBox chat imgs */}
                <div className="user-info w-full flex flex-col flex-grow items-center justify-center gap-2 min-h-[250px]">
                    <img src="https://random.imagecdn.app/500/150" className="h-12 w-12 rounded-full" />
                    <p className="text-gray-500 text-lg font-bold">{selectedRoom?.name} </p>
                </div>
                <Separator />

                {messages && messages.map((message, index) => {
                    if (index === 0 || (index > 0 && messages[index - 1].user !== message.user)) {
                        return <Message key={index} Message={message.content} isFirstMessage={true} time={message.createdAt} username={message.user} />
                    } else {
                        return <Message key={index} Message={message.content} isFirstMessage={false} time={message.createdAt} username={message.user} />
                    }


                })
                }
                <div ref={messagesEndRef} />
            </div>
            <div className="flex flex-row p-1 justify-center items-center">

                <CameraIcon className="h-7 w-7 ml-1 text-gray-500 cursor-pointer" />

                <InputEmoji placeholder="send message"
                    type="text"
                    onChange={(e) => { setTextMessage(e) }}
                    value={textMessage}
                    borderColor="transparent"
                    background="#1A282C"
                    placeholderColor="#415054"
                    color="#ffff"

                />
                <PaperAirplaneIcon onClick={(e) => { if (textMessage === '') { return } else { handleSendMessage(e, textMessage) } }} className={`h-7 w-7  ${textMessage === '' ? 'opacity-50 cursor-not-allowed text-gray-500 ' : 'cursor-pointer text-white'}`} />
            </ div>



        </div>
    );
}

export default ChatBox;