import { useState, useEffect } from "react";
import { getRequest } from "@/services/Requests";
import ScheduledPost from "./ScheduledPost.jsx";
import { baseUrl } from "@/constants";

const SchedulePost = ({ selectedSubReddit }) => {
  const [posts, setPosts] = useState([]);

  const currentUrl = window.location.origin;

  useEffect(() => {
    const getPosts = async () => {
      const response = await getRequest(
        `${baseUrl}/subreddit/${selectedSubReddit.name}/scheduled-posts`
      );
      if (response.status === 200 || response.status === 201) {
        setPosts(response.data);
        console.log(response.data);
      }
    };
    getPosts();
  }, []);

  return (
    <div id="mod_content" className="flex flex-col  w-full h-full">
      <div className="w-full px-4 mt-[9px] h-[150px] min-h-[150px] flex flex-col border-b-[1px] border-[#252C2E]">
        <h1 className="text-[33px] font-semibold text-gray-200">
          Schedule Post
        </h1>

        <p className="text-gray-200 mt-1 font-light text-[14px]">
          Anything that needs moderator attention will show up in needs review.
        </p>

        <a
          href={`${currentUrl}/submit/mod/r/${selectedSubReddit.name}`}
          className="bg-gray-700 hover:bg-gray-500 rounded-full px-[5px] py-[2px] my-[10px] text-white w-[150px] text-[14px]"
        >
          <button className="w-full h-full focus:outline-none">
            Schedule Post
          </button>
        </a>
      </div>

      <div id="mapped_mod" className="flex flex-col h-full w-full">
      {posts.map((post, index) => (
          <div
            key={index}
            className="w-full flex-col hover:bg-reddit_hover px-[32px] border-b-[1px] border-[#252C2E] py-4"
          >
            <ScheduledPost
              username={post.username}
              profilePicture = {post.profilePicture}
              content={post.content}
              title={post.title}
              isSpoiler={post.isSpoiler}
              isNsfw={post.isNsfw}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchedulePost;
