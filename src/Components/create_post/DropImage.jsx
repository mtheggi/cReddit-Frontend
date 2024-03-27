import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function DropImage({ id }) {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      id={id}
      className={`border-1 border-dashed border-gray-400 cursor-pointer rounded-lg h-full flex flex-col justify-center items-center text-center ${
        isDragActive ? "bg-green-600" : ""
      } text-gray-600 font-plex text-sm font-bold`}
    >
      <input {...getInputProps()} />
      <p className="text-white font-plex text-sm font-bold w-full">
        Drag and Drop or Upload
      </p>
    </div>
  );
}

export default DropImage;
