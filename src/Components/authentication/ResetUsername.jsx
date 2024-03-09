import { isValidElement, useState } from "react";
import { BookmarkIcon, CheckIcon, ChevronDownIcon, EllipsisHorizontalIcon, ExclamationCircleIcon, EyeSlashIcon, FlagIcon, InboxIcon, ViewColumnsIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

const ResetUsername = () => {

    const [isHoveredEmailInput, setIsHoveredEmailInput] = useState(false);
    const [isChangedInputEmail, setIsChangedInputEmail] = useState(null);
    const [emailInput, setEmailInput] = useState(null);
    const [onChangeEmail, setOnChangeEmail] = useState(null);

    const validateEmail = (email) => {
        var re = /^([a-z A-Z 0-9 \. _]+)@([a-z A-Z]+)\.([a-z A-Z]{2,6})$/;
        return re.test(email);
    }

    return (

        <div className='z-20 w-132 h-158 bg-reddit_lightGreen no-select text-white rounded-2xl items-center flex flex-col'>

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


            <div className=" pt-1 px-3 w-94 flex-col h-32">
                <h1 className=" text-2xl font-semibold mb-2">
                    Recover your username
                </h1>
                <p className="text-sm font-light text-gray-200">
                    Tell us the email address associated with your Reddit account, and we’ll send you an email with your username.
                </p>
            </div>

            <div onMouseEnter={() => setIsHoveredEmailInput(true)}
                onMouseLeave={() => setIsHoveredEmailInput(false)} className={`px-3 pt-2.5 w-90 ml-2 h-14 flex flex-col bg-reddit_search hover:bg-reddit_search_light rounded-2xl border-1 ${(!validateEmail(emailInput) && emailInput!=null) ? 'border-red-400' : 'border-transparent'}`}>
                <div className='flex h-4 absolute mt-1 no-select w-84 flex-row'>
                    <p className={`text-gray-400 transition duration-200  ${isChangedInputEmail ? ' scale-75 -translate-x-1 -translate-y-2.5' : ''}`}>Email</p>
                    <p className={`text-red-500 mb-1 ml-1 transition duration-200 ${isChangedInputEmail ? 'scale-75 -translate-x-2.5 -translate-y-2' : ''}`}>*</p>
                    
                    {!validateEmail(emailInput)&&emailInput!=null? (<ExclamationCircleIcon className="text-red-400 ml-auto mr-3 w-7 h-7" />):''}
                    {validateEmail(emailInput)&&emailInput!=null? (<CheckIcon className="text-green-400 ml-auto mr-3 w-7 h-7" />):''}
                </div>
                <input id="reset_username_email" onClick={() => { setIsChangedInputEmail(true); setEmailInput(null) }} onBlur={(e) => { setIsChangedInputEmail(e.target.value !== ''); setEmailInput(e.target.value); }} onChange={(e)=>setOnChangeEmail(e.target.value)} type="text" className={`w-full ${isChangedInputEmail ? 'mt-2.5' : 'mt-0.5'} no-select z-10 bg-transparent text-sm font-light h-7 focus:outline-none text-md text-gray-200 ${isHoveredEmailInput ? 'bg-reddit_search_light' : ''}  `} />

            </div>

            {(!validateEmail(emailInput)&&emailInput!=null || emailInput === '') &&
                (<div className="mt-1 h-5 font-light w-85">
                    {
                        (emailInput === '') && (<p className="text-red-400">Please fill out this field.</p>)
                    }
                    {
                       (!validateEmail(emailInput) && !(emailInput === '')) && (<p className="text-red-400">Please enter a valid email address.</p>)
                    }
                </div>)
            }

            <div className="px-3 w-94 mt-3 items-center no-select flex flex-row h-15">
                <a id="reset_username_signup" className="text-sm text-reddit_links hover:text-blue-200 font-light" href="">Sign Up</a>
                <p className="mb-2 ml-2 text-reddit_links mr-2">.</p>
                <a id="reset_username_login" className="text-sm text-reddit_links font-light hover:text-blue-200" href="">Log In</a>
            </div>

            <div id="reset_username_enrollme" className={`w-94 h-12 mt-auto mb-7 flex bg-reddit_search ${validateEmail(onChangeEmail)&&onChangeEmail!=null ? ' bg-reddit_upvote':''} rounded-3xl text-gray-600 flex-row justify-center items-center `}>
                <p className={`no-select font-medium text-sm ${validateEmail(onChangeEmail)&&onChangeEmail!=null ? ' text-white':''} `}>Email Me</p>

            </div>
        </div>
    );
}

export default ResetUsername;