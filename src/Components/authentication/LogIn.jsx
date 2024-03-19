import React, { useState } from "react";
import GAButtons from "./GAButtons";
import FloatingInput from "./FloatingInput";
import { postRequest } from "../../services/Requests";

const LogIn = ({ setIsOpenedLoginMenu, setIsOpenedForgotPass, setIsOpenedForgotUsername, setIsOpenedSignupMenu }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  const validateLoginUsername = (username) => {
    if (username != '' && username)
      return true;
    else
      return false;
  }
  const validateLoginPassword = (password) => {
    if (password != '' && password) {
      return true;
    }
  }

  const handleLoginSubmit = async () => {
    if (username && password && validateLoginUsername(username) && validateLoginPassword(password)) {
      const response = await postRequest('/user/login', { username, password });
      if (response.status !== 200 && response.status !== 201)
        setLoginError(response.data.message);
    }
  }

  return (
    <div id="navbar_login_menu" className="flex pt-10 flex-col bg-reddit_menu msm:rounded-3xl h-full min-w-88 w-full px-6 msm:px-16">

      <div className="h-full flex flex-col">
        <div className="flex flex-col">

          <div className="flex flex-row justify-between">
            <h1 className="text-2xl h-7 text-white font-bold mb-2 text-neutral">
              Log In
            </h1>
            <div className="flex ">
              <div id="login_close" onClick={() => setIsOpenedLoginMenu(false)} className="flex msm:-mr-8 -mt-0.5 items-center justify-center h-9 w-9 rounded-full bg-reddit_search hover:bg-reddit_search_light">
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
              className="text-reddit_links cursor-pointer hover:text-blue-300 no-underline"
              target="_blank"
              href="https://www.redditinc.com/policies/user-agreement"
            >
              User Agreement
            </a>{" "}
            and acknowledge that you understand the{" "}
            <a
              className="text-reddit_links cursor-pointer hover:text-blue-300 no-underline"
              target="_blank"
              href="https://www.redditinc.com/policies/privacy-policy"
            >
              Privacy Policy
            </a>
            .
          </p>
          <div className="w-full h-fit mb-4 mt-4">
            <GAButtons />
          </div>



          <div className="flex flex-row w-full justify-center mb-2 mt-1 h-[16px]">
            <hr className="w-[155px] h-[1px] bg-white text-gray-300 self-center"></hr>
            <span className="text-[12px] px-[16px] text-gray-400 w-[48px] h-[16px]">OR</span>
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
          {loginError != null && <div className=" ml-1 h-2 text-xs font-light w-85"> <p className="text-red-400">{loginError}</p> </div>}
        </div>


        <div className="flex flex-col mt-auto">

       
        <div className={`  mb-2  text-[14px] text-[#FFFFFF]`}>
          Forgot your <a onClick={(e) =>{ e.stopPropagation(); setIsOpenedLoginMenu(false); setIsOpenedForgotUsername(true)}} className="text-reddit_links cursor-pointer hover:text-blue-300">username</a> or{" "}
          <a onClick={(e) =>{ e.stopPropagation(); setIsOpenedLoginMenu(false); setIsOpenedForgotPass(true)}}  className="text-reddit_links cursor-pointer hover:text-blue-300">password</a>?
        </div>
        <div className={` text-[14px] text-[#FFFFFF]`}>
          New to Reddit?  <a onClick={(e) =>{ e.stopPropagation(); setIsOpenedSignupMenu(true); setIsOpenedLoginMenu(false)}} className=" text-reddit_links cursor-pointer hover:text-blue-300">Sign Up</a>
        </div>
      </div>
      </div>

      <div className="h-[96px] py-[24px] mt-auto mb-4 msm:mt-0 msm:mb-0 flex items-center">
        <div onClick={handleLoginSubmit} id="login_submit" className={` ${username && password && validateLoginUsername(username) && validateLoginPassword(password) && loginError == null ? ' bg-reddit_upvote hover:bg-orange-800 cursor-pointer text-white' : 'text-gray-500'} w-120 mt-1 h-[48px] items-center justify-center inline-flex mx-auto rounded-3xl bg-reddit_search`}>
          <span className="flex items-center justify-center">
            <span className="flex items-center gap-[8px] text-[14px] font-[600] ">
              Log In
            </span>
          </span>
        </div>
      </div>

    </div>
  );
};

export default LogIn;
