


/**
 * Renders the AddChatIcon component.
 * @component
 * @returns {JSX.Element} The rendered FollowIcon component.
 */
const AddChatIcon = () => {
    return (<svg rpl="" aria-hidden="true" className="button-leading-icon" fill="white" height="32" icon-name="join-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.625 9.375H14v1.25h-3.375V14h-1.25v-3.375H6v-1.25h3.375V6h1.25v3.375ZM20 10A10 10 0 1 1 10 0a10.011 10.011 0 0 1 10 10Zm-1.25 0A8.75 8.75 0 1 0 10 18.75 8.76 8.76 0 0 0 18.75 10Z"></path>
    </svg>
    );
}
const ChatSideHeader = () => {
    return (

        <div className="flex flex-row h-15 p-3 justify-between">
            <p className="text-white font-bold text-lg"> Chats</p>
            <div id="add-chat" data-testid="add-chat" className="flex flex-row justify-center items-center w-9 h-9 -mt-[5px] rounded-full hover:bg-reddit_hover cursor-pointer"
                onClick={() => { console.log("Add Chat") }}
            >
                <AddChatIcon />
            </div>
            {/* TODO : Filtering should  be  here  if there is time , it will be added */}
        </div>);
}

export default ChatSideHeader;