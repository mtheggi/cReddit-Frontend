/*eslint-disable */
import { useState } from 'react';
import { ChevronUpIcon, UserGroupIcon, RectangleGroupIcon, BoltIcon, SignalIcon, DocumentTextIcon, MicrophoneIcon, ChevronDownIcon, WrenchIcon, BookOpenIcon, ScaleIcon, NewspaperIcon, ChatBubbleOvalLeftIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import CommunityIcon from './Community-icon';
import NavIcon from './Nav-Icons';
import Separator from './Separator';


import PropTypes from 'prop-types';

const DropDownMenu = ({ MenuHeader, id }) => {

    const toSnakeCase = (str) => "sidebar_resources_"+str.toLowerCase().split(' ').join('_');
    const [isDropped, setIsDropped] = useState(false);
    const [isResources] = useState(MenuHeader === "RESOURCES");
    const [isCommunity] = useState(MenuHeader === "COMMUNITIES");
    const [isRecent] = useState(MenuHeader === "RECENT");


    return (
        <>
            <div id={id} className="min-h-15 w-full bg-reddit_greenyDark flex flex-row  relative items-center rounded-lg py-2 ">

                <div onClick={(event) => { event.stopPropagation(); setIsDropped(!isDropped); }} className='flex justify-between h-10 rounded-xl items-center hover:bg-reddit_search px-3 w-full flex-row cursor-pointer'>
                    <span className='text-gray-400 font-light lette text-xs tracking-widest'> {MenuHeader} </span>
                    <span className='items-center'>
                        {isDropped ? <ChevronUpIcon className="h-5 w-5 mr-2  text-gray-300" /> : <ChevronDownIcon className="h-5 w-5 mr-2 text-gray-300" />}
                    </span>
                </div>

            </div >
            {isRecent && isDropped && <div>

                <NavIcon href="#" text="r/testIcoons" id="sidebar_recent_icon1" ><ChatBubbleOvalLeftIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
            </div>
            }


            {isCommunity && isDropped && <div>
                <CommunityIcon text={"r/testcomminty"} divId="sidebar_community_icon1" bookmarkId="sidebar_community_bookmark1" />
                <CommunityIcon text={"r/samirsaiid"} divId="sidebar_community_icon2" bookmarkId="sidebar_community_bookmark2" />
                <CommunityIcon text={"r/Pizzalovers"} divId="sidebar_community_icon3" bookmarkId="sidebar_community_bookmark3" />
                <CommunityIcon text={"r/getsomeshit"} divId="sidebar_community_icon4" bookmarkId="sidebar_community_bookmark4" />
                <CommunityIcon text={"r/hellobitchass"} divId="sidebar_community_icon5" bookmarkId="sidebar_community_bookmark5" />
                <CommunityIcon text={"r/noreway"} divId="sidebar_community_icon6" bookmarkId="sidebar_community_bookmark6" />
                <CommunityIcon text={"r/itestCsdlkj"} divId="sidebar_community_icon7" bookmarkId="sidebar_community_bookmark7" />
                <CommunityIcon text={"r/programmming"} divId="sidebar_community_icon8" bookmarkId="sidebar_community_bookmark8" />
                <CommunityIcon text={"r/Pythooon"} divId="sidebar_community_icon9" bookmarkId="sidebar_community_bookmark9" />
                <CommunityIcon text={"r/cppTESTT"} divId="sidebar_community_icon10" bookmarkId="sidebar_community_bookmark10" />

            </div>
            }


            {isResources && isDropped && <div className="">
                <NavIcon id={toSnakeCase("About Reddit")} href="#" text="About Reddit" >  <ChatBubbleOvalLeftIcon className="h-6 w-6 mr-2  text-gray-50" /> </NavIcon>
                <NavIcon id={toSnakeCase("Advertise")} href="#" text="Advertise" ><SignalIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
                <NavIcon id={toSnakeCase("Help")} href="#" text="Help" ><QuestionMarkCircleIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
                <NavIcon id={toSnakeCase("Blog")} href="#" text="Blog" ><BookOpenIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
                <NavIcon id={toSnakeCase("Careers")} href="#" text="Careers" ><WrenchIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
                <NavIcon id={toSnakeCase("Press")} href="#" text="Press" ><MicrophoneIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
                <Separator />
                <NavIcon id={toSnakeCase("Communties")} href="#" text="Communties" ><UserGroupIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
                <NavIcon id={toSnakeCase("Best of Reddit")} href="#" text="Best of Reddit" ><BoltIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
                <NavIcon id={toSnakeCase("Topics")} href="#" text="Topics" ><RectangleGroupIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
                <Separator />
                <NavIcon id={toSnakeCase("Content Policy")} href="#" text="Content Policy" ><DocumentTextIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
                <NavIcon id={toSnakeCase("Privacy Policy")} href="#" text="Privacy Policy" ><ScaleIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
                <NavIcon id={toSnakeCase("Agreement")} href="#" text="Agreement" ><NewspaperIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
            </div>}

        </>

    );
}
DropDownMenu.propTypes = {
    MenuHeader: PropTypes.string
}

export default DropDownMenu;