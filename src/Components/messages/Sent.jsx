import React, { useState, useEffect } from "react";
import { getRequest } from "@/services/Requests";
import { baseUrl, messagesLimit } from "@/constants";
import MessagesInbox from "./MessagesInbox";
import Pagination from "./Pagination";

/**
 * Component for displaying sent messages.
 * @returns {JSX.Element} JSX element representing the sent messages component.
 */
const Sent = () => {
  const [sent, setSent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreContent, setHasMoreContent] = useState(false);

  useEffect(() => {
    /**
     * Fetch sent messages from the server.
     */
    const getSent = async () => {
      try {
        const response = await getRequest(
          `${baseUrl}/message/sent/?page=${currentPage}&limit=${messagesLimit}`
        );
        if (response.status === 200 || response.status === 201) {
          setSent(response.data);
          setHasMoreContent(response.data.length === messagesLimit);
        }
      } catch (error) {
        console.error("Error fetching sent messages:", error);
      }
    };
    getSent();
  }, [currentPage]);

  /**
   * Moves to the next page of sent messages.
   */
  const nextPage = () => {
    if (hasMoreContent) {
      setCurrentPage(currentPage + 1);
    }
  };

  /**
   * Moves to the previous page of sent messages.
   */
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div id="sent">
      <div className="flex flex-col justify-center items-center">
        {sent.map((message, index) => (
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

export default Sent;
