import moment from "moment";
import Vote from "../Vote";
import Share from "../Share";
import SaveComment from "./SaveComment";
import { useEffect } from "react";
/**
 * PostComment is a React component that displays a comment on a post.
 * It shows the comment's content, the username of the commenter, the comment's creation and update times, and the commenter's profile picture.
 * It also includes Vote, Share, and SaveComment components for the comment.
 *
 * @component
 * @param {Object} props - The props for the PostComment component.
 * @param {string} props.id - The ID of the comment.
 * @param {string} props.username - The username of the commenter.
 * @param {string} props.content - The content of the comment.
 * @param {boolean} props.isImage - Whether the comment includes an image.
 * @param {string} props.createdAt - The creation time of the comment.
 * @param {string} props.updatedAt - The update time of the comment.
 * @param {string} props.profilePicture - The URL of the commenter's profile picture.
 * @param {number} props.netVote - The net vote count of the comment.
 * @param {boolean} props.isUpvoted - Whether the comment is upvoted by the current user.
 * @param {boolean} props.isDownvoted - Whether the comment is downvoted by the current user.
 * @param {boolean} props.isSaved - Whether the comment is saved by the current user.
 */
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
  isSaved,
  testId,
  lastCommentElementRef
}) => {


  return (
    <div ref={lastCommentElementRef?lastCommentElementRef:null} className="px-4 mt-2">
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
            className="max-w-60 rounded-md max-h-60 object-cover"
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
            testId={"_comment"}
          />
        </div>

        <div className="ml-3 mt-3">
          <Share id={id}
           testId={"_comment"} />
          
        </div>
        <div className="ml-3 mt-3">
          <SaveComment id={id} Saved={isSaved} />
        </div>
      </div>
    </div>

  );
}

export default PostComment;