import React, { createContext, useContext, useState, useEffect} from 'react';

const NotificationContext = createContext();

/**
 * Custom hook to access notification-related context.
 * 
 * @returns {Object} The context object containing notification-related data and methods.
 */
export const useNotifications = () => useContext(NotificationContext);

/**
 * Provides a context for managing notifications within a React application.
 * Manages the state and behaviors associated with notifications, such as
 * displaying, adding, and removing notifications.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components that can access the notification context.
 * @returns {JSX.Element} A Provider component that wraps child components to provide them access to notification context.
 */
export const NotificationProvider = ({ children }) => {
    const [isNotificationListVisible, setIsNotificationListVisible] = useState(false);
    const [notifications, setNotifications] = useState(() => {
        const savedNotifications = localStorage.getItem('notifications');
        return savedNotifications ? JSON.parse(savedNotifications) : [];
    });

    /**
     * Effect hook to store notifications in local storage whenever
     * the notifications state changes.
     */
    useEffect(() => {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }, [notifications]);

    /**
     * Removes a notification from the list.
     * 
     * @param {string} id - The unique identifier of the notification to be removed.
     */
    const removeNotification = (id) => {
        setNotifications(currentNotifications =>
            currentNotifications.filter(notification => notification.key !== id)
        );
    };

    /**
     * Shows the notification list by setting its visibility state to true.
     */
    const showNotificationList = () => {
        setIsNotificationListVisible(true);
    };

    /**
     * Hides the notification list by setting its visibility state to false.
     */
    const hideNotificationList = () => {
        setIsNotificationListVisible(false);
    };

    /**
     * Replaces the current notifications with new ones.
     * 
     * @param {Array} newNotifications - The new list of notifications to replace the old one.
     */
    const flushAndAddNotifications = (newNotifications) => {
        setNotifications(newNotifications);
    };

    return (
        <NotificationContext.Provider value={{ isNotificationListVisible, showNotificationList, hideNotificationList, notifications, setNotifications, flushAndAddNotifications, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};
