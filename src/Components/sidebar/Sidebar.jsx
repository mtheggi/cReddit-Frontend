/*eslint-disable */
import NavIcon from "./Nav-Icons/Nav-Icons";
import { HomeIcon, EllipsisHorizontalCircleIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import Separator from "./Nav-Icons/Separator";
import DropDownMenu from "./Nav-Icons/DropDownMenu";
import { useContext } from "react";
import { UserContext } from '@/context/UserContext';
/**
 * Renders the sidebar component.
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.setIsCommunityOpen - The function to set the state of the community open.
 * @param {Object} props.communityButtonRef - The reference to the community button.
 * @param {Function} props.setIsVisibleLeftSidebar - The function to set the state of the left sidebar visibility.
 * @param {Object} props.userHistoryRes - The user history response.
 * @returns {JSX.Element} The rendered sidebar component.
 */
const Sidebar = ({ setIsCommunityOpen, communityButtonRef, setIsVisibleLeftSidebar, userHistoryRes }) => {
    const { isLoggedIn } = useContext(UserContext);

    // Todo: Make the dropdown action have some animation
    return (


        <div className="flex h-fit mb-3 flex-col w-full">
            <NavIcon href="/" text="Home" id="sidebar_home"> <HomeIcon className="h-6 w-6 mr-2  text-gray-50" /> </NavIcon>
            <NavIcon href="popular" text="Popular" id="sidebar_popular"> <ArrowTrendingUpIcon className="h-6 w-6 mr-2  text-gray-50" /> </NavIcon>
            <NavIcon href="all" text="All" id="sidebar_all" ><EllipsisHorizontalCircleIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
            <Separator />
            <DropDownMenu MenuHeader="RECENT" id="sidebar_recent" code='dd_recents' userHistoryRes={userHistoryRes} />

            {isLoggedIn &&
                <>
                    <Separator />
                    <DropDownMenu MenuHeader="COMMUNITIES" id="sidebar_communities" code='dd_communities' setIsCommunityOpen={setIsCommunityOpen} communityButtonRef={communityButtonRef} setIsVisibleLeftSidebar={setIsVisibleLeftSidebar} />
                </>
            }
            <Separator />
            <DropDownMenu MenuHeader="RESOURCES" id="sidebar_resources" code='dd_resources' />
        </div >
    );
}

export default Sidebar;