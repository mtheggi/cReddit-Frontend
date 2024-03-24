function RegularButton({ regularButton, onRegularButtonOnClick, clickableID }) {
  return (
    <div className="flex flex-row justify-end w-full items-center pb-1 pr-1">
      <button
        id={clickableID?.toLowerCase()}
        className="text-white text-sm font-bold font-plex bg-reddit_darkGray p-2 rounded-3xl border border-reddit_darkGray hover:bg-gray-800 hover:border-white"
        onClick={onRegularButtonOnClick}
      >
        <span className="pl-2 pr-2">{regularButton}</span>
      </button>
    </div>
  );
}

export default RegularButton;
