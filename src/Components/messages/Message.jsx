import { useLocation } from "react-router-dom";
import MessagesHeader from "./MessagesHeader";
import Compose from "./Compose";
import Inbox from "./Inbox";
import Unread from "./Unread";
import Messages from "./Messages";
import PostReplies from "./PostReplies";
import UsernameMentions from "./UsernameMentions";
import Sent from "./Sent";
import MessagesFooter from "./MessagesFooter";
import LeftSidebar from "./LeftSidebar";

const Message = ({ sidebarProps }) => {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const isCompose = pathParts[2] === "compose";
  const isInbox = pathParts[2] === "inbox";
  const isUnread = pathParts[2] === "unread";
  const isMessages = pathParts[2] === "messages";
  const isPostReplies = pathParts[2] === "selfreply";
  const isUsernameMentions = pathParts[2] === "mentions";
  const isSent = pathParts[2] === "sent";

  return (
    <>
      <div id="message" className="bg-[#1B2426] text-[#D7DADC] m-0 p-0">
        <MessagesHeader />

        {isCompose && <Compose />}
        {isInbox && <Inbox />}
        {isUnread && <Unread />}
        {isMessages && <Messages />}
        {isPostReplies && <PostReplies />}
        {isUsernameMentions && <UsernameMentions />}
        {isSent && <Sent />}

        <MessagesFooter />
      </div>

      <LeftSidebar sidebarProps={sidebarProps} />
    </>
  );
};

export default Message;
