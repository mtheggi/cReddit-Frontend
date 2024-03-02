import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const Share = () => {
    return (
        <div className="flex flex-row bg-reddit_greenyDark hover:bg-reddit_search_light rounded-3xl py-2 px-2">
            <ArrowUpTrayIcon className="h-6 w-6 mr-2 text-gray-300" />
            <span className="text-gray-300 font-medium text-base"> Share</span>
        </div>

    );
}

export default Share;