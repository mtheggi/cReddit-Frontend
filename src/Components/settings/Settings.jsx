import { useState, useEffect } from "react";
import { Routes, Route, Link, Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Account from "./Account";
import Profile from "./Profile";
import SafetyAndPrivacy from "./SafetyAndPrivacy";
import Emails from "./Emails";
import Notifications from "./Notifications";
import Feed from "./Feed";

import { getRequest } from "../../services/Requests";

const Tabs = [
  "Account",
  "Profile",
  "Safety & Privacy",
  "Feed Settings",
  "Notifications",
  "Emails",
];

const TabsPath = [
  "account",
  "profile",
  "privacy",
  "feed",
  "notifications",
  "emails",
];

const initCurrTab = () => {
  const path = window.location.pathname;
  console.log(path);
  const tab = path.split("/")[2];
  console.log(tab, TabsPath.indexOf(tab));
  const index = TabsPath.indexOf(tab);
  return index != -1 ? index : 0;
};

function Settings() {
  const [userSettings, setUserSettings] = useState(null);
  const [currTab, setCurrTab] = useState(initCurrTab());

  const onSetTab = (index) => {
    setCurrTab(index);
  };

  useEffect(() => {
    getRequest("/user/settings")
      .then((res) => {
        console.log(res.data);
        setUserSettings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <ToastContainer
        autoClose={4000}
        pauseOnHover={false}
        position={"bottom-center"}
        hideProgressBar={true}
      />
      <div className="flex min-w-88 mt-4 flex-col w-full p-4 pb-0 pt-0 justify-center items-center">
        <div className="w-full mt-15 max-w-6xl">
          <h1 className="text-white text-lg font-bold font-plex">
            User Settings
          </h1>
        </div>
        <div className="flex flex-wrap w-full mt-2 max-w-6xl">
          {Tabs.map((tab, i) => {
            return (
              <Link
                key={tab}
                to={TabsPath[i]}
                id={`setting-navbar-${tab.toLowerCase()}-tab`}
                className={`text-white text-sm font-bold font-plex px-2 mx-4 pb-2 pt-3 ${
                  i == currTab ? "border-b-3 border-white" : ""
                }`}
                onClick={() => onSetTab(i)}
              >
                <div className="cursor-pointer">{tab}</div>
              </Link>
            );
          })}
        </div>
        <hr className=" border-gray-500 mt-0 w-100% max-w-6xl " />
        {userSettings && (
          <div className="flex flex-row w-full mt-10 mb-4 max-w-6xl">
            <Routes>
              <Route path="/" element={<Account {...userSettings.account} />} />
              <Route path="account" element={<Account {...userSettings.account} />} />
              <Route path="profile" element={<Profile {...userSettings.profile} />} />
              <Route path="privacy" element={<SafetyAndPrivacy />} />
              <Route
                path="feed"
                element={<Feed {...userSettings.feedSettings} />}
              />
              <Route
                path="notifications"
                element={<Notifications {...userSettings.notifications} />}
              />
              <Route
                path="emails"
                element={<Emails {...userSettings.email} />}
              />
            </Routes>
          </div>
        )}
      </div>
    </>
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
