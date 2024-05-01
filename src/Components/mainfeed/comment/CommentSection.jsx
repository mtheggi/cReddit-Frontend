import { useState, useRef, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import CancelComment from "./CancelComment";
import { submitComment } from "./CommentUtils";
import DropCommentImage from "./DropCommentImage";
import { getRequest } from "../../../services/Requests";
import { baseUrl } from "../../../constants";
import PostComment from "./PostComment";
/**
 * CommentSection is a React component that allows the user to add a comment to a post.
 * It includes a text area for the user to write their comment and a dropzone for the user to add an image to their comment.
 * It also includes a CancelComment component that allows the user to cancel adding a comment.
 *
 * @component
 * @param {Object} props - The props for the CommentSection component.
 * @param {string} props.postId - The ID of the post to add a comment to.
 * @param {boolean} props.isCommenting - Whether the user is currently adding a comment.
 * @param {Function} props.setIsCommenting - A function to set the isCommenting state.
 */

function CommentSection({
  postId,
  isCommenting,
  setIsCommenting,
  setPostComments,
  setIsPaginationLoading,
  setLoadingAddComment
}) {
  /**
  * State variable for the comment text. Initially set to an empty string.
  * @type {string}
  */
  const [comment, setComment] = useState("");

  /**
   * State variable for the comment image. Initially set to null.
   * @type {Object|null}
   */
  const [image, setImage] = useState(null);
  /**
   * State variable for the color of the button. Initially set to "#4d4608".
   * @type {string}
   */
  const [buttonColor, setButtonColor] = useState("#4d4608");
  /**
    * State variable for whether the modal is shown. Initially set to false.
    * @type {boolean}
    */
  const [modalShow, setModalShow] = useState(false);
  /**
   * Ref for the text area.
   * @type {React.RefObject}
   */
  const textareaRef = useRef();
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  }


  useEffect(() => {
    if (isCommenting) {
      textareaRef.current.focus();
    }
  }, [isCommenting]);


  const addComment = async () => {
    if (!(image || (comment && comment.trim() !== ""))) return;
    setIsPaginationLoading(true);
    setLoadingAddComment(true);
    const newComment = await submitComment(postId, image, comment);
    if (!newComment) {
      setIsPaginationLoading(false);
      setLoadingAddComment(false);
      return;
    }
    setPostComments(prev => [newComment, ...prev]);
    setIsPaginationLoading(false);
    setLoadingAddComment(false);
    setComment("");
    setImage(null);
    setIsCommenting(false);
  }

  const dropzoneRef = useRef();

  return (
    <div
      className="w-full  bg-greenyDark flex flex-col relative items-center rounded-2xl font-plex border-1 border-gray-500 "
      hidden={!isCommenting}
    >
      <div className="h-fit">
        <DropCommentImage id="comment" handleFileChange={handleFileChange} image={image} ref={dropzoneRef} />
      </div>

      {!image && (
        <textarea id="comment_text"

          disabled={image ? true : false}
          ref={textareaRef}
          className="w-full block resize-none rounded-2xl pl-3 pr-5 pb-2 pt-2 text-sm text-gray-300 bg-reddit_greenyDark dark:bg-gray-700 border-0 outline-none"
          cols="10"
          style={{ outline: "none", boxShadow: "none" }}
          onInput={(e) => {
            e.target.style.height = "inherit";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        ></textarea>
      )}

      <div className="w-full flex flex-row">
        <div className="w-full flex flex-row p-2 pb-1 items-end  justify-end">

          <div id="comment_img" className="w-fit h-fit cursor-pointer mr-auto" onClick={() => dropzoneRef.current.click()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </div>

          <button id="cancel_comment"
            className="bg-gray-800 h-8 items-center rounded-3xl font-plex hover:bg-gray-700"
            onClick={() => {
              if (comment.length || image) setModalShow(true);
              else {
                setIsCommenting(false);
                setComment("");
              }
            }}
          >
            <p className="text-white text-xs font-bold pl-3 pr-3">Cancel</p>
          </button>

          <div id="submit_comment"
            onClick={() => addComment()}
            className={`h-8 items-center flex flex-row rounded-3xl font-plex ml-2 ${(image || (comment && comment.trim() !== "")) ? "cursor-pointer" : "cursor-not-allowed"} `}
            style={{ backgroundColor: buttonColor }}
            onMouseEnter={() => setButtonColor("#6b610c")}
            onMouseLeave={() => setButtonColor("#4d4608")}
          >
            <p className="text-white text-xs font-bold pl-3 pr-3 ">Comment</p>
          </div>



        </div>
      </div>

      <CancelComment
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}

        onDiscard={() => {
          setModalShow(false);
          setComment("");
          setImage(null);
          setIsCommenting(false);
        }}
      />
    </div>
  );
}

export default CommentSection;
