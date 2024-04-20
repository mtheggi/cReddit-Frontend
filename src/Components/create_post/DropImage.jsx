import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

/**
 * DropImage is a React component that provides a dropzone for image files.
 * It displays a preview of the dropped image and allows the user to remove the image.
 * 
 * @component 
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The id of the dropzone.
 * @param {Function} props.handleFileChange - The function to call when an image file is dropped.
 * @param {string} props.userProfilePicture - The URL of the user's profile picture.
 * @param {string} props.userBanner - The URL of the user's banner.
 * @returns  {JSX.Element} The rendered DropImage component.
 */
function DropImage({ id, handleFileChange, userProfilePicture, userBanner }) {

  const [previewSrc, setPreviewSrc] = useState(null);


  useEffect(() => {

    if(userProfilePicture)
    {
      setPreviewSrc(userProfilePicture);
    }

    if(userBanner)
    {
      setPreviewSrc(userBanner);
   
    }
  }, [userBanner]);


  /**
 * Callback function to handle the drop event.
 * It calls the handleFileChange function with the dropped files and sets the preview source to the first dropped file.
 * 
 * @callback onDrop
 * @param {Array<File>} acceptedFiles - The files dropped on the dropzone.
 * @param {Function} handleFileChange - The function to call when files are dropped.
 * @param {Function} setPreviewSrc - The function to set the preview source.
 */
  const onDrop = useCallback((acceptedFiles) => {
    handleFileChange({
      target: {
        files: acceptedFiles,
      },
    });
    setPreviewSrc(URL.createObjectURL(acceptedFiles[0]));
  }, [handleFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });


  /**
 * Function to remove the image.
 * It stops the event propagation, sets the preview source to null, and calls the handleFileChange function with null.
 * 
 * @function removeImage
 * @param {Event} event - The event object.
 * @param {Function} handleFileChange - The function to call when the image is removed.
 * @param {Function} setPreviewSrc - The function to set the preview source.
 */
  const removeImage = (event) => {
    if(id.includes("settings"))
    return;
    event.stopPropagation();
    setPreviewSrc(null);
    handleFileChange({
      target: {
        files: [null],
      },
    });
  };

  return (
    <div
      {...getRootProps()}
      id={id}
      className={`border-1 border-dashed border-gray-400 cursor-pointer rounded-lg h-full flex flex-col justify-center items-center text-center ${isDragActive ? "bg-green-600" : ""
        } text-gray-600 font-plex text-sm font-bold`}
    >
      <input {...getInputProps()} />
      {!previewSrc && <p className="text-white font-plex text-sm font-bold w-full">
        Drag and Drop or Upload
      </p>}
      {previewSrc && <div className="w-full px-2 py-2 h-full relative justify-center flex flex-row ">
        <div className="w-96 h-full py-1 flex flex-row justify-center bg-black rounded-md ">
          <img className="h-full" src={previewSrc} alt="preview" />
        </div>
        <div className={`absolute ${id.includes("settings")?"hidden":"hover:bg-reddit_search_light"} rounded-full w-8 h-8 flex flex-row justify-center items-center right-2 top-1`} onClick={removeImage}>
          <XMarkIcon className="w-7 text-gray-200 h-7" />
        </div>
      </div>}
    </div>
  );
}

export default DropImage;