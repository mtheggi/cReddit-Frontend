function ToggleButton({ isToggleOn, onToggleButtonOnClick, clickableID }) {
  return (
    <div className="flex flex-row justify-end w-full items-center pb-1 pr-1">
      <label className="inline-flex cursor-pointer items-center">
        <input
          id={clickableID?.toLowerCase()}
          type="checkbox"
          checked={isToggleOn}
          onChange={onToggleButtonOnClick}
          className="sr-only peer"
          style={{ position: "absolute", height: "0", width: "0" }}
        ></input>
        <div className="relative w-10 h-6 bg-gray-800 focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-3/4 rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
}

export default ToggleButton;
