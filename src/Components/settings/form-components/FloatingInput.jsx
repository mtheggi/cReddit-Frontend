function FloatingInput({ label, buttonText, id="" }) {
  const inputId = id ? "floating_helper_" + id : "floating_helper";
  return (
    <div className="relative w-90% max-w-3xl mt-2">
      <input
        type="text"
        
        id={inputId}
        aria-describedby="floating_helper_text"
        className="block rounded-md px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-reddit_greenyDark dark:bg-gray-700 border-1 border-gray-500 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-gray-300  peer"
        placeholder=" "
      />
      <label
        htmlFor={inputId}
        className="pl-3 absolute text-xs font-bold font-plex text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-2 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-gray-400 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
      >
        {label}
      </label>

      <button className="absolute right-0 top-0 h-full w-12 bg-reddit_darkGray rounded-r-md text-gray-700 font-bold font-plex text-md mr-5 pb-1">
        {buttonText}
      </button>
    </div>
  );
}

export default FloatingInput;
