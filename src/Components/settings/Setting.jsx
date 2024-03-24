import { useState } from "react";
import SimpleMenu from "./components/SimpleMenu";
import { notify } from "./components/CustomToast";
import ToggleButton from "./components/ToggleButton";
import RegularButton from "./components/RegularButton";
import { changeSetting } from "./utils/ChangeSetting";

function Setting({
  title,
  message,
  clickableID,
  settingName,
  pageName,
  setUserSettings,
  // Toggle Button,
  toggleButton,
  isToggled,
  // Regular Button,
  regularButton,
  // Menu,
  menuItems,
  selectedItem,
  // Extra
  overrideOnClick,
}) {
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    menuItems?.find((item) => item.name === selectedItem)?.name || "Select"
  );
  const [isToggleOn, setIsToggleOn] = useState(isToggled);

  async function onRegularButtonOnClick() {
    if (!overrideOnClick) {
      const res = await changeSetting(pageName, settingName);

      if (res) {
        console.log(res.data);
        setUserSettings(res.data);
        notify("Changes saved");
      } else notify("Failed to save changes");
    } else await overrideOnClick();
  }

  async function onToggleButtonOnClick() {
    const res = await changeSetting(pageName, settingName, !isToggleOn);
    if (res) {
      setIsToggleOn(!isToggleOn);
      setUserSettings(res.data);
      notify("Changes saved");
    } else notify("Failed to save changes");
  }

  async function onMenuItemSelect(item) {
    const res = await changeSetting(pageName, settingName, item);
    if (res) {
      setSelectedMenuItem(item);
      setUserSettings(res.data);
      notify("Changes saved");
    } else notify("Failed to save changes :(");
  }

  return (
    <>
      <div className="flex flex-row max-w-3xl mb-2 justify-end mt-10 ">
        <div className="flex flex-col w-full items-start justify center">
          <h4 className="text-white text-md font-plex ">{title}</h4>
          <h6 className="text-gray-600 text-xs font-bold font-plex mt-1">
            {message}
          </h6>
        </div>

        {toggleButton && (
          <ToggleButton
            isToggleOn={isToggleOn}
            onToggleButtonOnClick={onToggleButtonOnClick}
            clickableID={clickableID}
          />
        )}

        {regularButton && (
          <RegularButton
            regularButton={regularButton}
            onRegularButtonOnClick={onRegularButtonOnClick}
            clickableID={clickableID}
          />
        )}

        {menuItems && (
          <div className="flex flex-row justify-end w-full items-center mb-3 pr-1 bg-reddit_darkGray">
            <SimpleMenu
              id={clickableID?.toLowerCase()}
              title={selectedMenuItem}
              menuItems={menuItems}
              onSelect={onMenuItemSelect}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Setting;
