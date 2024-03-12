import React, { useState } from 'react';
import Setting from './Setting';
import Subtitle from './Subtitle'

const emailSettings = {
  messages: [
    { id: 'privateMessages', title: 'Private messages' },
    { id: 'chatRequests', title: 'Chat requests' },
  ],
  activity: [
    { id: 'newUserWelcome', title: 'New user welcome' },
    { id: 'commentsOnYourPosts', title: 'Comments on your posts' },
    { id: 'repliesToYourComments', title: 'Replies to your comments' },
    { id: 'upvotesOnYourPosts', title: 'Upvotes on your posts' },
    { id: 'upvotesOnYourComments', title: 'Upvotes on your comments' },
    { id: 'usernameMentions', title: 'Username mentions' },
    { id: 'newFollowers', title: 'New followers' },
    ],
  newsletters: [
    { id: 'dailyDigest', title: 'Daily digest' },
  ],
  finalEmail: [
    { id: 'unsubscribeFromAllEmails', title: 'Unsubscribe from all emails', initialValue: false },
  ],
};

function Emails() {
  
  const [toggles, setToggles] = useState({
    privateMessages: true,
    chatRequests: true,
    newUserWelcome: true,
    commentsOnYourPosts: true,
    repliesToYourComments: true,
    upvotesOnYourPosts: true,
    upvotesOnYourComments: true,
    usernameMentions: true,
    newFollowers: true,
    dailyDigest: true,
    unsubscribeFromAllEmails: false,
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
        Manage Emails
      </h3>
      {renderSection(emailSettings.messages, 'Messages')}
      {renderSection(emailSettings.activity, 'Activity')}
      {renderSection(emailSettings.newsletters, 'Newsletters')}
      {renderSection(emailSettings.finalEmail, '')}
    </div>
  );
}

export default Emails;
