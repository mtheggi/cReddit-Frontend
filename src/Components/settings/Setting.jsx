import { useState } from "react";
import { Dropdown } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";
import SimpleMenu from "./form-components/SimpleMenu";

function Setting({
  title,
  message,
  toggleButton,
  regularButton,
  menuItems,
  regularButtonOnClick,
  toggleButtonOnClick,
  isToggled,
}) {
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    menuItems ? menuItems[0].name : ""
  );

  return (
    <>
      <div className="flex flex-row max-w-3xl mb-2 justify-end mt-10">
        <div className="flex flex-col w-full items-start justify center">
          <h4 className="text-white text-md font-plex ">{title}</h4>
          <h6 className="text-gray-600 text-xs font-bold font-plex mt-1">
            {message}
          </h6>
        </div>

        {toggleButton && (
          <div className="flex flex-row justify-end w-full items-center pb-1 pr-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={isToggled}
                onChange={toggleButtonOnClick}
                className="sr-only peer"
                style={{ position: "absolute", height: "0", width: "0" }}
              ></input>
              <div className="relative w-10 h-6 bg-gray-800 focus:ring-blue-300 focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-3/4 rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        )}

        {regularButton && (
          <div className="flex flex-row justify-end w-full items-center pb-1 pr-1">
            <button
              className="text-white text-sm font-bold font-plex bg-reddit_darkGray p-2 rounded-3xl border border-reddit_darkGray hover:bg-gray-800 hover:border-white"
              onClick={regularButtonOnClick}
            >
              <span className="pl-2 pr-2">{regularButton}</span>
            </button>
          </div>
        )}

        {menuItems && (
          <div className="flex flex-row justify-end w-full items-center mb-3 pr-1 bg-reddit_darkGray">
            <SimpleMenu
              title={selectedMenuItem}
              menuItems={menuItems}
              onSelect={setSelectedMenuItem}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Setting;
