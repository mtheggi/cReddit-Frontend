import { useState } from "react";
import SimpleMenu from "./components/SimpleMenu";
import { notify } from "./components/CustomToast";
import ToggleButton from "./components/ToggleButton";
import RegularButton from "./components/RegularButton";
import { changeSetting } from "./utils/ChangeSetting";
/**
 * Setting is a React component that displays a setting item.
 * It can display a toggle button, a regular button, or a menu, depending on the props.
 * It also allows the user to change the setting.
 *
 * @component
 * @param {Object} props - The props for the Setting component.
 * @param {string} props.title - The title of the setting.
 * @param {string} props.message - The message to display when the setting is changed.
 * @param {string} props.clickableID - The ID of the clickable element in the setting.
 * @param {string} props.settingName - The name of the setting.
 * @param {string} props.pageName - The name of the page that the setting is on.
 * @param {Function} props.setUserSettings - A function to update the user settings.
 * @param {boolean} props.toggleButton - Whether to display a toggle button.
 * @param {boolean} props.isToggled - Whether the toggle button is toggled.
 * @param {boolean} props.regularButton - Whether to display a regular button.
 * @param {string[]} props.menuItems - The items for the menu, if a menu is displayed.
 * @param {string} props.selectedItem - The selected item in the menu.
 * @param {Function} props.overrideOnClick - A function to override the default onClick behavior.
 */
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
