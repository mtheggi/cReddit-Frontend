import Setting from "./Setting";
import Subtitle from "./components/Subtitle";
import FloatingInput from "./components/FloatingInput";
import BlockedEntity from "./components/BlockedEntity";
import { useState } from "react";
import { notify } from "./components/CustomToast";
import { unblockCommunity, unblockUser } from "./utils/Unblock";
import { blockCommunity, blockUser } from "./utils/Block";

function SafetyAndPrivacy({ blockedUsers, mutedCommunities, setUserSettings }) {
  const [currBlockedUsers, setCurrBlockedUsers] = useState(blockedUsers);
  const [currBlockedCommunities, setCurrBlockedCommunities] =
    useState(mutedCommunities);

  async function onUnBlockUser(username) {
    const res = await unblockUser(username);
    if (res) {
      setCurrBlockedUsers((prev) => {
        return prev.filter((blockedUser) => blockedUser.username !== username);
      });
      notify("Changes saved");
    } else notify("Failed to save changes");
  }

  async function onBlockUser(username) {
    const res = await blockUser(username);
    if (res) {
      setCurrBlockedUsers((prev) => {
        return [{ username, blockTimestamp: Date.now() }, ...prev];
      });
      notify("Changes saved");
    } else notify("Failed to save changes");
  }

  async function onUnMuteCommunity(communityName) {
    const res = await unblockCommunity(communityName);
    if (res) {
      setCurrBlockedCommunities((prev) => {
        return prev.filter(
          (blockedCommunity) => blockedCommunity.communityName !== communityName
        );
      });
      notify("Changes saved");
    } else notify("Failed to save changes");
  }

  async function onMuteCommunity(communityName) {
    const res = await blockCommunity(communityName);
    if (res) {
      setCurrBlockedCommunities((prev) => {
        return [{ communityName, muteTimestamp: Date.now() }, ...prev];
      });
      notify("Changes saved");
    } else notify("Failed to save changes");
  }

  return (
    <div className="flex flex-col w-full">
      <h3 className="text-white text-xl font-bold font-plex">
        Safety & Privacy
      </h3>

      <h6 className="text-gray-600 text-xs font-bold font-plex mt-3 max-w-2xl">
        Manage how we use data to personalize your Reddit experience, and
        control how other redditors interact with you. To learn more, visit our
        Privacy & Security FAQs .
      </h6>

      <Subtitle title="SAFTEY" />
      <Setting
        title="People You’ve Blocked"
        message="Blocked people can’t send you chat requests or private messages."
      />

      <div className="  w-90% max-w-3xl h-fit flex flex-col">
        <FloatingInput
          id="safety-block-user-input"
          label="BLOCK NEW USER"
          buttonText="ADD"
          onSubmit={onBlockUser}
        />
        {currBlockedUsers &&
          currBlockedUsers.map((user) => (
            <BlockedEntity
              key={user.username}
              entityName={user.username}
              timestamp={user.blockTimestamp}
              onUnblock={() => onUnBlockUser(user.username)}
            />
          ))}
      </div>

      <Setting
        title="Communities You've Muted"
        message="Posts from muted communities won't show up in your feeds or recommendations."
      />

      <div className="  w-90% max-w-3xl h-fit flex flex-col">
        <FloatingInput
          id="safety-mute-community-input"
          label="MUTE NEW COMMUNITY"
          buttonText="ADD"
          onSubmit={onMuteCommunity}
        />
        {currBlockedCommunities &&
          currBlockedCommunities.map((community) => (
            console.log(currBlockedCommunities),
            <BlockedEntity
             key={community.communityName}
              entityName={community.communityName}
              onUnblock={() => onUnMuteCommunity(community.communityName)}
            />
          ))}
      </div>
    </div>
  );
}

export default SafetyAndPrivacy;

/* ID Documentation */

// safety-block-user-input: Input to block new user
// safety-mute-community-input: Input to mute new community
