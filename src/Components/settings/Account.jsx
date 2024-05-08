import Subtitle from "./components/Subtitle";
import Setting from "./Setting";
import DisconnectButton from "./components/DisconnectButton";
import { useState, useEffect } from "react";
import { postRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";
import { useNavigate } from "react-router-dom";
import { generateToken } from "@/firebase";
/**
 * Account is a React component that displays the user's account settings.
 * It allows the user to connect their account to Twitter and Apple.
 *
 * @component
 * @param {Object} props - The props for the Account component.
 * @param {boolean} props.connectedToTwitter - Whether the user's account is connected to Twitter.
 * @param {boolean} props.connectedToApple - Whether the user's account is connected to Apple.
 * @param {boolean} props.connectedToGoogle - Whether the user's account is connected to Google.
 * @param {Function} props.setUserSettings - A function to update the user settings.
 */
function Account({
  email,
  gender,
  country,
  connectedToTwitter,
  connectedToApple,
  connectedToGoogle,
  setUserSettings,
}) {
  const navigate = useNavigate();
  const [fcmToken, setFcmToken] = useState(null);
  useEffect(() => {

    const getFCM = async () => {
      const token = await generateToken();
      setFcmToken(token);
    }

    getFCM();
  }, [])
  const handleDeleteAccount = async () => {
    const response = await postRequest(`${baseUrl}/user/`, {
      fcmToken
    });
    if (response.status == 200 || response.status == 201) {
      setIsLoggedIn(false);
      setIsOpenProfileMenu(false);
      navigate('');
    }
  }
  return (
    <div className="flex flex-col w-full">
      <h3 className="text-white -mb-3 text-xl font-bold font-plex">
        Account Settings
      </h3>

      <Subtitle title="ACCOUNT PREFERENCES" />
      <Setting
        title="Email Address"
        message={email}
        regularButton="Change"
        clickableID="settings-change-email-button"
        pageName={"account"}
        settingName={"email"}
        setUserSettings={setUserSettings}
      />
      <Setting
        title="Gender"
        message="This information may be used to improve your recommendations and ads."
        menuItems={[{ name: "Man" }, { name: "Woman" }]}
        selectedItem={gender}
        clickableID={"settings-simplemenu-gender"}
        pageName={"account"}
        settingName={"gender"}
        setUserSettings={setUserSettings}
      />
      <Setting
        title="Password"
        message="Last update was yesterday" // replace
        regularButton="Change"
        clickableID="settings-change-password-button"
        pageName={"account"}
        settingName={"password"}
        setUserSettings={setUserSettings}
      />
      <Setting
        title="Country"
        message="Choose your country"
        menuItems={[{ name: "Egypt" }, { name: "USA" }, { name: "UK" }]}
        selectedItem={country}
        clickableID={"settings-simplemenu-country"}
        pageName={"account"}
        settingName={"country"}
        setUserSettings={setUserSettings}
      />
      {/* */}

      {/* <Setting
        title="Connect to Google"
        message="Connect account to log in to Reddit with Google."
      /> */}
      {/* <div className="max-w-3xl flex flex-row justify-end w-full items-end">
        {connectedToGoogle ? (
          <DisconnectButton />
        ) : (
          <div className="max-w-3xl flex flex-row justify-end w-full items-end">
            <button
              id="settings-connect-google-button"
              style={{ backgroundColor: "#45f57c" }}
              className="w-49 h-10 justify-center flex flex-row bg-red  rounded-3xl items-center"
            >
              <i className="fa-brands fa-google"></i>
              <span className="text-black text-sm font-bold font-plex pl-3">
                Connect to Google
              </span>
            </button>
          </div>
        )}
      </div> */}

      <Subtitle title="DELETE ACCOUNTS" />
      <div className="max-w-3xl flex flex-row justify-end w-full items-end mt-4">
        <button
          id="settings-delete-account-button"
          className="w-49 h-7 justify-center group flex flex-row items-center"
          onClick={handleDeleteAccount}
        >
          <i className="fa-solid fa-trash-can" style={{ color: "#ff585b" }}></i>
          <span className="text-red-500 group-hover:text-red-700 text-sm font-bold font-plex pl-3">
            DELETE ACCOUNT
          </span>
        </button>
      </div>
    </div>
  );
}
export default Account;

/* ID Documentation */

// settings-change-email-button: Button to change email

// settings-simplemenu-: simple menu dropdowns
//        1) Gender:
//            1- gender-man
//            2- gender-woman
//        2) Country:
//            1- country-egypt
//            2- country-usa
//            3- country-uk

// settings-connect-twitter-button
// settings-connect-apple-button
// settings-connect-google-button

// settings-delete-account-button: Button to delete account
