import React, { useState } from 'react';
import Setting from './Setting';
import Subtitle from './Subtitle'

const emailSettings = {
  messages: [
    { id: 'chatRequests', title: 'Chat requests' },
  ],
  activity: [
    { id: 'newFollowers', title: 'New followers' },
    ],
  finalEmail: [
    { id: 'unsubscribeFromAllEmails', title: 'Unsubscribe from all emails', initialValue: false },
  ],
};

function Emails() {
  
  const [toggles, setToggles] = useState({
    chatRequests: true,
    newFollowers: true,
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
      <h3 className="text-white text-xl -mb-3 font-bold font-plex">
        Manage Emails
      </h3>
      {renderSection(emailSettings.messages, 'Messages')}
      {renderSection(emailSettings.activity, 'Activity')}
      {renderSection(emailSettings.finalEmail, '')}
    </div>
  );
}

export default Emails;
