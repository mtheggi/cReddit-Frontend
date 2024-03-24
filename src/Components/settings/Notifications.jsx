import React, { useState } from "react";
import Setting from "./Setting";
import Subtitle from "./components/Subtitle";

function Notifications({ mentionsNotifs, commentsNotifs, postsUpvotesNotifs, repliesNotifs, newFollowersNotifs, postNotifs, setUserSettings}) {
  const [toggles, setToggles] = useState({
    mentionsOfUsername: mentionsNotifs,
    commentsOnYourPosts: commentsNotifs,
    upvotesOnYourPosts: postsUpvotesNotifs,
    upvotesOnYourComments: false,
    repliesToYourComments: repliesNotifs,
    newFollowers: newFollowersNotifs,
    postsYouFollow: postNotifs,
    commentsYouFollow: false,
  });

  const handleToggle = (id) => {
    setToggles((prevToggles) => ({
      ...prevToggles,
      [id]: !prevToggles[id],
    }));
  };

  return (
    <div className="flex flex-col w-full">
      <h3 className="text-white -mb-3 text-xl font-bold font-plex">
        Notification settings
      </h3>

      <Subtitle title = "Activity" />
      
      <Setting
          title="Mentions of u/username"
          clickableID = "settings-notifications-mentions-of-username-toggle-button"
          settingName = "mentionsNotifs"
          pageName = "notifications"
          setUserSettings = {setUserSettings}
          toggleButton={true}
          isToggled={toggles["mentionsOfUsername"]}
      />

      <Setting
          title="Comments on your posts"
          clickableID = "settings-notifications-comments-on-your-posts-toggle-button"
          settingName = "commentsNotifs"
          pageName = "notifications"
          setUserSettings = {setUserSettings}
          toggleButton={true}
          isToggled={toggles["commentsOnYourPosts"]}
      />

      <Setting
          title="Upvotes on your posts"
          clickableID = "settings-notifications-upvotes-on-your-posts-toggle-button"
          settingName = "postsUpvotesNotifs"
          pageName = "notifications"
          setUserSettings = {setUserSettings}
          toggleButton={true}
          isToggled={toggles["upvotesOnYourPosts"]}
      />

      <Setting
          title="Upvotes on your comments"
          clickableID = "settings-notifications-upvotes-on-your-comments-toggle-button"
          settingName = "commentsUpvotesNotifs"
          pageName = "notifications"
          setUserSettings = {setUserSettings}
          toggleButton={true}
          isToggled={toggles["upvotesOnYourComments"]}
      />

      <Setting
          title="Replies to your comments"
          clickableID = "settings-notifications-replies-to-your-comments-toggle-button"
          settingName = "repliesNotifs"
          pageName = "notifications"
          setUserSettings = {setUserSettings}
          toggleButton={true}
          isToggled={toggles["repliesToYourComments"]}
      />

      <Setting
          title="New followers"
          clickableID = "settings-notifications-new-followers-toggle-button"
          settingName = "newFollowersNotifs"
          pageName = "notifications"
          setUserSettings = {setUserSettings}
          toggleButton={true}
          isToggled={toggles["newFollowers"]}
      />

      <Setting
          title="Posts you follow"
          clickableID = "settings-notifications-posts-you-follow-toggle-button"
          settingName = "postNotifs"
          pageName = "notifications"
          setUserSettings = {setUserSettings}
          toggleButton={true}
          isToggled={toggles["postsYouFollow"]}
      />

      <Setting
          title="Comments you follow"
          clickableID = "settings-notifications-comments-you-follow-toggle-button"
          settingName = "commentsYouFollowNotifs"
          pageName = "notifications"
          setUserSettings = {setUserSettings}
          toggleButton={true}
          isToggled={toggles["commentsYouFollow"]}
      />
    </div>
  );
}

export default Notifications;

/* ID Documentation */
// settings-notifications-mentions-of-username-toggle-button: Toggle Button for mentions of username
// settings-notifications-comments-on-your-posts-toggle-button: Toggle Button for comments on your posts
// settings-notifications-upvotes-on-your-posts-toggle-button: Toggle Button for upvotes on your posts
// settings-notifications-upvotes-on-your-comments-toggle-button: Toggle Button for upvotes on your comments
// settings-notifications-replies-to-your-comments-toggle-button: Toggle Button for replies to your comments
// settings-notifications-new-followers-toggle-button: Toggle Button for new followers
// settings-notifications-posts-you-follow-toggle-button: Toggle Button for posts your follow
// settings-notifications-comments-you-follow-toggle-button: Toggle Button for comments you follow