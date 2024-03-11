import React, { useState } from 'react';
import Setting from './Setting';
import Subtitle from './Subtitle'

const notificationsSettings = {
  messages: [
    { id: 'privateMessages', title: 'Private messages' },
    { id: 'chatMessages', title: 'Chat messages' },
    { id: 'chatRequests', title: 'Chat requests' },
  ],
  activity: [
    { id: 'mentionsOfUsername', title: 'Mentions of u/username' },
    { id: 'commentsOnYourPosts', title: 'Comments on your posts' },
    { id: 'upvotesOnYourPosts', title: 'Upvotes on your posts' },
    { id: 'upvotesOnYourComments', title: 'Upvotes on your comments' },
    { id: 'repliesToYourComments', title: 'Replies to your comments' },
    { id: 'activityOnYourComments', title: 'Activity on your comments' },
    { id: 'activityOnChatPosts', title: "Activity on chat posts you're in" },
    { id: 'newFollowers', title: 'New followers' },
    { id: 'awardsYouReceive', title: 'Awards you receive' },
    { id: 'postsYouFollow', title: 'Posts you follow' },
    { id: 'commentsYouFollow', title: 'Comments you follow' },
    ],
  recommendations: [
    { id: 'trendingPosts', title: 'Trending posts' },
    { id: 'communityRecommendations', title: 'Community recommendations' },
    { id: 'reReddit', title: 'ReReddit' },
    { id: 'featuredContent', title: 'Featured content' },
  ],
  updates: [
    { id: 'redditAnnouncements', title: 'Reddit announcements',},
    { id: 'cakeDay', title: 'Cake day',},
  ],
};

function Notifications() {
  
  const [toggles, setToggles] = useState({
    privateMessages: true,
    chatMessages: true,
    chatRequests: true,
    mentionsOfUsername: true,
    commentsOnYourPosts: true,
    upvotesOnYourPosts: true,
    upvotesOnYourComments: true,
    repliesToYourComments: true,
    activityOnYourComments: true,
    activityOnChatPosts: true,
    newFollowers: true,
    awardsYouReceive: true,
    postsYouFollow: true,
    commentsYouFollow: true,
    trendingPosts: true,
    communityRecommendations: true,
    reReddit: true,
    featuredContent: true,
    redditAnnouncements: true,
    cakeDay: true,
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
      {renderSection(notificationsSettings.messages, 'Messages')}
      {renderSection(notificationsSettings.activity, 'Activity')}
      {renderSection(notificationsSettings.recommendations, 'Recommendations')}
      {renderSection(notificationsSettings.updates, 'Updates')}
    </div>
  );
}

export default Notifications;
