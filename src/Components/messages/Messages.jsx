import React, { useState, useEffect } from "react";
import { getRequest } from "@/services/Requests";
import { baseUrl, messagesLimit } from "@/constants";
import MessagesInbox from "./MessagesInbox";
import Pagination from "./Pagination";

/**
 * Component for displaying messages.
 * @returns {JSX.Element} JSX element representing the messages component.
 */
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreContent, setHasMoreContent] = useState(false);

  useEffect(() => {
    /**
     * Fetches the messages from the server.
     */
    const getMessages = async () => {
      try {
        const response = await getRequest(
          `${baseUrl}/message/messages?page=${currentPage}&limit=${messagesLimit}` //The endpoint still needs to be created by the backend team
        );
        if (response.status === 200 || response.status === 201) {
          setMessages(response.data);
          setHasMoreContent(response.data.length === messagesLimit);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    getMessages();
  }, [currentPage]);

  /**
   * Function to navigate to the next page of messages.
   */
  const nextPage = () => {
    if (hasMoreContent) {
      setCurrentPage(currentPage + 1);
    }
  };

  /**
   * Function to navigate to the previous page of messages.
   */
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div id="messages">
      <div className="flex flex-col justify-center items-center">
        {messages.map((message, index) => (
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

export default Messages;
