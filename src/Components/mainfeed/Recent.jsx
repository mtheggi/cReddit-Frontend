import Separator from '../sidebar/Nav-Icons/Separator';
import RecentRow from './RecentRow';
import { getRequest, deleteRequest } from '@/services/Requests';
import { useEffect, useState, useContext } from 'react';
import { baseUrl } from '@/constants';
import { UserContext } from '@/context/UserContext';
import { ServerContext } from '@/context/ServerContext';

import Loading from "../Loading/Loading";

/**
 * Recent component displays the recent posts of a user.
 *
 * @component
 * @param {Object} userHistoryRes - The user's history response object.
 * @returns {JSX.Element} - The rendered Recent component.
 */
const Recent = ({ userHistoryRes }) => {
  const [recentPosts, setRecentPosts] = useState([]);
  const { isLoggedIn } = useContext(UserContext);
  const { setServerError } = useContext(ServerContext);
  useEffect(() => {
    let response = localStorage.getItem("userHistory");
    if (response != null) {
      let recent = JSON.parse(response);
      setRecentPosts(recent);
    }
  }, [isLoggedIn, userHistoryRes]);

  /**
    * Function to handle clearing of recent posts.
    * 
    * @async
    * @function handleClearRecentPosts
    */
  async function handleClearRecentPosts() {
    const originalPosts = recentPosts;
    setRecentPosts([]);
    localStorage.removeItem('userHistory');
    const response = await deleteRequest(`${baseUrl}/user/history`);
    if (!(response.status === 200 || response.status === 201)) {
      setServerError(true);
      setRecentPosts(originalPosts);
      localStorage.setItem('userHistory', JSON.stringify(originalPosts));
    }
  }

  if (!isLoggedIn) {
    return (<div className='  hidden lg:flex flex-col h-fit pt-3 pb-1 mb-10 rounded-2xl w-88 xl:w-82 xl:min-w-82 mr-auto'></div>)
  }
  return (
    recentPosts != null && recentPosts.length !== 0 ? (

      <div className=' bg-reddit_darkRecent mt-4 overflow-hidden hidden lg:flex flex-col h-fit pt-3 pb-1 mb-10 rounded-2xl w-80 xl:min-w-80 mr-auto'>

        <div className=' h-6 w-full mb-2 flex items-center px-3 flex-row'>
          <p className=' text-xs text-gray-400 font-medium lette tracking-widest '>RECENT POSTS</p>
          <p onClick={handleClearRecentPosts} id="recent_posts_clear" className=' text-sm text-blue-400 font-normal cursor-pointer hover:underline lette no-select ml-auto '>Clear</p>
        </div>

        <div className=" space-y-4">
          {recentPosts.length !== 0 &&
            recentPosts.map((post, index) => {
              return <RecentRow key={index} id={post._id} post={post} />;
            })}
        </div>
      </div>
    ) : (
      <div className="  hidden lg:flex flex-col h-fit pt-3 pb-1 mb-10 rounded-2xl w-88 xl:w-82 xl:min-w-82 mt-9 mr-auto"></div>
    )
  );
}

export default Recent;
