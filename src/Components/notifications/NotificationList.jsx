import { useState, useEffect } from 'react';
import NotificationItem from './NotificationItem';
import { Link, useNavigate } from 'react-router-dom';
import { useNotifications} from './NotificationContext';
import { putRequest, getRequest } from '../../services/Requests';
import { baseUrl } from "../../constants";

/**
 * Component for displaying a list of notifications, handling different tabs and the ability to navigate to a detailed notifications page.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array} props.notifications - List of notification objects to display.
 * @param {boolean} props.isNewNotificationsPage - Indicates if this component is used on a page dedicated to notifications.
 * @param {Object} props.reference - React ref passed to the component for handling outside clicks or similar behaviors.
 * @returns {JSX.Element} A component that displays a list of notifications with interactive tabs and options.
 */
const NotificationList = ({ notifications, isNewNotificationsPage, reference, setIsOpenBellMenu }) => {
    const [activeTab, setActiveTab] = useState('Notifications');
    const [seeAllHovered, setSeeAllHovered] = useState(false);
    const { setNotifications, removeNotification } = useNotifications();
    const navigate = useNavigate();


    // Check window size and redirect if needed
    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            if (!isNewNotificationsPage && width < 450) { // Adjust 600px to your responsive design breakpoint
                setNotifications(notifications);
                setIsOpenBellMenu(false);
                navigate('/notifications');
            }
        }

        // Call once when the component mounts in case the window is already too small
        handleResize();

        // Set up the event listener for future window size changes
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isNewNotificationsPage, navigate]);
    
    /**
     * Handles the action to navigate to the full notifications page and sets the current notifications in context.
     */
    const handleSeeAllClick = () => {
        setNotifications(notifications);
        setIsOpenBellMenu(false);
        navigate('/notifications');
    };

    // Styling constants
    const seeAllBaseStyle = {
        backgroundColor: '#1a282d',
        color: 'white',
        padding: '8px 0',
        fontWeight: 'bold',
        borderRadius: '20px',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        width: 'calc(100% - 32px)',
        maxWidth: '100%',
        boxSizing: 'border-box',
        textDecoration: 'none'
    };

    const seeAllHoverStyle = {
        ...seeAllBaseStyle,
        backgroundColor: '#2e3d42',
        textDecoration: 'underline'
    };

    const now = new Date();

    /**
     * Parses date and time into a Date object.
     * 
     * @param {string} date - The date string.
     * @param {string} time - The time string.
     * @returns {Date} The combined date and time as a Date object.
     */
    const parseDateTime = (date, time) => {
        return new Date(`${date} ${time}`);
    };

    /**
     * Calculates the hour difference between the current time and the given date.
     * 
     * @param {Date} date - The date to compare with the current time.
     * @returns {number} The number of hours difference.
     */
    const getHourDifference = (date) => {
        const msPerHour = 1000 * 60 * 60;
        return Math.floor((now - date) / msPerHour);
    };

    // Organize notifications by today and earlier
    const todayNotifications = [];
    const earlierNotifications = [];

    const recentNotifications = isNewNotificationsPage ? notifications : notifications.slice(0, 3);

    recentNotifications.forEach(notification => {
        const notificationDate = parseDateTime(notification.date, notification.time);
        if (now - notificationDate < 24 * 60 * 60 * 1000) { // If within last 24 hours
            todayNotifications.push({
                ...notification,
                time: `${getHourDifference(notificationDate)}h`
            });
        } else {
            earlierNotifications.push(notification);
        }
    });

    const handleMarkAllAsRead = async () => {
        try {
            const response = await putRequest(`${baseUrl}/notification/mark-all-as-read`);
            if (response.status === 200 || response.status === 201) {
                // Update notifications state to set all as read
                const updatedNotifications = notifications.map(notification => ({
                    ...notification,
                    isRead: true
                }));
                setNotifications(updatedNotifications);
                
                console.log("All notifications marked as read:", response);
            } else {
                console.error("Error marking all notifications as read:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div
            ref={!isNewNotificationsPage ? reference : null}
            className={`${isNewNotificationsPage ? 'bg-reddit text-white text-sm pt-2.5 space-y-2 rounded-xl font-extralight flex flex-col items-center w-full h-full' : ' w-90 h-fit -right-0 shadow-lg  shadow-black top-11 z-10 bg-reddit_lightGreen absolute text-white text-sm pt-2.5 space-y-2 rounded-3xl font-extralight flex flex-col'}`}
            
        >
            {isNewNotificationsPage && (
                <div className='text-2xl font-bold w-full text-left ml-15 py-2'>
                    Notifications
                </div>
            )}

            <div className={`${isNewNotificationsPage ? 'flex justify-start w-full px-4 space-x-4' : 'flex justify-between w-full px-4 space-x-4'}`}>
                <div 
                    style={{ cursor: 'pointer', padding: '8px 16px', fontSize: '14px', fontWeight: 'bold', color: activeTab === 'Notifications' ? '#ffffff' : '#888888', borderBottom: activeTab === 'Notifications' ? '3px solid #3b82f6' : 'none' }}
                    onClick={() => setActiveTab('Notifications')}
                >
                    Notifications
                </div>

                <div 
                    style={{ cursor: 'pointer', padding: '8px 16px', fontSize: '14px', fontWeight: 'bold', color: activeTab === 'Messages' ? '#ffffff' : '#888888', borderBottom: activeTab === 'Messages' ? '3px solid #3b82f6' : 'none' }}
                    onClick={() => setActiveTab('Messages')}
                >
                    Messages
                </div>
            </div>

            <div className='w-full px-2 py-2 flex justify-between items-center'>
                {activeTab === 'Notifications' && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem', width: '100%' }}>
                            <span className='font-bold' style={{ fontSize: '0.85rem', color: '#777777', flexShrink: 0 }}>TODAY</span>
                            <span className='cursor-pointer font-bold' style={{ marginLeft: 'auto', flexShrink: 0 }} onClick={handleMarkAllAsRead}>Mark all as read</span>
                            <span className='border-l-2 h-6 mx-2' style={{ borderColor: '#444444', flexShrink: 0 }}></span>
                            <Link onClick={() => setIsOpenBellMenu(false)} id="notifications_settings" to="/settings/notifications">
                                <svg className="h-4 w-4 fill-current cursor-pointer" style={{ flexShrink: 0 }} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 20c-.401 0-.802-.027-1.2-.079a1.145 1.145 0 0 1-.992-1.137v-1.073a.97.97 0 0 0-.627-.878A.98.98 0 0 0 6.1 17l-.755.753a1.149 1.149 0 0 1-1.521.1 10.16 10.16 0 0 1-1.671-1.671 1.149 1.149 0 0 1 .1-1.523L3 13.906a.97.97 0 0 0 .176-1.069.98.98 0 0 0-.887-.649H1.216A1.145 1.145 0 0 1 .079 11.2a9.1 9.1 0 0 1 0-2.393 1.145 1.145 0 0 1 1.137-.992h1.073a.97.97 0 0 0 .878-.627A.979.979 0 0 0 3 6.1l-.754-.754a1.15 1.15 0 0 1-.1-1.522 10.16 10.16 0 0 1 1.673-1.676 1.155 1.155 0 0 1 1.522.1L6.1 3a.966.966 0 0 0 1.068.176.98.98 0 0 0 .649-.887V1.216A1.145 1.145 0 0 1 8.8.079a9.129 9.129 0 0 1 2.393 0 1.144 1.144 0 0 1 .991 1.137v1.073a.972.972 0 0 0 .628.878A.977.977 0 0 0 13.905 3l.754-.754a1.152 1.152 0 0 1 1.522-.1c.62.49 1.18 1.05 1.671 1.671a1.15 1.15 0 0 1-.1 1.522L17 6.1a.967.967 0 0 0-.176 1.068.98.98 0 0 0 .887.649h1.073a1.145 1.145 0 0 1 1.137.991 9.096 9.096 0 0 1 0 2.392 1.145 1.145 0 0 1-1.137.992h-1.073A1.041 1.041 0 0 0 17 13.905l.753.755a1.149 1.149 0 0 1 .1 1.521c-.49.62-1.05 1.18-1.671 1.671a1.149 1.149 0 0 1-1.522-.1L13.906 17a.97.97 0 0 0-1.069-.176.981.981 0 0 0-.65.887v1.073a1.144 1.144 0 0 1-.99 1.137A9.431 9.431 0 0 1 10 20Zm-.938-1.307a7.638 7.638 0 0 0 1.875 0v-.982a2.292 2.292 0 0 1 3.853-1.6l.693.694a8.796 8.796 0 0 0 1.326-1.326l-.694-.694a2.29 2.29 0 0 1 1.6-3.851h.982a7.746 7.746 0 0 0 0-1.876h-.982a2.213 2.213 0 0 1-2.034-1.4 2.223 2.223 0 0 1 .438-2.451l.694-.693a8.76 8.76 0 0 0-1.327-1.326l-.692.694a2.22 2.22 0 0 1-2.434.445 2.221 2.221 0 0 1-1.419-2.041v-.979a7.638 7.638 0 0 0-1.875 0v.982a2.213 2.213 0 0 1-1.4 2.034 2.23 2.23 0 0 1-2.456-.438l-.693-.694a8.757 8.757 0 0 0-1.326 1.327l.694.692a2.216 2.216 0 0 1 .445 2.434 2.22 2.22 0 0 1-2.041 1.418h-.982a7.746 7.746 0 0 0 0 1.876h.982a2.213 2.213 0 0 1 2.034 1.4 2.223 2.223 0 0 1-.438 2.451l-.694.693c.394.488.838.933 1.326 1.326l.694-.694a2.218 2.218 0 0 1 2.433-.445 2.22 2.22 0 0 1 1.418 2.041v.983ZM10 13.229a3.23 3.23 0 1 1 0-6.458 3.23 3.23 0 0 1 0 6.458Zm0-5.208a1.979 1.979 0 1 0 0 3.958 1.979 1.979 0 0 0 0-3.958Z"></path>
                                </svg>
                            </Link>
                        </div>
                        {todayNotifications.map(notification => (
                            <NotificationItem
                                key={notification.key} 
                                notificationKey={notification.key}
                                title={notification.title}
                                description={notification.description}
                                date={notification.time} 
                                image={notification.image}
                                onRemove={removeNotification}
                                isNewNotificationsPage={isNewNotificationsPage}
                                isRead={notification.isRead}
                            />
                        ))}
                        {earlierNotifications.length > 0 && (
                            <>
                                <div style={{ flexShrink: 0 }}>
                                    <span className='font-bold' style={{ fontSize: '0.85rem', color: '#777777' }}>EARLIER</span>
                                </div>
                                {earlierNotifications.map(notification => (
                                    <NotificationItem
                                        key={notification.key} 
                                        notificationKey={notification.key}
                                        title={notification.title}
                                        description={notification.description}
                                        date={notification.date} 
                                        image={notification.image}
                                        onRemove={removeNotification}
                                        isNewNotificationsPage={isNewNotificationsPage}
                                        isRead={notification.isRead}
                                    />
                                ))}
                            </>
                        )}
                        {!isNewNotificationsPage && (
                            <>
                                <div style={{ width: '100%', height: '1px', backgroundColor: '#555555' }}></div>
                                <div onClick={handleSeeAllClick} style={{ width: '100%', textAlign: 'center', padding: '12px 0' }}>
                                    <button style={seeAllHovered ? seeAllHoverStyle : seeAllBaseStyle} onMouseEnter={() => setSeeAllHovered(true)} onMouseLeave={() => setSeeAllHovered(false)}>
                                        See All
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {activeTab === 'Messages' && (
                    <div style={{ width: '100%' }}>Messages Opened!</div>
                )}
            </div>
        </div>
    );
};

export default NotificationList;
