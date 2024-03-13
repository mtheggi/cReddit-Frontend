import { useState } from "react";

function TextArea({ id, placeholder, rows = 4, cols = 100, maxLength }) {
  const [text, setText] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  return (
    <div className="mt-2">
      <textarea
        id={id}
        className="block rounded-md md:w-172 xs:w-100 w-97% px-2.5 pb-2.5 pt-2 text-sm text-gray-300 bg-reddit_greenyDark dark:bg-gray-700 border-1 border-gray-500 focus:border-3 focus:border-gray-300"
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        value={text}
        onChange={handleTextChange}
        maxLength={maxLength}
      ></textarea>

      <p
        className={`${
          maxLength - text.length == 0 ? "text-red" : "text-gray-600"
        } text-xs font-plex mt-2`}
      >
        {maxLength - text.length} Characters remaining
      </p>
    </div>
  );
}

export default TextArea;
