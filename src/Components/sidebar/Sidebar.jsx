import NavIcon from "./Nav-Icons/Nav-Icons";
import { HomeIcon } from "@heroicons/react/24/solid";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Separator from "./Nav-Icons/Separator";
import DropDownMenu from "./Nav-Icons/DropDownMenu";
const Sidebar = () => {

    return (

        <div className="styled-scrollbars fixed w-1/6 ml-5 h-screen mt-12 flex-col bg-reddit_greenyDark overflow-y-scroll">
            <NavIcon href="#" text="Home"> <HomeIcon className="h-6 w-6 mr-2  text-gray-50" /> </NavIcon>
            <NavIcon href="#" text="Popular"> <ArrowTrendingUpIcon className="h-6 w-6 mr-2  text-gray-50" /> </NavIcon>
            <NavIcon href="#" text="All" ><EllipsisHorizontalCircleIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
            <Separator />
            <DropDownMenu MenuHeader="RECENT" />
            <Separator />
            <DropDownMenu MenuHeader="COMMUNITIES" />
            <Separator />
            <DropDownMenu MenuHeader="RESOURCES" />


        </div>

    );
}

export default Sidebar;