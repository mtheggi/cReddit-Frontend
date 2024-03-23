import Setting from "./Setting";
import Subtitle from "./components/Subtitle";
import FloatingInput from "./components/FloatingInput";
import BlockedEntity from "./components/BlockedEntity";

const blockedUsers = [
  {
    id: "1",
    username: "user1",
  },
  {
    id: "2",
    username: "user2",
  },
  {
    id: "3",
    username: "user3",
  },
  {
    id: "4",
    username: "user4",
  },
];

const blockedCommunities = [
  {
    id: "1",
    communityName: "community1",
  },
  {
    id: "2",
    communityName: "community2",
  },
  {
    id: "3",
    communityName: "community3",
  },
  {
    id: "4",
    communityName: "community4",
  },
];

function SafetyAndPrivacy() {
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
      <FloatingInput
        id="safety-block-user-input"
        label="BLOCK NEW USER"
        buttonText="ADD"
      />
      {blockedUsers.map((user) => (
        <BlockedEntity
          key={user.id}
          entityName={user.username}
          timestamp={Date.now() - 2 * 24 * 60 * 60 * 1000}
        />
      ))}

      <Setting
        title="Communities You've Muted"
        message="Posts from muted communities won't show up in your feeds or recommendations."
      />
      <FloatingInput
        id="safety-mute-community-input"
        label="MUTE NEW COMMUNITY"
        buttonText="ADD"
      />
      {blockedCommunities.map((community) => (
        <BlockedEntity
          key={community.id}
          entityName={community.communityName}
          timestamp={Date.now() - 2 * 24 * 60 * 60 * 1000}
        />
      ))}
    </div>
  );
}

export default SafetyAndPrivacy;

/* ID Documentation */

// safety-block-user-input: Input to block new user
// safety-mute-community-input: Input to mute new community
