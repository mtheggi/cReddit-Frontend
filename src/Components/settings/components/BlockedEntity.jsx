import React from "react";
import moment from "moment";

// user profile picture is still to be added
function BlockedEntity({ entityName, timestamp }) {
  const timeAgo = moment(timestamp).fromNow();

  return (
    <div className="flex flex-row max-w-3xl mt-4 text-white font-plex">
      <div className="w-full flex flex-row justify-start items-center">
        <h3 className="text-sm mr-2 pb-0.5">{entityName}</h3>
        <h6 className="text-xs text-gray-500">{timeAgo}</h6>
      </div>

      <div className="w-full flex flex-row justify-end items-center">
        <button className="bg-reddit_greenyDark rounded-r-md font-bold text-sm">
          REMOVE
        </button>
      </div>
    </div>
  );
}
export default BlockedEntity;
