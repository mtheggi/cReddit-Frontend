import { Link } from 'react-router-dom';
import { HomeIcon } from "@heroicons/react/24/solid";
import "./Nav-Icons.css";
const NavIcon = ({ href, children, text, id }) => {
    return (
        <Link id={id}
            className="h-10 w-full SideIcon-Container text-sm font-light items-center flex flex-row my-1 relative justify-start content-center rounded-lg px-4 py-2"
            to={href}>
            <span className="items-center">
                {/* <HomeIcon className="h-6 w-6 mr-2  text-gray-50" /> */}
                {children}
            </span>
            <span className="text-gray-50 ml-1">{text}</span>

        </Link>


    );
}

export default NavIcon;