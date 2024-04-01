import React, { useState, useEffect, useRef } from 'react';

const NotificationItem = ({ title, date, description, image }) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    return (
        <div className="flex items-start justify-between p-2 cursor-pointer hover:bg-reddit_dark-brighter rounded-md">
            <div className="flex space-x-3 w-full">
                <div className="flex-shrink-0">
                    <img src={image} alt="Profile" className="h-8 w-8 rounded-full" />
                </div>
                <div className="flex-1">
                    <div className="flex flex-wrap items-center space-x-1">
                        <p className="text-xs font-medium text-white flex-1 min-w-0 break-words" style={{wordBreak: 'break-word'}}>
                            {title}
                            <span className="text-gray-400 mx-1">•</span>
                            <time className="text-xs text-gray-400" dateTime={date}>{date}</time>
                        </p>
                    </div>
                    <p className="text-xs text-gray-400" style={{overflowWrap: 'break-word'}}>{description}</p>
                </div>
            </div>
            <button onClick={toggleDropdown} className="ml-3 text-white hover:text-reddit_text hover:bg-gray-600 p-2 rounded-full">
                <svg width="20" height="5" fill="currentColor" viewBox="0 0 18 6" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scale(0.83)' }}> 
                    <circle cx="3" cy="3" r="1.5" />
                    <circle cx="9" cy="3" r="1.5" />
                    <circle cx="15" cy="3" r="1.5" />
                </svg>
            </button>
            {dropdownOpen && (
                <div ref={dropdownRef} className="absolute right-0 mt-4 py-2 w-48 bg-reddit_dark rounded-md shadow-xl z-50">
                    <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-500">Remove Notification</a>
                    <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-500">Don't get updates on this</a>
                </div>
            )}
        </div>
    );
};

export default NotificationItem;
