import { XMarkIcon } from '@heroicons/react/24/outline';
import FloatingInput from "./FloatingInput";
import { useEffect, useState } from 'react';

const ForgetUsername = () => {

    const[enrollme, setEnrollme] = useState(false);

    const validateEmail = (email) => {
        var re = /^([a-z A-Z 0-9 \. _]+)@([a-z A-Z]+)\.([a-z A-Z]{2,6})$/;
        return re.test(email);
    }

    return (

        <div className='z-20 msm:w-132 min-w-90 msm:h-158 w-100% h-100% bg-reddit_lightGreen no-select text-white rounded-2xl items-center flex flex-col'>

            <div className='w-full px-7 pt-10 pb-4 h-12 flex items-center justify-between'>

                <div id="reset_username_back" className="hover:bg-reddit_search_light cursor-pointer rounded-full w-10 h-10 flex justify-center items-center ">
                    <svg rpl="" fill="currentColor" height="20" icon-name="back-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 9.375H2.51l7.932-7.933-.884-.884-9 9a.625.625 0 0 0 0 .884l9 9 .884-.884-7.933-7.933H19v-1.25Z"></path>
                    </svg>
                </div>

                <div id="reset_username_close" className="hover:bg-reddit_search_light cursor-pointer rounded-full w-8 h-8 flex justify-center items-center bg-reddit_search">
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
            <FloatingInput id='reset_username_email' label='Email' validateInput={validateEmail} setSubmitState={setEnrollme}  />
            </div>

           
            

            <div className="px-3 w-full msm:ml-24 -ml-3 mt-6 items-center no-select flex flex-row h-15">
                <a id="reset_username_signup" className="text-sm text-reddit_links hover:text-blue-200 font-light" href="">Sign Up</a>
                <p className="mb-2 ml-2 text-reddit_links mr-2">.</p>
                <a id="reset_username_login" className="text-sm text-reddit_links font-light hover:text-blue-200" href="">Log In</a>
            </div>

            <div id="reset_username_enrollme" className={`w-full h-13 msm:w-93 mt-auto mb-7 flex bg-reddit_search ${enrollme ? ' bg-reddit_upvote hover:bg-orange-800 cursor-pointer' : ''} rounded-3xl text-gray-600 flex-row justify-center items-center `}>
                <p className={`no-select font-medium text-sm ${ enrollme?' text-white' : ''} `}>Email Me</p>
            </div>
            </div>
        </div>
    );
}

export default ForgetUsername;