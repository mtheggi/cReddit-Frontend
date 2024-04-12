import { useState, useEffect, useRef } from 'react';
import NotificationItem from './NotificationItem'
import { Link } from 'react-router-dom';

const NotificationList = ({ notifications }) => {
    const [activeTab, setActiveTab] = useState('Notifications');

    return (
        <div className='bg-reddit text-white text-sm pt-2.5 space-y-2 rounded-xl font-extralight flex flex-col items-center w-full h-full'>
            <div className='text-2xl font-bold w-full text-left ml-15 py-2'>
                Notifications
            </div>

            <div className='flex justify-start w-full px-4 space-x-4'> 
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
                            <span className='cursor-pointer font-bold' style={{ marginLeft: 'auto', flexShrink: 0 }} onClick={() => {/* Functionality will go here*/}}>Mark all as read</span>
                            <span className='border-l-2 h-6 mx-2' style={{ borderColor: '#444444', flexShrink: 0 }}></span>
                            <Link onClick={() => setIsOpenBellMenu(false)} id="notifications_settings" to="/settings">
                                <svg className="h-4 w-4 fill-current cursor-pointer" style={{ flexShrink: 0 }} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 20c-.401 0-.802-.027-1.2-.079a1.145 1.145 0 0 1-.992-1.137v-1.073a.97.97 0 0 0-.627-.878A.98.98 0 0 0 6.1 17l-.755.753a1.149 1.149 0 0 1-1.521.1 10.16 10.16 0 0 1-1.671-1.671 1.149 1.149 0 0 1 .1-1.523L3 13.906a.97.97 0 0 0 .176-1.069.98.98 0 0 0-.887-.649H1.216A1.145 1.145 0 0 1 .079 11.2a9.1 9.1 0 0 1 0-2.393 1.145 1.145 0 0 1 1.137-.992h1.073a.97.97 0 0 0 .878-.627A.979.979 0 0 0 3 6.1l-.754-.754a1.15 1.15 0 0 1-.1-1.522 10.16 10.16 0 0 1 1.673-1.676 1.155 1.155 0 0 1 1.522.1L6.1 3a.966.966 0 0 0 1.068.176.98.98 0 0 0 .649-.887V1.216A1.145 1.145 0 0 1 8.8.079a9.129 9.129 0 0 1 2.393 0 1.144 1.144 0 0 1 .991 1.137v1.073a.972.972 0 0 0 .628.878A.977.977 0 0 0 13.905 3l.754-.754a1.152 1.152 0 0 1 1.522-.1c.62.49 1.18 1.05 1.671 1.671a1.15 1.15 0 0 1-.1 1.522L17 6.1a.967.967 0 0 0-.176 1.068.98.98 0 0 0 .887.649h1.073a1.145 1.145 0 0 1 1.137.991 9.096 9.096 0 0 1 0 2.392 1.145 1.145 0 0 1-1.137.992h-1.073A1.041 1.041 0 0 0 17 13.905l.753.755a1.149 1.149 0 0 1 .1 1.521c-.49.62-1.05 1.18-1.671 1.671a1.149 1.149 0 0 1-1.522-.1L13.906 17a.97.97 0 0 0-1.069-.176.981.981 0 0 0-.65.887v1.073a1.144 1.144 0 0 1-.99 1.137A9.431 9.431 0 0 1 10 20Zm-.938-1.307a7.638 7.638 0 0 0 1.875 0v-.982a2.292 2.292 0 0 1 3.853-1.6l.693.694a8.796 8.796 0 0 0 1.326-1.326l-.694-.694a2.29 2.29 0 0 1 1.6-3.851h.982a7.746 7.746 0 0 0 0-1.876h-.982a2.213 2.213 0 0 1-2.034-1.4 2.223 2.223 0 0 1 .438-2.451l.694-.693a8.76 8.76 0 0 0-1.327-1.326l-.692.694a2.22 2.22 0 0 1-2.434.445 2.221 2.221 0 0 1-1.419-2.041v-.979a7.638 7.638 0 0 0-1.875 0v.982a2.213 2.213 0 0 1-1.4 2.034 2.23 2.23 0 0 1-2.456-.438l-.693-.694a8.757 8.757 0 0 0-1.326 1.327l.694.692a2.216 2.216 0 0 1 .445 2.434 2.22 2.22 0 0 1-2.041 1.418h-.982a7.746 7.746 0 0 0 0 1.876h.982a2.213 2.213 0 0 1 2.034 1.4 2.223 2.223 0 0 1-.438 2.451l-.694.693c.394.488.838.933 1.326 1.326l.694-.694a2.218 2.218 0 0 1 2.433-.445 2.22 2.22 0 0 1 1.418 2.041v.983ZM10 13.229a3.23 3.23 0 1 1 0-6.458 3.23 3.23 0 0 1 0 6.458Zm0-5.208a1.979 1.979 0 1 0 0 3.958 1.979 1.979 0 0 0 0-3.958Z"></path>
                                </svg>
                            </Link>
                        </div>
                        <div style={{ flexShrink: 0 }}>
                            <span className='font-bold' style={{ fontSize: '0.85rem', color: '#777777' }}>EARLIER</span>
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
