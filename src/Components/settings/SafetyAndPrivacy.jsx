import React, { useState } from 'react';
import Subtitle from "./Subtitle";
import Setting from "./Setting";


function SafetyAndPrivacy() {
  // State Management Logic
  const [searchResults, setSearchResults] = useState(false);
  const [personalizedAds, setPersonalizedAds] = useState(false);

  // States
  const [sensitiveAdsSettings, setSensitiveAdsSettings] = useState({
    alcohol: false,
    dating: false,
    gambling: false,
    pregnancy: false,
    weightLoss: false
  });

  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  // Helper
  const handleToggle = (category) => {
    setSensitiveAdsSettings(prevSettings => ({
      ...prevSettings,
      [category]: !prevSettings[category]
    }));
  };

  return (
    <div className="flex flex-col w-full">
      <h3 className="text-white text-xl font-bold font-plex">
        Safety & Privacy
      </h3>

      <Subtitle title="PRIVACY" />
      
      <Setting
        title="Show up in search results"
        message="Allow search engines like Google to link to your profile in their search results."
        toggleButton={true}
        toggleState={searchResults}
        onToggle={() => setSearchResults(!searchResults)}
      />

      <Setting
        title="Personalize ads on Reddit based on information and activity from our partners."
        message="Allow us to use information from our partners to show you better ads on Reddit."
        toggleButton={true}
        toggleState={personalizedAds}
        onToggle={() => setPersonalizedAds(!personalizedAds)}
      />

      <Subtitle title="SENSITIVE ADVERTISING CATEGORIES" />

      {Object.keys(sensitiveAdsSettings).map((category) => (
        <Setting
          key={category}
          title={category.charAt(0).toUpperCase() + category.slice(1)}
          toggleButton={true}
          toggleState={sensitiveAdsSettings[category]}
          onToggle={() => handleToggle(category)}
        />
      ))}

      <Subtitle title="ADVANCED SECURITY" />
      <Setting
        title="Use two-factor authentication"
        message="Help protect your account by requiring a verification code and a password to log in."
        toggleButton={true}
        toggleState={twoFactorAuth}
        onToggle={() => setTwoFactorAuth(!twoFactorAuth)}
      />
    </div>
  );
};

export default SafetyAndPrivacy;
