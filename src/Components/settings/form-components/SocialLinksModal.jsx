import Modal from "react-bootstrap/Modal";

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
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Title
        id="contained-modal-title-vcenter"
        className="flex flex-row justify-center w-full bg-reddit_greenyDark text-white text-md p-3 rounded-t-sm font-plex border-1 border-gray-700"
      >
        Add Social Link
      </Modal.Title>
      <Modal.Body className="border-l border-b border-r border-gray-700 flex flex-wrap justify-center items-center text-white bg-reddit_greenyDark rounded-b-sm font-plex ">
        <button
          id={`${props.id}-custom-url-button`}
          className="flex flex-row justify-center items-center p-2.5 bg-gray-700 rounded-3xl m-0.5 mt-3"
        >
          <img
            className="pr-1 pl-1"
            src="https://www.redditstatic.com/desktop2x/img/social-links/custom.png"
          ></img>
          <span className="text-xs font-bold font-plex pl-2 pr-1">
            Custom URL
          </span>
        </button>
        {socials.map((social, i) => (
          <button
            id={`${props.id}-${social
              .toLowerCase()
              .split(" ")
              .join("-")}-button`}
            key={i}
            className="flex flex-row justify-center items-center p-2.5 bg-gray-700 rounded-3xl m-0.5 mt-3"
          >
            <img
              className="pr-1 pl-1"
              src={`https://www.redditstatic.com/desktop2x/img/social-links/${social
                .toLowerCase()
                .split(" ")
                .join("_")}.png`}
            ></img>
            <span className="text-xs font-bold font-plex pl-2 pr-1">
              {social}
            </span>
          </button>
        ))}
      </Modal.Body>
    </Modal>
  );
}

export default SocialLinksModal;
