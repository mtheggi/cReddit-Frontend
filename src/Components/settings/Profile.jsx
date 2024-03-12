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
      <TextArea placeholder="Display Name (optional)" maxLength="30" rows="1" />

      <Setting
        title="About (optional)"
        message="A brief description of yourself shown on your profile."
      />

      <TextArea placeholder="About (optional)" maxLength="100" />

      <Setting
        title="Social Links (5 max)"
        message="People who visit your profile will see your social links."
      />
      <button
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
      <SocialLinksModal show={modalShow} onHide={() => setModalShow(false)} />

      <Subtitle title="IMAGES" />
      <Setting
        title="Avatar and banner image"
        message="Images must be .png or .jpg format"
      />
      <ImageUpload />

      <Subtitle title="PROFILE CATEGORY" />
      <Setting
        title="NSFW"
        message="This content is NSFW (may contain nudity, pornography, profanity or inappropriate content for those under 18)"
        toggleButton={true}
      />

      <Subtitle title="PROFILE CATEGORY" />
      <Setting
        title="Allow people to follow you"
        message="Followers will be notified about posts you make to your profile and see them in their home feed."
        toggleButton={true}
      />
      <Setting
        title="Content visibility"
        message="Posts to this profile can appear in r/all and your profile can be discovered in /users"
        toggleButton={true}
      />
      <Setting
        title="Active in communities visibility"
        message="Show which communities I am active in on my profile."
        toggleButton={true}
      />
      <Setting
        title="Clear history"
        message="Delete your post views history."
        regularButton="Clear History"
      />
    </div>
  );
}

export default Profile;
