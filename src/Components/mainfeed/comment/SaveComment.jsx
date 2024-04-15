import { useState } from "react";
import { Save } from "./CommentUtils";
/**
 * SaveComment is a React component that allows the user to save or unsave a comment.
 * It displays a button that, when clicked, saves or unsaves the comment.
 *
 * @component
 * @param {Object} props - The props for the SaveComment component.
 * @param {string} props.id - The ID of the comment to save or unsave.
 * @param {boolean} props.Saved - Whether the comment is saved by the current user.
 * @returns {JSX.Element}
 *  */
function SaveComment({ id, Saved }) {
  const [isSaved, setIsSaved] = useState(Saved);

  async function handleClickSave() {
    setIsSaved((prev) => !prev);
    if (!await Save(id, isSaved)) {
      setIsSaved((prev) => !prev);
    }
  }

  return (
    <div
      id={id+"_save"}
      className="flex flex-row items-center w-full h-8 justify-center  bg-reddit_search hover:bg-reddit_search_light rounded-3xl"
      onClick={handleClickSave}
    >
      {!isSaved && (
        <div className="p-2 cursor-pointer flex flex-row items-center justify-center">
          <svg
            className="h-4 w-4 text-white "
            rpl=""
            fill="currentColor"
            height="20"
            icon-name="save-outline"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.114 20A1.117 1.117 0 0 1 3 18.884V2.628A1.629 1.629 0 0 1 4.628 1h10.744A1.63 1.63 0 0 1 17 2.628v16.245a1.12 1.12 0 0 1-1.718.946L10 16.479l-5.291 3.346a1.11 1.11 0 0 1-.595.175Zm.514-17.75a.378.378 0 0 0-.378.378v16.009L10 15l5.75 3.636V2.628a.378.378 0 0 0-.378-.378H4.628Z"></path>{" "}
          </svg>
          <p className="ml-2 text-gray-300 text-sm">Save</p>
        </div>
      )}

      {isSaved && (
        <div className="p-2 cursor-pointer flex flex-row items-center justify-center">
          <svg
            className="h-4 w-6 text-white "
            rpl=""
            fill="currentColor"
            height="20"
            icon-name="save-fill"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            {" "}
            <path d="M15.372 1H4.628A1.629 1.629 0 0 0 3 2.628v16.256a1.113 1.113 0 0 0 1.709.941L10 16.479l5.282 3.34A1.12 1.12 0 0 0 17 18.873V2.628A1.63 1.63 0 0 0 15.372 1Z"></path>
          </svg>
          <p className="ml-2 mr-2 text-gray-300 text-sm">Remove from saved</p>
        </div>
      )}
    </div>
  );
}

export default SaveComment;
