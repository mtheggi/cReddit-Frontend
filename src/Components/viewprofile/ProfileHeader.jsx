import React from "react";
import { useLocation } from "react-router-dom";

/**
 * Renders the header section of the user profile page.
 * @module ProfileHeader
 * @param {Object} props - The component props.
 * @param {Object} props.userInfo - Information about the user.
 * @returns {JSX.Element} A React component representing the profile header section.
 */
const ProfileHeader = ({ userInfo }) => {
  const baseUrl = window.location.origin;
  const location = useLocation();
  const currentPage = location.pathname.split("/")[3];

  return (
    <>
      {/* Header */}
      <div
        id="profile-header"
        className="px-[16px] relative pt-[16px] flex pb-[16px] items-center"
      >
        <div className="flex items-center flex-shrink-0 pr-[16px] relative">
          <img
            src={userInfo.profilePicture}
            className="block m-0 rounded-full border-2 border-solid border-[#FFFFFF] border-opacity-[#1A] overflow-hidden w-[64px] h-[64px]"
          ></img>
          <div className="absolute bottom-0 right-[8px]">
            <div className="bg-[#1A282D] hover:bg-gray-700 w-[32px] h-[32px] flex justify-center rounded-full">
              <a
                className="h-[2rem] p-[0.25rem] border-[0.0625rem] px-[6px] w-[2rem] items-center justify-center rounded-full cursor-pointer inline-flex border-[#1A282D] hover:border-gray-700"
                href={`${baseUrl}/settings/profile`}
              >
                <span className="flex items-center justify-center">
                  <span className="flex">
                    <svg
                      rpl=""
                      aria-hidden="true"
                      fill="#FFFFFF"
                      height="16"
                      icon-name="add-media-outline"
                      viewBox="0 0 20 20"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.376 3.032h-2.355L13.8 1.446A1.155 1.155 0 0 0 12.892 1h-5.74a1.17 1.17 0 0 0-.923.454L5.014 3.031H2.625A2.629 2.629 0 0 0 0 5.656v9.719A2.63 2.63 0 0 0 2.625 18h14.75A2.63 2.63 0 0 0 20 15.375V5.657a2.627 2.627 0 0 0-2.624-2.625Zm1.374 12.343a1.377 1.377 0 0 1-1.375 1.375H2.625a1.377 1.377 0 0 1-1.375-1.375V5.656a1.377 1.377 0 0 1 1.375-1.375h3L7.152 2.25l5.657-.041 1.6 2.072h2.971a1.375 1.375 0 0 1 1.37 1.376v9.718Zm-8.125-6H14v1.25h-3.375V14h-1.25v-3.375H6v-1.25h3.375V6h1.25v3.375Z"></path>
                    </svg>
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="w-full min-w-0 mt-[8px] md:mt-0">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-full">
                <div className="flex items-center justify-start w-full">
                  <div className="flex items-baseline justify-start">
                    <h1 className="text-[24px] font-bold m-0 text-[#f2f2f2]">
                      {userInfo.displayName}
                    </h1>
                  </div>
                </div>
                <p className="m-0 text-[14px] text-[#82959B] font-semibold">
                  u/{userInfo.username}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Buttons */}
      <div className="mx-[4px] my-[16px] text-[14px] font-semibold flex overflow-x-scroll no-scrollbar">
        <a
          rpl=""
          className={`h-[2.5rem] px-[14px] items-center justify-center cursor-pointer inline-flex text-[#F2F4F5] ${
            currentPage === "" ? "bg-[#33464C]" : ""
          } rounded-3xl hover:underline mx-[5px]`}
          href={`${baseUrl}/user/${userInfo.username}/`}
          slot="page-1"
          tabIndex="0"
          type="button"
          faceplate-tab-selected=""
        >
          <span className="flex items-center justify-center">
            <span className="flex items-center gap-[8px]">
              <span className="flex">Overview</span>
            </span>
          </span>
        </a>
        <a
          rpl=""
          className={`h-[2.5rem] px-[14px] items-center justify-center cursor-pointer inline-flex text-[#F2F4F5] ${
            currentPage === "submitted" ? "bg-[#33464C]" : ""
          } rounded-3xl hover:underline mx-[5px]`}
          href={`${baseUrl}/user/${userInfo.username}/submitted`}
          slot="page-1"
          tabIndex="0"
          type="button"
          faceplate-tab-selected=""
        >
          <span className="flex items-center justify-center">
            <span className="flex items-center gap-[8px]">
              <span className="flex">Posts</span>
            </span>
          </span>
        </a>
        <a
          rpl=""
          className={`h-[2.5rem] px-[14px] items-center justify-center cursor-pointer inline-flex text-[#F2F4F5] ${
            currentPage === "comments" ? "bg-[#33464C]" : ""
          } rounded-3xl hover:underline mx-[5px]`}
          href={`${baseUrl}/user/${userInfo.username}/comments`}
          slot="page-1"
          tabIndex="0"
          type="button"
          faceplate-tab-selected=""
        >
          <span className="flex items-center justify-center">
            <span className="flex items-center gap-[8px]">
              <span className="flex">Comments</span>
            </span>
          </span>
        </a>
        <a
          rpl=""
          className={`h-[2.5rem] px-[14px] items-center justify-center cursor-pointer inline-flex text-[#F2F4F5] ${
            currentPage === "saved" ? "bg-[#33464C]" : ""
          } rounded-3xl hover:underline mx-[5px]`}
          href={`${baseUrl}/user/${userInfo.username}/saved`}
          slot="page-1"
          tabIndex="0"
          type="button"
          faceplate-tab-selected=""
        >
          <span className="flex items-center justify-center">
            <span className="flex items-center gap-[8px]">
              <span className="flex">Saved</span>
            </span>
          </span>
        </a>
        <a
          rpl=""
          className={`h-[2.5rem] px-[14px] items-center justify-center cursor-pointer inline-flex text-[#F2F4F5] ${
            currentPage === "hidden" ? "bg-[#33464C]" : ""
          } rounded-3xl hover:underline mx-[5px]`}
          href={`${baseUrl}/user/${userInfo.username}/hidden`}
          slot="page-1"
          tabIndex="0"
          type="button"
          faceplate-tab-selected=""
        >
          <span className="flex items-center justify-center">
            <span className="flex items-center gap-[8px]">
              <span className="flex">Hidden</span>
            </span>
          </span>
        </a>
        <a
          rpl=""
          className={`h-[2.5rem] px-[14px] items-center justify-center cursor-pointer inline-flex text-[#F2F4F5] ${
            currentPage === "upvoted" ? "bg-[#33464C]" : ""
          } rounded-3xl hover:underline mx-[5px]`}
          href={`${baseUrl}/user/${userInfo.username}/upvoted`}
          slot="page-1"
          tabIndex="0"
          type="button"
          faceplate-tab-selected=""
        >
          <span className="flex items-center justify-center">
            <span className="flex items-center gap-[8px]">
              <span className="flex">Upvoted</span>
            </span>
          </span>
        </a>
        <a
          rpl=""
          className={`h-[2.5rem] px-[14px] items-center justify-center cursor-pointer inline-flex text-[#F2F4F5] ${
            currentPage === "downvoted" ? "bg-[#33464C]" : ""
          } rounded-3xl hover:underline mx-[5px]`}
          href={`${baseUrl}/user/${userInfo.username}/downvoted`}
          slot="page-1"
          tabIndex="0"
          type="button"
          faceplate-tab-selected=""
        >
          <span className="flex items-center justify-center">
            <span className="flex items-center gap-[8px]">
              <span className="flex">Downvoted</span>
            </span>
          </span>
        </a>
      </div>

      {/* Overview Border */}
      {currentPage == "" && (
        <div>
          <div className="my-[0.5rem] mx-[0.25rem]">
            <div className="flex h-[32px]">
              <a
                href={`${baseUrl}/submit`}
                className="no-underline hover:no-underline active:no-underline px-[0.0625rem] bg-transparent items-center justify-center rounded-full cursor-pointer inline-flex border-[1px] hover:border-white border-gray-500"
              >
                <span className="flex items-center justify-center mx-[8px]">
                  <span className="mr-[0.5rem]">
                    <svg
                      rpl=""
                      fill="#FFFFFF"
                      height="16"
                      icon-name="add-outline"
                      viewBox="0 0 20 20"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 9.375h-8.375V1h-1.25v8.375H1v1.25h8.375V19h1.25v-8.375H19v-1.25Z"></path>
                    </svg>
                  </span>
                  <span className="flex items-center gap-[0.5rem] text-white text-[12px]">
                    Create a post
                  </span>
                </span>
              </a>
            </div>
          </div>
          <hr className="border-[0px] border-b-[0.0625rem] border-solid border-gray-500"></hr>
        </div>
      )}

      {/* Border */}
      {currentPage != "" && (
        <div>
          <div className="my-[8px] mx-[4px]">
            <div className="flex h-[32px]">
              <a className="no-underline hover:no-underline active:no-underline "></a>
            </div>
          </div>
          <hr className="border-[0px] border-b-[0.0625rem] border-solid border-b-[#FFFFFF]"></hr>
        </div>
      )}
    </>
  );
};

export default ProfileHeader;
