import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { forwardRef } from 'react';

function DropCommentImage({ id, handleFileChange, image }, ref) {
  const [previewSrc, setPreviewSrc] = useState(null);
  /**
   * Callback for when files are dropped onto the dropzone.
   * It sets the image state to the first accepted file and reads the file as a base64 string and as an ArrayBuffer.
   * @param {File[]} acceptedFiles - The files dropped onto the dropzone.
   */
  const onDrop = useCallback((acceptedFiles) => {
    handleFileChange({
      target: {
        files: acceptedFiles,
      },
    });
    setPreviewSrc(URL.createObjectURL(acceptedFiles[0]));
  }, [handleFileChange]);

  useEffect(() => {
    if (!image) {
      setPreviewSrc(null);
    }
  }, [image]);

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
        <div className="w-full p-2 mt-2 flex flex-row justify-center  rounded-md ">
          <img className="w-full rounded-xl" src={previewSrc} alt="preview" />
        </div>}
    </div>
  );
}

export default forwardRef(DropCommentImage);