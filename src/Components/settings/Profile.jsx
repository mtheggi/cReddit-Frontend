import { useState } from "react";
import FloatingInput from "./form-components/FloatingInput";
import TextArea from "./form-components/TextArea";
import SimpleMenu from "./form-components/SimpleMenu";
import Subtitle from "./Subtitle";
import Setting from "./Setting";
import SocialLinksModal from "./form-components/SocialLinksModal";
import Button from "react-bootstrap/Button";
import ImageUpload from "./form-components/ImageUpload";

function Profile() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div className="flex flex-col w-full">
      <h3 className="text-white text-xl font-bold font-plex">
        Customize Profile
      </h3>

      <Subtitle title="PROFILE INFORMATION" />
      <Setting
        title="Display Name (optional)"
        message="Set a display name. This does not change your username."
      />
      <TextArea
        id="profile-display-name-input"
        placeholder="Display Name (optional)"
        maxLength="30"
        rows="1"
      />

      <Setting
        title="About (optional)"
        message="A brief description of yourself shown on your profile."
      />
      <TextArea
        id="profile-about-input"
        placeholder="About (optional)"
        maxLength="100"
      />

      <Setting
        title="Social Links (5 max)"
        message="People who visit your profile will see your social links."
      />
      <button
        id="profile-social-links-button"
        onClick={() => setModalShow(true)}
        className="w-38 text-white bg-gray-800 text-sm font-bold font-plex bg-reddit_darkGray rounded-3xl mt-1.5"
      >
        <div className="flex flex-row justify-start w-full items-center p-3 pl-0 pr-0">
          <i
            className="fa-solid fa-plus fa-2xl "
            style={{ color: "white" }}
          ></i>
          <span className="text-xs font-plex pl-3">Add social link</span>
        </div>
      </button>
      <SocialLinksModal
        id="profile-social-links-modal"
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <Subtitle title="IMAGE UPLOAD" />
      <Setting
        title="Upload profile picture"
        message="Images must be .png or .jpg format"
      />
      <ImageUpload id="profile-image-upload-drag-and-drop" />

      <Subtitle title="PROFILE CATEGORY" />
      <Setting
        id="profile-category-nsfw-toggle-button"
        title="NSFW"
        message="This content is NSFW (may contain nudity, pornography, profanity or inappropriate content for those under 18)"
        toggleButton={true}
      />

      <Subtitle title="PROFILE CATEGORY" />
      <Setting
        id="profile-category-follow-toggle-button"
        title="Allow people to follow you"
        message="Followers will be notified about posts you make to your profile and see them in their home feed."
        toggleButton={true}
      />
      <Setting
        id="profile-category-visibility-toggle-button"
        title="Content visibility"
        message="Posts to this profile can appear in r/all and your profile can be discovered in /users"
        toggleButton={true}
      />
      <Setting
        id="profile-category-active-communities-toggle-button"
        title="Active in communities visibility"
        message="Show which communities I am active in on my profile."
        toggleButton={true}
      />
      <Setting
        id="profile-category-clear-history-button"
        title="Clear history"
        message="Delete your post views history."
        regularButton="Clear History"
      />
    </div>
  );
}
export default Profile;

/* ID Documentation */
// profile-display-name-input: Textarea for display name
// profile-about-input: Textarea for about
// profile-social-links-button: Button to add social links
// profile-social-links-modal: Modal to add social links
//     -> each social appends {social in lower case and seperated by "-"}-button: Button to add social link
// profile-image-upload-drag-and-drop: Image upload drag and drop
// profile-category-nsfw-toggle-button: Toggle button for NSFW
// profile-category-follow-toggle-button: Toggle button for follow
// profile-category-visibility-toggle-button: Toggle button for visibility
// profile-category-active-communities-toggle-button: Toggle button for active communities
// profile-category-clear-history-button: Button to clear history
