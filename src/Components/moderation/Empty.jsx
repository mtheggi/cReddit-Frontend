const Empty = ({message}) => {
    return (
        <div className="w-full h-full flex flex-col items-center mt-20 ">
            <img className="w-[200px] h-[200px]" src="https://www.redditstatic.com/shreddit/assets/snoomojis/cat_blep.png" alt="cat blep" />
            <h1 className="text-white font-medium text-[24px]">{message}</h1>
           {message!="You are not a moderator in any community" && <p className="text-gray-400 mt-1">Kitteh is pleased</p>}
        </div>
    );
}

export default Empty;