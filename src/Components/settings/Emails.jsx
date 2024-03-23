import React, { useState } from "react";
import Setting from "./Setting";
import Subtitle from "./components/Subtitle";

function Emails({chatRequests, newFollowerNotif, followEmail}) {
  const [toggles, setToggles] = useState({
    chatRequests: chatRequests,
    newFollowers: newFollowerNotif,
    unsubscribeFromAllEmails: !followEmail,
  });

  const handleToggle = (id) => {
    setToggles((prevToggles) => ({
      ...prevToggles,
      [id]: !prevToggles[id],
    }));
  };

  return (
    <div className="flex flex-col w-full">
      <h3 className="text-white text-xl -mb-3 font-bold font-plex">
        Manage Emails
      </h3>
      <Subtitle title = "Messages" />
      <Setting
          id = "settings-emails-category-chat-requests-toggle-button"
          key = "chatRequests"
          title = "Chat requests"
          toggleButton = {true}
          isToggled = {toggles["chatRequests"]}
          toggleButtonOnClick={() => handleToggle("chatRequests")}
      />

      <Subtitle title = "Activity" />
      <Setting
          id = "settings-emails-category-new-followers-toggle-button"
          key = "newFollowers"
          title = "New followers"
          toggleButton = {true}
          isToggled = {toggles["newFollowers"]}
          toggleButtonOnClick={() => handleToggle("newFollowers")}
      />

      <Subtitle title = "" />
      <Setting
          id = "settings-emails-category-unsubscribe-from-all-emails-toggle-button"
          key = "unsubscribeFromAllEmails"
          title = "Unsubscribe from all emails"
          toggleButton = {true}
          isToggled = {toggles["unsubscribeFromAllEmails"]}
          toggleButtonOnClick={() => handleToggle("unsubscribeFromAllEmails")}
      />
    </div>
  );
}

export default Emails;

/* ID Documentation */
// settings-emails-category-chat-requests-toggle-button: Toggle Button for chat requests
// settings-emails-category-new-followers-toggle-button: Toggle Button for new followers
// settings-emails-category-unsubscribe-from-all-emails-toggle-button: Toggle Button for unsubscribing from all emails