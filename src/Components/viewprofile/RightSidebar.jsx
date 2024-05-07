import React, { useState, useEffect } from "react";
import { baseUrl } from "@/constants";
import { getRequest } from "@/services/Requests";
import SocialLink from "./SocialLink";

/**
 * Renders the right sidebar component for displaying user information and settings.
 * @module RightSidebar
 * @param {Object} props - The component props.
 * @param {Object} props.userInfo - Information about the user.
 * @returns {JSX.Element} A React component representing the right sidebar.
 */
const RightSidebar = ({ userInfo }) => {
  const [socialLinks, setSocialLinks] = useState([]);

  const currentUrl = window.location.origin;

  /**
   * Formats the cake day date.
   * @param {string} cakeDay - The cake day date string.
   * @returns {string} The formatted cake day date.
   */
  const formatCakeDay = (cakeDay) => {
    if (!cakeDay) return "";
    const date = new Date(cakeDay);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const getSocialLinks = async () => {
      const response = await getRequest(`${baseUrl}/user/settings`);
      if (response.status === 200 || response.status === 201) {
        setSocialLinks(response.data.profile.socialLinks);
      }
    };
    getSocialLinks();
  }, []);

  return (
    <div
      id="right-sidebar"
      className="w-[316px] min-w-[316px] hidden md:block md:sticky md:top-[56px] md:max-h-[calc(100vh-56px-1px)] md:overflow-y-auto md:overflow-x-hidden mt-[60px] no-scrollbar"
    >
      <div className="mt-[16px] rounded-[16px] bg-[#04090A]">
        <div
          className="relative overflow-hidden w-full rounded-t-[1rem] h-[114px] bg-cover bg-center"
          style={{
            backgroundImage: `url(${userInfo.banner})`,
          }}
        >
          <div className="absolute bottom-[16px] right-[16px]">
            <div className="bg-[#1A282D] w-[32px] h-[32px] flex justify-center rounded-full hover:bg-gray-700">
              <a
                rpl=""
                aria-label="Edit profile banner"
                className="px-[6px] items-center justify-center inline-flex "
                href={`${currentUrl}/settings/profile`}
                waprocessedanchor="true"
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
        <div className="p-[16px]">
          <div className="flex items-center justify-between">
            <h2 className="m-0 text-[16px] text-neutral-100 font-bold truncate h-[20px]">
              {userInfo.displayName}
            </h2>
          </div>
          <div className="mt-[12px]">
            <div className="flex items-center gap-[8px]">
              <button className="px-[10px] items-center justify-center inline-flex bg-[#1A282D] hover:bg-[#32464C] h-[32px] rounded-3xl">
                <span className="flex items-center justify-center">
                  <span className="flex mr-[8px]">
                    <svg
                      rpl=""
                      fill="#FFFFFF"
                      height="16"
                      icon-name="share-outline"
                      viewBox="0 0 20 20"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18.942 7.058 12.8.912l-.883.883 5.079 5.08h-2.871A13.189 13.189 0 0 0 1.067 18h1.267a11.94 11.94 0 0 1 11.791-9.875h2.866l-5.079 5.08.883.883 6.147-6.146a.624.624 0 0 0 0-.884Z"></path>
                    </svg>
                  </span>
                  <span className="flex items-center gap-[8px] text-white text-[12px]">
                    Share
                  </span>
                </span>
              </button>
            </div>
          </div>
          <div className="grid gap-y-[24px] grid-cols-2 my-[16px]">
            <div className="flex flex-col min-w-0">
              <p className="m-0 text-neutral-200 text-[14px] font-semibold whitespace-nowrap">
                <span className="font-semibold text-[14px]">101</span>
              </p>
              <p className="m-0 text-neutral-500 text-[12px] whitespace-nowrap truncate">
                Post Karma
              </p>
            </div>
            <div className="flex flex-col min-w-0">
              <p className="m-0 text-neutral-200 text-[14px] font-semibold whitespace-nowrap">
                <span className="font-semibold text-[14px]">44</span>
              </p>
              <p className="m-0 text-neutral-500 text-[12px] whitespace-nowrap truncate">
                Comment Karma
              </p>
            </div>
            <div className="flex flex-col min-w-0">
              <p className="m-0 text-neutral-200 text-[14px] font-semibold whitespace-nowrap">
                <span className="font-semibold text-[14px]">
                  {userInfo.followers}
                </span>
              </p>
              <p className="m-0 text-neutral-500 text-[12px] whitespace-nowrap truncate">
                Followers
              </p>
            </div>
            <div className="flex flex-col min-w-0">
              <p className="m-0 text-neutral-200 text-[14px] font-semibold whitespace-nowrap">
                <span className="font-semibold text-[14px]">
                  {formatCakeDay(userInfo.cakeDay)}
                </span>
              </p>
              <p className="m-0 text-neutral-500 text-[12px] whitespace-nowrap truncate">
                Cake Day
              </p>
            </div>
            <div className="flex flex-col min-w-0">
              <p className="m-0 text-neutral-200 text-[14px] font-semibold whitespace-nowrap">
                <span className="font-semibold text-[14px]">10000</span>
              </p>
              <p className="m-0 text-neutral-500 text-[12px] whitespace-nowrap truncate">
                Gold Recieved
              </p>
            </div>
          </div>

          <hr className="border-b-[1px] border-neutral-500"></hr>

          <h2 className="text-[12px] font-semibold uppercase text-[#82959B] my-[16px]">
            Settings
          </h2>

          <ul className="pl-0 my-0">
            <li className="relative list-none mt-0 -mx-[16px] pointer-events-none mb-[12px]">
              <div className="flex justify-between relative px-[1rem] gap-[0.5rem] text-[#F2F4F5] -outline-offset-1">
                <span className="flex items-center gap-[0.5rem] min-w-0 shrink">
                  <span className="flex shrink-0 items-center justify-center h-[2rem] w-[2rem]">
                    <span className="text-[20px] leading-4">
                      <span className="inline-flex items-center justify-center">
                        <span className="inline-flex relative box-border rounded-full w-[2rem] h-[2rem] isolate">
                          <span className="rounded-full box-border border-solid border-[#0B1416] relative h-[100%] w-[100%] justify-center bg-transparent border-0">
                            <span className="rounded-full overflow-hidden border border-solid border-[#0B1416] inline-flex">
                              <img
                                src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png"
                                alt="u/Legend-Bas avatar"
                                width="32"
                                height="32"
                              ></img>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                  <span className="flex flex-col justify-center min-w-0 shrink py-[6px]">
                    <span className="text-[14px]">Profile</span>
                    <span className="text-[12px] text-[#82959B]">
                      Customize your profile
                    </span>
                  </span>
                </span>
                <span className="flex items-center shrink-0">
                  <span className="flex items-center justify-center h-[1.5rem]">
                    <a
                      className="pointer-events-auto h-[2rem] px-[10px] items-center justify-center inline-flex bg-[#1A282D] rounded-3xl hover:bg-gray-700"
                      href={`${currentUrl}/settings/profile`}
                    >
                      <span className="flex items-center justify-center">
                        <span className="flex items-center gap-[0.5rem] text-[12px]">
                          Edit Profile
                        </span>
                      </span>
                    </a>
                  </span>
                </span>
              </div>
            </li>

            <li className="relative list-none mt-0 -mx-[16px] pointer-events-none mb-[12px]">
              <div className="flex justify-between relative px-[1rem] gap-[0.5rem] text-[#F2F4F5] -outline-offset-1">
                <span className="flex items-center gap-[0.5rem] min-w-0 shrink">
                  <span className="flex shrink-0 items-center justify-center h-[2rem] w-[2rem]">
                    <span className="text-[20px] leading-4">
                      <svg
                        rpl=""
                        fill="currentColor"
                        height="20"
                        icon-name="avatar-style-outline"
                        viewBox="0 0 20 20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m19.683 5.252-3.87-3.92a1.128 1.128 0 0 0-.8-.332h-1.55a1.093 1.093 0 0 0-1.1.91 1.9 1.9 0 0 1-3.744 0A1.094 1.094 0 0 0 7.533 1h-1.55c-.3 0-.588.12-.8.332L1.317 5.253a1.1 1.1 0 0 0 .014 1.557l1.87 1.829a1.121 1.121 0 0 0 1.48.076l.32-.24v1.936c.344-.31.786-.49 1.25-.511V5.977L3.993 7.668l-1.68-1.646L6.036 2.25H7.42a3.156 3.156 0 0 0 6.16 0h1.383l3.723 3.772-1.7 1.668-2.236-1.749v8.138c.501.337.927.774 1.25 1.284V8.509l.338.264a1.117 1.117 0 0 0 1.436-.109l1.894-1.853a1.101 1.101 0 0 0 .015-1.559ZM13.691 20H1.31A1.325 1.325 0 0 1 0 18.663v-4.916a1.03 1.03 0 0 1 .5-.884.988.988 0 0 1 .98-.014 3 3 0 0 0 3.3-.266c.334-.342.649-.702.944-1.078a.624.624 0 0 1 .775-.163l6.75 3.5A2.945 2.945 0 0 1 15 17.584v1.079A1.325 1.325 0 0 1 13.691 20Zm-12.44-5.873v4.536c0 .054.033.087.058.087h12.382c.025 0 .06-.033.06-.087v-1.079a1.72 1.72 0 0 0-1.035-1.609l-6.349-3.29a9.24 9.24 0 0 1-.76.831 4.235 4.235 0 0 1-4.357.611Zm4.022 4.042-.9-.862 3.138-3.3.9.862-3.138 3.3Zm3.04 0-.913-.857 2.09-2.219.91.857-2.088 2.219Z"></path>
                      </svg>
                    </span>
                  </span>
                  <span className="flex flex-col justify-center min-w-0 shrink py-[6px]">
                    <span className="text-[14px]">Avatar</span>
                    <span className="text-[12px] text-[#82959B]">
                      Customize and style
                    </span>
                  </span>
                </span>
                <span className="flex items-center shrink-0">
                  <span className="flex items-center justify-center h-[1.5rem]">
                    <a
                      className="pointer-events-auto h-[2rem] px-[10px] items-center justify-center inline-flex bg-[#1A282D] rounded-3xl hover:bg-gray-700"
                      href="https://www.reddit.com/avatar/shop"
                    >
                      <span className="flex items-center justify-center">
                        <span className="flex items-center gap-[0.5rem] text-[12px]">
                          Style Avatar
                        </span>
                      </span>
                    </a>
                  </span>
                </span>
              </div>
            </li>

            <li className="relative list-none mt-0 -mx-[16px] pointer-events-none mb-[12px]">
              <div className="flex justify-between relative px-[1rem] gap-[0.5rem] text-[#F2F4F5] -outline-offset-1">
                <span className="flex items-center gap-[0.5rem] min-w-0 shrink">
                  <span className="flex shrink-0 items-center justify-center h-[2rem] w-[2rem]">
                    <span className="text-[20px] leading-4">
                      <svg
                        rpl=""
                        fill="currentColor"
                        height="20"
                        icon-name="mod-outline"
                        viewBox="0 0 20 20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 20c-.101 0-.202-.014-.3-.04C8.249 19.554 1 17.277 1 12V3.187A1.122 1.122 0 0 1 1.846 2.1L9.73.108c.177-.044.363-.044.54 0L18.154 2.1A1.122 1.122 0 0 1 19 3.187V12c0 5.277-7.249 7.554-8.7 7.957A1.162 1.162 0 0 1 10 20ZM2.25 3.283V12c0 4.465 6.989 6.531 7.786 6.751.725-.22 7.714-2.286 7.714-6.751V3.283L10 1.33 2.25 3.283Z"></path>
                      </svg>
                    </span>
                  </span>
                  <span className="flex flex-col justify-center min-w-0 shrink py-[6px]">
                    <span className="text-[14px]">Moderation</span>
                    <span className="text-[12px] text-[#82959B]">
                      Moderation Tools
                    </span>
                  </span>
                </span>
                <span className="flex items-center shrink-0">
                  <span className="flex items-center justify-center h-[1.5rem]">
                    <a
                      className="pointer-events-auto h-[2rem] px-[10px] items-center justify-center inline-flex bg-[#1A282D] rounded-3xl hover:bg-gray-700"
                      href="https://www.reddit.com/settings/profile"
                    >
                      <span className="flex items-center justify-center">
                        <span className="flex items-center gap-[0.5rem] text-[12px]">
                          Mod Settings
                        </span>
                      </span>
                    </a>
                  </span>
                </span>
              </div>
            </li>
          </ul>

          <hr className="border-b-[1px] border-neutral-500"></hr>

          <h2 className="text-[12px] font-semibold uppercase text-[#82959B] my-[16px]">
            Links
          </h2>

          <div className="mb-[0.75rem]">
            <div className="flex gap-[0.5rem] flex-wrap">
              <a
                href={`${currentUrl}/settings/profile`}
                className="px-[10px] items-center justify-center rounded-full cursor-pointer inline-flex bg-[#1A282D] py-[8px] hover:bg-gray-700"
              >
                <span className="flex items-center justify-center text-white">
                  <span className="flex mr-[0.5rem]">
                    <svg
                      rpl=""
                      fill="currentColor"
                      height="12"
                      icon-name="add-fill"
                      viewBox="0 0 20 20"
                      width="12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 9h-8V1H9v8H1v2h8v8h2v-8h8V9Z"></path>
                    </svg>
                  </span>
                  <span className="flex items-center gap-[0.5rem]">
                    <span className="flex items-center text-[12px]">
                      Add Social Link
                    </span>
                  </span>
                </span>
              </a>

              {socialLinks.map((link, index) => (
                <SocialLink
                  key={index}
                  platform={link.platform}
                  url={link.url}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
