import { baseUrl } from "@/constants";
import QueueRow from "./QueueRow";
import { getRequest } from "@/services/Requests";
import { useState, useEffect, useRef } from "react";
import UserManagmentRow from "./BannedRow";
import BannedRow from "./BannedRow";
import Loading from "../Loading/Loading";
import { BannedModal } from "./BannedModal";
const UserManagment = ({ selectedSubReddit = {
    icon: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/415.jpg",
    members: 53, name: "Boris56"
} }) => {

    const [approvedUsers, setApprovedUsers] = useState([]);
    const [bannedUsers, setBannedUsers] = useState([]);
    const [moderators, setModerators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpenBannedModal, setIsOpenBannedModal] = useState(false);
    const bannedModalRef = useRef();
    const [selectedPage, setSelectedPage] = useState(() => {
        const saved = localStorage.getItem('selectedUserManagementPage');
        return saved ? JSON.parse(saved) : "Banned";
    });

    useEffect(() => {
        localStorage.setItem('selectedUserManagementPage', JSON.stringify(selectedPage));
    }, [selectedPage]);



  useEffect(() => {
    let closeDropdown = (e) => {
      if (bannedModalRef.current && !bannedModalRef.current.contains(e.target)) {
        setIsOpenBannedModal(false);
      }

    };
    document.addEventListener("click", closeDropdown);


    return () => {
      document.removeEventListener("click", closeDropdown);

    };
  });


    useEffect(() => {
        const getUserManagement = async () => {
            setLoading(true);
            try {
                const response = await getRequest(`${baseUrl}/mod/get-${selectedPage.toLowerCase()}-users/${selectedSubReddit.name}`);
                if (response.status === 200 || response.status === 201) {
                    if (selectedPage == "Approved") {
                        setApprovedUsers(response.data);
                    } else if (selectedPage == "Banned") {
                        setBannedUsers(response.data.bannedUsers);
                    }
                }
            }
            catch (e) {

            }
            finally {
                setLoading(false);
            }
        }

        const getModerators = async () => {
            setLoading(true);
            try {
                const response = await getRequest(`${baseUrl}/subreddit/${selectedSubReddit.name}`);
                if (response.status === 200 || response.status === 201) {
                    setModerators(response.data.moderators);
                }
            }
            catch (e) {

            }
            finally {
                setLoading(false);
            }
        }

        if (selectedPage == "Moderators")
            getModerators();
        else
            getUserManagement();
    }, [selectedPage]);

    return (
        <div id="mod_content" className="flex flex-col  w-full h-full">
            <div className="w-full px-4  mt-[9px] h-[150px] min-h-[150px]  flex flex-col border-b-[1px] border-[#252C2E]">
                <h1 className="text-[33px] font-semibold text-gray-200">User Managment</h1>
                <p className="text-gray-200 mt-1 font-light text-[14px]">Anything that needs moderator attention will show up in needs review.</p>

                <div className="flex flex-row items-center mt-auto">
                    <div className="w-[470px] h-12  mt-auto mb-2 flex flex-row items-center space-x-16">
                        <div id="user_management_Banned" onClick={() => setSelectedPage("Banned")} className={`${selectedPage == "Banned" ? 'bg-reddit_search_light' : 'hover:bg-reddit_search'} w-fit px-3 h-11 flex flex-row items-center cursor-pointer rounded-3xl`}>
                            <h1 className="text-white text-[14px]">Banned</h1>
                        </div>

                        <div d="user_management_approved" onClick={() => setSelectedPage("Approved")} className={`${selectedPage == "Approved" ? 'bg-reddit_search_light' : 'hover:bg-reddit_search'}   w-fit px-3 h-11 flex flex-row items-center cursor-pointer rounded-3xl`}>
                            <h1 className="text-white text-[14px]">Approved</h1>
                        </div>

                        <div id="user_management_moderators" onClick={() => setSelectedPage("Moderators")} className={`${selectedPage == "Moderators" ? 'bg-reddit_search_light' : 'hover:bg-reddit_search'}  w-fit px-3 h-11 flex flex-row items-center cursor-pointer rounded-3xl`}>
                            <h1 className="text-white text-[14px]">Moderators</h1>
                        </div>
                    </div>
                    {selectedPage == "Banned" && <div onClick={(e)=>{e.stopPropagation(); setIsOpenBannedModal(true)}} className="flex flex-row px-2 cursor-pointer hover:bg-white  h-8 rounded-3xl bg-gray-200 items-center ml-auto">
                        <h1 className="text-[13px] font-semibold">Ban User</h1>
                    </div>}
                </div>
            </div>




            <div id="mapped_mod_user_managemenet" className="  flex flex-col h-full w-full ">

                {selectedPage == "Banned" && bannedUsers.length > 0 && !loading && bannedUsers.map((user, index) => {
                    return <div key={index} className="w-full flex-col hover:bg-reddit_hover px-[32px] border-b-[1px] border-[#252C2E] py-[11px]">
                        <BannedRow username={user.username} reasonToBan={user.reasonToBan} days={user.days} profilePicture={user.profilePicture} />
                    </div>
                })}

                {selectedPage == "Approved" && approvedUsers.length > 0 && !loading && approvedUsers.map((user, index) => {
                    return <div key={index} className="w-full flex-col hover:bg-reddit_hover px-[32px] border-b-[1px] border-[#252C2E] py-[11px]">
                        <UserManagmentRow username={user.name} profilePicture={user.profilePicture} button="Remove" />
                    </div>
                }
                )}

                {selectedPage == "Moderators" && moderators.length > 0 && !loading && moderators.map((user, index) => {
                    return <div key={index} className="w-full flex-col hover:bg-reddit_hover px-[32px] border-b-[1px] border-[#252C2E] py-[11px]">
                        <UserManagmentRow username={user.name} profilePicture={user.profilePicture} />
                    </div>
                }
                )}



                {loading && <Loading />}


            </div>
          {isOpenBannedModal &&  <BannedModal setIsOpenBannedModal={setIsOpenBannedModal} isOpenBannedModal={isOpenBannedModal} bannedModalRef={bannedModalRef}/>
}
        </div>



    );
};

export default UserManagment;
