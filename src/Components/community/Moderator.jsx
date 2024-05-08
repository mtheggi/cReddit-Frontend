import { Link } from "react-router-dom";

/**
 * Moderator component displays the moderators of a community.
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.id - The unique identifier for the moderator.
 * @param {string} props.href - The href of the moderator.
 * @param {string} props.text - The text of the moderator.
 * @param {JSX.Element} props.children - The children of the moderator.
 * @returns {JSX.Element} - The rendered Moderator component.
 */
function Moderator({ id, href, text, children }) {
  return (
    <Link
      id={id}
      className={`w-full text-sm items-center flex flex-row justify-start rounded-lg pl-3.5 pr-3"
      }`}
      to={href}
    >
      <span className="items-center ">{children}</span>
      <div className="flex flex-col justify-start w-full">
        <span className={`text-gray-400 font-bold font-plex text-sm ml-3 `}>
          {text}
        </span>
        <span className={`text-gray-400 font-plex text-xs ml-3 `}>
          profile description
        </span>
      </div>
    </Link>
  );
}

export default Moderator;
