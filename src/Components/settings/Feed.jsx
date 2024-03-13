import React, { useState } from 'react';
import Setting from './Setting';
import Subtitle from './Subtitle'

const feedSettings = {
  contentPreferencesBeforeDropdown: [
    { id: 'showMatureContent', title: 'Show mature (18+) content', description: 'See NSFW (Not Safe for Work) mature and adult images, videos, written content, and other media in your Reddit feeds and search results.'},
    { id: 'autoplayMedia', title: 'Autoplay media', description: 'Play videos and gifs automatically when in the viewport.'},
    { id: 'communityThemes', title: 'Community themes', description: 'Use custom themes for all communities. You can also turn this off on a per community basis.'},
  ],
};

function Feed() {
  
  const [toggles, setToggles] = useState({
    showMatureContent: true,
    autoplayMedia: true,
    communityThemes: true,
    openPostsInNewTab: true,
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
      {renderSection(feedSettings.contentPreferencesBeforeDropdown, 'Content Preferences')}
      <Setting
        title="Community content sort"
        message="Choose how you would like content organized in communities you visit. This will not affect global feeds such as Home, or Popular."
        menuItems={[{ name: "Hot" }, { name: "New" }, { name: "Top" }, { name: "Rising"}]}
      />
      <Setting
        title="Global Content View"
        message="Choose how you would like content displayed in feeds. This control is also found above your feed."
        menuItems={[{ name: "Card" }, { name: "Classic" }, { name: "Compact" }]}
      />
      <Setting
          key='openPostsInNewTab'
          title='Open posts in new tab'
          message='Enable to always open posts in a new tab.'
          toggleButton={true}
          isToggled={toggles['openPostsInNewTab']}
          toggleButtonOnClick={() => handleToggle('openPostsInNewTab')}
        />

    </div>
  );
}

export default Feed;
