import { baseUrl } from "@/constants";
import QueueRow from "./QueueRow";
import { getRequest, patchRequest } from "@/services/Requests";
import { useState, useEffect, useRef } from "react";
import UserManagmentRow from "./BannedRow";
import BannedRow from "./BannedRow";
import Loading from "../Loading/Loading";
import { BannedModal } from "./BannedModal";
import Empty from "./Empty";
import ModeratorsRow from "./ModeratorsRow";
import ApprovedRow from "./ApprovedRow";
import {ApproveModal} from "./ApproveModal"
const UserManagment = ({ selectedSubReddit, showAlertForTime }) => {

    const { name, icon } = selectedSubReddit

    const [approvedUsers, setApprovedUsers] = useState([]);
    const [bannedUsers, setBannedUsers] = useState([]);
    const [moderators, setModerators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [communityRules, setCommunityRules] = useState([]);
    const [isOpenBannedModal, setIsOpenBannedModal] = useState(false);
    const [isOpenApproveModal, setIsOpenApproveModal] = useState(false);
    const bannedModalRef = useRef();
    const approveModalRef = useRef();
    const [selectedPage, setSelectedPage] = useState(() => {
        const saved = localStorage.getItem('selectedUserManagementPage');
        return saved ? JSON.parse(saved) : "Banned";
    });


    useEffect(() => {
        localStorage.setItem('selectedUserManagementPage', JSON.stringify(selectedPage));
    }, [selectedPage]);


    const leaveAsMod = async () => {


        const response = await patchRequest(`${baseUrl}/mod/leave/${selectedSubReddit.name}`);
        if (response.status === 200 || response.status === 201) {
            showAlertForTime("success", response.data.message);
            window.location.reload();
        }
        else {
            showAlertForTime("error", response.data.message);
        }


    }



    useEffect(() => {
        let closeDropdown = (e) => {
            if (bannedModalRef.current && !bannedModalRef.current.contains(e.target)) {
                setIsOpenBannedModal(false);
            }
            if (approveModalRef.current && !approveModalRef.current.contains(e.target)) {
                setIsOpenApproveModal(false);
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
    }, [selectedPage, selectedSubReddit]);



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
        const Fetch = async () => {
            const response = await getRequest(`${baseUrl}/subreddit/${selectedSubReddit.name}/rules`);

            if (response.status === 200 || response.status === 201) {
                setCommunityRules(response.data);
            }
        }
        if (selectedSubReddit)
            Fetch();
    }, [selectedSubReddit])


    return (
        <div id="mod_content" className="flex flex-col  w-full h-full">
            <div className="w-full px-4  mt-[9px] min-h-[190px]  flex flex-col border-b-[1px] border-[#252C2E]">
                <div className="flex mt-2 -ml-4  flex-row">
                    <div className="w-fit px-3 h-11 mb-4 flex flex-row justify-start items-center cursor-pointer ">
                        <img src={icon} className="h-11 w-11 rounded-full mr-4 " />
                        <h1 className="text-[33px] font-semibold text-gray-200"> r/{name} :</h1>
                    </div>
                    <h1 className="text-[33px] mb-3 mt-1 font-semibold text-gray-200"> User Management</h1>
                </div>
                <p className="text-gray-200 mt-1 font-light text-[14px]">Anything that needs moderator attention will show up in needs review.</p>

                <div className="flex flex-row items-center mt-auto">
                    <div className="w-[470px] h-12  mt-auto mb-2 flex flex-row items-center space-x-16">
                        <div id="user_management_Banned" onClick={() => setSelectedPage("Banned")} className={`${selectedPage == "Banned" ? 'bg-reddit_search_light' : 'hover:bg-reddit_search'} w-fit px-3 h-9 flex flex-row items-center cursor-pointer rounded-3xl`}>
                            <h1 className="text-white text-[14px]">Banned</h1>
                        </div>

                        <div d="user_management_approved" onClick={() => setSelectedPage("Approved")} className={`${selectedPage == "Approved" ? 'bg-reddit_search_light' : 'hover:bg-reddit_search'}   w-fit px-3 h-9 flex flex-row items-center cursor-pointer rounded-3xl`}>
                            <h1 className="text-white text-[14px]">Approved</h1>
                        </div>

                        <div id="user_management_moderators" onClick={() => setSelectedPage("Moderators")} className={`${selectedPage == "Moderators" ? 'bg-reddit_search_light' : 'hover:bg-reddit_search'}  w-fit px-3 h-9 flex flex-row items-center cursor-pointer rounded-3xl`}>
                            <h1 className="text-white text-[14px]">Moderators</h1>
                        </div>
                    </div>
                    {selectedPage == "Banned" && <div id="ban_user" onClick={(e) => { e.stopPropagation(); setIsOpenBannedModal(true) }} className="flex flex-row px-2 cursor-pointer hover:bg-white  h-8 rounded-3xl bg-gray-200 items-center ml-auto">
                        <h1 className="text-[13px] font-semibold">Ban User</h1>
                    </div>}
                    {selectedPage == "Moderators" && <div id="leave_mod" onClick={leaveAsMod} className="flex flex-row px-2 cursor-pointer hover:bg-white  h-8 rounded-3xl bg-gray-200 items-center ml-auto">
                        <h1 className="text-[13px] font-semibold">Leave as mod</h1>
                    </div>}
                    {selectedPage == "Approved" && <div id="approve_user" onClick={(e)=>{ e.stopPropagation(); setIsOpenApproveModal(true)}} className="flex flex-row px-2 cursor-pointer hover:bg-white  h-8 rounded-3xl bg-gray-200 items-center ml-auto">
                        <h1 className="text-[13px] font-semibold">Approve user</h1>
                    </div>}
                </div>
            </div>





            <div id="mapped_mod_user_managemenet" className="  flex flex-col h-full w-full ">


                {selectedPage == "Banned" && bannedUsers.length == 0 && !loading &&
                    <Empty message={"There is no banned users in this community"} />
                }


                {selectedPage == "Approved" && approvedUsers.length == 0 && !loading &&
                    <Empty message={"There is no approved users in this community"} />
                }


                {selectedPage == "Moderators" && moderators.length == 0 && !loading &&
                    <Empty message={"There is no moderators in this community"} />
                }

                {selectedPage == "Banned" && bannedUsers.length > 0 && !loading && bannedUsers.map((user, index) => {
                    return <div key={index} className="w-full flex-col hover:bg-reddit_hover px-[32px] border-b-[1px] border-[#252C2E] py-[11px]">
                        <BannedRow communityRules={communityRules} setBannedUsers={setBannedUsers} username={user.username} selectedSubReddit={selectedSubReddit} reasonToBan={user.reasonToBan} days={user.days} profilePicture={user.profilePicture} showAlertForTime={showAlertForTime} />
                    </div>
                })}


                {selectedPage == "Approved" && approvedUsers.length > 0 && !loading && approvedUsers.map((user, index) => {
                    return <div key={index} className="w-full flex-col hover:bg-reddit_hover px-[32px] border-b-[1px] border-[#252C2E] py-[11px]">
                        <ApprovedRow username={user.user} profilePicture={user.profilePicture} setApprovedUsers={setApprovedUsers} selectedSubReddit={selectedSubReddit} showAlertForTime={showAlertForTime} />
                    </div>
                }
                )}

                {selectedPage == "Moderators" && moderators.length > 0 && !loading && moderators.map((user, index) => {
                    return <div key={index} className="w-full flex-col hover:bg-reddit_hover px-[32px] border-b-[1px] border-[#252C2E] py-[11px]">
                        <ModeratorsRow username={user.username} profilePicture={user.profilePicture} showAlertForTime={showAlertForTime} />
                    </div>
                }
                )}



                {loading && <Loading />}


            </div>
            {isOpenBannedModal && <BannedModal bannedUsers={bannedUsers} setBannedUsers={setBannedUsers} communityRules={communityRules} showAlertForTime={showAlertForTime} setIsOpenBannedModal={setIsOpenBannedModal} isOpenBannedModal={isOpenBannedModal} bannedModalRef={bannedModalRef} selectedSubreddit={selectedSubReddit} />
            }
            {
            isOpenApproveModal && <ApproveModal selectedSubreddit={selectedSubReddit} approveModalRef={approveModalRef} setIsOpenApproveModal={setIsOpenApproveModal} showAlertForTime={showAlertForTime} setApprovedUsers={setApprovedUsers}/>
            }

        </div>



    );
};

export default UserManagment;