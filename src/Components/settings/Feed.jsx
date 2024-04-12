import React, { useState } from "react";
import Setting from "./Setting";
import Subtitle from "./components/Subtitle";

function Feed({showAdultContent, autoPlayMedia, communityThemes, communityContentSort, globalContentView, openNewTab, setUserSettings}) {

  return (
    <div className="flex flex-col w-full">
      <h3 className="text-white -mb-3 text-xl font-bold font-plex">
        Feed Settings
      </h3>
      <Subtitle title = "Content Preferences" />

      <Setting
          title = "Show mature (18+) content"
          message = "See NSFW (Not Safe for Work) mature and adult images, videos, written content, and other media in your Reddit feeds and search results."
          clickableID = "settings-feed-show-mature-content-toggle-button"
          settingName = "showAdultContent"
          pageName = "feedSettings"
          setUserSettings = {setUserSettings}
          toggleButton = {true}
          isToggled = {showAdultContent}
      />

      <Setting
          title = "Autoplay media"
          message = "Play videos and gifs automatically when in the viewport."
          clickableID = "settings-feed-autoplay-media-toggle-button"
          settingName = "autoPlayMedia"
          pageName = "feedSettings"
          setUserSettings = {setUserSettings}
          toggleButton = {true}
          isToggled = {autoPlayMedia}
      />

      <Setting
          title = "Community themes"
          message = "Use custom themes for all communities. You can also turn this off on a per community basis."
          clickableID = "settings-feed-community-themes-toggle-button"
          settingName = "communityThemes"
          pageName = "feedSettings"
          setUserSettings = {setUserSettings}
          toggleButton = {true}
          isToggled = {communityThemes}
      />

      <Setting
        title = "Community content sort"
        message = "Choose how you would like content organized in communities you visit. This will not affect global feeds such as Home, or Popular."
        clickableID = "settings-feed-community-content-sort-dropdown"
        settingName = "communityContentSort"
        pageName = "feedSettings"
        setUserSettings = {setUserSettings}
        menuItems={[
          { name: "hot" },
          { name: "new" },
          { name: "top" },
          { name: "rising" },
        ]}
        selectedItem={communityContentSort}
      />

      <Setting
        title = "Global Content View"
        message = "Choose how you would like content displayed in feeds. This control is also found above your feed."
        clickableID = "settings-feed-global-content-view-dropdown"
        settingName = "globalContentView"
        pageName = "feedSettings"
        setUserSettings = {setUserSettings}
        menuItems = {[{ name: "card" }, { name: "classic" }]}
        selectedItem={globalContentView}
      />

      <Setting
        title = "Open posts in new tab"
        message = "Enable to always open posts in a new tab."
        clickableID = "settings-feed-open-posts-in-new-tab-toggle-button"
        settingName = "openNewTab"
        pageName = "feedSettings"
        setUserSettings = {setUserSettings}
        toggleButton = {true}
        isToggled = {openNewTab}
      />
    </div>
  );
}

export default Feed;


/* ID Documentation */
// settings-feed-show-mature-content-toggle-button: Toggle Button for showing mature content
// settings-feed-autoplay-media-toggle-button: Toggle Button for autoplaying media
// settings-feed-community-themes-toggle-button: Toggle Button for community themes
// settings-feed-community-content-sort-dropdown: Dropdown List for community content sort method
// settings-feed-global-content-view-dropdown: Dropdown List for global content view
// settings-feed-open-posts-in-new-tab-toggle-button: Toggle Button for opening posts in new tabs