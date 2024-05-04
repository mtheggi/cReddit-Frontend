import moment from "moment";
const Message = ({ Message, isFirstMessage, time, username, profilePicture }) => {


    if (username === null) {

        return <div className="flex flex-row justify-center font-bold">  <p className="text-blue-800  mt-1 mb-1 text-xs">{Message}</p></div>
    }



    return isFirstMessage ? (

        <div className="flex flex-row h-[50px] px-3 py-2 mt-1 justify-start items-center hover:bg-reddit_dark_Chat_hover">

            <img src={profilePicture} className="h-9 w-9 rounded-full mr-3" />

            <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between items-baseline ">
                    <p className="text-white text-md font-bold">{username}</p>
                    <p className="text-gray-500 text-xs">{moment(time).calendar()}</p>
                </div>

                <div className="flex flex-row">
                    <p className="text-white text-sm"> {Message}</p>
                </div>
            </div>
        </div>
    ) : (

        <div className="flex flex-row h-[30px] mt-2 justify-between items-center gap-3 hover:bg-reddit_dark_Chat_hover">
            <p className="text-sm text-white ml-14 "> {Message} </p>
            <p className="text-gray-500 text-xs mr-4">{moment(time).calendar()}</p>
        </div>

    )
}

export default Message;