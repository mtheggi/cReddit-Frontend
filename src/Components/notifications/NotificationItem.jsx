import React, { useState, useEffect, useRef } from 'react';

const NotificationItem = ({ notificationKey, title, date, description, image, onRemove }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = (event) => {
        event.stopPropagation();
        setDropdownOpen(!dropdownOpen);
    };
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

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

    const truncateDescription = (desc) => {
        if (desc.length <= 100) return desc;

        const truncateAt = desc.indexOf(' ', 100);
        if (truncateAt === -1) return desc;

        return desc.substring(0, truncateAt) + "...";
    };

    return (
        <div className="relative flex items-start justify-between p-3 cursor-pointer hover:bg-reddit_dark-brighter rounded-md w-full">
            <div className="flex space-x-3 w-full">
                <div className="flex-shrink-0">
                    <img src={image} alt="Notification Image" className="h-8 w-8 rounded-full" />
                </div>
                <div className="flex-1">
                    <div className="flex flex-wrap items-center space-x-1">
                        <p className="text-xs font-medium text-white flex-1 min-w-0 break-words" style={{wordBreak: 'break-word'}}>
                            {title}
                            <span className="text-gray-400 mx-1">•</span>
                            <time className="text-xs text-gray-400" dateTime={date}>{date}</time>
                        </p>
                    </div>
                    <p className="text-xs text-gray-400" style={{overflowWrap: 'break-word'}}>{truncateDescription(description)}</p>
                </div>
            </div>
            <button ref={buttonRef} onClick={toggleDropdown} className="ml-3 text-white hover:text-reddit_text hover:bg-gray-600 p-2 rounded-full">
                <svg width="20" height="5" fill="currentColor" viewBox="0 0 18 6" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scale(0.83)' }}> 
                    <circle cx="3" cy="3" r="1.5" />
                    <circle cx="9" cy="3" r="1.5" />
                    <circle cx="15" cy="3" r="1.5" />
                </svg>
            </button>
            {dropdownOpen && (
                <div ref={dropdownRef} className="absolute right-0 mt-4 py-2 w-48 bg-reddit_dark rounded-md shadow-xl z-50">
                    <a href="#" onClick={() => onRemove(notificationKey)} className="block px-4 py-2 text-sm text-white hover:bg-gray-500">Hide this notification</a>
                    <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-500">Don't get updates on this</a>
                </div>
            )}
        </div>
    );
};

export default NotificationItem;