import { Link } from "react-router-dom";

function SimpleNavbar({ Tabs, TabsPath, currTab, onSetTab }) {
  return (
    <>
      <div className="flex flex-wrap w-full mt-2 max-w-6xl">
        {Tabs.map((tab, i) => {
          return (
            <Link
              key={tab}
              to={TabsPath[i]}
              id={`setting-navbar-${tab.toLowerCase()}-tab`}
              className={`text-white text-sm font-bold font-plex px-2 mx-4 pb-2 pt-3 ${
                i == currTab ? "border-b-3 border-white" : ""
              }`}
              onClick={() => onSetTab(i)}
            >
              <div className="cursor-pointer">{tab}</div>
            </Link>
          );
        })}
      </div>
      <hr className=" border-gray-500 mt-0 w-100% max-w-6xl " />
    </>
  );
}

export default SimpleNavbar;
