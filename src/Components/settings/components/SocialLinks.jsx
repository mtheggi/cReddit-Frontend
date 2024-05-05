import { useState } from "react";
import SocialLink from "./SocialLink";
import { changeSetting } from "../utils/ChangeSetting";
import { notify } from "./CustomToast";

function SocialLinks({ pageName, socialLinks, setModalShow }) {
  const [socials, setSocials] = useState(socialLinks);

  async function handleAddSocial(social) {
    const res = await changeSetting(pageName, "socials", [social, ...socials]);
    if (res.status === 200) {
      setSocials([social, ...socials]);
      notify("Changes saved successfully");
    } else notify("Failed to save changes");
  }

  async function handleRemoveSocial(social) {
    const newSocials = socials.filter(
      (s) => s.displayName !== social.displayName
    );
    const res = await changeSetting(pageName, "socials", newSocials);
    if (res.status === 200) {

      setSocials(newSocials);
      notify("Changes saved successfully");
    } else notify("Failed to save changes");
  }

  return (
    <div className="flex flex-wrap justify-start w-full items-center pt-3 pb-3 max-w-3xl">
      {socials.map((link, i) => {
        return (
          <SocialLink
            key={i}
            id={`profile-added-social-link-${link.platform
              .toLowerCase()
              .split(" ")
              .join("_")}`}
            url={link.platform.toLowerCase().split(" ").join("_")}
            platform={link.displayName}
            selected={true}
            handleRemoveSocial={handleRemoveSocial}
          />
        );
      })}
      <button
        id="profile-social-links-button"
        onClick={() => setModalShow(true)}
        className="flex flex-row justify-center items-center p-2.5 bg-gray-700 rounded-3xl m-0.5 mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={socials.length == 5}
      >
        <div className="flex flex-row justify-start w-full items-center">
          <i
            className="fa-solid fa-plus fa-sm pl-1"
            style={{ color: "white" }}
          ></i>
          <span className="text-xs text-white font-bold font-plex pl-2">
            Add social link
          </span>
        </div>
      </button>
    </div>
  );
}

export default SocialLinks;
