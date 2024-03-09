/*eslint-disable */
import { useState } from 'react';
import { ChevronUpIcon, UserGroupIcon, RectangleGroupIcon, BoltIcon, SignalIcon, DocumentTextIcon, MicrophoneIcon, ChevronDownIcon, WrenchIcon, BookOpenIcon, ScaleIcon, NewspaperIcon, ChatBubbleOvalLeftIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import CommunityIcon from './Community-icon';
import NavIcon from './Nav-Icons';
import Separator from './Separator';
import CreateCommunityIcon from './CreateCommunityIcon'

import PropTypes from 'prop-types';

const DropDownMenu = ({ MenuHeader, setIsCommunityOpen }) => {
    const [isDropped, setIsDropped] = useState(true);
    const [isResources] = useState(MenuHeader === "RESOURCES");
    const [isCommunity] = useState(MenuHeader === "COMMUNITIES");
    const [isRecent] = useState(MenuHeader === "RECENT");


    return (
        <>
            <div className="min-h-15 w-full bg-reddit_greenyDark flex flex-row  relative items-center rounded-lg py-2 ">

                <div onClick={(event) => { event.stopPropagation(); setIsDropped(!isDropped); }} className='flex justify-between h-10 rounded-xl items-center hover:bg-reddit_search px-3 w-full flex-row cursor-pointer'>
                    <span className='text-gray-400 font-light lette text-xs tracking-widest'> {MenuHeader} </span>
                    <span className='items-center'>
                        {isDropped ? <ChevronUpIcon className="h-5 w-5 mr-2  text-gray-300" /> : <ChevronDownIcon className="h-5 w-5 mr-2 text-gray-300" />}
                    </span>
                </div>

            </div >
            {isRecent && isDropped && <div>

                <NavIcon href="#" text="r/testIcoons" ><ChatBubbleOvalLeftIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
            </div>
            }


            {isCommunity && isDropped && <div>
                <CreateCommunityIcon setIsCommunityOpen={setIsCommunityOpen} />
                <CommunityIcon text={"r/testcomminty"} />
                <CommunityIcon text={"r/samirsaiid"} />
                <CommunityIcon text={"r/Pizzalovers"} />
                <CommunityIcon text={"r/getsomeshit"} />
                <CommunityIcon text={"r/hellobitchass"} />
                <CommunityIcon text={"r/noreway"} />
                <CommunityIcon text={"r/itestCsdlkj"} />
                <CommunityIcon text={"r/programmming"} />
                <CommunityIcon text={"r/Pythooon"} />
                <CommunityIcon text={"r/cppTESTT"} />

            </div>
            }
            {isResources && isDropped && <div className="">
                <NavIcon href="#" text="About Reddit"> <ChatBubbleOvalLeftIcon className="h-6 w-6 mr-2  text-gray-50" /> </NavIcon>
                <NavIcon href="#" text="Advertise" ><SignalIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
                <NavIcon href="#" text="Help" ><QuestionMarkCircleIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
                <NavIcon href="#" text="Blog" ><BookOpenIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
                <NavIcon href="#" text="Careers" ><WrenchIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
                <NavIcon href="#" text="Press" ><MicrophoneIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
                <Separator />
                <NavIcon href="#" text="Communties" ><UserGroupIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
                <NavIcon href="#" text="Best of Reddit" ><BoltIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
                <NavIcon href="#" text="Topics" ><RectangleGroupIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
                <Separator />
                <NavIcon href="#" text="Content Policy" ><DocumentTextIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
                <NavIcon href="#" text="Privacy Policy" ><ScaleIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
                <NavIcon href="#" text="Agreement" ><NewspaperIcon className="h-6 w-6 mr-2  text-gray-50" /></NavIcon>
            </div>}

        </>

    );
}
DropDownMenu.propTypes = {
    MenuHeader: PropTypes.string
}

export default DropDownMenu;