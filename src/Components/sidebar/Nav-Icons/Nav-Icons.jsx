import { Link } from 'react-router-dom';
import { HomeIcon } from "@heroicons/react/24/solid";
import { useLocation } from 'react-router-dom';
import "./Nav-Icons.css";
/**
 * Renders a navigation icon with a link.
 *
 * @param {Object} props - The props object.
 * @param {string} props.href - The URL for the link.
 * @param {ReactNode} props.children - The content to be rendered inside the icon.
 * @param {string} props.text - The text to be displayed next to the icon.
 * @param {string} props.id - The unique identifier for the icon.
 * @returns {JSX.Element} The rendered navigation icon.
 */
const NavIcon = ({ href, children, text, id }) => {
    const isSidebarRecent = id.startsWith('sidebar_recent');
    const location = useLocation();
    const path= text=="Home"?"":text
    

    return (
        <Link id={id}
            className={`w-full ${isSidebarRecent?'mb-1':''}  ${location.pathname==`/${path.toLowerCase()}`?'bg-reddit_search':'SideIcon-Container'} text-sm font-extralight  items-center flex flex-row relative justify-start content-center align-baseline rounded-lg pl-3.5 pr-3 ${isSidebarRecent ? 'h-[46px]' : 'h-10 my-1'}`}
            to={href}>
            <span className="items-center ">
                {children}
            </span>
            <span className={`text-gray-200 tracking-wider font-normal letter ${isSidebarRecent ? 'text-[12.5px]' : 'text-[13.5px]'}  ml-3 `}>{text}</span>
        </Link>
    );
}

export default NavIcon;