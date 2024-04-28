import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/20/solid";
import { baseUrl } from "@/constants";
import { postRequest, deleteRequest } from "@/services/Requests";

/**
 * CommunityHeader is a React component that renders the header of a subreddit community.
 * It displays the community's name, icon, banner, and member count.
 * It also provides options to join/mute the community and create a new post.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {string} props.name - The name of the subreddit community.
 * @param {string} props.icon - The URL of the community's icon.
 * @param {string} props.banner - The URL of the community's banner.
 * @param {number} props.members - The number of members in the community.
 * @param {boolean} [props.isJoined=true] - Indicates whether the user has joined the community.
 * @param {boolean} [props.isMuted=true] - Indicates whether the user has muted the community.
 *
 * @example
 * <CommunityHeader name="reactjs" icon="/path/to/icon.png" banner="/path/to/banner.png" members={50000} />
 *
 * @returns {React.Element} The rendered component.
 */
function CommunityHeader({
  name,
  icon,
  banner,
  members,
  isJoined = true,
  isMuted = false,
}) {
  console.log(name, icon, banner, members);

  const [joined, setJoined] = useState(isJoined);
  const [muted, setMuted] = useState(isMuted);

  async function handleJoinSubreddit() {
    console.log("Joining subreddit", name, joined);
    let res;
    if (joined) {
      res = await deleteRequest(`${baseUrl}/subreddit/${name}/join`);
    } else {
      res = await postRequest(`${baseUrl}/subreddit/${name}/join`);
    }

    if (res.status === 200 || res.status === 201) setJoined(!joined);
  }

  async function handleMuteSubreddit() {
    let res;
    if (muted) {
      res = await deleteRequest(`${baseUrl}/subreddit/${name}/mute`);
    } else {
      res = await postRequest(`${baseUrl}/subreddit/${name}/mute`);
    }
    if (res.status === 200 || res.status === 201) setMuted(!muted);
  }

  return (
    <div
      id="community-header"
      className="w-full flex flex-col items-center justify-start mt-2 mb-3"
    >
      <div
        id="community-header__banner"
        className="w-full flex flex-row md:pr-2 md:pl-2 h-20"
      >
        <img
          id="community-header__banner-img"
          src={banner}
          alt="Community Banner"
          className="w-full md:h-30 md:rounded-2xl rounded-none"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div
        id="community-header__info"
        className="w-full flex flex-wrap items-end mr-5 ml-5"
      >
        <div
          id="community-header__info__community"
          className="flex flex-row items-end md:ml-10 mb-2 justify-start p-2 ml-1"
        >
          <div className="w-full flex flex-row items-end">
            <img
              id="community-header__info__community__icon"
              src={icon}
              alt="Community Icon"
              className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 border-black"
            />
            <div className="flex flex-col items-start justify-center ml-2 ">
              <p
                id="community-header__info__community__name"
                className="text-white md:text-3xl font-plex font-bold text-lg"
              >
                r/{name}
              </p>
              <p
                id="community-header__info__community__members"
                className="text-gray-400 md:text-lg font-plex text-xs md:hidden"
              >
                {members} members
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-end xs:ml-auto pt-2 pb-2 pl-2 pr-10">
          <Link
            id="community-header__info__community__create-post"
            to={`/submit/r/${name}`} // TODO: Add the correct path --> "r/{name}/submit)"
            className="rounded-3xl border border-gray-400 ml-2"
          >
            <div
              id="community-header__info__community__create-post__icon"
              className="flex flex-row items-center justify-center ml-2 mr-2 mt-1 mb-1"
            >
              <PlusIcon className="h-6.5 w-7  text-gray-300" />
              <p className="mr-1 font-plex font-bold text-gray-300 text-sm">
                Create a post
              </p>
            </div>
          </Link>
          <button
            id="community-header__info__community__join__button"
            className={`rounded-3xl  ${
              joined && "border border-gray-400"
            } ml-2 ${!joined && "bg-blue-800"}`}
            onClick={handleJoinSubreddit}
          >
            <div className="flex flex-row items-center justify-center ml-3 mr-3 mt-2 mb-2">
              <p className="font-plex font-bold text-gray-300 text-sm">
                {joined ? "Joined" : "Join"}
              </p>
            </div>
          </button>
          {joined && (
            <button
              id="community-header__info__community__mute__button"
              className={`rounded-3xl ml-2 ${
                muted ? "bg-red-800" : "border border-gray-400"
              }`}
              onClick={handleMuteSubreddit}
            >
              <div className="flex flex-row items-center justify-center ml-3 mr-3 mt-2 mb-2">
                <p className="font-plex font-bold text-gray-300 text-sm">
                  {muted ? "Muted" : "Mute"}
                </p>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommunityHeader;
