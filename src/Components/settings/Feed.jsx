import React, { useState } from "react";
import Setting from "./Setting";
import Subtitle from "./components/Subtitle";

function Feed({showAdultContent, autoPlayMedia, communityThemes, communityContentSort, globalContentView, openNewTab}) {
  const [toggles, setToggles] = useState({
    showMatureContent: showAdultContent,
    autoplayMedia: autoPlayMedia,
    communityThemes: communityThemes,
    openPostsInNewTab: openNewTab,
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
        Feed Settings
      </h3>
      <Subtitle title = "Content Preferences" />
      
      <Setting
          id = "settings-feed-category-show-mature-content-toggle-button"
          key = "showMatureContent"
          title = "Show mature (18+) content"
          message = "See NSFW (Not Safe for Work) mature and adult images, videos, written content, and other media in your Reddit feeds and search results."
          toggleButton = {true}
          isToggled = {toggles["showMatureContent"]}
          toggleButtonOnClick = {() => handleToggle("showMatureContent")}
      />

      <Setting
          id = "settings-feed-category-autoplay-media-toggle-button"
          key = "autoplayMedia"
          title = "Autoplay media"
          message = "Play videos and gifs automatically when in the viewport."
          toggleButton = {true}
          isToggled = {toggles["autoplayMedia"]}
          toggleButtonOnClick = {() => handleToggle("autoplayMedia")}
      />

      <Setting
          id = "settings-feed-category-community-themes-toggle-button"
          key = "communityThemes"
          title = "Community themes"
          message = "Use custom themes for all communities. You can also turn this off on a per community basis."
          toggleButton = {true}
          isToggled = {toggles["communityThemes"]}
          toggleButtonOnClick = {() => handleToggle("communityThemes")}
      />

      <Setting
        id = "settings-feed-category-community-content-sort-dropdown"
        title = "Community content sort"
        message = "Choose how you would like content organized in communities you visit. This will not affect global feeds such as Home, or Popular."
        menuItems={[
          { name: "Hot" },
          { name: "New" },
          { name: "Top" },
          { name: "Rising" },
        ]}
        selectedItem={communityContentSort}
      />

      <Setting
        id = "settings-feed-category-global-content-view-dropdown"
        title = "Global Content View"
        message = "Choose how you would like content displayed in feeds. This control is also found above your feed."
        menuItems = {[{ name: "Card" }, { name: "Classic" }, { name: "Compact" }]}
        selectedItem={globalContentView}
      />

      <Setting
        id = "settings-feed-category-open-posts-in-new-tab-toggle-button"
        key = "openPostsInNewTab"
        title = "Open posts in new tab"
        message = "Enable to always open posts in a new tab."
        toggleButton = {true}
        isToggled = {toggles["openPostsInNewTab"]}
        toggleButtonOnClick = {() => handleToggle("openPostsInNewTab")}
      />
    </div>
  );
}

export default Feed;


/* ID Documentation */
// settings-feed-category-show-mature-content-toggle-button: Toggle Button for showing mature content
// settings-feed-category-autoplay-media-toggle-button: Toggle Button for autoplaying media
// settings-feed-category-community-themes-toggle-button: Toggle Button for community themes
// settings-feed-category-community-content-sort-dropdown: Dropdown List for community content sort method
// settings-feed-category-global-content-view-dropdown: Dropdown List for global content view
// settings-feed-category-open-posts-in-new-tab-toggle-button: Toggle Button for opening posts in new tabs