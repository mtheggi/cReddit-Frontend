import React, { useState, useEffect, useRef } from 'react';

/**
 * NotificationItem component displays a single notification with an optional dropdown menu for additional actions.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.notificationKey - Unique key for the notification.
 * @param {string} props.title - Title of the notification.
 * @param {string} props.date - Date of the notification.
 * @param {string} props.description - Description of the notification.
 * @param {string} props.image - Image URL for the notification.
 * @param {function} props.onRemove - Callback function to handle the removal of the notification.
 * @param {boolean} props.isNewNotificationsPage - Indicates if the notification is being displayed on a new notifications page.
 * @returns {JSX.Element} A single notification item with interactive elements.
 */
const NotificationItem = ({ notificationKey, title, date, description, image, onRemove, isNewNotificationsPage, isRead }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = (event) => {
        event.stopPropagation();
        setDropdownOpen(!dropdownOpen);
    };
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    
    /**
     * Effect hook that adds event listener to handle click events outside the dropdown
     * to close it if it is open and the click is outside the dropdown area.
     */
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    /**
     * Truncates the description text to 100 characters if it is longer, appending ellipses.
     * 
     * @param {string} desc - The description text to potentially truncate.
     * @returns {string} The potentially truncated description.
     */
    const truncateDescription = (desc) => {
        if (desc.length <= 100) return desc;

        const truncateAt = desc.indexOf(' ', 100);
        if (truncateAt === -1) return desc;

        return desc.substring(0, truncateAt) + "...";
    };

    const textStyle = isNewNotificationsPage ? { fontSize: '100%' } : {};

    const titleSpacingStyle = isNewNotificationsPage ? { marginBottom: '6px' } : {}; 

    const itemStyle = isRead ? {} : { backgroundColor: '#343a40' };

    return (
        <div className="relative flex items-start justify-between py-2 px-1 cursor-pointer hover:bg-reddit_dark-brighter rounded-md w-full" style={itemStyle}>
            <div className="flex space-x-3 w-full">
                <div className="flex-shrink-0">
                    <img src={image} alt="Notification Image" className="h-8 w-8 rounded-full" />
                </div>
                <div className="flex-1">
                    <div className="flex flex-wrap items-center space-x-1">
                        <p className="text-xs font-medium text-white flex-1 min-w-0 break-words" style={{wordBreak: 'break-word', ...textStyle, ...titleSpacingStyle}}>
                            {title}
                            <span className="text-gray-400 mx-1">•</span>
                            <time className="text-xs text-gray-400" dateTime={date} style={textStyle}>{date}</time>
                        </p>
                    </div>
                    <p className="text-xs text-gray-400" style={{overflowWrap: 'break-word', ...textStyle}}>{truncateDescription(description)}</p>
                </div>
            </div>
            <button id="notification-item-dropdown-button" ref={buttonRef} onClick={toggleDropdown} className="ml-3 text-white hover:text-reddit_text hover:bg-gray-600 p-2 rounded-full">
                <svg width="20" height="5" fill="currentColor" viewBox="0 0 18 6" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scale(0.83)', ...textStyle }}>
                    <circle cx="3" cy="3" r="1.5" />
                    <circle cx="9" cy="3" r="1.5" />
                    <circle cx="15" cy="3" r="1.5" />
                </svg>
            </button>
            {dropdownOpen && (
                <div ref={dropdownRef} className="absolute right-0 mt-4 py-2 w-48 bg-reddit_dark rounded-md shadow-xl z-50">
                    <a id="notification-item-hide-notification-button" onClick={() => onRemove(notificationKey)} className="block px-4 py-2 text-sm text-white hover:bg-gray-500" style={textStyle}>Hide this notification</a>
                    <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-500" style={textStyle}>Don't get updates on this</a>
                </div>
            )}
        </div>
    );
};

export default NotificationItem;
