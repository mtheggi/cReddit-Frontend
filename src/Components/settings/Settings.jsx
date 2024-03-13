import { useState } from "react";
import Account from "./Account";
import Profile from "./Profile";
import SafetyAndPrivacy from "./SafetyAndPrivacy";
import Emails from "./Emails";
import Notifications from "./Notifications";
import Feed from "./Feed";

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
    <div className="flex min-w-88 mt-4 flex-col w-full p-4 pb-0 pt-0 justify-center items-center">
      <div className="w-full mt-15 max-w-6xl">
        <h1 className="text-white text-lg font-bold font-plex">
          User Settings
        </h1>
      </div>



      <div className="flex flex-wrap w-full mt-4 max-w-6xl">
        {Tabs.map((tab, i) => {
          return (
            <a
              key={tab}
              id={`setting-navbar-${tab.toLowerCase()}-tab`}
              className={`text-white text-sm font-bold font-plex pl-5 pr-5 pb-3 ${
                i == currTab ? "border-b-3 border-white" : ""
              }`}
            >
              <div className="cursor-pointer" onClick={() => onSetTab(i)}>
                {tab}
              </div>
            </a>
          );
        })}
      </div>

      <hr className=" border-gray-500 mt-0 w-100% max-w-6xl " />

      <div className="flex flex-row w-full mt-10 mb-5 max-w-6xl">
        {currTab == 0 && <Account />}
        {currTab == 1 && <Profile />}
        {currTab == 2 && <SafetyAndPrivacy />}
        {currTab == 3 && <Feed />}
        {currTab == 4 && <Notifications />}
        {currTab == 5 && <Emails />}
      </div>
    </div>
  );
}
export default Settings;

/* ID Documentation */

// Settings Navbar {id, key}
//    -  Account {setting-tab-account-tab, Account}
//    -  Profile {setting-tab-profile-tab, Profile}
//    -  Safety & Privacy {setting-tab-safety & privacy-tab, Safety & Privacy}
//    -  Feed Settings {setting-tab-feed settings-tab, Feed Settings}
//    -  Notifications {setting-tab-notifications-tab, Notifications}
//    -  Emails {setting-tab-emails-tab, Emails}
//
