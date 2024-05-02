/*eslint-disable */
import { useState, useEffect, useRef, useContext } from "react";
import {
  ChevronUpIcon,
  UserGroupIcon,
  RectangleGroupIcon,
  BoltIcon,
  SignalIcon,
  DocumentTextIcon,
  MicrophoneIcon,
  ChevronDownIcon,
  WrenchIcon,
  BookOpenIcon,
  ScaleIcon,
  NewspaperIcon,
  ChatBubbleOvalLeftIcon,
  QuestionMarkCircleIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";
import CommunityIcon from "./Community-icon";
import NavIcon from "./Nav-Icons";
import Separator from "./Separator";
import CreateCommunityIcon from "./CreateCommunityIcon";
import { getRequest } from "@/services/Requests";
import { baseUrl } from "@/constants.js";
import { UserContext } from "@/context/UserContext";
import PropTypes from "prop-types";
/**
 * Renders a dropdown menu component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.MenuHeader - The header text of the menu.
 * @param {string} props.id - The ID of the menu.
 * @param {function} props.setIsCommunityOpen - The function to set the state of the community open status.
 * @param {Object} props.communityButtonRef - The reference to the community button element.
 * @param {function} props.setIsVisibleLeftSidebar - The function to set the state of the left sidebar visibility.
 * @param {Array} props.userHistoryRes - The user history data.
 * @returns {JSX.Element} The rendered dropdown menu component.
 */
const DropDownMenu = ({
  MenuHeader,
  id,
  setIsCommunityOpen,
  communityButtonRef,
  setIsVisibleLeftSidebar,
  userHistoryRes,
}) => {
  const toSnakeCase = (str) =>
    "sidebar_resources_" + str.toLowerCase().split(" ").join("_");
  const [isDropped, setIsDropped] = useState(true);
  const [isResources] = useState(MenuHeader === "RESOURCES");
  const [isCommunity] = useState(MenuHeader === "COMMUNITIES");
  const [isRecent] = useState(MenuHeader === "RECENT");
  const [isModeration] = useState(MenuHeader === "MODERATION");
  const { isLoggedIn } = useContext(UserContext);
  const [joinedSubreddits, setJoinedSubreddits] = useState(null);
  const [recentSubreddits, setRecentSubreddits] = useState(null);
  const dropdownRef = useRef(null);

  const getJoinedSubreddits = async () => {
    const response = await getRequest(`${baseUrl}/user/joined-communities`);
    if (!response) return;
    if (response.status == 200 || response.status == 201) {
      const subredditData = response.data.map((subreddit) => ({
        name: subreddit.communityName,
        icon: subreddit.profilePicture,
      }));
      setJoinedSubreddits(subredditData);
    }
  };


  const getModerationSubreddits = async () => {

  };

  const getRecentsubreddits = () => {
    const userHistory = JSON.parse(localStorage.getItem("userHistory"));
    if (userHistory !== null) {
      const recentSubredditsSet = new Set();
      userHistory
        .filter((post) => post?.communityName !== null)
        .forEach((post) => {
          const subreddit = {
            name: post.communityName,
            icon: post.profilePicture,
          };
          recentSubredditsSet.add(JSON.stringify(subreddit));
        });

      const recentSubreddits = Array.from(recentSubredditsSet).map(JSON.parse);

      setRecentSubreddits(recentSubreddits);
    }
  };

  useEffect(() => {
    getJoinedSubreddits();
  }, []);

  useEffect(() => {
    getRecentsubreddits();
  }, [userHistoryRes]);
  return (
    <>
      <div
        id={id}
        className="min-h-14 w-full bg-reddit_greenyDark flex flex-row  relative items-center rounded-lg  "
      >
        <div className="flex h-13 pl-[0.5px] items-center w-full flex-row ">
          <div
            data-testid="isDropped-set"
            onClick={(event) => {
              setIsDropped(!isDropped);
            }}
            className="flex px-2 flex-row justify-between w-full h-10 items-center hover:bg-reddit_hover cursor-pointer rounded-lg"
          >
            <span className="text-gray-400 font-light lette text-xs tracking-widest">
              {" "}
              {MenuHeader}{" "}
            </span>
            <span className="items-center" style={{ pointerEvents: "none" }}>
              <ChevronDownIcon
                data-testid="chvronUP"
                className={`h-5 w-5 mr-2  text-gray-300 transition-transform duration-[300ms] ${isDropped ? "rotate" : ""
                  }`}
              />
            </span>
          </div>
        </div>
      </div>


      <div className={`overflow-hidden  space-y-1 transition-all duration-[300ms] max-h-0 opacity-0 ${isDropped && isRecent ? 'max-h-[600px] opacity-100' : ''}`}>
        {recentSubreddits && recentSubreddits.map((subreddit, index) => {
          if (!subreddit.name) {
            return null;
          }
          return (
            <NavIcon key={index} href={`/r/${subreddit.name}`} text={`r/${subreddit.name}`} id={`sidebar_recent_icon${index}`} >
              <img src={subreddit.icon} alt={`${subreddit.name} community`} className='h-[30px] w-[32px] rounded-full' />
            </NavIcon>
          );
        })}
      </div>


      <div className={`overflow-hidden space-y-1 transition-all duration-[300ms] max-h-0 opacity-0 ${isDropped && isModeration ? 'max-h-[600px] opacity-100' : ''}`}>

        <div className="flex flex-col pb-1">
          <div className="flex cursor-pointer flex-row hover:bg-reddit_hover h-11 px-3 rounded-lg items-center">
            <svg rpl="" fill="white" height="21" icon-name="mod-queue-outline" viewBox="0 0 20 20" width="21" xmlns="http://www.w3.org/2000/svg">
              <path d="m11.5 15.521-.158-.042C11.206 15.444 8 14.581 8 12.25V8.393l3.5-.914 3.5.914v3.857c0 2.331-3.206 3.194-3.342 3.229l-.158.042ZM9.25 9.357v2.893c0 1.147 1.713 1.8 2.249 1.972.536-.177 2.251-.83 2.251-1.972V9.357l-2.25-.586-2.25.586ZM17.375 19H5.625A1.627 1.627 0 0 1 4 17.375V5.625A1.627 1.627 0 0 1 5.625 4h11.75A1.627 1.627 0 0 1 19 5.625v11.75A1.627 1.627 0 0 1 17.375 19ZM5.625 5.25a.375.375 0 0 0-.375.375v11.75a.375.375 0 0 0 .375.375h11.75a.375.375 0 0 0 .375-.375V5.625a.375.375 0 0 0-.375-.375H5.625Zm-3 9.5a.375.375 0 0 1-.375-.375V2.624a.375.375 0 0 1 .375-.374h11.75a.375.375 0 0 1 .375.374H16A1.627 1.627 0 0 0 14.375 1H2.625A1.627 1.627 0 0 0 1 2.624v11.751A1.627 1.627 0 0 0 2.625 16v-1.25Z"></path>
            </svg>
            <h1 className="ml-[14px] text-[14px] text-gray-200">Mod Queue</h1>
          </div>

        </div>
      </div>



      <div
        className={`overflow-hidden transition-all duration-[300ms] max-h-0 opacity-0 ${isDropped && isCommunity ? "max-h-[600px] opacity-100" : ""
          }`}
      >
        <CreateCommunityIcon
          setIsCommunityOpen={setIsCommunityOpen}
          communityButtonRef={communityButtonRef}
          setIsVisibleLeftSidebar={setIsVisibleLeftSidebar}
        />

        {joinedSubreddits &&
          joinedSubreddits.map((subreddit, index) => {
            return (
              <CommunityIcon
                icon={subreddit.icon}
                key={index}
                text={`r/${subreddit.name}`}
                divId={`sidebar_community_icon${index}`}
                bookmarkId={`sidebar_community_bookmark${index}`}
                href={`/r/${subreddit.name}`}
              />
            );
          })}
      </div>

      <div
        className={`overflow-hidden transition-all duration-[300ms] max-h-0 opacity-0 ${isDropped && isResources ? "max-h-[1000px] opacity-100" : ""
          }`}
      >
        <NavIcon id={toSnakeCase("About Reddit")} href="#" text="About Reddit">
          {" "}
          <ChatBubbleOvalLeftIcon className="h-6 w-6 mr-2  text-gray-50" />{" "}
        </NavIcon>
        <NavIcon id={toSnakeCase("Advertise")} href="#" text="Advertise">
          <SignalIcon className="h-6 w-6 mr-2  text-gray-50" />
        </NavIcon>
        <NavIcon id={toSnakeCase("Help")} href="#" text="Help">
          <QuestionMarkCircleIcon className="h-6 w-6 mr-2  text-gray-50" />
        </NavIcon>
        <NavIcon id={toSnakeCase("Blog")} href="#" text="Blog">
          <BookOpenIcon className="h-6 w-6 mr-2  text-gray-50" />
        </NavIcon>
        <NavIcon id={toSnakeCase("Careers")} href="#" text="Careers">
          <WrenchIcon className="h-6 w-6 mr-2  text-gray-50" />
        </NavIcon>
        <NavIcon id={toSnakeCase("Press")} href="#" text="Press">
          <MicrophoneIcon className="h-6 w-6 mr-2  text-gray-50" />
        </NavIcon>
        <Separator color={500} />
        <NavIcon
          id={toSnakeCase("Communties")}
          href="/best/communities"
          text="Communties"
        >
          <UserGroupIcon className="h-6 w-6 mr-2  text-gray-50" />
        </NavIcon>
        <NavIcon
          id={toSnakeCase("Best of Reddit")}
          href="#"
          text="Best of Reddit"
        >
          <BoltIcon className="h-6 w-6 mr-2  text-gray-50" />
        </NavIcon>
        <NavIcon id={toSnakeCase("Topics")} href="#" text="Topics">
          <RectangleGroupIcon className="h-6 w-6 mr-2  text-gray-50" />
        </NavIcon>
        <Separator color={500} />
        <NavIcon
          id={toSnakeCase("Content Policy")}
          href="#"
          text="Content Policy"
        >
          <DocumentTextIcon className="h-6 w-6 mr-2  text-gray-50" />
        </NavIcon>
        <NavIcon
          id={toSnakeCase("Privacy Policy")}
          href="#"
          text="Privacy Policy"
        >
          <ScaleIcon className="h-6 w-6 mr-2  text-gray-50" />
        </NavIcon>
        <NavIcon id={toSnakeCase("Agreement")} href="#" text="Agreement">
          <NewspaperIcon className="h-6 w-6 mr-2  text-gray-50" />
        </NavIcon>
      </div>
    </>
  );
};

DropDownMenu.propTypes = {
  MenuHeader: PropTypes.string,
};

export default DropDownMenu;
