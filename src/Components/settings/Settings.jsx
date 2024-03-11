import { useState } from "react";
import Account from "./Account";
import SafetyAndPrivacy from "./SafetyAndPrivacy";

const Tabs = [
  "Account",
  "Profile",
  "Safety & Privacy",
  "Feed Settings",
  "Notifications",
  "Emails",
];

function Settings() {
  const [currTab, setCurrTab] = useState(0);

  function onSetTab(i) {
    setCurrTab(i);
  }

  return (
    <>
      <div className="w-full mt-20 xl:ml-15% xs:ml-10">
        <h1 className="text-white text-lg font-bold font-plex">
          User Settings
        </h1>
      </div>

      <div className="flex flex-row w-full mt-10 2 xl:ml-15% xs:ml-10">
        {Tabs.map((tab, i) => {
          return (
            <a
              key={i}
              id={`setting-tab-${i}`}
              className={`text-white text-sm font-bold font-plex pl-5 pr-5 pb-3 ${
                i == currTab ? "border-b-3 border-white" : ""
              }`}
              onClick={() => onSetTab(i)}
            >
              {tab}
            </a>
          );
        })}
      </div>
      <hr className=" border-gray-500 mt-0 xl:ml-14% xs:ml-6 w-100% max-w-5xl " />

      <div className="flex flex-row w-full mt-10 mb-10 xl:ml-15% xs:ml-10">
        {currTab == 0 && <Account />}
        {currTab == 1 && <Profile />}
        {currTab == 2 && <SafetyAndPrivacy />}
        {/* {currTab == 3 && <FeedSettings />} */}
        {/* {currTab == 4 && <Notifications />} */}
        {/* {currTab == 5 && <Emails />} */}
      </div>
    </>
  );
}
export default Settings;
