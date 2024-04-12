import moment from "moment";
import Vote from "../Vote";
import Share from "../Share";
import SaveComment from "./SaveComment";
import { useEffect } from "react";

const PostComment = ({
  id,
  postId,
  isImage,
  username,
  content,
  createdAt,
  netVote,
  isUpvoted,
  isDownvoted,
  profilePicture,
  isSaved 
}) => {


  return (
    <div className="px-4 mt-2">
      <div className="w-full mt-6 flex flex-row justify-start items-center overflow-hidden">
        <div className=" bg-reddit_greenyDark flex flex-row justify-start items-center">
          <img src={profilePicture}
            alt="avatar"
            className="h-9 w-9 rounded-full"
          />
          <p className="text-white text-xs font-bold ml-3">{username}</p>
          <p className="text-gray-400 text-xs  ml-2">
            • {moment(createdAt).fromNow()}
          </p>
        </div>
      </div>
      <div className="w-full mt-2 flex flex-row justify-start items-center overflow-hidden">
        <div
          hidden={isImage}
          className="ml-9 bg-reddit_greenyDark flex flex-row justify-start items-center"
        >
          <p className="text-white text-sm ml-3">{content}</p>
        </div>
        <div hidden={!isImage}
          className="ml-12 bg-reddit_greenyDark flex flex-row justify-start items-center"
        >
          <img
            src={content}
            alt="image"
            className="max-w-60 max-h-60 object-cover"
          />
        </div>
      </div>
      <div className="w-full ml-12 flex flex-wrap justify-start items-center">
        <div className="mt-3">
          <Vote
            id={id}
            netVotes={netVote}
            isUpvoted={isUpvoted}
            isDownvoted={isDownvoted}
          />
        </div>

        <div className="ml-3 mt-3">
          <Share id={id} />
        </div>
        <div className="ml-3 mt-3">
          <SaveComment id={id} Saved={isSaved} />
        </div>
      </div>
    </div>

  );
}

export default PostComment;