import React, { useState } from 'react';
import Setting from './Setting';
import Subtitle from './Subtitle'

function Emails() {
  const [privateMessages, setPrivateMessages] = useState(true);
  const [chatRequests, setChatRequests] = useState(true);
  const [newUserWelcome, setNewUserWelcome] = useState(true);
  const [commentsOnYourPosts, setCommentsOnYourPosts] = useState(true);
  const [repliesToYourComments, setRepliesToYourComments] = useState(true);
  const [upvotesOnYourPosts, setUpvotesOnYourPosts] = useState(true);
  const [upvotesOnYourComments, setUpvotesOnYourComments] = useState(true);
  const [usernameMentions, setUsernameMentions] = useState(true);
  const [newFollowers, setNewFollowers] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(true);
  const [unsubscribeFromAllEmails, setUnsubscribeFromAllEmails] = useState(false);

  const messagesSection = [
    {
      title: 'Private messages',
      toggle: privateMessages,
      setToggle: setPrivateMessages,
    },
    {
      title: 'Chat requests',
      toggle: chatRequests,
      setToggle: setChatRequests,
    },
  ];

  const activitySection = [
    {
      title: 'New user welcome',
      toggle: newUserWelcome,
      setToggle: setNewUserWelcome,
    },
    {
      title: 'Comments on your posts',
      toggle: commentsOnYourPosts,
      setToggle: setCommentsOnYourPosts,
    },
    {
      title: 'Replies to your comments',
      toggle: repliesToYourComments,
      setToggle: setRepliesToYourComments,
    },
    {
      title: 'Upvotes on your posts',
      toggle: upvotesOnYourPosts,
      setToggle: setUpvotesOnYourPosts,
    },
    {
      title: 'Upvotes on your comments',
      toggle: upvotesOnYourComments,
      setToggle: setUpvotesOnYourComments,
    },
    {
      title: 'Username mentions',
      toggle: usernameMentions,
      setToggle: setUsernameMentions,
    },
    {
      title: 'New followers',
      toggle: newFollowers,
      setToggle: setNewFollowers,
    },
  ];

  const newslettersSection = [
    {
      title: 'Daily digest',
      toggle: dailyDigest,
      setToggle: setDailyDigest,
    },
  ];

  const finalEmailsSection = [
    {
      title: 'Unsubscribe from all emails',
      toggle: unsubscribeFromAllEmails,
      setToggle: setUnsubscribeFromAllEmails,
    },
  ];

  return (
    <div className="flex flex-col w-full"> 
      
      <h3 className="text-white text-xl font-bold font-plex">
        Manage Emails
      </h3>

      <Subtitle title="MESSAGES" />
      {messagesSection.map((setting, index) => (
        <Setting
          key={index}
          title={setting.title}
          message={setting.message}
          toggleButton={true}
          isToggled={setting.toggle}
          toggleButtonOnClick={() => setting.setToggle(!setting.toggle)}
        />
      ))}

      <Subtitle title="ACTIVITY" />
      {activitySection.map((setting, index) => (
        <Setting
          key={index}
          title={setting.title}
          message={setting.message}
          toggleButton={true}
          isToggled={setting.toggle}
          toggleButtonOnClick={() => setting.setToggle(!setting.toggle)}
        />
      ))}

      <Subtitle title="NEWSLETTERS" />
      {newslettersSection.map((setting, index) => (
        <Setting
          key={index}
          title={setting.title}
          message={setting.message}
          toggleButton={true}
          isToggled={setting.toggle}
          toggleButtonOnClick={() => setting.setToggle(!setting.toggle)}
        />
      ))}

      <Subtitle title="" />
      {finalEmailsSection.map((setting, index) => (
        <Setting
          key={index}
          title={setting.title}
          message={setting.message}
          toggleButton={true}
          isToggled={setting.toggle}
          toggleButtonOnClick={() => setting.setToggle(!setting.toggle)}
        />
      ))}
    </div>
  );
}

export default Emails;
