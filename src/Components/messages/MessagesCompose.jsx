import React, { useState } from "react";
import { postRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";

/**
 * Component for composing and sending messages.
 * @returns {JSX.Element} JSX element representing the messages compose component.
 */
const MessagesCompose = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  /**
   * Handles the form submission to send the message.
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await postRequest(`${baseUrl}/message/`, {
        to,
        subject,
        text: message,
      });

      if (response.status === 200 || response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="px-[10px] py-[20px] w-[60%] text-[#1B2426] bg-[#7A9299] m-[5rem] flex flex-col justify-center items-center rounded-full">
        <div className="flex justify-center text-center">
          <h1 className="mt-auto capitalize text-[18px] font-bold 2xs:w-[200px] md:w-full">
            send a private message
          </h1>
        </div>

        <form
          className="flex flex-col justify-center items-center w-full"
          onSubmit={handleSubmit}
        >
          <div className="mb-[5px]">
            <span className="mt-auto capitalize">to</span>
            <span className="mt-auto text-gray-900"> (username)</span>
            <div className="mt-[5px] align-top">
              <input
                className="2xs:w-[200px] md:w-[300px] lg:w-[400px] text-[#000000] h-[2.5rem] p-[10px]"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-[5px]">
            <span className="mt-auto capitalize">subject</span>
            <div className="mt-[5px] align-top">
              <input
                className="2xs:w-[200px] md:w-[300px] lg:w-[400px] text-[#000000] h-[2.5rem] p-[10px]"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-[5px]">
            <span className="mt-auto capitalize">message</span>
            <div className="mt-[5px] align-top">
              <div className="text-[13px]">
                <div className="2xs:w-[180px] xs:w-[200px] md:w-[300px] lg:w-[400px] clear-left text-[12px]">
                  <div className="text-[#d7dadc] text-[1.0769230769230769em] font-normal max-w-[60em]">
                    <textarea
                      rows="1"
                      cols="1"
                      className="w-full h-[100px] text-black"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-[100%]"></div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="inline-block bg-[#D7DADC] text-[#1A1A1B] uppercase font-semibold cursor-pointer w-[90px] rounded-md border-[2px] hover:drop-shadow-2xl hover:border-black hover:bg-yellow-100"
          >
            send
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessagesCompose;
