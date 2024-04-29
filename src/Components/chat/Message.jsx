const Message = ({ Message, isFirstMessage }) => {

    return isFirstMessage ? (

        <div className="flex flex-row h-[50px] px-3 py-2 mt-1 justify-start items-center hover:bg-reddit_dark_Chat_hover">

            <img src="https://random.imagecdn.app/500/150" className="h-7 w-7 rounded-full mr-3" />

            <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between items-baseline ">
                    <p className="text-white text-sm">Osama Nasser Saber</p>
                    <p className="text-gray-500 text-xs">Yesterday</p>
                </div>

                <div className="flex flex-row">
                    <p className="text-white text-sm"> {Message}</p>
                </div>
            </div>
        </div>
    ) : (

        <div className="flex flex-row h-[25px] justify-start items-center gap-3 hover:bg-reddit_dark_Chat_hover">
            <p className="text-sm text-gray-400 ml-5">  9:45 </p>
            <p className="text-sm text-white"> {Message} </p>
        </div>

    )
}

export default Message;