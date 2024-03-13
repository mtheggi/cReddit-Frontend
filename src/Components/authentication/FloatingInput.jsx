import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useState, useRef } from 'react';


const FloatingInput = ({ id, label, validateInput, setSubmitState }) => {

    let onChangeEmail=null;
    const [input, setInput] = useState(null);
    const isRed = !validateInput(input) && input != null;
    const isGreen = validateInput(input) && input != null;


    
    return (
        <div className='w-full flex-col h-16'>
            <div  onChange={(e) => {if (setSubmitState) {setSubmitState(validateInput(e.target.value)); }}}  onBlur={(e) => setInput(e.target.value)} className={`relative flex flex-row z-0 bg-reddit_search rounded-2xl h-14 w-full hover:bg-reddit_search_light border-1 ${isRed ? 'border-red-400' : 'border-transparent'}`}>
                <input onFocus={()=> setInput(null)} type="text" id={id} className="block focus:mt-5 focus:h-6 h-13 px-0 ml-3.5 w-85% text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <div className="flex absolute text-sm duration-300 transform -translate-y-3 scale-85 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-reddit_upvote peer-focus:dark:text-reddit_upvote peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ml-3.5 mt-1">
                    <label htmlFor={id} className="text-gray-500 dark:text-gray-400">{label}</label>
                    <span className="text-red-500 dark:text-red-400 ml-1">*</span>
                </div>
                {isRed ? (<ExclamationCircleIcon className="text-red-400 ml-auto my-auto mr-4 w-9 h-9" />) : ''}
                {isGreen ? (<CheckIcon className="text-green-400 ml-auto mr-4 w-7 my-auto h-7" />) : ''}
            </div>



            {(!validateInput(input) && input != null || input === '') &&
                (<div className="mt-1 ml-1 h-5 text-xs font-light w-85">
                    {
                        (input === '') && (<p className="text-red-400">Please fill out this field.</p>)
                    }
                    {
                        (!validateInput(input) && !(input === '')) && (<p className="text-red-400">Please enter a valid {label}.</p>)
                    }
                </div>)
            }


        </div>
    );
}

export default FloatingInput;