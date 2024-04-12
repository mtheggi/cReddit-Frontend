/**
 * React component representing a community item.
 * @param {Object} props - Component props.
 * @param {number} props.index - Index of the community item.
 * @param {string} props.name - Name of the community.
 * @param {string} props.icon - URL of the community icon.
 * @param {string} props.topic - Topic of the community.
 * @param {number} props.members - Number of members in the community.
 * @returns {JSX.Element} React component.
 */

const CommunityItem = ({ index, name, icon, topic, members }) => {
  return (
    <>
      <div
        id="Community-Item"
        className="flex flex-wrap justify-center py-[0.75rem] h-[76px] xs:border-t xs:border-gray-700 sm:border-none"
      >
        <h6 className="flex flex-col font-bold justify-center items-center text-[12px] w-[48px] m-0 truncate text-[#FFFFFF]">
          {index + 1}
        </h6>
        <span className="flex flex-col items-center justify-center px-[8px] w-[52px]">
          <div className="rounded-full m-0 select-none w-[36px] h-[36px]">
            <div className="w-[36px] h-[36px]">
              <img
                src={icon}
                srcSet=""
                sizes=""
                alt={`${name} icon`}
                className="rounded-full w-full h-full"
              ></img>
            </div>
          </div>
        </span>
        <div className="flex flex-col flex-grow items-start">
          <a className="m-0 font-bold text-[12px] truncate max-w-[11rem] text-[#F2F2F2]">
            r/{name}
          </a>
          <h6 className="flex-grow h-[20px] text-[12px] truncate py-[0.125rem] w-[11rem] m-0 text-[#F2F2F2]">
            {topic}
          </h6>
          <h6 className="text-[12px] m-0 truncate w-[11rem] text-[#82959B]">
            {members === 1 ? `${members} member` : `${members} members`}
          </h6>
        </div>
      </div>
    </>
  );
};

export default CommunityItem;
