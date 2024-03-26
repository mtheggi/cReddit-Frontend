import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Account from "./Account";
import Profile from "./Profile";
import SafetyAndPrivacy from "./SafetyAndPrivacy";
import Emails from "./Emails";
import Notifications from "./Notifications";
import Feed from "./Feed";

import { getRequest } from "../../services/Requests";
import SimpleNavbar from "./components/SimpleNavbar";
import { getF } from "./utils/ChangeSetting";
import { baseUrl } from "../../constants";

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
  // console.log(path);
  const tab = path.split("/")[2];
  // console.log(tab, TabsPath.indexOf(tab));
  const index = TabsPath.indexOf(tab);
  return index != -1 ? index : 0;
};

function Settings() {
  const [userSettings, setUserSettings] = useState(null);
  const [currTab, setCurrTab] = useState(initCurrTab());

  const onSetTab = (index) => {
    setCurrTab(index);
  };

  getF(setUserSettings);

  useEffect(() => {
    getRequest(`${baseUrl}/user/settings`)
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
        autoClose={3000}
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

        <SimpleNavbar
          Tabs={Tabs}
          TabsPath={TabsPath}
          currTab={currTab}
          onSetTab={onSetTab}
        />

        {userSettings && (
          <div className="flex flex-row w-full mt-10 mb-4 max-w-6xl">
            <Routes>
              <Route
                path="/"
                element={
                  <Account
                    {...userSettings.account}
                    setUserSettings={setUserSettings}
                  />
                }
              />
              <Route
                path="account"
                element={
                  <Account
                    {...userSettings.account}
                    setUserSettings={setUserSettings}
                  />
                }
              />
              <Route
                path="profile"
                element={
                  <Profile
                    {...userSettings.profile}
                    setUserSettings={setUserSettings}
                  />
                }
              />
              <Route
                path="privacy"
                element={
                  <SafetyAndPrivacy
                    {...userSettings.safetyAndPrivacy}
                    setUserSettings={setUserSettings}
                  />
                }
              />
              <Route
                path="feed"
                element={
                  <Feed
                    {...userSettings.feedSettings}
                    setUserSettings={setUserSettings}
                  />
                }
              />
              <Route
                path="notifications"
                element={
                  <Notifications
                    {...userSettings.notifications}
                    setUserSettings={setUserSettings}
                  />
                }
              />
              <Route
                path="emails"
                element={
                  <Emails
                    {...userSettings.email}
                    setUserSettings={setUserSettings}
                  />
                }
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
