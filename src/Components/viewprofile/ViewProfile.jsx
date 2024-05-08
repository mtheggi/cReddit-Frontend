import { useLocation } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import ProfileHeader from "./ProfileHeader";
import Overview from "./Overview";
import Submitted from "./Submitted";
import Comments from "./Comments";
import Saved from "./Saved";
import Hidden from "./Hidden";
import Upvoted from "./Upvoted";
import Downvoted from "./Downvoted";
import RightSidebar from "./RightSidebar";
import NotFound from "@/views/NotFound";

/**
 * Component for displaying the profile view including various sections like overview, submitted, comments, saved, etc.
 * @param {Object} props - The props passed to the component.
 * @param {Object} props.userInfo - Information about the user whose profile is being viewed.
 * @param {Object} props.sidebarProps - Props for the left sidebar.
 * @param {Object} props.notFound - Object to control whether the user profile is found or not found.
 * @returns {JSX.Element} The JSX element representing the ViewProfile component.
 */
const ViewProfile = ({ userInfo, sidebarProps, notFound }) => {
  const location = useLocation();

  if (userInfo == null) {
    notFound.setIsNotFound(true);
    return (
      <NotFound
        isNotFound={notFound.isNotFound}
        setIsNotFound={notFound.setIsNotFound}
      />
    );
  }

  const urlUsername = location.pathname.split("/")[2];
  const isUsernameMatch = userInfo.username === urlUsername;
  if (!isUsernameMatch) return null;

  const pathParts = location.pathname.split("/");
  const isOverview = pathParts[3] === undefined || pathParts[3] === "";
  const isSubmitted = pathParts[3] === "submitted";
  const isComments = pathParts[3] === "comments";
  const isSaved = pathParts[3] === "saved";
  const isHidden = pathParts[3] === "hidden";
  const isUpvoted = pathParts[3] === "upvoted";
  const isDownvoted = pathParts[3] === "downvoted";

  return (
    <div id="view-profile" className="bg-[#0b1416]">
      <div className="grid grid-cols-1 xl:grid-cols-[272px_1fr]">
        <div className="xl:col-start-2 box-border flex flex-col order-2 w-full xl:w-[1120px] xl:max-w-[calc(100vw-272px)] md:px-[1rem] mx-auto">
          <div className="flex gap-[1rem] w-full pb-[2rem]">
            <main className="w-full md:max-w-[calc(100%-(16px+316px))] mt-[60px]">
              <ProfileHeader userInfo={userInfo} />
              {isOverview && <Overview userInfo={userInfo} />}
              {isSubmitted && <Submitted userInfo={userInfo} />}
              {isComments && <Comments userInfo={userInfo} />}
              {isSaved && <Saved />}
              {isHidden && <Hidden />}
              {isUpvoted && <Upvoted />}
              {isDownvoted && <Downvoted />}
            </main>

            <RightSidebar userInfo={userInfo} />
          </div>
        </div>

        <LeftSidebar sidebarProps={sidebarProps} />
      </div>
    </div>
  );
};

export default ViewProfile;
