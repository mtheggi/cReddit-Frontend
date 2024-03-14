import React, { useState } from "react";
import GAButtons from "./GAButtons";
import FloatingInput from "./FloatingInput";

const LogIn = ({setIsOpenedLoginMenu}) => {

const[usernameValidOnchange, setUsernameValidOnchange] = useState(false);
const[passwordValidOnchange, setPasswordValidOnchange] = useState(false);

const validateUsername = (username) => {
  const regex = /^[a-zA-Z0-9-_]+$/;
  if(username != '' && username && username.length < 21 && regex.test(username)){
    return true;
  }
  else
  {
    return false;
  }
}

  function validatePassword(password) {
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}\[\]:;<>.,?\\\-]).{8,}$/;
    return regex.test(password);
  }

  return (
    <div className="flex bg-reddit_hover rounded-3xl h-fit">
      <div className="flex flex-col w-132 h-160 bg-reddit rounded-2xl m-auto">
        <div className="flex justify-end px-6 pt-6 pb-2 ">
          <div id="login_close" onClick={()=>setIsOpenedLoginMenu(false)} className="flex h-8 w-8 rounded-full hover:bg-reddit_search_light">
            <button className="h-8 w-8 rounded-2xl">
              <span className="flex justify-center align-middle">
                <svg
                  rpl=""
                  fill="white" //currentColor for the default one
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
        <div className="h-120 px-20 ">
          <h1 className="text-2xl h-7 text-white font-bold mb-2 text-neutral">
            Log In
          </h1>
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
          <div className="w-[368px] h-fit mb-4 mt-4">
            <GAButtons />
          </div>

          <div className="flex flex-row w-[368px] h-[16px]">
            <hr className="w-[160px] h-[1px] bg-[#D7DFE2] self-center"></hr>
            <span className="text-[12px] px-[16px] w-[48px] h-[16px]">OR</span>
            <hr className="w-[160px] h-[1px] bg-[#D7DFE2] self-center"></hr>
          </div>

          <div>
            <div className="mb-8">
              <FloatingInput
                id={"LogIn_username"}
                label="Username"
                validateInput={validateUsername}
                setSubmitState={setUsernameValidOnchange}
              />
            </div>
            <div className="mb-14">
              <FloatingInput
                id={"LogIn_password"}
                label="Password"
                validateInput={validatePassword}
                setSubmitState={setPasswordValidOnchange}
              />
            </div>
          </div>

          <div className="mt-[8px] text-[14px] text-[#FFFFFF]">
            Forgot your <a className="text-reddit_links cursor-pointer hover:text-blue-300">username</a> or{" "}
            <a className="text-reddit_links cursor-pointer hover:text-blue-300">password</a>?
          </div>
          <div className="mt-[16px] text-[14px] text-[#FFFFFF]">
            New to Reddit? <a className=" text-reddit_links cursor-pointer hover:text-blue-300">Sign Up</a>
          </div>
        </div>

        <div className="w-[528px] h-[96px] px-[80px] py-[24px] flex items-center">
          <div className={` ${usernameValidOnchange && passwordValidOnchange ? ' bg-reddit_upvote hover:bg-orange-800 cursor-pointer text-white':'text-gray-500'} w-[400px] h-[48px] px-[14px] items-center justify-center inline-flex mx-auto rounded-3xl bg-reddit_search`}>
            <span className="flex items-center justify-center">
              <span className="flex items-center gap-[8px] text-[14px] font-[600] ">
                Log In
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
