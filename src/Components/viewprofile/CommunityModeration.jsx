const CommunityModeration = ({ name, icon, members }) => {
  return (
    <li className="relative list-none mt-0 -mx-[1rem]">
      <a className="flex justify-between relative px-[1rem] gap-[0.5rem] text-secondary hover:text-gray-500 active:bg-gray-300 hover:no-underline py-[2px] -outline-offset-1 no-underline">
        <span className="flex items-center gap-[4px] min-w-0 shrink justify-between">
          <span className="flex shrink-0 items-center justify-center h-[20px] w-[20px] text-[20px] leading-4 mx-[10px]">
            <img src={icon} alt={name} className="w-[20px] h-[20px]" />
          </span>

          <span className="flex flex-col justify-center min-w-0 shrink py-[6px]">
            <span className="text-[14px]">r/{name}</span>
            <span className="text-[12px] text-gray-300">
              {members} {members === 1 ? "member" : "members"}
            </span>
          </span>
        </span>
      </a>
    </li>
  );
};

export default CommunityModeration;
