import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const Share = ({id}) => {
    return (
        <div id={"mainfeed_"+id+"_share"} className="flex flex-row items-center cursor-pointer w-21 h-8 justify-center  bg-reddit_search hover:bg-reddit_search_light rounded-3xl ">
            <ArrowUpTrayIcon className="h-5 w-6 mr-1 text-gray-300" />
            <span className="text-gray-300 text-sm mr-1.5"> Share</span>
        </div>

    );
}

export default Share;