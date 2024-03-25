import { XMarkIcon } from '@heroicons/react/24/outline';
import FloatingInput from "../FloatingInput";
import { useEffect, useState, useRef } from 'react';
import { postRequest } from "../../../services/Requests";
import { baseUrl } from '../../../constants';


const ForgetPass = ({setIsOpenedForgotPass, setIsOpenedLoginMenu, forgotPassRef, setIsOpenedEmailVerification , setIsPrevForgotPassOrUsername}) => {

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [internalClose, setInternalClose] = useState(false);
  const [internalReturnBack, setInternalReturnBack] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState(null);
  const [resetPasswordMessage, setResetPasswordMessage] = useState(null);



  const validateEmail = (email) => {
    var re = /^([a-z A-Z 0-9 \. _]+)@([a-z A-Z]+)\.([a-z A-Z]{2,6})$/;
    return re.test(email);
  }
 
  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9-_]+$/;
    if (username != '' && username && regex.test(username))
      return true;
    else
      return false;
  }

  const handleForgetPassSubmit = async (e) => {
    e.stopPropagation();
    if (username && email && validateUsername(username) && validateEmail(email)) {
      const response = await postRequest(`${baseUrl}/user/forgot-password`, { username, email });
      if (response.status !== 200 && response.status !== 201)
      {
         setResetPasswordError(response.data.message);
      }
      else
      {
        setIsOpenedForgotPass(false);
        setIsPrevForgotPassOrUsername(true);
        setIsOpenedEmailVerification(true);
      }
        setResetPasswordMessage(response.data.message);
         
    }
  }


  useEffect(() => {
    if(internalClose)
    {
      setIsOpenedForgotPass(false);
      setInternalClose(false);
    }
    if(internalReturnBack)
    {
      setIsOpenedForgotPass(false);
      setIsOpenedLoginMenu(true);
      setInternalReturnBack(false);
    }
   
  }, [internalClose, internalReturnBack]);

  return (


    <div ref={forgotPassRef}  className='z-20 min-w-90 w-100% h-100% msm:w-132 msm:h-158  bg-reddit_lightGreen no-select text-white msm:rounded-3xl items-center flex flex-col'>

      <div className='w-full px-3 pt-10 pb-4 h-12 flex items-center justify-between'>

        <div id="reset_password_back" onClick={()=>setInternalReturnBack(true)} className="hover:bg-reddit_search_light msm:ml-4 -ml-2 cursor-pointer rounded-full w-10 h-10 flex justify-center items-center ">
          <svg rpl="" fill="currentColor" height="20" icon-name="back-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 9.375H2.51l7.932-7.933-.884-.884-9 9a.625.625 0 0 0 0 .884l9 9 .884-.884-7.933-7.933H19v-1.25Z"></path>
          </svg>
        </div>

        <div id="reset_password_close" onClick={()=>setInternalClose(true)} className="hover:bg-reddit_search_light msm:mr-5 cursor-pointer rounded-full w-8 h-8 flex justify-center items-center bg-reddit_search">
          <XMarkIcon className="w-6 h-7 " />
        </div>
      </div>

      <div className='w-full flex flex-col h-full msm:px-2 px-3 items-center'>
        <div className=" pt-1 mt-2 msm:mt-0 w-full flex-col h-32">
          <h1 className=" text-2xl  msm:px-16  font-semibold mb-2">
            Reset your password
          </h1>
          <p className="text-sm  msm:px-16  font-light text-gray-200">
            Tell us the username and email address associated with your Reddit account, and we’ll send you an email with a link to reset your password.
          </p>
        </div>


        <div className='w-full msm:px-15 flex flex-col items-center h-fit mt-2'>
          <FloatingInput id='reset_password_username' label='Username' validateInput={validateUsername}  setInputNameOnChange={setUsername}
              backendValidationError={resetPasswordError}
              setBackendValidationError={setResetPasswordError} />
        </div>


        <div className='w-full  msm:px-15 flex flex-col mt-6'>
          <FloatingInput id='reset_password_email' label='Email' validateInput={validateEmail}  setInputNameOnChange={setEmail}
              backendValidationError={resetPasswordError}
              setBackendValidationError={setResetPasswordError}
              setBackendMessage={setResetPasswordMessage} />
        </div>

        {resetPasswordError != null && <div className=" -ml-3 mt-1  h-2 text-xs font-light w-85"> <p className={`text-red-400`}>{resetPasswordMessage}</p> </div>}


        <div onClick={(e)=>handleForgetPassSubmit(e)} id="reset_password_email_me" className={`w-full h-13 msm:w-93 mt-auto mb-12  msm:mt-23 flex bg-reddit_search ${username && email && validateUsername(username) && validateEmail(email) && resetPasswordError==null ? ' bg-reddit_upvote hover:bg-orange-800 cursor-pointer' : ''} rounded-3xl text-gray-600 flex-row justify-center items-center `}>
        <p className={`no-select font-semibold text-sm ${ username && email && validateUsername(username) && validateEmail(email) && resetPasswordError==null  ? ' text-white' : 'text-gray-500'} `}>Email Me</p>
        </div>

      </div>
    </div>
  
  );
}

export default ForgetPass;