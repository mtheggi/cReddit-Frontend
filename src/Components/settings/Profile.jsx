import { useState } from "react";
import TextArea from "./components/TextArea";
import Subtitle from "./components/Subtitle";
import Setting from "./Setting";
import SocialLinksModal from "./components/SocialLinksModal";
import ImageUpload from "./components/ImageUpload";
import { changeSetting } from "./utils/ChangeSetting";
import { notify } from "./components/CustomToast";
import SocialLinks from "./components/SocialLinks";
import { clearHistory } from "./utils/ClearHistory";

function Profile({
  displayName,
  about,
  socialLinks,
  showAdultContent,
  allowFollow,
  isContentVisible,
  isActiveCommunityVisible,
  setUserSettings,
}) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <h3 className="text-white -mb-3 text-xl font-bold font-plex">
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
        initText={displayName}
        maxLength="30"
        rows="1"
        onTextChange={async (newDispName) => {
          const res = await changeSetting(
            "profile",
            "displayName",
            newDispName
          );
          if (res) {
            setUserSettings(res.data);
            notify("Changes saved");
          } else {
            notify("Failed to save changes :(");
          }
        }}
      />

      <Setting
        title="About (optional)"
        message="A brief description of yourself shown on your profile."
      />
      <TextArea
        id="profile-about-input"
        placeholder="About (optional)"
        initText={about}
        maxLength="100"
        onTextChange={async (newAbout) => {
          (await changeSetting("profile", "about", newAbout))
            ? notify("Changes Saved")
            : notify("Failed to save changes :(");
        }}
      />

      <Setting
        title="Social Links (5 max)"
        message="People who visit your profile will see your social links."
      />

      <SocialLinks socialLinks={socialLinks} setModalShow={setModalShow} />

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
        isToggled={showAdultContent}
        pageName={"profile"}
        settingName={"isNSFW"}
        setUserSettings = {setUserSettings}
      />

      <Subtitle title="PROFILE CATEGORY" />
      <Setting
        id="profile-category-follow-toggle-button"
        title="Allow people to follow you"
        message="Followers will be notified about posts you make to your profile and see them in their home feed."
        toggleButton={true}
        isToggled={allowFollow}
        pageName={"profile"}
        settingName={"allowFollow"}
        setUserSettings = {setUserSettings}
      />
      <Setting
        id="profile-category-visibility-toggle-button"
        title="Content visibility"
        message="Posts to this profile can appear in r/all and your profile can be discovered in /users"
        toggleButton={true}
        isToggled={isContentVisible}
        pageName={"profile"}
        settingName={"isContentVisible"}
        setUserSettings = {setUserSettings}
      />
      <Setting
        id="profile-category-active-communities-toggle-button"
        title="Active in communities visibility"
        message="Show which communities I am active in on my profile."
        toggleButton={true}
        isToggled={isActiveCommunityVisible}
        pageName={"profile"}
        settingName={"isActiveCommunityVisible"}
        setUserSettings = {setUserSettings}
      />
      <Setting
        id="profile-category-clear-history-button"
        title="Clear history"
        message="Delete your post views history."
        regularButton="Clear History"
        overrideOnClick={clearHistory}
        setUserSettings = {setUserSettings}
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
