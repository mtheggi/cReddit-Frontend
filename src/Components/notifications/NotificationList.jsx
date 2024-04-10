import { useState, useEffect, useRef } from 'react';
import NotificationItem from './NotificationItem'

const NotificationList = ({ notifications }) => {
    const [activeTab, setActiveTab] = useState('Notifications');
    const [seeAllHovered, setSeeAllHovered] = useState(false);

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

    return (
        <div className='bg-reddit_lightGreen text-white text-sm pt-2.5 space-y-2 rounded-xl font-extralight flex flex-col items-center w-full h-full'>
            <div className='flex justify-between w-full px-4'>
                <div 
                    style={{ cursor: 'pointer', padding: '16px', fontSize: '14px', fontWeight: 'bold', color: activeTab === 'Notifications' ? '#ffffff' : '#888888', borderBottom: activeTab === 'Notifications' ? '3px solid #3b82f6' : '' }}
                    onClick={() => setActiveTab('Notifications')}
                >
                    Notifications
                </div>

                <div 
                    style={{ cursor: 'pointer', padding: '16px', fontSize: '14px', fontWeight: 'bold', color: activeTab === 'Messages' ? '#ffffff' : '#888888', borderBottom: activeTab === 'Messages' ? '3px solid #3b82f6' : '' }}
                    onClick={() => setActiveTab('Messages')}
                >
                    Messages
                </div>
            </div>

            <div className='w-full px-4 py-2 flex justify-between items-center'>
                {activeTab === 'Notifications' && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%'}}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem', width: '100%' }}>
                            <span className='font-bold' style={{ fontSize: '0.75rem', color: '#777777', flexShrink: 0 }}>TODAY</span>
                            <span className='cursor-pointer font-bold' style={{ marginLeft: 'auto', flexShrink: 0 }} onClick={() => {/* Functionality will go here*/}}>Mark all as read</span>
                        </div>
                        <div style={{ flexShrink: 0 }}>
                            <span className='font-bold' style={{ fontSize: '0.75rem', color: '#777777' }}>EARLIER</span>
                        </div>
                            {
                                notifications.map(({ key, title, description, date, image }) => (
                                    <NotificationItem
                                    key={key}
                                    title={title}
                                    description={description}
                                    date={date}
                                    image={image}
                                    />
                                ))
                            }
                    </div>
                )}

                {activeTab === 'Messages' && (
                    <div style={{ width: '100%' }}>
                        Messages Opened!
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationList;
