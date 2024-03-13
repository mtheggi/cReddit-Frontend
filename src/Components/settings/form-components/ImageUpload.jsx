import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function ImageUpload({ id }) {
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
      className={`border-2 border-dashed border-gray-300 rounded-lg p-5 max-w-xs h-40 flex flex-col justify-center items-center text-center ${
        isDragActive ? "bg-reddit_greenyDark" : "bg-gray-700"
      } text-gray-600 font-plex text-sm font-bold mt-2`}
    >
      <input {...getInputProps()} />

      <svg className="mb-2" viewBox="0 0 36 36" version="1.1">
        <circle cx="18" cy="18" fill="#fff" r="18" stroke="inherit"></circle>
        <path
          clipRule="evenodd"
          d="m25.2 16.8001h-6v-6c0-.6624-.5364-1.2-1.2-1.2s-1.2.5376-1.2 1.2v6h-6c-.6636 0-1.20002.5376-1.20002 1.2s.53642 1.2 1.20002 1.2h6v6c0 .6624.5364 1.2 1.2 1.2s1.2-.5376 1.2-1.2v-6h6c.6636 0 1.2-.5376 1.2-1.2s-.5364-1.2-1.2-1.2z"
          fill="inherit"
          fillRule="evenodd"
        ></path>
      </svg>

      <p className="text-white font-plex text-xs font-bold w-full">
        Drag and Drop or Upload Avatar Image
      </p>
    </div>
  );
}

export default ImageUpload;
