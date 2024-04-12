import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { forwardRef } from 'react';

function DropCommentImage({ id, handleFileChange }, ref) {
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
      className={`relative cursor-pointer rounded-lg w-full flex flex-col justify-center items-center text-center ${isDragActive ? "bg-green-600" : ""
        } text-gray-600 font-plex text-sm font-bold`}
    >
      <input {...getInputProps()} ref={ref} />
     
      {previewSrc && 
        <div className="w-full p-2 flex flex-row justify-center  rounded-md ">
          <img className="w-full rounded-xl" src={previewSrc} alt="preview" />
        </div>}
    </div>
  );
}

export default forwardRef(DropCommentImage);