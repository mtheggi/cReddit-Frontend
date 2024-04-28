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

  const getRecentsubreddits = () => {
    const userHistory = JSON.parse(localStorage.getItem("userHistory"));
    if (userHistory !== null) {
      const recentSubreddits = userHistory
        .filter((post) => post?.communityName !== null)
        .map((post) => {
          return {
            name: post.communityName,
            icon: post.profilePicture,
          };
        });

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
        className="min-h-15 w-full bg-reddit_greenyDark flex flex-row  relative items-center rounded-lg  "
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
                className={`h-5 w-5 mr-2  text-gray-300 transition-transform duration-[300ms] ${
                  isDropped ? "rotate" : ""
                }`}
              />
            </span>
          </div>
        </div>
      </div>

            </div >



            <div className={`overflow-hidden mb-2 space-y-1 transition-all duration-[300ms] max-h-0 opacity-0 ${isDropped && isRecent ? 'max-h-[600px] opacity-100' : ''}`}>
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

      <div
        className={`overflow-hidden transition-all duration-[300ms] max-h-0 opacity-0 ${
          isDropped && isCommunity ? "max-h-[600px] opacity-100" : ""
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
              />
            );
          })}
      </div>

      <div
        className={`overflow-hidden transition-all duration-[300ms] max-h-0 opacity-0 ${
          isDropped && isResources ? "max-h-[1000px] opacity-100" : ""
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
        <Separator />
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
        <Separator />
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
