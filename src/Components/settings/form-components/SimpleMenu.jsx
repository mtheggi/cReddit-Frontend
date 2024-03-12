import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function SimpleMenu({ title, menuItems, onSelect }) {
  return (
    <NavDropdown
      title={title}
      menuVariant="dark"
      className="text-white text-sm font-bold font-plex bg-reddit_greenyDark"
    >
      {menuItems.map((item, i) => {
        return (
          <NavDropdown.Item
            key={i}
            className="text-md hover:bg-reddit_hover"
            onClick={() => onSelect(item.name)}
          >
            {item.name}
          </NavDropdown.Item>
        );
      })}
    </NavDropdown>
  );
}

export default SimpleMenu;
