import React, { useState } from "react";
import Input from "./FloatingInput";
import GAButtons from "./GAButtons";
import FloatingInput from "./FloatingInput";

const SignUp = ({setIsOpenedSignupMenu}) => {

  const[emailValidOnchange, setEmailValidOnchange] = useState(false);

  const validateEmail = (email) => {
    var re = /^([a-z A-Z 0-9 \. _]+)@([a-z A-Z]+)\.([a-z A-Z]{2,6})$/;
    return re.test(email);
  };

  return (
    <div id="navbar_signup_menu" className="flex h-fit h-min-160 xs:w-120 w-100% bg-reddit_hover rounded-3xl">
      <div className="flex flex-col w-120 h-160 rounded-2xl">
        <div className="flex justify-end px-6 pt-6 pb-2 rounded-2xl">
          <div onClick={()=>setIsOpenedSignupMenu(false)} className="flex h-8 w-8  hover:bg-reddit_search_light rounded-full ">
            <button className="h-8 w-8">
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
        <div className="h-120 px-12 w-full flex flex-col ">
          <h1 className="text-2xl h-7 text-white font-bold mb-2 text-neutral">
            Sign Up
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
          <div className="w-[368px] mx-auto h-10 mt-15">
            <GAButtons />
          </div>

          <div className="flex flex-row mt-4 mb-3 ml-2 w-[368px] h-[16px]">
            <hr className="w-[160px] h-[1px] text-gray-400 self-center"></hr>
            <span className="text-[12px] px-[16px] text-gray-400 w-[48px] h-[16px]">OR</span>
            <hr className="w-[160px] h-[1px] text-gray-400 self-center"></hr>
          </div>

          <div>
            <div className="min-h-[100px] px-2 mt-1">
              <FloatingInput
                id={"signup_email"}
                label="Email"
                validateInput={validateEmail}
                setSubmitState={setEmailValidOnchange}
              />
            </div>
          </div>

          <div className="text-[14px] mt-4 ml-4 text-[#FFFFFF]">
            Already a redditor? <a className="text-reddit_links cursor-pointer hover:text-blue-300">Log In</a>
          </div>
        </div>

        <div className="w-[480px] h-[96px] mt-auto px-[60px] py-[24px] flex items-center">
          <div className={`  ${emailValidOnchange ? ' bg-reddit_upvote hover:bg-orange-800 cursor-pointer text-white':'text-gray-500'} w-[400px] h-[48px] px-[14px] items-center justify-center inline-flex mx-auto rounded-3xl bg-reddit_search`}>
            <span className="flex items-center justify-center">
              <span className="flex items-center gap-[8px] text-[14px] font-[600]">
                Continue
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
