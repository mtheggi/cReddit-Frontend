import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [isNotificationListVisible, setIsNotificationListVisible] = useState(false);
    const [notifications, setNotifications] = useState(() => {
        const savedNotifications = localStorage.getItem('notifications');
        return savedNotifications ? JSON.parse(savedNotifications) : [];
    });

    useEffect(() => {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }, [notifications]);

    const addNotification = (notification) => {
        setNotifications(prev => [notification, ...prev]);
    };

    const removeNotification = (id) => {
        setNotifications(currentNotifications =>
            currentNotifications.filter(notification => notification.key !== id)
        );
    };

    const showNotificationList = () => {
        setIsNotificationListVisible(true);
    };

    const hideNotificationList = () => {
        setIsNotificationListVisible(false);
    };

    const flushAndAddNotifications = (newNotifications) => {
        setNotifications(newNotifications);
    };

    return (
        <NotificationContext.Provider value={{
            isNotificationListVisible,
            showNotificationList,
            hideNotificationList,
            notifications,
            setNotifications,
            addNotification,
            flushAndAddNotifications,
            removeNotification
        }}>
            {children}
        </NotificationContext.Provider>
    );
};
