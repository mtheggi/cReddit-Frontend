/*eslint-disable*/
import "./Nav-Icons.css";
import { PlusIcon } from "@heroicons/react/24/solid"
// import { useState } from "react";
// import CreateCommunity from "../../createCommunity/CreateCommunity";
/**
 * Renders a container with a "Create a community" button.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.setIsCommunityOpen - The function to set the state of the community open status.
 * @param {Object} props.communityButtonRef - The reference to the community button element.
 * @param {Function} props.setIsVisibleLeftSidebar - The function to set the state of the left sidebar visibility.
 * @returns {JSX.Element} The rendered CreateCommunityIcon component.
 */
const CreateCommunityIcon = ({ setIsCommunityOpen, communityButtonRef, setIsVisibleLeftSidebar }) => {

    return (
        <>
            <button ref={communityButtonRef}
                className="h-11 w-full SideIcon-Container text-sm font-light items-center flex flex-row mb-1.5 relative justify-start content-center rounded-lg pl-[16px] pr-4 py-2"
                onClick={() => { setIsCommunityOpen(true); setIsVisibleLeftSidebar(false) }}
                id="sidebar-create-community-icon"
            >
                <span className="items-center">
                    <PlusIcon className="h-6 w-6 mr-2 text-gray-50" />
                </span>
                <span className="text-gray-50 ml-1">Create a community</span>

            </button>

        </>

    );
}
// CreateCommunityIcon.PropTypes = {
//     setIsCommunityOpen: PropTypes.func.isRequired
// }

export default CreateCommunityIcon;