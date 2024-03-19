import { XMarkIcon } from '@heroicons/react/24/outline';
import FloatingInput from "../FloatingInput";
import { useEffect, useState } from 'react';
import { postRequest } from "../../../services/Requests";

const ForgetUsername = ({setIsOpenedForgotUsername, setIsOpenedLoginMenu, setIsOpenedEmailVerification, setIsPrevForgotPassOrUsername}) => {

    const[email, setEmail] = useState(null);
    const[resetUsernameError, setResetUsernameError] = useState(null);
    const[resetUsernameMessage, setResetUsernameMessage] = useState(null);
    const [internalClose, setInternalClose] = useState(false);
    const [internalReturnBack, setInternalReturnBack] = useState(false);

    const validateEmail = (email) => {
        var re = /^([a-z A-Z 0-9 \. _]+)@([a-z A-Z]+)\.([a-z A-Z]{2,6})$/;
        return re.test(email);
    }

    const handleForgetUsernameSubmit = async (e) => {
        e.stopPropagation();
        if (email && validateEmail(email)) {
          const response = await postRequest('/user/forgot-username', { email });
          if (response.status !== 200 && response.status !== 201)
          {
             setResetUsernameError(response.data.message);
          }
          else
          {
            setIsOpenedForgotUsername(false);
            setIsPrevForgotPassOrUsername(false);
            setIsOpenedEmailVerification(true);
          }
          setResetUsernameMessage(response.data.message);
            
        }
      }


  useEffect(() => {
    if(internalClose)
    {
      setIsOpenedForgotUsername(false);
      setInternalClose(false);
    }
    if(internalReturnBack)
    {
      setIsOpenedForgotUsername(false);
      setIsOpenedLoginMenu(true);
      setInternalReturnBack(false);
    }
   
  }, [internalClose, internalReturnBack]);

    return (

        <div className='z-20 msm:w-132 min-w-90 msm:h-158 w-100% h-100% bg-reddit_lightGreen no-select text-white msm:rounded-3xl items-center flex flex-col'>

            <div className='w-full px-7 pt-10 pb-4 h-12 flex items-center justify-between'>

                <div onClick={()=>setInternalReturnBack(true)} id="reset_username_back" className="hover:bg-reddit_search_light cursor-pointer rounded-full -ml-3 -mt-1 msm:mt-0 msm:ml-0 w-10 h-10 flex justify-center items-center ">
                    <svg rpl="" fill="currentColor" height="20" icon-name="back-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 9.375H2.51l7.932-7.933-.884-.884-9 9a.625.625 0 0 0 0 .884l9 9 .884-.884-7.933-7.933H19v-1.25Z"></path>
                    </svg>
                </div>

                <div id="reset_username_close" onClick={()=>setInternalClose(true)}  className="hover:bg-reddit_search_light cursor-pointer rounded-full w-8 h-8 flex justify-center items-center bg-reddit_search">
                    <XMarkIcon className="w-6 h-7 " />
                </div>
            </div>



         <div className='w-full flex  flex-col h-full px-3 items-center'>
            <div className=" pt-1 px-2.5 w-full flex-col h-32">
                <h1 className=" text-2xl msm:px-14 font-semibold mb-2">
                    Recover your username
                </h1>
                <p className="text-sm msm:px-14 font-light text-gray-200">
                    Tell us the email address associated with your Reddit account, and we’ll send you an email with your username.
                </p>
            </div>


            <div className='w-full msm:w-90 msm:-ml-2.5'>
            <FloatingInput id='reset_username_email' label='Email' validateInput={validateEmail}  setInputNameOnChange={setEmail}
              backendValidationError={resetUsernameError}
              setBackendValidationError={setResetUsernameError}
              setBackendMessage={setResetUsernameMessage}  />
            </div>

            {resetUsernameError != null && <div className=" -ml-3 mt-3  h-2 text-xs font-light w-85"> <p className={`text-red-400`}>{resetUsernameMessage}</p> </div>}

            <div id="reset_username_email_me" onClick={(e)=>handleForgetUsernameSubmit(e)} className={`w-full h-13 msm:w-93 mt-auto mb-12 flex bg-reddit_search ${  email && validateEmail(email) && resetUsernameError==null  ? ' bg-reddit_upvote hover:bg-orange-800 cursor-pointer' : ''} rounded-3xl text-gray-600 flex-row justify-center items-center `}>
                <p className={`no-select font-medium text-sm ${ email && validateEmail(email) && resetUsernameError==null ?' text-white' : ''} `}>Email Me</p>
            </div>
            </div>
        </div>
    );
}

export default ForgetUsername;