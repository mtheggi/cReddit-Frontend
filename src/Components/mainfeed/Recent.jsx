import Separator from '../sidebar/Nav-Icons/Separator';
import RecentRow from './RecentRow';
import Usercard from '../usercard/Usercard';
const Recent = () => {
    return (
      <>
        <div className=' bg-reddit_darkRecent hidden lg:flex flex-col h-fit pt-3 pb-1 mb-10 rounded-2xl w-90 xl:w-80 ml-3 mt-9 mr-auto'>
            <div className=' h-6 w-full mb-2 flex items-center px-3 flex-row'>
                <p className=' text-xs text-gray-400 font-medium lette tracking-widest '>RECENT POSTS</p>
                <p id="recent_posts_clear" className=' text-sm text-blue-400 font-normal cursor-pointer hover:underline lette no-select ml-auto '>Clear</p>
            </div>


            {/* repeated part */}
            <div className=' space-y-4'>
                <RecentRow id='recent_posts_row1' />
                <Separator />
                <RecentRow id='recent_posts_row2' />
                <Separator />
                <RecentRow id='recent_posts_row3' />
                <Separator />
                <RecentRow id='recent_posts_row4'/>
                <Separator />
                <RecentRow id='recent_posts_row5' />
                <Separator />
                <RecentRow id='recent_posts_row6' />
                <Separator />
                <RecentRow id='recent_posts_row7'/>
            </div>

            </div>
            <Usercard />
        </>
    );
}

export default Recent; 