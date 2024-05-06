/*eslint-disable */
import propsTypes from "prop-types";
import { XMarkIcon, GlobeAltIcon, EyeIcon, LockClosedIcon, ShieldExclamationIcon } from "@heroicons/react/24/solid";
import "./CreateCommunity.css";
import redditCare from "../../assets/reddit_care.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Separator from "../sidebar/Nav-Icons/Separator";
import CommunityType from "./CommunityType";
import SwitchButton from "./SwitchButton";
import FloatingInput from "../authentication/FloatingInput";
import { postRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";
import { toast, ToastContainer } from "react-toastify";
import { CustomToast } from "./CustomToast";
const SuccessToast = (message) =>
    toast.success(<CustomToast message={message} />,
        {
            toastId: "create-toast-success",
            position: "bottom-center",
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "colored",

        }
    );
/**
 * CreateCommunity component allows users to create a new community.
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.setIsCommunityOpen - Function to set the state of the community modal.
 * @param {Object} props.communityCardRef - Reference to the community card element.
 * @returns {JSX.Element} The CreateCommunity component.
 */
const CreateCommunity = ({ setIsCommunityOpen, communityCardRef }) => {

    /**
     * Validates the community name.
     * @function validateCommName
     * @param {string} commName - The community name to validate.
     * @returns {boolean} True if the community name is valid, false otherwise.
     * */

    const validateCommName = (commName) => {
        if (commName != '' && commName) {
            return true;
        }
        else {
            return false;
        }
    }
    // State variables
    const [communityName, setCommunityName] = useState("");
    const [selectedRadio, setSelectedRadio] = useState("Public-community-type");
    const [isMature, setIsMature] = useState(false);
    const [communityNameError, setCommunityNameError] = useState(null);
    const navigate = useNavigate();
    /**
   * Checks if the given radio button is selected.
   * @function Checked
   * @param {string} selectedRadio - The currently selected radio button.
   * @param {string} type - The type of the radio button.
   * @returns {boolean} True if the radio button is selected, false otherwise.
   */
    const Checked = (selectedRadio, type) => {
        const value = type + "-community-type"
        if (selectedRadio === value) {
            return true;
        }
        else {
            return false;
        }

    }
    /**
   * Handles the change event of the radio buttons.
   * @function handleRadioChange
   * @param {Object} e - The event object.
   */
    const handleRadioChange = (e) => {
        setSelectedRadio(e.target.id);
    }


    /**
     * Handles the creation of a new community.
     * @function handleCreateCommunity
     * @async
     * @returns {Promise<void>}
     * */
    const handleCreateCommunity = async () => {
        const response = await postRequest(`${baseUrl}/subreddit`, { name: communityName, isNSFW: isMature, type: selectedRadio.replace("-community-type", "").toLowerCase()})
        if (!response) return;
        if (response.status !== 200 && response.status !== 201) {
            setCommunityNameError(response.data.message);
        } else {
            SuccessToast("Community created successfully");
            setTimeout(() => {
                setIsCommunityOpen(false);
                navigate(`/r/${communityName}`);
            }, 2000);
        }
    }

    return (<><ToastContainer
        position="bottom-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="colored"
        autoClose={2000}
    />

        <div className="community-modal flex flex-row items-center justify-center">
            <div className="overlay"></div>
            <div ref={communityCardRef} id="community-card" className="bg-reddit_greenyDark min-w-88  z-30 text-white rounded-xl w-100% h-100% pt-auto flex flex-col xs:py-2 xs:h-fit xs:w-120 px-3 ">

                <div className="flex flex-col my-auto">
                    <div className="card-header flex flex-row justify-center sm:justify-between  mb-2"  >

                        <div className="w-100% flex sm:justify-start justify-center mt-2.5 sm:mt-0 -mr-3">
                            <span className="flex flex-col sm:flex-row justify-center sm:content-center">
                                <img src={redditCare} alt="redditCare" className="h-12 w-12  mx-auto" />
                                <span className="flex items-center text-2xl xs:text-2xl font-semibold pt-1 ml-3 mb-2.5 sm:mb-0">Create a Community</span>
                            </span>
                        </div>
                        <button onClick={() => { setIsCommunityOpen(false) }} id="close-create-community" className="h-8 w-8 rounded-full mt-2 bg-reddit_search  hover:bg-reddit_search_light"> <XMarkIcon className="h-6 w-6 ml-1 text-gray-50" /> </button>
                    </div>
                    <div id="card-content" className="flex flex-col ">
                        <p className="mb-3 text-sm text-gray-400 hidden sm:block">Build and grow a community about something you care about. We will help you set things up.</p>

                        <div className="w-full px-1.5">
                            <FloatingInput id="community-name" label="Community Name" validateInput={validateCommName} setBackendValidationError={setCommunityNameError} backendValidationError={communityNameError} setInputNameOnChange={setCommunityName} />
                            {communityNameError && <p className="mt-1 text-red-500 text-[13px]"> {communityNameError} </p>}
                        </div>
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm mt-4 mb-2"><strong>Type</strong></p>

                            <CommunityType type="Public" typeDescription="Anyone can view, post, and comment to this community" handleRadioChange={handleRadioChange} isChecked={Checked(selectedRadio, "Public")} >
                                <GlobeAltIcon className="h-7 w-7 mr-3 text-gray-50" />
                            </ CommunityType >
                            <CommunityType type="Restricted" typeDescription="Anyone can view, post, and comment to this community" handleRadioChange={handleRadioChange} isChecked={Checked(selectedRadio, "Restricted")}  >
                                <EyeIcon className="h-7 w-7 mr-3 text-gray-50" />
                            </ CommunityType >
                            <CommunityType type="Private" typeDescription="Anyone can view, post, and comment to this community" handleRadioChange={handleRadioChange} isChecked={Checked(selectedRadio, "Private")} >
                                <LockClosedIcon className="h-7 w-7 mr-3 text-gray-50" />
                            </ CommunityType >

                        </div>
                        <div className="mt-2 mb-2">
                            <Separator />
                        </div>

                        <div className="commuity-type flex flex-row px-3 py-3 items-center justify-between hover:bg-reddit_search rounded-xl">
                            <div className="flex flex-row mb-2">
                                < ShieldExclamationIcon className="h-7 w-7 mr-4 text-gray-50" />
                                <span className="flex flex-col justify-center mr-2">
                                    <p className="text-sm">Mature (+18) </p>
                                    <p className="text-xs ">Must be over 18 to view and contribute  </p>
                                </span>
                            </div>
                            <div id="ismature-switch-btn" className="flex  justify-center w-13 -mr-4 ">
                                <SwitchButton isSwtched={isMature} setIsSwitched={setIsMature} />
                            </div>
                        </div>

                        {/* <p></p> */}

                        <div className="flex mt-1.5 mb-2.5 justify-end">
                            <button id="cancel-create-community" onClick={() => { setIsCommunityOpen(false) }} className="bg-reddit_search hover:bg-reddit_search_light mx-2 mt-2 px-3 py-3 h-10 rounded-full flex items-center">Cancel</button>

                            <button onClick={handleCreateCommunity} id="name-create-community" className={`mt-2 px-3 py-3 h-10 rounded-full flex items-center ${(communityNameError !== null || communityName.length === 0) ? `bg-reddit_search hover:bg-reddit_search_light opacity-60` : `bg-reddit_blue hover:bg-reddit_light_blue`}`} disabled={(communityNameError !== null || communityName.length === 0)} >{communityName.length === 0 ? "Create your community" : `r/${communityName} `}</button>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    </>
    );
}

CreateCommunity.propTypes = {
    setIsOpen: propsTypes.func
}

export default CreateCommunity;