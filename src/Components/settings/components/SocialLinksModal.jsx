import Modal from "react-bootstrap/Modal";
import SocialLink from "./SocialLink";

const socials = [
  "Reddit",
  "Instagram",
  "Twitter",
  "TikTok",
  "Twitch",
  "Facebook",
  "YouTube",
  "Tumblr",
  "Spotify",
  "SoundCloud",
  "Beacons",
  "Linktree",
  "Discord",
  "Venmo",
  "Cash App",
  "Patreon",
  "Kofi",
  "PayPal",
  "Cameo",
  "Substack",
  "Kickstarter",
  "Buy Me a Coffee",
  "Shopify",
];

function SocialLinksModal(props) {
  return (
    <Modal
      style={{ opacity: 1, zIndex: 9999 }}
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="flex flex-col"
    >
      <Modal.Title
        id="contained-modal-title-vcenter"
        className="flex flex-row justify-center w-full bg-reddit_greenyDark text-white text-md p-3 rounded-t-sm font-plex border-1 border-gray-700"
      >
        Add Social Link
      </Modal.Title>
      <Modal.Body className="border-l border-b border-r border-gray-700 flex flex-wrap justify-center items-center text-white bg-reddit_greenyDark rounded-b-sm font-plex ">
        <SocialLink
          id={`${props.id}-custom-url-button`}
          url="custom"
          platform="Custom URL"
        />
        {socials.map((social, i) => (
          <SocialLink
            key={i}
            id={`${props.id}-${social
              .toLowerCase()
              .split(" ")
              .join("_")}-button`}
            url={social.toLowerCase().split(" ").join("_")}
            platform={social}
          />
        ))}
      </Modal.Body>
    </Modal>
  );
}

export default SocialLinksModal;
