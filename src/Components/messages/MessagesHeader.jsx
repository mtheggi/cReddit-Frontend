import React from "react";

const MessagesHeader = () => {
  const currentUrl = window.location.pathname;
  const isInboxPage =
    currentUrl === "/message/inbox" ||
    currentUrl === "/message/unread" ||
    currentUrl === "/message/messages" ||
    currentUrl === "/message/selfreply" ||
    currentUrl === "/message/mentions";

  return (
    <div className="flex justify-center items-center text-white">
      <div className="p-0 bg-[#FF4500] border-[#1B2426] border-[2.5px] mt-[56px] w-[90%] rounded-full">
        <div className="flex justify-center py-[10px] border-[#1B2426] border-[1.5px]">
          <div className="2xs:w-[80%] sm:w-[40%] w-full">
            <ul className="list-none flex flex-row justify-between w-full">
              <li className="font-bold">
                <a
                  href="/message/compose"
                  className="capitalize rounded-md hover:text-[#1B2426] hover:bg-white"
                >
                  Compose
                </a>
              </li>
              <li className="font-bold">
                <a
                  href="/message/inbox"
                  className="capitalize rounded-md hover:text-[#1B2426] hover:bg-white"
                >
                  Inbox
                </a>
              </li>
              <li className="font-bold">
                <a
                  href="/message/sent"
                  className="capitalize rounded-md hover:text-[#1B2426] hover:bg-white"
                >
                  Sent
                </a>
              </li>
            </ul>
          </div>
        </div>
        {isInboxPage && (
          <div className="flex justify-center items-center w-full">
            <div className="bg-[#FF8717] flex justify-center py-[5px] w-[95%] rounded-full">
              <div className="lg:max-w-[50%] xs:max-w-[90%] w-full">
                <ul className="list-none flex flex-row justify-between w-full">
                  <li>
                    <a
                      href="/message/inbox"
                      className="capitalize rounded-md hover:text-[#1B2426] hover:bg-white"
                    >
                      all
                    </a>
                  </li>
                  <li>
                    <a
                      href="/message/unread"
                      className="capitalize rounded-md hover:text-[#1B2426] hover:bg-white"
                    >
                      unread
                    </a>
                  </li>
                  <li>
                    <a
                      href="/message/messages"
                      className="capitalize rounded-md hover:text-[#1B2426] hover:bg-white"
                    >
                      messages
                    </a>
                  </li>
                  <li>
                    <a
                      href="/message/selfreply"
                      className="capitalize rounded-md hover:text-[#1B2426] hover:bg-white"
                    >
                      post replies
                    </a>
                  </li>
                  <li>
                    <a
                      href="/message/mentions"
                      className="capitalize rounded-md hover:text-[#1B2426] hover:bg-white"
                    >
                      username mentions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesHeader;
