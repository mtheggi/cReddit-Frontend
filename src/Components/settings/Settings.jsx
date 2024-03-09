import { useState } from 'react'

const Tabs = ["Account", "Profile", "Safety & Privacy", "Feed Settings", "Notifications", "Emails", "Subscriptions", "Chat & Messaging"]

function Settings() {
    const [currTab, setCurrTab] = useState(0);

    function onSetTab(i) {
        setCurrTab(i)
    }

    return (
        <>
            <div className="flex flex-row w-full mt-10 2 xl:ml-15% xs:ml-10"> 
                {Tabs.map((tab, i) => { 
                    return (
                        <a key={i} id={`setting-tab-${i}`} className={`text-white text-sm font-bold font-plex pl-5 pr-5 pb-3 ${i == currTab ? "border-b-3 border-white" : ""}`} onClick={() => onSetTab(i)}>{tab}</a>
                    )
                })}
            </div>
            <hr className=" border-gray-500 mt-0 xl:ml-15% xs:ml-10 w-100% max-w-6xl " />   
        </>
    )
}
export default Settings
