import { useEffect, useState, useContext } from "react";
import Rule from "./Rule";
import Moderator from "./Moderator";

// const tempModerators = [
//   {
//     id: "1",
//     pic: "https://loremflickr.com/cache/resized/65535_53360451161_9fac9d6750_z_640_480_nofilter.jpg",
//     name: "Baroudy1452",
//     moderatorSince: "1/1/2001",
//   },
//   {
//     id: "2",
//     pic: "https://loremflickr.com/cache/resized/65535_53360451161_9fac9d6750_z_640_480_nofilter.jpg",
//     name: "JIMMY",
//     moderatorSince: "1/1/2001",
//   },
//   {
//     id: "3",
//     pic: "https://loremflickr.com/cache/resized/65535_53360451161_9fac9d6750_z_640_480_nofilter.jpg",
//     name: "JIMMY2",
//     moderatorSince: "1/1/2001",
//   },
//   {
//     id: "4",
//     pic: "https://loremflickr.com/cache/resized/65535_53360451161_9fac9d6750_z_640_480_nofilter.jpg",
//     name: "JIMMY3",
//     "moderatorSince:": "1/1/2001",
//   },
// ];

/**
 * CommunityInfo component displays the CommunityInfo posts of a user.
 *
 * @component
 * @param {Object} userHistoryRes - The user's history response object.
 * @returns {JSX.Element} - The rendered CommunityInfo component.
 */
const CommunityInfo = ({ name, description, topic, rules, moderators }) => {
  return (
    <div
      id="community_info"
      className="bg-reddit_dark hidden lg:flex flex-col pr-2 pb-3 pt-2.5 rounded-xl w-88 xl:w-82 xl:min-w-82 mr-auto sticky bottom-0"
    >
      <div className="w-full pl-5">
        <h1
          id="community_info__name"
          className="text-md text-white font-bold font-plex mb-1"
        >
          {name}
        </h1>
        <p
          id="community_info__description"
          className="text-sm text-gray-400 font-medium font-plex"
        >
          {description}
        </p>
        <h2 className="text-md text-white font-bold font-plex mt-3 mb-1">
          Topic
        </h2>
        <p
          id="community_info__topic"
          className="text-sm text-gray-400 font-medium font-plex"
        >
          {topic}
        </p>
      </div>

      <hr className="border-gray-500 border-1 w-full mt-4 mb-4" />

      <h2 className="text-sm text-gray-400 font-plex mb-2 pl-5">RULES</h2>
      {rules.map((rule, index) => (
        <Rule
          id={`community_info__rule_${index}`}
          i={index}
          text={rule.text}
          description={rule.appliesTo}
        />
      ))}

      <hr className="border-gray-500 border-1 w-full mt-4 mb-4" />

      <h2 className="text-sm text-gray-400 font-plex mb-2 pl-5">MODERATORS</h2>
      <div className="flex flex-col pl-5 mt-2">
        {moderators.map((moderator, i) => (
          <div className="flex flex-col items-center mb-3">
            <Moderator
              id={`community_info__moderator_${i}`}
              text={`u/${moderator.username}`}
            >
              <img
                id={`community_info__moderator_${i}__pic`}
                src={moderator.profilePicture}
                alt={`${moderator.username} profile picture`}
                className="h-[30px] w-[32px] rounded-full"
              />
            </Moderator>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityInfo;