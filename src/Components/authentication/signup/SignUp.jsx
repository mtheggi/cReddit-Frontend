import React, { useState, useEffect, useContext } from "react";
import FloatingInput from "../FloatingInput";
import { postRequest } from "../../../services/Requests";
import { ToastContainer, toast } from "react-toastify";
import { LoginSuccessToast, LoginFailedToast } from "../LoginToast";
import { baseUrl } from "../../../constants";
import { UserContext } from "@/context/UserContext";

/**
 * React component for user signup.
 * @component
 * @param {Object} props - Component props.
 * @param {function} props.setIsOpenedSignupMenu - Function to control the visibility of the signup menu.
 * @param {function} props.setIsOpenedSecondSignupMenu - Function to control the visibility of the second signup menu.
 * @param {string} props.NavbarSignupEmail - Email obtained from the navbar signup.
 * @returns {JSX.Element} React component.
 */
const SignUp = ({
  setIsOpenedSignupMenu,
  setIsOpenedSecondSignupMenu,
  NavbarSignupEmail,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [gender, setGender] = useState("Gender");
  const [internalReturnBack, setInternalReturnBack] = useState(null);
  const [signupError, setSignupError] = useState(null);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  /**
   * Effect hook to close the dropdown when clicked outside.
   *
   * @param {boolean} dropdownOpen - State indicating whether the dropdown is open.
   */
  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownOpen) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, [dropdownOpen]);

  /**
   * Effect hook to handle internal return back action.
   *
   * @param {boolean} internalReturnBack - State indicating whether internal return back action is triggered.
   */
  useEffect(() => {
    if (internalReturnBack) {
      setIsOpenedSecondSignupMenu(false);
      setIsOpenedSignupMenu(true);
    }
  }, [internalReturnBack]);

  /**
   * Validates the provided email.
   *
   * @param {string} email - Email to be validated.
   * @returns {boolean} True if the email is valid, false otherwise.
   */
  const validateEmail = (NavbarSignupEmail) => {
    var re = /^([a-z A-Z 0-9 \. _]+)@([a-z A-Z]+)\.([a-z A-Z]{2,6})$/;
    return re.test(NavbarSignupEmail);
  };
  /**
   * Validates the provided username.
   *
   * @param {string} username - Username to be validated.
   * @returns {boolean} True if the username is valid, false otherwise.
   */
  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9-_]+$/;
    if (username != "" && username && regex.test(username)) return true;
    else return false;
  };

  /**
   * Validates the provided password.
   *
   * @param {string} password - Password to be validated.
   * @returns {boolean} True if the password is valid, false otherwise.
   */
  const validatePassword = (password) => {
    if (password != "" && password && password.length >= 8) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Handles the signup form submission.
   */
  const handleSignupSubmit = async () => {
    if (
      signupError == null &&
      NavbarSignupEmail &&
      validateEmail(NavbarSignupEmail) &&
      username &&
      validateUsername(username) &&
      password &&
      validatePassword(password) &&
      gender != "Gender"
    ) {
      const email = NavbarSignupEmail;
      const response = await postRequest(`${baseUrl}/user`, {
        email,
        username,
        password,
        gender,
      });
      if (response.status != 200 && response.status != 201) {
        setSignupError(response.data.message);
        LoginFailedToast(response.data.message);
      } else {
        LoginSuccessToast("Signed up successfully");
        setTimeout(() => {
          setIsOpenedSecondSignupMenu(false);
          setIsOpenedSignupMenu(false);
          setIsLoggedIn(true);
        }, 3000);
      }
    }
  };

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
        id="navbar_signup_menu"
        className="flex min-w-88 flex-col w-full h-full h-min-160 msm:px-8 pl-2 pr-2 bg-reddit_menu msm:rounded-3xl"
      >
        <div className="h-full w-full flex flex-col ">
          <div className="flex pt-3 mb-2 flex-row justify-between">
            <div
              onClick={() => setInternalReturnBack(true)}
              id="second_signup_menu_back"
              className=" hover:bg-reddit_search_light cursor-pointer rounded-full msm:mt-0 msm:ml-0 w-10 h-10 flex justify-center items-center "
            >
              <svg
                rpl=""
                fill="#ffffff"
                height="20"
                icon-name="back-outline"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 9.375H2.51l7.932-7.933-.884-.884-9 9a.625.625 0 0 0 0 .884l9 9 .884-.884-7.933-7.933H19v-1.25Z"></path>
              </svg>
            </div>

            <div
              id="close_signup2"
              className="flex justify-end mt-1 msm:-mr-3  rounded-2xl"
            >
              <div
                onClick={() => setIsOpenedSecondSignupMenu(false)}
                className="flex h-8 w-8 bg-reddit_search  hover:bg-reddit_search_light rounded-full "
              >
                <button className="h-8 w-8">
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

          <div className="flex flex-col h-full px-10">
            <h1 className="text-2xl h-7 px-2.5 text-white font-bold mb-2">
              Sign Up
            </h1>
            <p className="text-[14px] px-2.5 my-2 h-10 text-white">
              By continuing, you agree to our{" "}
              <a
                id="signup2_user_agreement"
                className="text-reddit_links cursor-pointer hover:text-blue-300 no-underline"
                target="_blank"
                href="https://www.redditinc.com/policies/user-agreement"
              >
                User Agreement
              </a>{" "}
              and acknowledge that you understand the{" "}
              <a
                id="signup2_policy"
                className="text-reddit_links cursor-pointer hover:text-blue-300 no-underline"
                target="_blank"
                href="https://www.redditinc.com/policies/privacy-policy"
              >
                Privacy Policy.
              </a>
            </p>

            <div className="flex mt-4 flex-col">
              <div className="min-h-[70px] px-2 mt-3">
                <FloatingInput
                  id={"signup_username"}
                  label="Username"
                  validateInput={validateUsername}
                  setInputNameOnChange={setUsername}
                  backendValidationError={signupError}
                  setBackendValidationError={setSignupError}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="min-h-[70px] px-2 mt-4">
                <FloatingInput
                  id={"signup_password"}
                  label="Password"
                  validateInput={validatePassword}
                  setInputNameOnChange={setPassword}
                  backendValidationError={signupError}
                  setBackendValidationError={setSignupError}
                />
              </div>

              <div className="flex flex-row px-2 mt-4">
                <div
                  id="gender_dropdown_button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(!dropdownOpen);
                  }}
                  data-dropdown-toggle="gender_dropdown_menu"
                  className={`text-gray-400 cursor-pointer pl-4 border-1 ${
                    signupError != null
                      ? "border-red-400"
                      : "border-transparent"
                  } hover:bg-reddit_search_light bg-reddit_search w-28 h-13 rounded-2xl focus:outline-none font-normal text-sm text-center  items-center flex flex-row" type="button`}
                >
                  {gender}
                  <div className="w-fit flex ml-auto mr-5 flex-row">
                    <svg
                      className="w-2.5 h-2.5  ms-3 mt-0.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="#F05152"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div
                id="gender_dropdown_menu"
                className={`z-10 absolute mt-24 ml-34  ${
                  dropdownOpen ? "" : "hidden"
                } bg-reddit_hover divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
              >
                <ul
                  className="py-2 text-sm"
                  aria-labelledby="dropdownInformationButton"
                >
                  <li id="gender_man" className="cursor-pointer">
                    <p
                      onClick={() => setGender("Man")}
                      className="block px-4 py-2 text-gray-200 hover:bg-reddit_search_light "
                    >
                      Man
                    </p>
                  </li>
                  <li id="gender_woman" className="cursor-pointer">
                    <p
                      onClick={() => setGender("Woman")}
                      className="block px-4 py-2  text-gray-200 hover:bg-reddit_search_light  "
                    >
                      Woman
                    </p>
                  </li>
                </ul>
              </div>

              {signupError != null && (
                <div className="relative ml-3 mt-3 h-3 text-xs font-light w-85">
                  {" "}
                  <p className="text-red-400">{signupError}</p>{" "}
                </div>
              )}
            </div>

            <div className="mt-auto mb-10  w-full h-[96px] px-2 flex justify-center items-center">
              <div
                id="signup_submit"
                onClick={handleSignupSubmit}
                className={`${
                  NavbarSignupEmail &&
                  validateEmail(NavbarSignupEmail) &&
                  username &&
                  validateUsername(username) &&
                  password &&
                  validatePassword(password) &&
                  signupError == null &&
                  gender != "Gender"
                    ? " bg-reddit_upvote hover:bg-orange-800 cursor-pointer text-white"
                    : "text-gray-500"
                } flex w-full h-[48px]  items-center justify-center rounded-3xl bg-reddit_search`}
              >
                <span className="flex items-center gap-[8px] text-[14px] font-[600]">
                  Sign Up
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
