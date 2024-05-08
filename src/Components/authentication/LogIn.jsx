import React, { useState, useEffect, useContext } from "react";
import GAButtons from "./GAButtons";
import FloatingInput from "./FloatingInput";
import { getRequest, postRequest } from "../../services/Requests";
import { useGoogleLogin } from "@react-oauth/google";
import { Client_ID, baseUrl } from "../../constants";
import { ToastContainer, toast } from "react-toastify";
import { LoginSuccessToast, LoginFailedToast } from "./LoginToast";
import { UserContext } from "@/context/UserContext";
import fcmToken from "@/firebase";
import { useNotifications } from '../notifications/NotificationContext'; 
import avatar from '../../assets/avatar.png';


/**
 * React component for user login.
 * @component
 * @param {Object} props - Component props.
 * @param {Function} props.setIsOpenedLoginMenu - Function to control the visibility of the login menu.
 * @param {Function} props.setIsOpenedForgotPass - Function to control the visibility of the forgot password menu.
 * @param {Function} props.setIsOpenedForgotUsername - Function to control the visibility of the forgot username menu.
 * @param {Function} props.setIsOpenedSignupMenu - Function to control the visibility of the signup menu.
 * @returns {JSX.Element} React component.
 */
const LogIn = ({
  setIsOpenedLoginMenu,
  setIsOpenedForgotPass,
  setIsOpenedForgotUsername,
  setIsOpenedSignupMenu,
}) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [OAuthAccessToken, setOAuthAccessToken] = useState(null);
  const [oauthLoginError, setOauthLoginError] = useState(null);

  const {
    notifications, setNotifications, flushNotifications
  } = useNotifications();

  /**
   * Validates the login username.
   * @function validateLoginUsername
   * @param {string} username - The username to validate.
   * @returns {boolean} Whether the username is valid.
   */
  const validateLoginUsername = (username) => {
    if (username != "" && username) return true;
    else return false;
  };

  /**
   * Validates the login password.
   * @function validateLoginPassword
   * @param {string} password - The password to validate.
   * @returns {boolean} Whether the password is valid.
   */
  const validateLoginPassword = (password) => {
    if (password != "" && password) {
      return true;
    }
  };

  /**
   * Handles the login form submission.
   * @function handleLoginSubmit
   * @returns {Promise<void>} A Promise that resolves when the login process is complete.
   * @async
   */
  const handleLoginSubmit = async () => {
    if (
      username &&
      password &&
      validateLoginUsername(username) &&
      validateLoginPassword(password) &&
      loginError == null &&
      fcmToken
    ) {
      const response = await postRequest(`${baseUrl}/user/login`, {
        username,
        password,
        fcmToken
      });
      if (response.status !== 200 && response.status !== 201) {
        setLoginError(response.data.message);
        LoginFailedToast(response.data.message);
      } else {
        LoginSuccessToast("Logged in successfully");
  
        // Fetch notifications
        const notificationsResponse = await getRequest(`${baseUrl}/notification/`);
        if (notificationsResponse.status === 200 || notificationsResponse.status === 201) {
          console.log("Notifications Retrieved");
          console.log(notificationsResponse.data);
  
          // Check if the notifications data exists and is an array
          if (Array.isArray(notificationsResponse.data.notifications)) {
            const formattedNotifications = notificationsResponse.data.notifications.map(notif => ({
              key: notif._id,
              title: notif.title,
              date: new Date(notif.createdAt).toLocaleDateString('en-US'),
              time: new Date(notif.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
              description: notif.content,
              image: avatar,
              isRead: notif.isRead
            }));
  
            // Update the state with the new notifications list
            setNotifications(formattedNotifications);
          } else {
            console.error('No notifications array found');
          }
        }
  
        setTimeout(() => {
          setIsOpenedLoginMenu(false);
          setIsLoggedIn(true);
        }, 3000);
      }
    }
  };
  
  


  useEffect(() => {
    /**
     * Sends the Google authentication token to the backend for login.
     * @function sendToken
     * @returns {Promise<void>} A Promise that resolves when the token is sent.
     * @async
      */
    async function sendToken() {
      if (OAuthAccessToken && fcmToken) {
        const response = await postRequest(`${baseUrl}/user/auth/google`, {
          googleToken: OAuthAccessToken,
          fcmToken
        });
        if (response.status !== 200 && response.status !== 201) {
          setOauthLoginError(response.data.message);
          LoginFailedToast(response.data.message);
        } else {
          LoginSuccessToast("Logged in successfully");
          setTimeout(() => {
            setIsOpenedLoginMenu(false);
            setIsLoggedIn(true);
          }, 3000);
        }
      }
    }
    sendToken();
  }, [OAuthAccessToken]);

  /**
   * Handles the Google login process.
   * @function handleGoogleLogin
   * @returns {void}
   * @async
   */
  const handleGoogleLogin = useGoogleLogin({
    clientId: { Client_ID },
    onSuccess: (codeResponse) => {
      setOAuthAccessToken(codeResponse.access_token);
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  return (
    <>
      <ToastContainer
        position="bottom-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="colored"
      />

      <div
        id="navbar_login_menu"
        className="flex pt-10 flex-col bg-reddit_menu msm:rounded-3xl h-full min-w-88 w-full px-6 msm:px-16"
      >
        <div className="h-full flex flex-col">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl h-7 text-white font-bold mb-2">Log In</h1>
              <div className="flex ">
                <div
                  id="login_close"
                  onClick={() => setIsOpenedLoginMenu(false)}
                  className="flex msm:-mr-8 -mt-2 items-center justify-center h-9 w-9 rounded-full bg-reddit_search hover:bg-reddit_search_light"
                >
                  <button className="h-8 w-8 rounded-2xl">
                    <span className="flex justify-center align-middle">
                      <svg
                        rpl=""
                        fill="white"
                        height="16"
                        icon-name="close-outline"
                        viewBox="0 0 20 20"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m18.442 2.442-.884-.884L10 9.116 2.442 1.558l-.884.884L9.116 10l-7.558 7.558.884.884L10 10.884l7.558 7.558.884-.884L10.884 10l7.558-7.558Z"></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <p className="text-[14px] my-2 h-10 text-white">
              By continuing, you agree to our{" "}
              <a
                id="login_user_agreement"
                className="text-reddit_links cursor-pointer hover:text-blue-300 no-underline"
                target="_blank"
                href="https://www.redditinc.com/policies/user-agreement"
              >
                User Agreement
              </a>{" "}
              and acknowledge that you understand the{" "}
              <a
                id="login_policy"
                className="text-reddit_links cursor-pointer hover:text-blue-300 no-underline"
                target="_blank"
                href="https://www.redditinc.com/policies/privacy-policy"
              >
                Privacy Policy
              </a>
              .
            </p>

            <div
              onClick={() => handleGoogleLogin()}
              className="w-full h-fit mb-4 mt-4"
            >
              <GAButtons />
            </div>

            <div className="flex flex-row w-full justify-center mb-2 mt-1 h-[16px]">
              <hr className="w-[155px] h-[1px] bg-white text-gray-300 self-center"></hr>
              <span className="text-[12px] px-[16px] text-gray-400 w-[48px] h-[16px]">
                OR
              </span>
              <hr className="w-[155px] h-[1px] text-gray-300 self-center"></hr>
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-3">
              <FloatingInput
                id={"login_username"}
                label="Username"
                validateInput={validateLoginUsername}
                setInputNameOnChange={setUsername}
                backendValidationError={loginError}
                setBackendValidationError={setLoginError}
              />
            </div>
            <div className="mb-2">
              <FloatingInput
                id={"login_password"}
                label="Password"
                validateInput={validateLoginPassword}
                setInputNameOnChange={setPassword}
                backendValidationError={loginError}
                setBackendValidationError={setLoginError}
              />
            </div>
            {loginError != null && (
              <div className=" ml-1 h-2 text-xs font-light w-85">
                {" "}
                <p className="text-red-400">{loginError}</p>{" "}
              </div>
            )}
          </div>

          <div className="flex flex-col mt-auto">
            <div className={`  mb-2  text-[14px] text-[#FFFFFF]`}>
              Forgot your{" "}
              <a
                id="forgot_username"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpenedLoginMenu(false);
                  setIsOpenedForgotUsername(true);
                }}
                className="text-reddit_links cursor-pointer hover:text-blue-300"
              >
                username
              </a>{" "}
              or{" "}
              <a
                id="forgot_pass"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpenedLoginMenu(false);
                  setIsOpenedForgotPass(true);
                }}
                className="text-reddit_links cursor-pointer hover:text-blue-300"
              >
                password
              </a>
              ?
            </div>
            <div className={` text-[14px] text-[#FFFFFF]`}>
              New to Reddit?{" "}
              <a
                id="login_signup"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpenedSignupMenu(true);
                  setIsOpenedLoginMenu(false);
                }}
                className=" text-reddit_links cursor-pointer hover:text-blue-300"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>

        <div className="h-[96px] py-[24px] mt-auto mb-10 msm:mt-0 msm:mb-0 flex items-center">
          <div
            onClick={handleLoginSubmit}
            id="login_submit"
            className={` ${username &&
                password &&
                validateLoginUsername(username) &&
                validateLoginPassword(password) &&
                loginError == null
                ? " bg-reddit_upvote hover:bg-orange-800 cursor-pointer text-white"
                : "text-gray-500"
              } w-120 mt-1 h-[48px] items-center justify-center inline-flex mx-auto rounded-3xl bg-reddit_search`}
          >
            <span className="flex items-center justify-center">
              <span className="flex items-center gap-[8px] text-[14px] font-[600] ">
                Log In
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
