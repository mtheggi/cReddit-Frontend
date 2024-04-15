import CommentSection from "./CommentSection";
/**
 * AddComment is a React component that allows the user to add a comment to a post.
 * It displays a button that, when clicked, shows the CommentSection component.
 *
 * @component
 * @param {Object} props - The props for the AddComment component.
 * @param {string} props.postId - The ID of the post to add a comment to.
 * @param {boolean} props.isCommenting - Whether the user is currently adding a comment.
 * @param {Function} props.setIsCommenting - A function to set the isCommenting state.
 * @param {Function} props.onAddComment - A function to call when a comment is added.
 */
function AddComment({
  postId,
  isCommenting,
  setIsCommenting,
  onAddComment,
  setPostComments,
  selectedSort,
}) {
  return (
    <div className="w-full mt-3 inline-flex flex-row  justify-center">
      <button id="add_comment"
        className="w-full h-10 bg-greenyDark flex flex-row items-center rounded-3xl border border-gray-600 font-plex"
        hidden={isCommenting}
        onClick={() => {
          setIsCommenting(true);
        }}
      >
        <p className="text-gray-600 text-sm ml-5">Add Comment</p>
      </button>

      <CommentSection
        setPostComments={setPostComments}
        postId={postId}
        onAddComment={onAddComment}
        isCommenting={isCommenting}
        setIsCommenting={setIsCommenting}
        selectedSort={selectedSort}
        setIsNewCommentCreated={setIsNewCommentCreated}
      />
    </div>
  );
}

export default AddComment;
