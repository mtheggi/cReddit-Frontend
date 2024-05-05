import React, { useState, useEffect } from "react";
import { getRequest } from "@/services/Requests";
import { baseUrl, messagesLimit } from "@/constants";
import MessagesInbox from "./MessagesInbox";
import Pagination from "./Pagination";

const Unread = () => {
  const [unread, setUnread] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreContent, setHasMoreContent] = useState(false);

  useEffect(() => {
    const getUnread = async () => {
      try {
        const response = await getRequest(
          `${baseUrl}/message/unread/?page=${currentPage}&limit=${messagesLimit}`
        );
        if (response.status === 200 || response.status === 201) {
          setUnread(response.data);
          setHasMoreContent(response.data.length === messagesLimit);
        }
      } catch (error) {
        console.error("Error fetching unread messages:", error);
      }
    };
    getUnread();
  }, [currentPage]);

  const nextPage = () => {
    if (hasMoreContent) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div id="unread">
      <div className="flex flex-col justify-center items-center">
        {unread.map((message, index) => (
          <MessagesInbox
            key={index}
            id={message._id}
            from={message.from}
            to={message.to}
            subject={message.subject}
            text={message.text}
            isRead={message.isRead}
            isDeleted={message.isDeleted}
            createdAt={message.createdAt}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        hasMoreContent={hasMoreContent}
        onNextPage={nextPage}
        onPrevPage={prevPage}
      />
    </div>
  );
};

export default Unread;
