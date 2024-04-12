import { useState } from 'react';
import NotificationItem from './NotificationItem';
import { Link, useNavigate } from 'react-router-dom';
import { useNotifications } from './NotificationContext';

const NotificationList = ({ notifications, isNewNotificationsPage, reference }) => {
    const [activeTab, setActiveTab] = useState('Notifications');
    const [seeAllHovered, setSeeAllHovered] = useState(false);
    const navigate = useNavigate();
    const { setNotifications } = useNotifications();

    const handleSeeAllClick = () => {
        setNotifications(notifications);
        navigate('/notifications');
    };

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

    const parseDateTime = (date, time) => {
        return new Date(`${date} ${time}`);
    };

    const getHourDifference = (date) => {
        const msPerHour = 1000 * 60 * 60;
        return Math.floor((now - date) / msPerHour);
    };

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

    return (
        <div
            ref={!isNewNotificationsPage ? reference : null}
            className={`${isNewNotificationsPage ? 'bg-reddit text-white text-sm pt-2.5 space-y-2 rounded-xl font-extralight flex flex-col items-center w-full h-full' : 'absolute right-0 bg-reddit_lightGreen text-white text-sm pt-2.5 space-y-2 rounded-xl font-extralight flex flex-col items-center'}`}
            style={!isNewNotificationsPage ? { right: '70px', top: '4rem', width: '360px' } : null}
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

            <div className='w-full px-4 py-2 flex justify-between items-center'>
                {activeTab === 'Notifications' && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem', width: '100%' }}>
                            <span className='font-bold' style={{ fontSize: '0.85rem', color: '#777777', flexShrink: 0 }}>TODAY</span>
                            <span className='cursor-pointer font-bold' style={{ marginLeft: 'auto', flexShrink: 0 }} onClick={() => {/* Functionality will go here */}}>Mark all as read</span>
                            <span className='border-l-2 h-6 mx-2' style={{ borderColor: '#444444', flexShrink: 0 }}></span>
                            <Link onClick={() => setIsOpenBellMenu(false)} id="notifications_settings" to="/settings">
                                <svg className="h-4 w-4 fill-current cursor-pointer" style={{ flexShrink: 0 }} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    {/* SVG path */}
                                </svg>
                            </Link>
                        </div>
                        {todayNotifications.map(({ key, title, description, date, time, image }) => (
                            <NotificationItem key={key} title={title} description={description} date={time} image={image} />
                        ))}
                        {earlierNotifications.length > 0 && (
                            <>
                                <div style={{ flexShrink: 0 }}>
                                    <span className='font-bold' style={{ fontSize: '0.85rem', color: '#777777' }}>EARLIER</span>
                                </div>
                                {earlierNotifications.map(({ key, title, description, date, time, image }) => (
                                    <NotificationItem key={key} title={title} description={description} date={date} image={image} />
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
