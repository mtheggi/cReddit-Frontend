import React, { useState, useEffect } from "react";
import { getRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";
import MessagesHeader from "./MessagesHeader";
import MessagesInbox from "./MessagesInbox";
import MessagesFooter from "./MessagesFooter";

const Sent = () => {
  const [sent, setSent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;

  useEffect(() => {
    const getSent = async () => {
      const response = await getRequest(
        `${baseUrl}/message/sent/?page=${currentPage}&limit=${limit}`
      );
      if (response.status === 200 || response.status === 201) {
        setSent(response.data);
      }
    };
    getSent();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div id="sent" className="bg-[#1B2426] text-[#D7DADC] m-0 p-0">
        <MessagesHeader />
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
        <div className="flex justify-center items-center w-full mb-[20px]">
          <div className="flex justify-between items-center w-[30%]">
            <button
              className="flex justify-center items-center w-[30px] h-[30px] rounded-full transition-all duration-[200ms] hover:bg-white hover:text-black"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            <span>Page {currentPage}</span>
            <button
              className="flex justify-center items-center w-[30px] h-[30px] rounded-full transition-all duration-[200ms] hover:bg-white hover:text-black"
              onClick={nextPage}
              disabled={sent.length < limit}
            >
              {" "}
              {">"}{" "}
            </button>
          </div>
        </div>
        <MessagesFooter />
      </div>
    </>
  );
};

export default Sent;
