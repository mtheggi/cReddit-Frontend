import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useState, useRef } from 'react';
import { getRequest } from '../../services/Requests';
import { baseUrl } from '../../constants';


/**
 * FloatingInput is a React component that renders an input field with validation and error handling.
 *
 * @component
 * @param {Object} props - The properties that define the component's behavior and display.
 * @param {string} props.id - The unique identifier for the input field.
 * @param {string} props.label - The label for the input field.
 * @param {Function} props.validateInput - The function to validate the input field.
 * @param {Function} props.setInputNameOnChange - The function to set the input name on change.
 * @param {string} props.backendValidationError - The backend validation error message.
 * @param {Function} props.setBackendValidationError - The function to set the backend validation error.
 * @param {Function} props.setBackendMessage - The function to set the backend message.
 * @returns {JSX.Element} A JSX element that represents the input field.
 */


const FloatingInput = ({ id, label, validateInput, setInputNameOnChange, backendValidationError, setBackendValidationError, setBackendMessage }) => {

    const [input, setInput] = useState(null);
    const [backendUsernameError, setBackendUsernameError] = useState(null);
    const inputRef = useRef(null);
    const isRed = (!validateInput(input) && input != null || backendValidationError != null) || (backendUsernameError != null && id === "signup_username");
    const isGreen = validateInput(input) && input != null && (backendValidationError == null) && backendUsernameError == null;


    /**
 * Checks if the provided username is available.
 *
 * @async
 * @function isAvailableUsername
 * @param {string} username - The username to check.
 * @returns {Promise<void>} A Promise that resolves when the check is complete.
 */
    const isAvailableUsername = async (username) => {
        if (validateInput(username)) {
            const response = await getRequest(`${baseUrl}/user/is-username-available/${username}`);
            if (response.status !== 200 && response.status !== 201) {
                setBackendUsernameError(response.data.message);
            }
        }
    }

    /**
 * Checks if the provided subreddit name is available.
 *
 * @async
 * @function isAvailableSubredditName
 * @param {string} subredditName - The subreddit name to check.
 * @returns {Promise<void>} A Promise that resolves when the check is complete.
 */
    const isAvailableSubredditName = async (subredditName) => {
        if (validateInput(subredditName)) {
            const response = await getRequest(`${baseUrl}/subreddit/is-name-available/${subredditName}`);
            if (response.status !== 200 && response.status !== 201) {
                setBackendValidationError(response.data.message);
            }
        }
    }

    /**
 * Generates a new username and sets it as the current input.
 *
 * @async
 * @function
 * @returns {Promise<void>} A Promise that resolves when the username is generated and set.
 */
    const handleGenerateUsername = async () => {
        const response = await getRequest(`${baseUrl}/user/generate-username`);
        if (response.status == 200 || response.status == 201) {
            if (inputRef.current) {
                inputRef.current.value = response.data.username;
                setInput(response.data.username);
                setInputNameOnChange(response.data.username);
                setBackendUsernameError(null);
                setBackendValidationError(null);
                inputRef.current.style.height = "24px";
                inputRef.current.style.marginTop = "20px";
                inputRef.current.style.width = "85%";
            }
        }
    }

    return (
        <div className='w-full flex-col h-16'>
            <div onChange={(e) => { if (setBackendValidationError) { setBackendValidationError(null) }; if (setInputNameOnChange) { setInputNameOnChange(e.target.value) }; if (setBackendMessage) { setBackendMessage(null) } }} onBlur={(e) => { setInput(e.target.value); if (id == 'signup_username') { isAvailableUsername(e.target.value) }; if (id === "community-name") { isAvailableSubredditName(e.target.value) } }} className={`relative flex items-center flex-row z-0 bg-reddit_search rounded-2xl h-14 w-full hover:bg-reddit_search_light border-1 ${isRed ? 'border-red-400' : 'border-transparent'}`}>
                <input ref={inputRef} onFocus={() => { setInput(null); setBackendUsernameError(null); }} onChange={(e) => {
                    if (e.target.value !== "") {
                        e.target.style.height = "24px";
                        e.target.style.marginTop = "20px";
                        e.target.style.width = "85%";
                    }
                }} maxLength={label !== 'Email' && id !== 'login_username' && id !== 'login_password' ? '21' : '320'} type={label.includes('Password') ? 'password' : 'text'} autoComplete={label === 'Name' ? 'off' : 'on'} onCopy={(e) => { if (label === 'Password') e.preventDefault(); }} id={id} className={`block focus:mt-5  focus:h-6 h-13 px-0 ml-3.5 w-full text-sm text-white bg-transparent border-0  appearance-none dark:text-white   focus:outline-none focus:ring-0  peer`} placeholder=" " />
                <div className="flex absolute text-sm duration-300 transform -translate-y-3 scale-85 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-reddit_upvote peer-focus:dark:text-reddit_upvote peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ml-3.5 mt-1">
                    <label htmlFor={id} className="text-gray-400 dark:text-gray-300">{label}</label>
                    <span className="text-red-500 dark:text-red-400 ml-1">*</span>
                </div>



                <div className={`${id == "signup_username" ? 'mr-2' : ''}`}>
                    {isRed ? (<ExclamationCircleIcon className={`text-red-400 ml-auto my-auto ${id == "signup_username" ? '' : 'mr-3'} w-9 h-9`} />) : ''}
                    {isGreen ? (<CheckIcon className="text-green-400 ml-auto w-7 my-auto h-7" />) : ''}
                </div>

                {id == "signup_username" && (<div onClick={handleGenerateUsername} className='mr-4 cursor-pointer'>
                    <svg rpl="" fill="white" height="24" icon-name="rotate-fill" viewBox="0 0 20 20" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.2 15.376a1 1 0 0 1 0 1.25l-2.4 2.999a1 1 0 0 1-1.112.318 1 1 0 0 1-.673-.943v-2H7.8A5.8 5.8 0 0 1 2 11.206V9.001h2v2.205a3.8 3.8 0 0 0 3.8 3.795h2.22v-2a1 1 0 0 1 1.781-.625l2.399 3ZM12.205 3.002h-2.22v-2A1 1 0 0 0 8.2.38l-2.4 3a1 1 0 0 0 0 1.25l2.4 3a1 1 0 0 0 1.116.315 1 1 0 0 0 .669-.943v-2h2.22A3.8 3.8 0 0 1 16 8.802v2.2h2v-2.2a5.8 5.8 0 0 0-5.795-5.8Z"></path>
                    </svg>
                </div>)}
            </div>


            {(input != null || input === '') &&
                (<div className="mt-1 ml-1 h-5 text-xs font-light w-92">
                    {
                        (input === '') && (<p className="text-red-400">Please fill out this field.</p>)
                    }
                    {
                        (!validateInput(input) && !(input === '') && label == 'Confirm New Password') &&  <p className="text-red-400">Please make sure that the passwords match.</p>
                    }
                    {
                        (!validateInput(input) && !(input === '') && label != 'Password' && label!='Username' && label != 'Confirm New Password') &&  <p className="text-red-400">Please enter a valid {label}.</p>
                    }
                    {
                        (!validateInput(input) && !(input === '') && label == 'Password') && <p className="text-red-400">Please lengthen this {label} to 8 characters or more.</p>
                    }
                    {
                        (!validateInput(input) && input.length < 3 && !(input === '') && id == 'signup_username') && <p className="text-red-400">Please lengthen this {label} to be 3 characters or more.</p>
                    }
                    {
                        (!validateInput(input) && input.length > 3 && !(input === '') && id == 'signup_username') && <p className="text-red-400 w-full">{label} can't contain any special characters except '-' & '_' .</p>
                    }
                    {
                        (validateInput(input) && !(input === '') && id == 'signup_username') && <p className="text-red-400">{backendUsernameError}</p>
                    }

                </div>)
            }
        </div>
    );
}

export default FloatingInput;