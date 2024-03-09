/*eslint-disable */
import NavIcon from "./Nav-Icons/Nav-Icons";
import { HomeIcon, EllipsisHorizontalCircleIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import Separator from "./Nav-Icons/Separator";
import DropDownMenu from "./Nav-Icons/DropDownMenu";
const Sidebar = ({ setIsCommunityOpen }) => {

    // Todo: Make the dropdown action have some animation
    return (

     
            <div className="flex h-fit flex-col w-full">
                <NavIcon href="#" text="Home"> <HomeIcon className="h-6 w-6 mr-2  text-gray-50" /> </NavIcon>
                <NavIcon href="#" text="Popular"> <ArrowTrendingUpIcon className="h-6 w-6 mr-2  text-gray-50" /> </NavIcon>
                <NavIcon href="#" text="All" ><EllipsisHorizontalCircleIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
                <Separator />
                <DropDownMenu MenuHeader="RECENT" />
                <Separator />
                <DropDownMenu MenuHeader="COMMUNITIES" setIsCommunityOpen={setIsCommunityOpen} />
                <Separator />
                <DropDownMenu MenuHeader="RESOURCES" />
            </div>
    );
}

export default Sidebar;