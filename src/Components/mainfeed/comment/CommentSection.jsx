import { useState, useRef, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import CancelComment from "./CancelComment";
import { submitComment } from "./CommentUtils";

function CommentSection({
  postId,
  isCommenting,
  setIsCommenting,
  onAddComment,
  setPostComments
}) {
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [buttonColor, setButtonColor] = useState("#4d4608");
  const [modalShow, setModalShow] = useState(false);
  const textareaRef = useRef();

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setComment("");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if (isCommenting) {
      textareaRef.current.focus();
    }
  }, [isCommenting]);

  async function addComment() {
    const newComment = await submitComment(postId, image, comment);
    if (!newComment) return;
    onAddComment(newComment);
    setPostComments((prevComments) => [newComment, ...prevComments]);    
    setComment("");
    setImage(null);
    setIsCommenting(false);
  }

  return (
    <div
      className="w-full  bg-greenyDark flex flex-col items-center rounded-2xl font-plex border-1 border-gray-500 "
      hidden={!isCommenting}
    >
      {!image && (
        <textarea
          disabled={image ? true : false}
          ref={textareaRef}
          className="w-full block resize-none rounded-2xl pl-5 pr-5 pb-2 pt-2 text-sm text-gray-300 bg-reddit_greenyDark dark:bg-gray-700 border-0 outline-none"
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

      {image && (
        <img
          className="object-cover w-full h-full rounded-lg"
          src={image}
          alt="preview"
        />
      )}
      <div className="w-full flex flex-row">
        <div
          {...getRootProps()}
          className="w-full flex flex-row justify-start items-center"
          hidden={image ? true : false}
        >
          <input {...getInputProps()} />
          <svg
            rpl=""
            fill="currentColor"
            height="16"
            viewBox="0 0 20 20"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-500 text-bold ml-4 h-5 w-5 hover:text-gray-200"
          >
            {" "}
            <path d="M13 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 4.75a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5Z"></path>
            <path d="M17.375 1H2.625A1.627 1.627 0 0 0 1 2.625v14.75A1.627 1.627 0 0 0 2.625 19h14.75A1.627 1.627 0 0 0 19 17.375V2.625A1.627 1.627 0 0 0 17.375 1ZM2.25 17.375v-2.683L4.9 12.04a2.332 2.332 0 0 1 3.3 0l5.71 5.71H2.625a.375.375 0 0 1-.375-.375Zm15.5 0a.375.375 0 0 1-.375.375h-1.7l-6.6-6.594a3.582 3.582 0 0 0-5.063 0L2.25 12.925v-10.3a.375.375 0 0 1 .375-.375h14.75a.375.375 0 0 1 .375.375v14.75Z"></path>
          </svg>
        </div>

        <div className="w-full flex flex-row p-2 pb-1 justify-end">
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
          <button
            onClick={addComment}
            className="h-8 items-center rounded-3xl font-plex ml-2 "
            style={{ backgroundColor: buttonColor }}
            onMouseEnter={() => setButtonColor("#6b610c")}
            onMouseLeave={() => setButtonColor("#4d4608")}
          >
            <p className="text-white text-xs font-bold pl-3 pr-3 ">Comment</p>
          </button>
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
