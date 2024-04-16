import React, { useState, useEffect, useContext } from "react";
import Input from "../FloatingInput";
import GAButtons from "../GAButtons";
import FloatingInput from "../FloatingInput";
import { postRequest } from "../../../services/Requests";
import { useGoogleLogin } from '@react-oauth/google';
import { Client_ID, baseUrl } from "../../../constants";
import { UserContext } from '@/context/UserContext';
import { LoginSuccessToast, LoginFailedToast } from "../LoginToast";
import { ToastContainer } from "react-toastify";


/**
 * SignUpEmail component.
 * 
 * @component
 * @param {Object} props - Props passed to the component.
 * @param {function} props.setIsOpenedSignupMenu - Function to set the state of the signup menu.
 * @param {function} props.setIsOpenedLoginMenu - Function to set the state of the login menu.
 * @param {function} props.setIsOpenedSecondSignupMenu - Function to set the state of the second signup menu.
 * @param {function} props.setNavbarSignupEmail - Function to set the email in the navbar.
 * 
 * @returns {JSX.Element} The rendered SignUpEmail component.
 * 
 */
const SignUpEmail = ({ setIsOpenedSignupMenu, setIsOpenedLoginMenu, setIsOpenedSecondSignupMenu, setNavbarSignupEmail }) => {
    const [nextPage, setNextPage] = useState(false)
    const [email, setEmail] = useState('');
    const [OAuthAccessToken, setOAuthAccessToken] = useState(null);
    const [oauthSignUpError, setOauthSignUpError] = useState(null);
    const { setIsLoggedIn } = useContext(UserContext);


    useEffect(() => {

        if (nextPage) {
            setIsOpenedSignupMenu(false);
            setIsOpenedSecondSignupMenu(true);
            setNextPage(false);
        }

    }, [nextPage]);


    /**
     * Validates the provided email.
     * 
     * @param {string} email - The email to validate.
     * 
     * @returns {boolean} True if the email is valid, false otherwise.
     * 
     * @example
     * const isValid = validateEmail('test@example.com'); // returns true
     */
    const validateEmail = (email) => {
        var re = /^([a-z A-Z 0-9 \. _]+)@([a-z A-Z]+)\.([a-z A-Z]{2,6})$/;
        return re.test(email);
    };

    /**
 * Handles the submission of the signup form.
 * 
 * @param {Event} e - The event triggered by the form submission.
 * 
 */
    const handleSignupEmailSubmit = async (e) => {
        if (email && validateEmail(email)) {
            e.stopPropagation();
            setNavbarSignupEmail(email)
            setNextPage(true);
        }
    }
    useEffect(() => {
        async function sendToken() {
            if (OAuthAccessToken) {
                const response = await postRequest(`${baseUrl}/user/auth/google`, { googleToken: OAuthAccessToken });

                if (response.status !== 200 && response.status !== 201) {
                    setOauthSignUpError(response.data.message);
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
        }
        sendToken();
    },
        [OAuthAccessToken]
    );

    /**
 * Handles the Google login process.
 * 
 */
    const handleGoogleLogin = useGoogleLogin({
        clientId: { Client_ID },
        onSuccess: (codeResponse) => { setOAuthAccessToken(codeResponse.access_token); },
        onError: (error) => console.log('SignUp Failed:', error)
    });

    return (
        <>
            <ToastContainer
                position="bottom-center"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme="colored" />

            <div id="navbar_signup_menu" className="flex min-w-88 pt-2 flex-col w-full h-full h-min-160 msm:px-13.5 pl-4 pr-4 bg-reddit_menu msm:rounded-3xl">


                <div className="h-full w-full flex flex-col ">

                    <div className="flex pt-8 flex-row justify-between">
                        <h1 className="text-2xl h-7 px-2.5 text-white font-bold mb-2">
                            Sign Up
                        </h1>
                        <div id="signup1_close" className=" flex justify-end pb-2 -mt-1 msm:-mr-3  rounded-2xl">
                            <div onClick={() => setIsOpenedSignupMenu(false)} className="flex h-8 w-8 bg-reddit_search  hover:bg-reddit_search_light rounded-full ">
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
                    </div>



                    <p className="text-[14px] px-2.5 my-2 h-10 text-white">
                        By continuing, you agree to our{" "}
                        <a id="signup_user_agreement"
                            className="text-reddit_links cursor-pointer hover:text-blue-300 no-underline"
                            target="_blank"
                            href="https://www.redditinc.com/policies/user-agreement"
                        >
                            User Agreement
                        </a>{" "}
                        and acknowledge that you understand the{" "}
                        <a id="signup_policy"
                            className="text-reddit_links cursor-pointer hover:text-blue-300 no-underline"
                            target="_blank"
                            href="https://www.redditinc.com/policies/privacy-policy"
                        >
                            Privacy Policy.
                        </a>

                    </p>
                    <div onClick={handleGoogleLogin} className="w-full px-2 h-10 mt-4">
                        <GAButtons />
                    </div>

                    <div className="flex flex-row justify-center px-2 msm:px-0 mt-8 mb-8 w-full h-[16px]">
                        <hr className="w-5/12 h-[1px] text-gray-400 self-center"></hr>
                        <span className="text-[12px] px-[16px] text-gray-400 w-[48px] h-[16px]">OR</span>
                        <hr className="w-5/12 h-[1px] text-gray-400 self-center"></hr>
                    </div>

                    <div className="flex flex-col">
                        <div className="min-h-[70px] px-2 ">
                            <FloatingInput
                                id={"signup_email"}
                                label="Email"
                                validateInput={validateEmail}
                                setInputNameOnChange={setEmail}
                                backendValidationError={null}
                            />
                        </div>
                    </div>




                    <div className="mt-auto flex text-[14px] ml-4 text-[#FFFFFF]">
                        Already a redditor? <a id="signup_login" onClick={(e) => { e.stopPropagation(); setIsOpenedSignupMenu(false); setIsOpenedLoginMenu(true) }} className="text-reddit_links ml-1.5 cursor-pointer hover:text-blue-300"> Log In</a>
                    </div>
                </div>

                <div className="mt-auto mb-10 w-full h-[96px] px-2 flex justify-center items-center">
                    <div id="signup_email_continue" onClick={(e) => handleSignupEmailSubmit(e)} className={`${email && validateEmail(email) ? ' bg-reddit_upvote hover:bg-orange-800 cursor-pointer text-white' : 'text-gray-500'} flex w-full h-[48px]  items-center justify-center rounded-3xl bg-reddit_search`}>
                        <span className="flex items-center gap-[8px] text-[14px] font-[600]">
                            Continue
                        </span>
                    </div>
                </div>

            </div>
        </>

    );
};

export default SignUpEmail;
