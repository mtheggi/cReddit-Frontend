import { useState } from 'react';
import { ChevronUpIcon, UserGroupIcon, RectangleGroupIcon, BoltIcon, SignalIcon, DocumentTextIcon, MicrophoneIcon, ChevronDownIcon, WrenchIcon, BookOpenIcon, ScaleIcon, NewspaperIcon, ChatBubbleOvalLeftIcon, PresentationChartLineIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import CommunityIcon from './Community-icon';
import NavIcon from './Nav-Icons';
import Separator from './Separator';

const DropDownMenu = ({ MenuHeader }) => {
    const [isDropped, setIsDropped] = useState(false);
    const [isResources, setIsResources] = useState(MenuHeader === "RESOURCES");
    return (
        <>
            <div className="h-9 w-full bg-reddit_greenyDark flex flex-row  relative justify-between content-center rounded-lg px-4 py-2 hover:bg-reddit_search">
                <span className='text-gray-500 text-sm'> {MenuHeader} </span>
                <span onClick={() => { setIsDropped(!isDropped) }} className='items-center'>
                    {isDropped ? <ChevronUpIcon className="h-5 w-5 mr-2  text-gray-300" /> : <ChevronDownIcon className="h-5 w-5 mr-2  text-gray-300" />}
                </span>

            </div >
            {!isResources && isDropped && <div>
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
            {isResources && isDropped && <div>
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

export default DropDownMenu;