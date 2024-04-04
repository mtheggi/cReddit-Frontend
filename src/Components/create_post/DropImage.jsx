import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

function DropImage({ id, handleFileChange }) {
  const [previewSrc, setPreviewSrc] = useState(null);

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

  const removeImage = (event) => {
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
        <div className="absolute hover:bg-reddit_search_light rounded-full w-9 h-9 flex flex-row justify-center items-center right-2 top-1" onClick={removeImage}>
          <XMarkIcon className="w-7 text-gray-200 h-7"/>
        </div>
      </div>}
    </div>
  );
}

export default DropImage;