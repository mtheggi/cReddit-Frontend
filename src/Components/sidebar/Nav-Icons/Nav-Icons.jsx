import { Link } from 'react-router-dom';
import { HomeIcon } from "@heroicons/react/24/solid";
import "./Nav-Icons.css";
const NavIcon = ({ href, children, text, id }) => {
    const isSidebarRecent = id.startsWith('sidebar_recent');
  
    return (
        <Link id={id}
            className={`w-full SideIcon-Container text-sm font-extralight  items-center flex flex-row my-1 relative justify-start content-center align-baseline rounded-lg pl-3.5 pr-3 ${isSidebarRecent ? 'h-[46px]' : 'h-10'}`}
            to={href}>
            <span className="items-center ">
                {children}
            </span>
            <span className={`text-gray-100 tracking-wider letter ${isSidebarRecent ? 'text-[12.5px]' : 'text-[13.5px]'}  ml-3 `}>{text}</span>
        </Link>
    );
}

export default NavIcon;