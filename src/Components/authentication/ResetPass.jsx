import { XMarkIcon } from '@heroicons/react/24/outline';
import FloatingInput from "./FloatingInput";
import { useEffect, useState } from 'react';

const ResetPass = () => {

  const [enrollme, setEnrollme] = useState(false);

  const validateEmail = (email) => {
    var re = /^([a-z A-Z 0-9 \. _]+)@([a-z A-Z]+)\.([a-z A-Z]{2,6})$/;
    return re.test(email);
  }

  const validateUsername = (username) => {
    return username!='';
  }

  return (

    <div className='z-20 w-132 h-158 bg-reddit_lightGreen no-select text-white rounded-2xl items-center flex flex-col'>

      <div className='w-full px-7 pt-10 pb-4 h-12 flex items-center justify-between'>

        <div id="reset_password_back" className="hover:bg-reddit_search_light cursor-pointer rounded-full w-10 h-10 flex justify-center items-center ">
          <svg rpl="" fill="currentColor" height="20" icon-name="back-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 9.375H2.51l7.932-7.933-.884-.884-9 9a.625.625 0 0 0 0 .884l9 9 .884-.884-7.933-7.933H19v-1.25Z"></path>
          </svg>
        </div>

        <div id="reset_password_close" className="hover:bg-reddit_search_light cursor-pointer rounded-full w-8 h-8 flex justify-center items-center bg-reddit_search">
          <XMarkIcon className="w-6 h-7 " />
        </div>
      </div>


      <div className=" pt-1 px-2.5 w-94 flex-col h-32">
        <h1 className=" text-2xl font-semibold mb-2">
          Reset your password
        </h1>
        <p className="text-sm font-light text-gray-200">
          Tell us the username and email address associated with your Reddit account, and we’ll send you an email with a link to reset your password.
        </p>
      </div>


      <div className='w-full flex flex-col items-center h-fit mt-2'>
        <FloatingInput id='reset_password_username' label='username' validateInput={validateUsername} />

      </div>


      <div className='w-full flex flex-col items-center h-fit mt-6'>
        <FloatingInput id='reset_password_email' label='Email' validateInput={validateEmail} setSubmitState={setEnrollme} />

      </div>




      <div className='flex text-sm font-light mt-8 w-88 flex-row'>
        <p className='text-gray-300'>Forgot your</p>
        <a href="" className='text-reddit_links ml-1 mr-1 hover:text-blue-200'>username</a>
        <p className='text-gray-300'>?</p>
      </div>

      <div className="px-3 w-96 items-center no-select flex flex-row h-15">
        <a id="reset_password_signup" className="text-sm text-reddit_links hover:text-blue-200 font-light" href="">Sign Up</a>
        <p className="mb-2 ml-2 text-reddit_links mr-2">.</p>
        <a id="reset_password_login" className="text-sm text-reddit_links font-light hover:text-blue-200" href="">Log In</a>
      </div>

      <div id="reset_password_enrollme" className={`w-94 h-12 mt-auto mb-7 flex bg-reddit_search ${enrollme ? ' bg-reddit_upvote hover:bg-orange-800 cursor-pointer' : ''} rounded-3xl text-gray-600 flex-row justify-center items-center `}>
        <p className={`no-select font-medium text-sm ${enrollme ? ' text-white' : ''} `}>Email Me</p>
      </div>
    </div>
  );
}

export default ResetPass;