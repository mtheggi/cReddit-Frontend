import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

/**
 * EmailVerification component.
 *
 * @component
 * @param {Object} props - Props that are passed to the component.
 * @param {function} props.setIsOpenedEmailVerification - Function to set the state of email verification modal.
 * @param {function} props.setIsOpenedForgotPass - Function to set the state of forgot password modal.
 * @param {function} props.setIsOpenedForgotUsername - Function to set the state of forgot username modal.
 * @param {boolean} props.isPrevForgotPassOrUsername - Boolean to check if the previous modal was forgot password or username.
 * @return {JSX.Element} The rendered EmailVerification component.
 *
 */

const EmailVerification = ({ setIsOpenedEmailVerification, setIsOpenedForgotPass, setIsOpenedForgotUsername, isPrevForgotPassOrUsername }) => {

    const [internalClose, setInternalClose] = useState(false);
    const [internalReturnBack, setInternalReturnBack] = useState(false);


    /**
 * useEffect hook for managing the state of the modals.
 *
 * This hook listens for changes in the `internalClose` and `internalReturnBack` states.
 * If `internalClose` is true, it closes the EmailVerification modal and resets `internalClose` to false.
 * If `internalReturnBack` is true, it closes the EmailVerification modal and opens either the ForgotPassword or ForgotUsername modal based on the value of `isPrevForgotPassOrUsername`.
 * It then resets `internalReturnBack` to false.
 */
    useEffect(() => {
        if (internalClose) {
            setIsOpenedEmailVerification(false);
            setInternalClose(false);
        }
        if (internalReturnBack) {
            setIsOpenedEmailVerification(false);

            if (isPrevForgotPassOrUsername == true)
                setIsOpenedForgotPass(true);
            else
                setIsOpenedForgotUsername(true);

            setInternalReturnBack(false);
        }

    }, [internalClose, internalReturnBack]);


    return (

        <div className='z-20 min-w-90 w-100% h-100% msm:w-132 msm:h-158  bg-reddit_lightGreen no-select text-white msm:rounded-3xl items-center flex flex-col'>

            <div className='w-full px-3 pt-10 pb-4 h-12 flex items-center justify-between'>

                <div id="email_verify_back" onClick={() => setInternalReturnBack(true)} className="hover:bg-reddit_search_light msm:ml-4 -ml-2 cursor-pointer rounded-full w-10 h-10 flex justify-center items-center ">
                    <svg rpl="" fill="currentColor" height="20" icon-name="back-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 9.375H2.51l7.932-7.933-.884-.884-9 9a.625.625 0 0 0 0 .884l9 9 .884-.884-7.933-7.933H19v-1.25Z"></path>
                    </svg>
                </div>

                <div id="email_verify_close" onClick={() => setInternalClose(true)} className="hover:bg-reddit_search_light msm:mr-5 cursor-pointer rounded-full w-8 h-8 flex justify-center items-center bg-reddit_search">
                    <XMarkIcon className="w-6 h-7 " />
                </div>
            </div>

            <div className='w-full flex flex-col mt-20 h-full msm:px-2 px-3 items-center'>

                <div className="flex pt-1  items-center w-full flex-col h-fit">
                    <svg rpl="" className="pb-md" fill="#ffffff" height="34" icon-name="inbox-outline" viewBox="0 0 20 20" width="34" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.987 3.636a1.627 1.627 0 0 0-1.624-1.623L1.626 2A1.627 1.627 0 0 0 0 3.625v12.75A1.627 1.627 0 0 0 1.625 18h16.749A1.629 1.629 0 0 0 20 16.373l-.013-12.737ZM1.625 3.25l16.738.013a.375.375 0 0 1 .374.375v1l-7.8 6.8a1.366 1.366 0 0 1-1.941-.025L1.25 4.579v-.954a.375.375 0 0 1 .375-.375Zm17.014 13.39a.376.376 0 0 1-.265.11H1.625a.375.375 0 0 1-.375-.375V6.246l6.888 6.078a2.61 2.61 0 0 0 1.848.762 2.54 2.54 0 0 0 1.8-.732L18.739 6.3l.01 10.078a.376.376 0 0 1-.11.262Z"></path>
                    </svg>
                    <h1 className="w-fit mt-3 text-2xl font-medium mb-2">
                        Check your inbox
                    </h1>
                    <p className="text-sm text-center  msm:px-16  font-light text-gray-200">
                        You'll get a username recovery email if the address you provided has been verified.
                    </p>
                </div>

                <div className='flex flex-col mt-auto items-center'>
                    <p className='mb-2.5 text-sm font-light'>Didn't receive an email? Check your spam folder or</p>
                    <div onClick={(e) => {
                        e.stopPropagation;
                        setInternalReturnBack(true);
                    }} id="Email_verify_try_another_email" className={`w-full h-13 msm:w-93 mt-auto mb-10  msm:mt-23 flex bg-reddit_search hover:bg-reddit_search_light cursor-pointer  rounded-3xl text-gray-600 flex-row justify-center items-center `}>
                        <p className="no-select font-medium text-sm text-gray-300 ">Try Another Email</p>
                    </div>
                </div>

            </div>
        </div>







    );
}

export default EmailVerification;