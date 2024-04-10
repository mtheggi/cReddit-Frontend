import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [isNotificationListVisible, setIsNotificationListVisible] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const showNotificationList = () => {
        setIsNotificationListVisible(true);
    };

    const hideNotificationList = () => {
        setIsNotificationListVisible(false);
    };

    return (
        <NotificationContext.Provider value={{ isNotificationListVisible, showNotificationList, hideNotificationList, notifications, setNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};
