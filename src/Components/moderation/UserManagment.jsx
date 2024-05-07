import QueueRow from "./QueueRow";
import killbill from "@/assets/kill_bill.jpg";
import { useState, useEffect } from "react";
const UserManagment = ({ selectedSubreddit = {
    icon: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/415.jpg",
    members: 53, name: "Boris56"} }) => {

        const [selectedPage, setSelectedPage] = useState(() => {
            const saved = localStorage.getItem('selectedUserManagementPage');
            return saved ? JSON.parse(saved) : "Banned";
          });
          
          useEffect(() => {
            localStorage.setItem('selectedUserManagementPage', JSON.stringify(selectedPage));
          }, [selectedPage]);

    return (
        <div id="mod_content" className="flex flex-col  w-full h-full">
            <div className="w-full px-4  mt-[9px] h-[150px] min-h-[150px]  flex flex-col border-b-[1px] border-[#252C2E]">
                <h1 className="text-[33px] font-semibold text-gray-200">User Managment</h1>
                <p className="text-gray-200 mt-1 font-light text-[14px]">Anything that needs moderator attention will show up in needs review.</p>

                <div  className="w-[470px] h-12  mt-auto mb-2 flex flex-row items-center space-x-16">
                    <div id="user_management_Banned" onClick={()=>setSelectedPage("Banned")} className={`${selectedPage=="Banned"?'bg-reddit_search_light':'hover:bg-reddit_search'} w-fit px-3 h-11 flex flex-row items-center cursor-pointer rounded-3xl`}>
                        <h1 className="text-white text-[14px]">Banned</h1>
                    </div>

                    <div d="user_management_approved" onClick={()=>setSelectedPage("Approved")} className={`${selectedPage=="Approved"?'bg-reddit_search_light':'hover:bg-reddit_search'}   w-fit px-3 h-11 flex flex-row items-center cursor-pointer rounded-3xl`}>
                        <h1 className="text-white text-[14px]">Approved</h1>
                    </div>

                    <div id="user_management_moderators" onClick={()=>setSelectedPage("Moderators")} className={`${selectedPage=="Moderators"?'bg-reddit_search_light':'hover:bg-reddit_search'}  w-fit px-3 h-11 flex flex-row items-center cursor-pointer rounded-3xl`}>
                        <h1 className="text-white text-[14px]">Moderators</h1>
                    </div>

                </div>
            </div>


   

            <div id="mapped_mod_user_managemenet" className="  flex flex-col h-full w-full ">
               
            </div>

        </div>



    );
};

export default UserManagment;
