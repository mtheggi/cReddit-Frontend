import Share from "./Share";
import CommentIcon from "./CommentIcon";
import Vote from "./Vote";
import { useState, useEffect, useRef, useContext } from "react";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "@/services/Requests";
import {
  BookmarkIcon,
  EllipsisHorizontalIcon,
  EyeSlashIcon,
  FlagIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon,
  EyeIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { baseUrl } from "../../constants";
import { useNavigate } from 'react-router-dom';


import moment from "moment";
import HiddenPost from "./HiddenPost";
import { Link } from "react-router-dom";
import { Save } from './comment/CommentUtils';
import { UserContext } from '@/context/UserContext';
import ReactMarkdown from 'react-markdown'




/**
 * Post component for displaying a post.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} - The rendered Post component.
 */
const Post = ({
  id,
  postId,
  title,
  username,
  communityName,
  content,
  createdAt,
  commentCount,
  netVote,
  isUpvoted,
  isDownvoted,
  type,
  profilePicture,
  isNSFW,
  isSpoiler,
  isJoined,
  pollOptions,
  expirationDate,
  isHidden,
  isSaved,
  isSinglePostSelected,
  setPosts,
  lastPostRef
}) => {
  const menuRefDots = useRef();
  const shareMenuRef = useRef();
  const [isOpenDots, setIsOpenDots] = useState(false);
  const [hoverJoin, setHoverJoin] = useState(false);
  const [editedPollOptions, setEditedPollOptions] = useState(pollOptions);
  const uploadedFrom = moment(createdAt).fromNow();
  const durationRemaining = moment(expirationDate).fromNow();
  const [Blured, setBlured] = useState(isSpoiler || isNSFW);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [hasVoted, setHasVoted] = useState(
    pollOptions?.find((option) => option.isVoted === true) ? true : false
  );
  const [hasExpired, setHasExpired] = useState(
    moment(expirationDate).isBefore(moment())
  );
  const [currentIsHidden, setCurrentIsHidden] = useState(isHidden);
  const [isHiddenMsg, setIsHiddenMsg] = useState("");
  const [saved, setSaved] = useState(isSaved);
  const [isSubbredditJoined, setIsSubbredditJoined] = useState(isJoined);
  const [isShareMenuOpened, setIsShareMenuOpened] = useState(false);
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setEditedPollOptions(pollOptions);
  }, [pollOptions]);

  /**
   * Function to handle saving a post.
   *
   * @async
   * @function handleClickSave
   */
  async function handleClickSave() {
    setSaved((prev) => !prev);
    if (!(await Save(id, saved))) {
      setSaved((prev) => !prev);
    }
  }

  /**
   * Function to format a number to a more readable format.
   *
   * @function formatNumber
   * @param {number} num - The number to format.
   * @returns {string} The formatted number.
   */
  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    } else {
      return num;
    }
  }

  useEffect(() => {
    let closeDropdown = (e) => {
      if (menuRefDots.current && !menuRefDots.current.contains(e.target))
        setIsOpenDots(false);

      if (shareMenuRef.current && !shareMenuRef.current.contains(e.target))
        setIsShareMenuOpened(false);

    };
    document.addEventListener("click", closeDropdown);

    const scrollingElement = document.getElementById("homefeed");

    const handleScroll = () => {
      const scrollThreshold = 30;
      if (!menuRefDots.current) {
        return;
      }

      const rect = menuRefDots.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;


      if (rect.top < scrollThreshold || rect.bottom > viewportHeight - scrollThreshold) {
        setIsOpenDots(false);
      }

      if (!shareMenuRef.current) {
        return;
      }
      const rectShare = shareMenuRef.current.getBoundingClientRect();
      if (rectShare.top < scrollThreshold || rectShare.bottom > viewportHeight - scrollThreshold) {
        setIsShareMenuOpened(false);
      }
    };

    if (scrollingElement) {
      scrollingElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("click", closeDropdown);

      if (scrollingElement) {
        scrollingElement.removeEventListener("scroll", handleScroll);
      }
    };
  });

  /**
   * Function to get the total votes of a poll.
   *
   * @function getTotalVotes
   * @param {Array} pollOptions - The options of the poll.
   * @returns {number} The total votes.
   */

  const getTotalVotes = (pollOptions) => {
    return pollOptions.reduce((total, option) => total + option.votes, 0);
  };

  /**
   * Function to get the maximum votes of a poll.
   *
   * @function getMaxVotes
   * @param {Array} pollOptions - The options of the poll.
   * @returns {number} The maximum votes.
   */
  const getMaxVotes = (pollOptions) => {
    let maxVotes = 0;
    for (let option of pollOptions) {
      if (option.votes > maxVotes) {
        maxVotes = option.votes;
      }
    }
    return maxVotes;
  };

  /**
   * Function to get the vote width of a poll.
   *
   * @function getVoteWidth
   * @param {number} votes - The votes of the poll.
   * @returns {string} The vote width.
   */
  const getVoteWidth = (votes) => {
    let voteWidth = (votes / getMaxVotes(editedPollOptions)) * 100 + "%";
    return voteWidth;
  };

  /**
   * Function to handle the change of an option in a poll.
   *
   * @function handleOptionChange
   * @param {number} index - The index of the option.
   */
  const handleOptionChange = (index) => {
    const newPollOptions = editedPollOptions.map((option, i) => {
      if (i === index) {
        return {
          ...option,
          isVoted: true,
          votes: option.votes + 1,
        };
      } else {
        return {
          ...option,
          isVoted: false,
        };
      }
    });

    setEditedPollOptions(newPollOptions);
    setIsOptionSelected(true);
  };

  /**
   * Function to handle voting in a poll.
   *
   * @async
   * @function handleVote
   */
  const handleVote = async (e) => {
    e.stopPropagation();
    if (!isOptionSelected) {
      return;
    }
    setHasVoted(true);
    const votedOption = editedPollOptions.find(
      (option) => option.isVoted === true
    );
    const votedOptionText = votedOption ? votedOption.text : null;
    const response = await patchRequest(`${baseUrl}/post/${id}/vote-poll`, {
      pollOption: votedOptionText,
    });
    if (response.status == 200 || response.status == 201) {
    } else {
      setEditedPollOptions(pollOptions);
      setHasVoted(false);
    }
  };

  const joinBtnStyle = {
    backgroundColor: hoverJoin ? "#196FF4" : "#0045AC",
  };

  /**
   * Function to handle hiding a post.
   *
   * @async
   * @function handleHidePost
   */
  const handleHidePost = async () => {
    setCurrentIsHidden((prev) => !prev);
    setIsOpenDots(false);
    const response = await patchRequest(`${baseUrl}/post/${id}/hidden`, {
      isHidden: !currentIsHidden,
    });
    if (response.status == 200 || response.status == 201) {
      setIsHiddenMsg(response.data.message);
    } else {
      setIsHiddenMsg(response.data.message);
      setCurrentIsHidden((prev) => !prev);
    }
  };

  /**
   * Function to handle joining a subreddit.
   *
   * @async
   * @function handleJoinSubreddit
   */
  const handleJoinSubreddit = async () => {
    setIsSubbredditJoined((prev) => !prev);
    let response = null;
    if (isSubbredditJoined) {
      response = await deleteRequest(
        `${baseUrl}/subreddit/${communityName}/join`
      );
    } else {
      response = await postRequest(
        `${baseUrl}/subreddit/${communityName}/join`
      );
    }
    if (!(response.status === 200 || response.status === 201)) {
      setIsSubbredditJoined((prev) => !prev);
    }
  };



  return currentIsHidden ? (
    <HiddenPost id={id} handleHidePost={handleHidePost} />
  ) : (
    <div
      ref={lastPostRef}
      id={"mainfeed_" + id + "_full"}
      className={`flex flex-col bg-reddit_greenyDark ${isSinglePostSelected ? "" : "hover:bg-reddit_hover"
        } ${isOpenDots ? "bg-reddit_hover" : ""
        }  pl-1 pr-1 xs:px-3 pt-2.5 mt-1 rounded-2xl w-full h-fit`}
    >
      <div className="flex flex-row items-center w-full h-6 ">
        <div
          id={"mainfeed_" + id + "_community"}
          href=""
          className="flex items-center w-fit"
        >
          {isSinglePostSelected && (

            <div onClick={() => navigate(-1)} className='flex flex-row justify-center items-center hover:bg-reddit_search_light min-w-8 w-8 h-8 rounded-full bg-reddit_search cursor-pointer mr-2'>
              <ArrowLeftIcon className="text-white w-6 h-6" />
            </div>
          )}

          <div className="flex flex-row cursor-pointer items-center"
            onClick={(e) => {
              navigate(communityName && communityName.trim() != "" ? `/r/${communityName}` : `/user/${username}`);
            }}
          >
            <img
              src={profilePicture}
              alt="Logo"
              className={`peer ${isSinglePostSelected ? "w-8 h-8" : "w-6 h-6"} rounded-full `}
            />
            <p className="text-gray-300 peer-hover:underline  font-semibold text-xs ml-2 hover:underline">
              {communityName && communityName.trim() != "" ? `r/${communityName}` : `u/${username}`}
            </p>
          </div>
        </div>

        <div className=" flex flex-row w-[32%] xs:w-[40%] items-center ">
          <p className="text-gray-400 font-bold text-xs ml-2 mb-1.5"></p>
          <p className="text-gray-400 w-70% truncate font-extralight text-xs ml-1.5">
            {uploadedFrom}
          </p>
        </div>

        <div ref={menuRefDots} className="relative ml-auto flex items-center flex-row ">
          {(communityName !== null) && !isSubbredditJoined && !location.pathname.includes("/r/") && !location.pathname.includes("/user/") && !location.pathname.includes("/my-user/") && <div id={`join` + id} onClick={handleJoinSubreddit} onMouseEnter={() => setHoverJoin(true)} onMouseLeave={() => setHoverJoin(false)} className='w-[50px] h-[25px]  cursor-pointer flex flex-row justify-center items-center bg-blue-600 -mt-[4px] mr-1 rounded-full' style={joinBtnStyle}>
            <h1 className='text-[12px] font-medium text-white'>Join</h1>
          </div>}
          <div
            id={"mainfeed_" + id + "_menu"}
            className="h-7 w-7 ml-auto text-white rounded-full flex justify-center cursor-pointer items-center hover:bg-reddit_search_light"
          >
            <EllipsisHorizontalIcon
              onClick={(e) => {
                setIsOpenDots((prev) => !prev);
              }}
              className="h-6 w-6 outline-none"
            />
          </div>
          {isOpenDots && (
            <div className={`z-20 w-30 h-37 bg-reddit_lightGreen absolute text-white text-sm py-2 rounded-lg font-extralight flex flex-col ${communityName !== null ? "-ml-[24px]" : "-ml-[72px]"} mt-45`}>
              <div onClick={handleClickSave}
                id={"mainfeed_" + id + "_menu_save"}
                className="w-full pl-6 hover:bg-reddit_hover h-12 flex items-center cursor-pointer"
              >
                {!saved ? <BookmarkIcon className="h-4.5 w-5 text-white " />
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-4.5">
                    <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                  </svg>
                }
                <p className="ml-2 no-select">{saved ? "Unsave" : "Save"}</p>
              </div>
              <div onClick={handleHidePost}
                id={"mainfeed_" + id + "_menu_hide"}
                className="w-full pl-6 hover:bg-reddit_hover h-12 flex rounded-b-lg items-center cursor-pointer"
              >
                {currentIsHidden ? <EyeIcon className="h-4.5 w-5 text-white" /> : <EyeSlashIcon className="h-4.5 w-5 text-white" />}
                <p className="ml-2 no-select">{currentIsHidden ? "unHide" : "Hide"}</p>
              </div>

              <div
                id={"mainfeed_" + id + "_menu_report"}
                className="w-full pl-6 hover:bg-reddit_hover h-12 flex rounded-b-lg items-center cursor-pointer"
              >
                <FlagIcon className="h-4.5 w-5 text-white " />
                {/* Todo change the icon, make the buttons change color when clicked, and when any click anyhwere else, close the dropdown */}
                <p className="ml-2 no-select">Report</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div onClick={() => {
        if (communityName == null)
          navigate(`/user/${username}/comments/${id}`);
        else
          navigate(`/r/${communityName}/comments/${id}`);
      }
      } className="mt-1 w-full cursor-pointer h-fit flex flex-col">
        {(isSpoiler || isNSFW) && (
          <div className="text-white items-center mt-1.5 flex-row flex font-medium text-lg">
            {isSpoiler && (
              <div
                onClick={(e) => {
                  setBlured(true);
                }}
                className="flex cursor-pointer flex-row items-center"
              >
                <ExclamationTriangleIcon className="h-[22px]  text-reddit_navbar fill-red-600 w-[23px]" />
                <h1 className="text-[12.5px] text-red-600 mr-3 ml-[1px]">
                  SPOILER
                </h1>
              </div>
            )}
            {isNSFW && (
              <div
                onClick={(e) => {
                  setBlured(true);
                }}
                className="cursor-pointer flex flex-row items-center"
              >
                <svg
                  rpl=""
                  className="inline-block"
                  fill="#E00296"
                  height="19"
                  icon-name="nsfw-fill"
                  viewBox="0 0 20 20"
                  width="19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13 10.967a1.593 1.593 0 0 0-1.363 0 1.2 1.2 0 0 0-.475.414 1.02 1.02 0 0 0-.173.576.967.967 0 0 0 .18.574c.122.172.29.307.482.393.21.095.438.143.668.14a1.51 1.51 0 0 0 .671-.146 1.2 1.2 0 0 0 .475-.4.985.985 0 0 0 .173-.569 1.024 1.024 0 0 0-.17-.57 1.2 1.2 0 0 0-.469-.412Z"></path>
                  <path d="M11.747 9.227c.177.095.374.143.574.14.2.003.396-.045.572-.14a1.057 1.057 0 0 0 .402-1.462.984.984 0 0 0-.406-.37 1.317 1.317 0 0 0-1.137 0 1 1 0 0 0-.557.902 1.047 1.047 0 0 0 .551.932l.001-.002Z"></path>
                  <path d="M18.636 6.73 13.27 1.363a4.634 4.634 0 0 0-6.542 0L1.364 6.73a4.627 4.627 0 0 0 0 6.542l5.365 5.365a4.633 4.633 0 0 0 6.542 0l5.366-5.365a4.634 4.634 0 0 0 0-6.542ZM8.204 14.5H6.288V8.277L4.648 9V7.23l2.988-1.367h.568V14.5Zm6.862-1.148c-.29.4-.683.714-1.136.912a4.11 4.11 0 0 1-3.24-.006 2.8 2.8 0 0 1-1.134-.918 2.172 2.172 0 0 1-.41-1.283c0-.42.12-.83.345-1.184a2.6 2.6 0 0 1 .944-.879 2.488 2.488 0 0 1-.636-.832c-.152-.32-.23-.67-.229-1.025a2.117 2.117 0 0 1 .378-1.248c.256-.362.604-.65 1.008-.832.43-.198.9-.298 1.374-.293.474-.004.942.099 1.371.3.403.182.749.47 1 .834.249.368.378.804.37 1.248a2.371 2.371 0 0 1-.868 1.851c.383.21.708.51.944.877a2.24 2.24 0 0 1-.074 2.481l-.007-.003Z"></path>
                </svg>
                <h1 className="text-sm ml-1 text-[#E00296]">NSFW</h1>
              </div>
            )}
          </div>
        )}
        <div
          id={"mainfeed_" + id + "_title"}
          className="text-white mt-1.5 font-medium text-lg"
        >
          <h1>{title}</h1>
        </div>

        <div className="relative w-full h-full">

          {(Blured) && <div onClick={(e) => { setBlured(false) }} className={`w-[94px] z-10 left-[calc(50%-47px)] top-[calc(50%-10px)]  h-[30px] text-[13px] font-semibold flex-row flex items-center justify-center cursor-pointer absolute text-white rounded-3xl bg-[#090E0FB9] hover:bg-black `} >
            <EyeIcon className='w-5 mr-1.5 h-5' />
            View
          </div>}

          {type != "Images & Video" && <div id={"mainfeed_" + id + "_content"} onClick={(e) => { setBlured(false) }} className={`text-gray-400  text-sm mt-1.5  ${Blured ? 'filter blur-[10px]' : ''}`}>
            <>
              {type != "Link" ? (<ReactMarkdown style={{ wordBreak: 'break-all' }}>{content}</ReactMarkdown>) :
                (<a href={content} className=' underline cursor-pointer text-blue-600 hover:text-blue-500' style={{ wordBreak: 'break-all' }}>{content}</a>)}
            </>
          </div>}

          {
            type == "Images & Video" &&
            <div
              id={"mainfeed_" + id + "_" + type} className="w-full h-full mt-2">
              <div className={`relative flex-row rounded-2xl overflow-clip border-[0.5px] border-gray-700 flex justify-center`}>

                <div className={`${Blured ? 'block' : "absolute"} inset-0 flex flex-row w-full `} onClick={(e) => { setBlured(false) }} >
                  {content.endsWith('.mp4') ? <video src={content} alt="" className={`blur-[50px] max-h-[500px] object-cover w-full `} /> :
                    <img src={content} alt="" className=' blur-[50px] max-h-[500px] object-cover w-full' />}
                </div>

                {content.endsWith(".mp4") ? (
                  <video
                    src={content}
                    alt="Post"
                    className={`${Blured ? "rounded-[40px] hidden" : "z-10"
                      } max-h-[500px] w-full object-contain `}
                    controls
                  />
                ) : (
                  <img
                    src={content}
                    alt="Post"
                    className={`${Blured ? "rounded-[40px] hidden" : "z-10"
                      }  max-h-[500px] w-full object-contain `}
                  />
                )}
              </div>
            </div>
          }



          {type == "Poll" && (
            <div id={"mainfeed_" + id + "_" + type} className="w-full mt-2">
              <div
                className={`relative h-fit w-full ${Blured ? "filter blur-[10px]" : ""
                  }`}
              >
                <div className="w-full rounded-xl bg-transparent border-[0.5px] border-gray-600 h-fit px-[14px] pb-2 pt-1 flex flex-col">
                  <div className="w-full h-9 pt-1 items-center border-b-[0.5px] border-gray-600 text-[11px] flex flex-row ">
                    <h1 className="mr-1 text-gray-300 font-light">
                      {hasExpired ? "Closed" : "Open"} .
                    </h1>
                    <h1 className="text-gray-300 font-light">
                      {!hasVoted
                        ? formatNumber(getTotalVotes(pollOptions))
                        : formatNumber(getTotalVotes(editedPollOptions))}{" "}
                      total votes
                    </h1>
                  </div>
                  <div
                    id={"mainfeed_" + id + "_polloptions"}
                    className="w-full flex flex-col h-fit min-h-13 text-[11px] px-2 space-y-3.5 mt-3"
                    onClick={(e) => {e.stopPropagation()}}
                  >
                    {editedPollOptions &&
                      editedPollOptions.map((option, index) => (
                        <div
                          key={index}
                          className="flex items-center flex-row w-full"
                        >
                          {!hasVoted && !hasExpired ? (
                            <div className="w-fit hit flex-row">
                              <input
                                type="radio"
                                name={id + "PollOption" + index}
                                className="radio bg-inherit outline-gray-200 focus:outline-none"
                                checked={option.isVoted}
                                onChange={() => handleOptionChange(index)}
                              />
                              <label className="text-gray-200 text-[14px] whitespace-nowrap font-light ml-2">
                                {option.text}
                              </label>
                            </div>
                          ) : (
                            <div className="w-7/12">
                              <div
                                style={{
                                  width: `${getVoteWidth(option.votes)}`,
                                }}
                                className={` ${option.votes == getMaxVotes(editedPollOptions)
                                  ? "bg-[#33464C]"
                                  : "bg-reddit_search_light"
                                  }  items-center h-8 rounded-[5px] flex flex-row`}
                              >
                                <h1 className="text-gray-100 text-[14px] font-semibold ml-5 mr-4">
                                  {option.votes}
                                </h1>
                                <label className="text-gray-200 text-[14px] whitespace-nowrap font-light ml-2">
                                  {option.text}
                                </label>
                                {option.isVoted ? (
                                  <CheckIcon className="w-[23px] min-w-[23px] min-h-[23px] h-[23px] ml-2 text-white" />
                                ) : null}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>

                  <div className="flex flex-row w-full mt-3 items-center">
                    {!hasVoted && !hasExpired && (
                      <div
                        onClick={(e)=>handleVote(e)}
                        className={`flex items-center justify-center w-12 h-8 rounded-full ${isOptionSelected
                          ? "bg-black cursor-pointer"
                          : "bg-[#1C1E20] cursor-not-allowed"
                          } text-[13px] text-white`}
                      >
                        <h1>Vote</h1>
                      </div>
                    )}
                    {!hasExpired ? (
                      <h1 className="text-[11px] ml-2.5 font-light text-gray-300">
                        Closes {durationRemaining}
                      </h1>
                    ) : null}
                  </div>
                </div>
                {Blured && (
                  <div
                    onClick={(e) => {
                      setBlured(false);
                    }}
                    className="absolute inset-0 bg-black opacity-60 rounded-2xl"
                  ></div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-row mt-1 items-center w-full h-13 space-x-2.5 no-select ">
        <Vote
          id={id}
          netVotes={netVote}
          isUpvoted={isUpvoted}
          isDownvoted={isDownvoted}
          setPosts={setPosts}
        />
        <CommentIcon
          id={id}
          postId={postId}
          username={username}
          communityName={communityName}
          commentCount={commentCount}
        />

        <div ref={shareMenuRef} className="relative flex flex-col">
          <Share id={id} setIsShareMenuOpened={setIsShareMenuOpened} />

          {isShareMenuOpened && (
            <div className="flex-col absolute mt-[38px] flex w-[190px] z-20 h-fit py-1 space-y-1  bg-reddit_hover rounded-lg ">

              <div onClick={(e) => {
                e.stopPropagation(); setIsShareMenuOpened(false);
                navigator.clipboard.writeText(communityName ? `creddit.tech/r/${communityName}/comments/${id}` : `creddit.tech/u/${username}/comments/${id}`).then(function () {

                }, function (err) {
                  console.error('Could not copy text: ', err);
                });
              }} id="copy_link" className="w-full cursor-pointer pl-[14px] h-10 hover:bg-reddit_search_light flex flex-row items-center">
                <svg rpl="" className="mt-[1px] ml-[4px]" fill="white" height="20" icon-name="link-post-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.111 12.5a3.701 3.701 0 0 1-1.09 2.41c-.479.47-.928.922-1.378 1.373-.45.45-.894.9-1.368 1.366a3.852 3.852 0 0 1-2.698 1.099 3.852 3.852 0 0 1-2.698-1.099 3.738 3.738 0 0 1-1.116-2.659c0-.997.402-1.953 1.116-2.658.479-.472.928-.923 1.378-1.375.45-.45.893-.9 1.368-1.365A3.936 3.936 0 0 1 9.638 8.59a3.968 3.968 0 0 1 2.24.258c.27-.269.546-.54.812-.806l.131-.13a5.086 5.086 0 0 0-3.182-.624A5.052 5.052 0 0 0 6.732 8.71c-.48.471-.929.922-1.377 1.373-.449.451-.894.9-1.37 1.366A4.982 4.982 0 0 0 2.5 14.992c0 1.328.534 2.602 1.486 3.543A5.13 5.13 0 0 0 7.58 20a5.13 5.13 0 0 0 3.595-1.465c.478-.471.927-.923 1.377-1.374.451-.451.894-.9 1.368-1.366a4.993 4.993 0 0 0 1.263-2.071c.243-.781.288-1.61.132-2.412L14.11 12.5Z"></path><path d="M16.017 1.467A5.123 5.123 0 0 0 12.422 0a5.123 5.123 0 0 0-3.595 1.467c-.478.471-.926.923-1.377 1.374-.45.451-.894.9-1.367 1.366a4.966 4.966 0 0 0-1.106 1.624 4.907 4.907 0 0 0-.291 2.86l1.2-1.19a3.699 3.699 0 0 1 1.092-2.41c.478-.472.928-.923 1.377-1.374.45-.45.894-.9 1.368-1.366a3.844 3.844 0 0 1 2.698-1.101c1.012 0 1.982.396 2.698 1.101a3.736 3.736 0 0 1 1.116 2.66c0 .996-.401 1.953-1.116 2.658-.478.471-.927.922-1.377 1.373-.45.451-.893.9-1.368 1.367a3.933 3.933 0 0 1-2.014 1.003 3.966 3.966 0 0 1-2.24-.26c-.273.274-.551.549-.818.818l-.123.12a5.087 5.087 0 0 0 3.183.624 5.053 5.053 0 0 0 2.906-1.423c.477-.472.926-.923 1.376-1.375.45-.452.894-.9 1.368-1.365A4.977 4.977 0 0 0 17.5 5.008a4.977 4.977 0 0 0-1.488-3.543l.005.002Z"></path>
                </svg>
                <h1 className="text-gray-300 ml-3 text-[15px]">Copy Link</h1>
              </div>


              <div id="cross_post" className="w-full cursor-pointer pl-[18px] h-10 hover:bg-reddit_search_light flex flex-row items-center">
                <svg rpl="" class="mt-[1px] ml-[4px]" fill="white" height="20" icon-name="crosspost-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="m15.944 11.926-.888.879 1.925 1.945H12A4.873 4.873 0 0 1 7.138 10 4.873 4.873 0 0 1 12 5.25h4.971l-1.915 1.936.888.878L18.875 5.1a.727.727 0 0 0-.007-1.025l-2.929-2.9-.878.888L17.011 4H12a6.128 6.128 0 0 0-6.056 5.25H1v1.625h4.981A6.117 6.117 0 0 0 12 16h5l-1.94 1.92.878.89 2.929-2.9a.726.726 0 0 0 .006-1.025l-2.929-2.96Z"></path>
                </svg>

                <h1 className="text-gray-300 ml-3 text-[15px]">Cross Post</h1>
              </div>

            </div>
          )
          }
        </div>
      </div>
    </div>
  );
};

export default Post;
