/*eslint-disable */
import NavIcon from "./Nav-Icons/Nav-Icons";
import { HomeIcon, EllipsisHorizontalCircleIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import Separator from "./Nav-Icons/Separator";
import DropDownMenu from "./Nav-Icons/DropDownMenu";
const Sidebar = ({ setIsCommunityOpen, communityButtonRef, setIsVisibleLeftSidebar,  userHistoryRes }) => {

    // Todo: Make the dropdown action have some animation
    return (

     
            <div className="flex h-fit mb-3 flex-col w-full">
                <NavIcon href="" text="Home" id="sidebar_home"> <HomeIcon className="h-6 w-6 mr-2  text-gray-50" /> </NavIcon>
                <NavIcon href="popular" text="Popular" id="sidebar_popular"> <ArrowTrendingUpIcon className="h-6 w-6 mr-2  text-gray-50" /> </NavIcon>
                <NavIcon href="all" text="All" id="sidebar_all" ><EllipsisHorizontalCircleIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
                <Separator />
                <DropDownMenu MenuHeader="RECENT" id="sidebar_recent"  userHistoryRes={userHistoryRes}  />
                <Separator />
                <DropDownMenu MenuHeader="COMMUNITIES" id="sidebar_communities" setIsCommunityOpen={setIsCommunityOpen} communityButtonRef={communityButtonRef} setIsVisibleLeftSidebar={setIsVisibleLeftSidebar} />
                <Separator />
                <DropDownMenu MenuHeader="RESOURCES" id="sidebar_resources" />
            </div>
    );
}

export default Sidebar;