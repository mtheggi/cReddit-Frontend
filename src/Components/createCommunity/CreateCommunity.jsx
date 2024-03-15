/*eslint-disable */
import propsTypes from "prop-types";
import { XMarkIcon, GlobeAltIcon, EyeIcon, LockClosedIcon, ShieldExclamationIcon } from "@heroicons/react/24/solid";
import "./CreateCommunity.css";
import redditCare from "../../assets/reddit_care.png";
import { useState } from "react";
import Separator from "../sidebar/Nav-Icons/Separator";
import CommunityType from "./CommunityType";
import SwitchButton from "./SwitchButton";
import FloatingInput from "../authentication/FloatingInput";

const CreateCommunity = ({ setIsCommunityOpen, communityCardRef }) => {

    const validateCommName = (commName) => {
        if (commName != '' && commName) {
            return true;
        }
        else {
            return false;
        }
    }

    const [communityName, setCommunityName] = useState("");
    const [selectedRadio, setSelectedRadio] = useState(""); 
    const [isMature, setIsMature] = useState(false);

    const handleRadioChange = (e) => {
        setSelectedRadio(e.target.id);
    }


 

    return (
        <div className="community-modal flex flex-row items-center justify-center">
            <div className="overlay"></div>
            <div ref={communityCardRef} id="community-card" className="bg-reddit_greenyDark fixed z-20 text-white rounded-xl w-100% min-w-300 xs:w-120 h-fit px-3 py-2">

                <div className="card-header flex flex-row justify-center sm:justify-between mb-2"  >

                    <div className="w-100% flex sm:justify-start justify-center mt-2.5 sm:mt-0 -mr-3">
                        <span className="flex flex-col sm:flex-row justify-center sm:content-center">
                            <img src={redditCare} alt="redditCare" className="h-12 w-12  mx-auto" />
                            <span className="flex items-center text-2xl xs:text-2xl font-semibold pt-1 ml-3 mb-2.5 sm:mb-0">Create a Community</span>
                        </span>
                    </div>
                    <button onClick={() => { setIsCommunityOpen(false) }} className="h-8 w-8 rounded-full mt-2 bg-reddit_search  hover:bg-reddit_search_light"> <XMarkIcon className="h-6 w-6 ml-1 text-gray-50" /> </button>
                </div>
                <div id="card-content" className="flex flex-col ">
                    <p className="mb-3 text-sm text-gray-400 hidden sm:block">Build and grow a community about something you care about. We will help you set things up.</p>
                    {/* <input type="text"
                        id="community-name"
                        className="bg-reddit_search h-13 px-3 rounded-3xl hover:bg-reddit_search_light"
                        placeholder="Name"
                        value={communityName}
                        onChange={(e) => setCommunityName(e.target.value)}
                        maxLength="21"
                        autoComplete="off"
                        required
                    /> */}

                    {/* Replaced the upper normal input with the FloatingInput component */}
                    <div className="w-full px-1.5">
                    <FloatingInput id="community-name" label="Name" validateInput={validateCommName} setInputNameOnChange={setCommunityName} />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm mt-4 mb-2"><strong>Type</strong></p>

                        <CommunityType type="Public" typeDescription="Anyone can view, post, and comment to this community" handleRadioChange={handleRadioChange} >
                            <GlobeAltIcon className="h-7 w-7 mr-3 text-gray-50" />
                        </ CommunityType >
                        <CommunityType type="Restricted" typeDescription="Anyone can view, post, and comment to this community" handleRadioChange={handleRadioChange} >
                            <EyeIcon className="h-7 w-7 mr-3 text-gray-50" />
                        </ CommunityType >
                        <CommunityType type="Private" typeDescription="Anyone can view, post, and comment to this community" handleRadioChange={handleRadioChange} >
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



                    <div className="flex mt-1.5 mb-2.5 justify-end">
                        <button id="cancel-create-community" onClick={() => { setIsCommunityOpen(false) }} className="bg-reddit_search hover:bg-reddit_search_light mx-2 mt-2 px-3 py-3 h-10 rounded-full flex items-center">Cancel</button>

                        <button id="name-create-community" className={`mt-2 px-3 py-3 h-10 rounded-full flex items-center ${communityName.length === 0 ? `bg-reddit_search hover:bg-reddit_search_light opacity-60` : `bg-reddit_blue hover:bg-reddit_light_blue`}`} disabled={communityName.length === 0}>{communityName.length === 0 ? "Create your community" : `r/${communityName}`}</button>
                    </div>
                </div>
            </div>

        </div >
    );
}

CreateCommunity.propTypes = {
    setIsOpen: propsTypes.func
}

export default CreateCommunity;