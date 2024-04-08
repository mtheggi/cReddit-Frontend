import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import redditLogo from '../../assets/reddit_logo.png';
import Separator from '../sidebar/Nav-Icons/Separator';
// 50 pic, 70

const RecentRow = ({ id, post }) => {
    // const [postType, setPostType] = useState(post.type);
    const [containsImage, setContainsImage] = useState(post.type === 'Images & Video' ? true : false);
    const [isCommunity, setIscommunity] = useState(!post.communityName ? false : true);
    const [title, setTitle] = useState(null);
    const navigate = useNavigate();
    const handleSubmitPost = () => {
        if (!post.communityName) { navigate(`/u/${post.username}/comments/${id}`); }
        else { navigate(`/r/${post.communityName}/comments/${id}`); }
    }


    useEffect(() => {
        if (containsImage) {
            if (post.title.length < 50) {
                setTitle(post.title);
            } else {
                setTitle(post.title.slice(0, 50) + '...');
            }
        } else {
            if (post.title.length < 70) {
                setTitle(post.title);
            } else {
                setTitle(post.title.slice(0, 70) + '...');
            }
        }
    }, [])
    return (
        <div className='mt-2.5 flex flex-col  items-start'>
            <div className='flex flex-row px-3 w-full h-full justify-between'>

                <div className='flex flex-col h-full min-w-10/12'>

                    <a id={id + "_community"} href="" className='w-fit h-fit flex'>
                        <div className=' w-full h-8 flex no-select flex-row items-center'>
                            <img src={post.profilePicture} alt="profile_picture" className="w-7 h-7 rounded-xl" />
                            <p className='text-gray-400 font-normal text-xs ml-1.5 hover:underline cursor-pointer'>{isCommunity ? `r/${post.communityName}` : `u/${post.username}`}</p>
                        </div>
                    </a>

                    <div id={id + "_post_header"} onClick={handleSubmitPost} className='w-fit h-fit flex'>
                        <div className={`${containsImage ? 'max-w-56' : ''} w-full max-h-18 text-gray-400 text-sm py-2 font-semibold  overflow-auto break-words`}>
                            <h1 className='hover:underline no-select cursor-pointer'>{title}</h1>
                        </div>
                    </div>

                </div>

                {/* Todo: (already done, DONT DELETE) when the img div doesnt exist, then this div will dissapear, and text take all place */}
                {
                    containsImage && <div id={id + "_post_img"} onClick={handleSubmitPost} className='min-w-21 w-21 h-full no-select cursor-pointer'>
                        <img src={post.content} alt="" className='w-21 h-21 rounded-xl' style={{ objectFit: 'cover' }} />

                    </div>
                }
            </div >

            <div className='w-full flex h-6  mb-2.5 px-3 items-center text-gray-500 no-select'>
                <p className='text-xs mr-2 cursor-text'>{post.netVote} votes </p>
                <p className='mb-2'>.</p>
                <p className='text-xs ml-2 cursor-text'>{post.commentCount} Comments</p>
            </div>

        </div >

    );
}

export default RecentRow;