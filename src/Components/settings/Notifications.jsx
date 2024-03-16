import React, { useState } from "react";
import Setting from "./Setting";
import Subtitle from "./components/Subtitle";

function Notifications() {
  const [toggles, setToggles] = useState({
    mentionsOfUsername: true,
    commentsOnYourPosts: true,
    upvotesOnYourPosts: true,
    upvotesOnYourComments: true,
    repliesToYourComments: true,
    newFollowers: true,
    postsYouFollow: true,
    commentsYouFollow: true,
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
          id = "settings-notifications-category-mentions-of-username-toggle-button"
          key="mentionsOfUsername"
          title="Mentions of u/username"
          toggleButton={true}
          isToggled={toggles["mentionsOfUsername"]}
          toggleButtonOnClick={() => handleToggle("mentionsOfUsername")}
      />

      <Setting
          id = "settings-notifications-category-comments-on-your-posts-toggle-button"
          key="commentsOnYourPosts"
          title="Comments on your posts"
          toggleButton={true}
          isToggled={toggles["commentsOnYourPosts"]}
          toggleButtonOnClick={() => handleToggle("commentsOnYourPosts")}
      />

      <Setting
          id = "settings-notifications-category-upvotes-on-your-posts-toggle-button"
          key="upvotesOnYourPosts"
          title="Upvotes on your posts"
          toggleButton={true}
          isToggled={toggles["upvotesOnYourPosts"]}
          toggleButtonOnClick={() => handleToggle("upvotesOnYourPosts")}
      />

      <Setting
          id = "settings-notifications-category-upvotes-on-your-comments-toggle-button"
          key="upvotesOnYourComments"
          title="Upvotes on your comments"
          toggleButton={true}
          isToggled={toggles["upvotesOnYourComments"]}
          toggleButtonOnClick={() => handleToggle("upvotesOnYourComments")}
      />

      <Setting
          id = "settings-notifications-category-replies-to-your-comments-toggle-button"
          key="repliesToYourComments"
          title="Replies to your comments"
          toggleButton={true}
          isToggled={toggles["repliesToYourComments"]}
          toggleButtonOnClick={() => handleToggle("repliesToYourComments")}
      />

      <Setting
          id = "settings-notifications-category-new-followers-toggle-button"
          key="newFollowers"
          title="New followers"
          toggleButton={true}
          isToggled={toggles["newFollowers"]}
          toggleButtonOnClick={() => handleToggle("newFollowers")}
      />

      <Setting
          id = "settings-notifications-category-posts-you-follow-toggle-button"
          key="postsYouFollow"
          title="Posts you follow"
          toggleButton={true}
          isToggled={toggles["postsYouFollow"]}
          toggleButtonOnClick={() => handleToggle("postsYouFollow")}
      />

      <Setting
          id = "settings-notifications-category-comments-you-follow-toggle-button"
          key="commentsYouFollow"
          title="Comments you follow"
          toggleButton={true}
          isToggled={toggles["commentsYouFollow"]}
          toggleButtonOnClick={() => handleToggle("commentsYouFollow")}
      />
    </div>
  );
}

export default Notifications;

/* ID Documentation */
// settings-notifications-category-mentions-of-username-toggle-button: Toggle Button for mentions of username
// settings-notifications-category-comments-on-your-posts-toggle-button: Toggle Button for comments on your posts
// settings-notifications-category-upvotes-on-your-posts-toggle-button: Toggle Button for upvotes on your posts
// settings-notifications-category-upvotes-on-your-comments-toggle-button: Toggle Button for upvotes on your comments
// settings-notifications-category-replies-to-your-comments-toggle-button: Toggle Button for replies to your comments
// settings-notifications-category-new-followers-toggle-button: Toggle Button for new followers
// settings-notifications-category-posts-you-follow-toggle-button: Toggle Button for posts your follow
// settings-notifications-category-comments-you-follow-toggle-button: Toggle Button for comments you follow