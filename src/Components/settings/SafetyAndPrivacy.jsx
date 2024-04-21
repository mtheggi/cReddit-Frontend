import Setting from "./Setting";
import Subtitle from "./components/Subtitle";
import FloatingInput from "./components/FloatingInput";
import BlockedEntity from "./components/BlockedEntity";
import { useState } from "react";
import { notify } from "./components/CustomToast";
import { unblockCommunity, unblockUser } from "./utils/Unblock";
import { blockCommunity, blockUser } from "./utils/Block";
/**
 * SafetyAndPrivacy is a React component that displays the safety and privacy settings for the user.
 * It allows the user to block and unblock users and communities.
 *
 * @component
 * @param {Object} props - The props for the SafetyAndPrivacy component.
 * @param {Object[]} props.blockedUsers - The users that the current user has blocked.
 * @param {Object[]} props.mutedCommunities - The communities that the current user has muted.
 * @param {Function} props.setUserSettings - A function to update the user settings.
 */
function SafetyAndPrivacy({ blockedUsers, mutedCommunities, setUserSettings }) {
  /**
  * State variable for the current blocked users. Initially set to the blockedUsers prop.
  * @type {Object[]}
  */
  const [currBlockedUsers, setCurrBlockedUsers] = useState(blockedUsers);
  /**
   * State variable for the current blocked communities. Initially set to the mutedCommunities prop.
   * @type {Object[]}
   */
  const [currBlockedCommunities, setCurrBlockedCommunities] =
    useState(mutedCommunities);
  /**
  * Unblocks a user.
  * Calls the unblockUser utility function and updates the currBlockedUsers state variable.
  * @async
  * @param {string} username - The username of the user to unblock.
  * @returns {Promise<void>}
  * @resolves {void}
  * @rejects {void}
  * @notify {string} "Changes saved" - If the changes are saved successfully.
  * @notify {string} "Failed to save changes" - If the changes are not saved successfully.
  */
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
  /**
  * Unmutes a community.
  * Calls the unblockCommunity utility function and updates the currBlockedCommunities state variable.
  * @async
  * @param {string} communityName - The name of the community to unmute.
  * @returns {Promise<void>}
  * @resolves {void}
  * @rejects {void}
  * @notify {string} "Changes saved" - If the changes are saved successfully.
  * @notify {string} "Failed to save changes" - If the changes are not saved successfully.
  */
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
  /**
 * Mutes a community.
 * Calls the blockCommunity utility function and updates the currBlockedCommunities state variable.
 * @async
 * @param {string} communityName - The name of the community to mute.
 * @returns {Promise<void>}
 * @resolves {void}
 * @rejects {void}
 * @notify {string} "Changes saved" - If the changes are saved successfully.
 * @notify {string} "Failed to save changes" - If the changes are not saved successfully.
 * */
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
