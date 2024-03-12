import React, { useState } from 'react';
import Setting from './Setting';
import Subtitle from './Subtitle'

const notificationsSettings = {
  activity: [
    { id: 'mentionsOfUsername', title: 'Mentions of u/username' },
    { id: 'commentsOnYourPosts', title: 'Comments on your posts' },
    { id: 'upvotesOnYourPosts', title: 'Upvotes on your posts' },
    { id: 'upvotesOnYourComments', title: 'Upvotes on your comments' },
    { id: 'repliesToYourComments', title: 'Replies to your comments' },
    { id: 'newFollowers', title: 'New followers' },
    { id: 'postsYouFollow', title: 'Posts you follow' },
    { id: 'commentsYouFollow', title: 'Comments you follow' },
    ],
};

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

  const renderSection = (section, title) => (
    <>
      <Subtitle title={title.toUpperCase()} />
      {section.map((setting) => (
        <Setting
          key={setting.id}
          title={setting.title}
          toggleButton={true}
          isToggled={toggles[setting.id]}
          toggleButtonOnClick={() => handleToggle(setting.id)}
        />
      ))}
    </>
  );

  return (
    <div className="flex flex-col w-full"> 
      <h3 className="text-white text-xl font-bold font-plex">
        Notification settings
      </h3>
      {renderSection(notificationsSettings.activity, 'Activity')}
    </div>
  );
}

export default Notifications;
