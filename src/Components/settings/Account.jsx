import Subtitle from "./Subtitle";
import Setting from "./Setting";

function Account() {
  return (
    <div className="flex flex-col w-full">
      <h3 className="text-white -mb-3 text-xl font-bold font-plex">
        Account Settings
      </h3>

      <Subtitle title="ACCOUNT PREFERENCES" />
      <Setting
        title="Email Address"
        message="marwanabbas2909@gmail.com"
        regularButton="Change"
        clickableID="settings-change-email-button"
      />
      <Setting
        title="Gender"
        message="This information may be used to improve your recommendations and ads."
        menuItems={[{ name: "Man" }, { name: "Woman" }]}
        clickableID={"settings-simplemenu-gender"}
      />
      <Setting
        title="Password"
        message="Last update was yesterday"
        regularButton="Change"
        clickableID="settings-change-password-button"
      />
      <Setting
        title="Country"
        message="Choose your country"
        menuItems={[{ name: "Egypt" }, { name: "USA" }, { name: "UK" }]}
        clickableID={"settings-simplemenu-country"}
      />

      <Subtitle title="CONNECTED ACCOUNTS" />
      <Setting
        title="Connect to Twitter"
        message="Connect a Twitter account to enable the choice to tweet your new posts and display a link on your profile. We will never post to Twitter without your permission."
      />
      <div className="max-w-3xl flex flex-row justify-end w-full items-end">
        <button
          id="settings-connect-twitter-button"
          style={{ backgroundColor: "#1da1f2" }}
          className="w-49 h-10 justify-center flex flex-row bg-red  rounded-3xl items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
          </svg>

          <span className="text-black text-sm font-bold font-plex pl-3">
            Connect to Twitter
          </span>
        </button>
      </div>

      <Setting
        title="Connect to Apple"
        message="Connect account to log in to Reddit with Apple."
      />
      <div className="max-w-3xl flex flex-row justify-end w-full items-end">
        <button
          id="settings-connect-apple-button"
          style={{ backgroundColor: "#d7d9db" }}
          className="w-49 h-10 justify-center flex flex-row bg-red  rounded-3xl items-center"
        >
          <svg
            className="_3KWqmZWrSf8rUGBzgw4zPr"
            height="18"
            viewBox="0 0 18 18"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.8162 4.15385C9.60444 4.15385 10.5925 3.60458 11.1809 2.87222C11.7138 2.20852 12.1024 1.28163 12.1024 0.354736C12.1024 0.228861 12.0913 0.102988 12.0691 0C11.192 0.0343293 10.1373 0.606484 9.50452 1.37317C9.00493 1.95677 8.54975 2.87222 8.54975 3.81055C8.54975 3.94787 8.57196 4.08519 8.58306 4.13096C8.63857 4.1424 8.72739 4.15385 8.8162 4.15385ZM6.04071 18C7.1176 18 7.59498 17.2562 8.93832 17.2562C10.3039 17.2562 10.6036 17.9771 11.8026 17.9771C12.9794 17.9771 13.7677 16.8557 14.5115 15.7572C15.3442 14.4984 15.6883 13.2626 15.7105 13.2053C15.6328 13.1825 13.3791 12.2327 13.3791 9.56643C13.3791 7.25493 15.1554 6.2136 15.2553 6.1335C14.0785 4.39415 12.2911 4.34838 11.8026 4.34838C10.4815 4.34838 9.40461 5.17228 8.72739 5.17228C7.99465 5.17228 7.02878 4.39415 5.88528 4.39415C3.70929 4.39415 1.5 6.24793 1.5 9.74952C1.5 11.9237 2.32155 14.2238 3.33183 15.7114C4.19778 16.9701 4.95271 18 6.04071 18Z"></path>
          </svg>
          <span className="text-black text-sm font-bold font-plex pl-3">
            Connect to Apple
          </span>
        </button>
      </div>

      <Setting
        title="Connect to Google"
        message="Connect account to log in to Reddit with Google."
      />
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

      <Subtitle title="DELETE ACCOUNTS" />
      <div className="max-w-3xl flex flex-row justify-end w-full items-end mt-4">
        <button
          id="settings-delete-account-button"
          className="w-49 h-7 justify-center group flex flex-row items-center"
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
