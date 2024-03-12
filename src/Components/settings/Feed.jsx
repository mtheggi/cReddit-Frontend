import React, { useState } from 'react';
import Setting from './Setting';
import Subtitle from './Subtitle'

const feedSettings = {
  contentPreferences: [
    { id: 'showMatureContent', title: 'Show mature (18+) content', description: 'See NSFW (Not Safe for Work) mature and adult images, videos, written content, and other media in your Reddit feeds and search results.'},
    { id: 'blurMatureImages', title: 'Blur mature images and media', description: 'Blur previews and thumbnails for any images or videos tagged as NSFW (Not Safe for Work).' },
    { id: 'EnableHomeFeedRecommendations', title: 'Enable home feed recommendations', description: 'Allow us to introduce recommended posts in your home feed.'},
    { id: 'autoplayMedia', title: 'Autoplay media', description: 'Play videos and gifs automatically when in the viewport.'},
    { id: 'reduceAnimations', title: 'Reduce Animations', description: 'Reduce animations on posts, comments, and feeds.'},
    { id: 'communityThemes', title: 'Community themes', description: 'Use custom themes for all communities. You can also turn this off on a per community basis.'},
    { id: 'openPostsInNewTab', title: 'Open posts in new tab', description: 'Enable to always open posts in a new tab.'}
  ],
  postPreferences: [
    { id: 'defaultToMarkdown', title: 'Default to markdown', description: 'When posting, your input will default to markdown text instead of fancy pants.' },
  ],
};

function Feed() {
  
  const [toggles, setToggles] = useState({
    showMatureContent: true,
    blurMatureImages: true,
    EnableHomeFeedRecommendations: true,
    autoplayMedia: true,
    reduceAnimations: false,
    communityThemes: true,
    upvotesOnYourComments: true,
    openPostsInNewTab: true,
    defaultToMarkdown: false,
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
          message={setting.description}
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
        Feed Settings
      </h3>
      {renderSection(feedSettings.contentPreferences, 'Content Preferences')}
      {renderSection(feedSettings.postPreferences, 'Post Preferences')}
    </div>
  );
}

export default Feed;
