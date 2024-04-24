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


        <div className="flex h-fit mb-3 pl-4 pr-2 flex-col w-full">
            <NavIcon href="/" text="Home" id="sidebar_home"> <svg rpl="" fill="white" height="20" icon-name="home-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m17.71 8.549 1.244.832v8.523a1.05 1.05 0 0 1-1.052 1.046H12.73a.707.707 0 0 1-.708-.707v-4.507c0-.76-1.142-1.474-2.026-1.474-.884 0-2.026.714-2.026 1.474v4.507a.71.71 0 0 1-.703.707H2.098a1.046 1.046 0 0 1-1.052-1.043V9.381l1.244-.835v9.158h4.44v-3.968c0-1.533 1.758-2.72 3.27-2.72s3.27 1.187 3.27 2.72v3.968h4.44V8.549Zm2.04-1.784L10.646.655a1.12 1.12 0 0 0-1.28-.008L.25 6.765l.696 1.036L10 1.721l9.054 6.08.696-1.036Z"></path></svg> </NavIcon>
            <NavIcon href="/popular" text="Popular" id="sidebar_popular"> <svg rpl="" fill="white" height="20" icon-name="popular-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"> <path d="M10 0a10 10 0 1 0 10 10A10.01 10.01 0 0 0 10 0Zm0 18.75a8.7 8.7 0 0 1-5.721-2.145l8.471-8.471v4.148H14V6.638A.647.647 0 0 0 13.362 6H7.718v1.25h4.148L3.4 15.721A8.739 8.739 0 1 1 10 18.75Z"></path></svg> </NavIcon>
            <NavIcon href="/all" text="All" id="sidebar_all" ><svg rpl="" fill="white" height="20" icon-name="all-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"> <path d="M10 0a10 10 0 1 0 10 10A10.01 10.01 0 0 0 10 0Zm5 17.171V6h-1.25v11.894a8.66 8.66 0 0 1-2.75.794V10H9.75v8.737A8.684 8.684 0 0 1 6.47 18H7v-4H5.75v3.642a8.753 8.753 0 1 1 9.25-.471Z"></path></svg></NavIcon>


            {isLoggedIn &&
                <>
                    <Separator />
                    <DropDownMenu MenuHeader="RECENT" id="sidebar_recent" code='dd_recents' userHistoryRes={userHistoryRes} />
                    <Separator />
                    <DropDownMenu MenuHeader="COMMUNITIES" id="sidebar_communities" code='dd_communities' setIsCommunityOpen={setIsCommunityOpen} communityButtonRef={communityButtonRef} setIsVisibleLeftSidebar={setIsVisibleLeftSidebar} />
                </>
            }
            <Separator />
            <DropDownMenu MenuHeader="RESOURCES" id="sidebar_resources" code='dd_resources' />
            <Separator />
        </div >
    );
}

export default Sidebar;