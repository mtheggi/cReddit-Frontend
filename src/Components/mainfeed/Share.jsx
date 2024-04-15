import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

/**
 * Share component.
 * @component
 * @param {Object} props - Component props
 * @param {string} props.id - The ID of the post
 * @returns {JSX.Element} The rendered Share component
 */
const Share = ({id, testId=""}) => {
    return (
        <div id={"mainfeed_"+id+"_share" + testId} className="flex flex-row items-center cursor-pointer w-21 h-8 justify-center  bg-reddit_search hover:bg-reddit_search_light rounded-3xl ">
            <ArrowUpTrayIcon className="h-5 w-6 mr-1 text-gray-300" />
            <span className="text-gray-300 text-sm mr-1.5"> Share</span>
        </div>

    );
}

export default Share;