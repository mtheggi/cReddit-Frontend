import Separator from '../sidebar/Nav-Icons/Separator';
import RecentRow from './RecentRow';

const Recent = () => {
    return (

        <div className=' bg-reddit_darkRecent hidden lg:flex flex-col h-fit pt-3 pb-1 rounded-2xl w-90 xl:w-80 ml-3 mt-10 mr-auto'>
            <div className=' h-6 w-full flex items-center px-3 flex-row'>
                <p className=' text-xs text-gray-400 font-medium lette tracking-widest '>RECENT POSTS</p>
                <p className=' text-sm text-blue-400 font-normal cursor-pointer hover:underline lette no-select ml-auto '>Clear</p>
            </div>


            {/* repeated part */}
            <div className=' space-y-4'>
                <RecentRow />
                <Separator />
                <RecentRow />
                <Separator />
                <RecentRow />
            </div>

        </div>

    );
}

export default Recent;