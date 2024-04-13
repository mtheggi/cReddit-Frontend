import { useState, useRef, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import CancelComment from "./CancelComment";
import { submitComment } from "./CommentUtils";
import DropCommentImage from "./DropCommentImage";
import { getRequest } from "../../../services/Requests";
import { baseUrl } from "../../../constants";
import PostComment from "./PostComment";


function CommentSection({
  postId,
  isCommenting,
  setIsCommenting,
  onAddComment,
  setPostComments,
  isImage,
  selectedSort
}) {
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [buttonColor, setButtonColor] = useState("#4d4608");
  const [modalShow, setModalShow] = useState(false);
  const textareaRef = useRef();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  }

  const getSinglePostComments = async (selectedPostId) => {
    const response = await getRequest(`${baseUrl}/post/${selectedPostId}/comments?sort=${selectedSort.toLowerCase()}`)
    if (response.status == 200 || response.status == 201) {
        setPostComments(response.data);
    }
    
}

  useEffect(() => {
    if (isCommenting) {
      textareaRef.current.focus();
    }
  }, [isCommenting]);

  async function addComment() {
    if(isImage && !image || !isImage && (!comment||comment.trim()=="")) return;
    const newComment = await submitComment(postId, image, comment, isImage);
    if (!newComment) return;
    onAddComment(newComment);
    await getSinglePostComments(postId);
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
      <div className=" mr-auto h-fit">
        <DropCommentImage id="comment" handleFileChange={handleFileChange} ref={dropzoneRef} />
      </div>
      {!image && (
        <textarea
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

          <div className="w-fit h-fit cursor-pointer mr-auto" onClick={() => dropzoneRef.current.click()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </div>

          <button
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
          <div 
            onClick={addComment}
            className={`h-8 items-center flex flex-row rounded-3xl font-plex ml-2 ${(isImage && !image || !isImage && (!comment||comment.trim()==""))?'cursor-not-allowed':"cursor-pointer"} `}
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
          setImage(null);
          setModalShow(false);
          setIsCommenting(false);
          setComment("");
        }}
      />
    </div>
  );
}

export default CommentSection;
