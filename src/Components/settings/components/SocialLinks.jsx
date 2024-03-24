import SocialLink from "./SocialLink";

function SocialLinks({ socialLinks, setModalShow }) {
  return (
    <div className="flex flex-wrap justify-start w-full items-center pt-3 pb-3 max-w-3xl">
      {socialLinks.map((link, i) => {
        return (
          <SocialLink
            key={i}
            id={`profile-added-social-link-${link.platform
              .toLowerCase()
              .split(" ")
              .join("_")}`}
            url={link.platform.toLowerCase().split(" ").join("_")}
            platform={link.displayName}
          />
        );
      })}
      <button
        id="profile-social-links-button"
        onClick={() => setModalShow(true)}
        className="flex flex-row justify-center items-center p-2.5 bg-gray-700 rounded-3xl m-0.5 mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={socialLinks.length == 5}
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
