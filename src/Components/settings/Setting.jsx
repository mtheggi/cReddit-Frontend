import { useState } from 'react'
import { Dropdown } from 'flowbite-react';
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from 'react-icons/hi';

function Setting({ title, message, toggleButton, regularButton, menuItems }) {
    const [isToggled, setIsToggled] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(menuItems ? menuItems[0].name : "");

    const toggleIcon = () => {
        setIsToggled(!isToggled);
    };

    return (
        <>
        <div className="flex flex-row max-w-3xl mb-2">
            <div className="flex flex-col w-full justify-center">
                <h4 className="text-white text-md font-plex mt-10">{title}</h4>
                <h6 className="text-gray-600 text-xs font-bold font-plex mt-1">{message}</h6>
            </div>

            {toggleButton &&
                <div className="flex flex-row justify-end w-full items-end pb-1 pr-1">
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer"></input>
                    <div class="relative w-10 h-6 bg-gray-800 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-3/4 rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
                </div>
            }

            {regularButton &&
                <div className="flex flex-row justify-end w-full items-end pb-1 pr-1">
                    <button className="w-22 text-white text-sm font-bold font-plex bg-reddit_darkGray p-2 rounded-3xl border border-reddit_darkGray hover:bg-gray-800 hover:border-white">{regularButton}</button>
                </div>
            }

            {menuItems &&
                 <div className="flex flex-row justify-end w-full items-end pr-1 bg-reddit_greenyDark"> 
                <Dropdown label={selectedMenuItem} className="bg-reddit_darkGray border-none shadow-xl" button={<HiCog className="text-white text-lg" />} >
                    {menuItems.map((item, i) => {
                        return (
                            <Dropdown.Item key={i} className='text-gray-400 font-bold font-plex text-sm hover:bg-reddit_hover' onClick={() => setSelectedMenuItem(item.name)}>{item.name}</Dropdown.Item> 
                            )
                        })}                    
                </Dropdown>
                </div>
            }
            </div>
            
        </>
    )
}

export default Setting

