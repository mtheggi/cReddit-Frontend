import React from "react";
import { baseUrl } from "@/constants";
import { deleteRequest, patchRequest } from "@/services/Requests";

const MessagesInbox = ({
  id,
  from,
  to,
  subject,
  text,
  isRead,
  isDeleted,
  createdAt,
}) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isInvitation = subject.toLowerCase().includes("invitation to moderate");

  const communityName = isInvitation ? subject.split("/r/")[1] : null;

  const handleDelete = async () => {
    try {
      await deleteRequest(`${baseUrl}/message/${id}`);
      // window.location.reload();
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleMarkAsRead = async () => {
    try {
      await patchRequest(`${baseUrl}/message/${id}/mark-as-read`);
      window.location.reload();
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const handleAccept = async () => {
    try {
      await patchRequest(`${baseUrl}/accept-invite/${communityName}`);
      window.location.reload();
    } catch (error) {
      console.error("Error accepting invitation:", error);
    }
  };

  const handleReject = async () => {
    try {
      await patchRequest(`${baseUrl}/reject-invite/${communityName}`);
      window.location.reload();
    } catch (error) {
      console.error("Error rejecting invitation:", error);
    }
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className="px-[10px] py-[20px] w-[60%] hover:w-[80%] hover:text-[16px] hover:px-[30px] text-[12px] transition-all duration-[400ms] ease-in-out text-[#D7DADC] bg-[#7A9299] m-[1.5rem] rounded-xl shadow-2xl">
      <div className="bg-[#1B2426] py-[10px] px-[15px] rounded-xl hover:shadow-2xl transition duration-[750ms] ease-in-out">
        <p className="mb-[0.5rem] font-bold">{subject}</p>
        <div className="text-sm text-gray-400">{formattedDate}</div>
        <div className="py-[10px] px-[15px]">
          <p className="pl-[14px] float-left">from /u/{from}</p>
          <p className="pl-[14px] float-left">to /u/{to}</p>
          <div className="pl-[28px] clear-left mt-[1.5rem]">{text}</div>
          {isInvitation && (
            <div className="my-[1.5rem] flex justify-center">
              <button
                className="bg-green-500 text-white px-4 py-2 mr-2 rounded-md"
                onClick={handleAccept}
              >
                Accept
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleReject}
              >
                Reject
              </button>
            </div>
          )}
          <ul className="my-[10px] ml-[15px] list-none text-[13px] flex flex-row">
            <li
              className="mr-[10px] hover:bg-[#7A9299] hover:text-[#1B2426] rounded-md w-[50px] text-center cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </li>
            {!isRead && (
              <li
                className="hover:bg-[#7A9299] hover:text-[#1B2426] rounded-md w-[100px] text-center cursor-pointer"
                onClick={handleMarkAsRead}
              >
                Mark Read
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MessagesInbox;
