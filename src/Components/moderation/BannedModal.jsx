"use client";

import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Separator from "../sidebar/Nav-Icons/Separator";
import { getRequest, patchRequest, postRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";

export function BannedModal({ bannedUsers,setIsOpenBannedModal, isOpenBannedModal, bannedModalRef, selectedSubreddit, showAlertForTime, communityRules, setBannedUsers }) {
    const [modNotCount, setModNoteCount] = useState(300);
    const [username, setUsername] = useState('');
    const [banDays, setBanDays] = useState(null);
    const [modNote, setModNote] = useState('');
    const [reason, setReason] = useState('');
    const [updatedRules, setUpdatedRules] = useState([]);



    const banUser = async (e) => {
        e.stopPropagation();
        if (reason.trim() === '' || modNote.trim() === '' || username.trim() === '' || banDays === null || !reason || !modNote || !username)
            return;
        const response = await patchRequest(`${baseUrl}/mod/ban/${selectedSubreddit.name}`, {
            username: username, rule: reason, modNote: modNote, days: banDays
        })
        if (response.status === 200 || response.status === 201) {
            showAlertForTime("success", response.data.message);
            setIsOpenBannedModal(false);
            setBannedUsers((prev) => [...prev, { username: username, days: banDays, reasonToBan: reason}]);
        }
        else {
            showAlertForTime("error", response.data.message);

        }
    }


    useEffect(() => {
        setUpdatedRules(communityRules);
    }, [communityRules])



    return (

        <div className="community-modal flex flex-row items-center justify-center">
            <div className="overlay"></div>
            <div ref={bannedModalRef} id="banned" className="bg-[#1A1A1B] min-w-[538px]  z-30 text-white rounded-xl w-100% h-100% pt-auto flex flex-col xs:py-2 xs:h-fit xs:w-120 ">

                <div className="flex flex-col my-auto">
                    <div className="card-header px-3  flex flex-row justify-center sm:justify-between mb-[5px]"  >
                        <h1 className="mt-[11px] text-[18px]">Ban a user:</h1>
                        <button onClick={() => { setIsOpenBannedModal(false) }} id="close-report" className="h-8 w-8 rounded-full mt-2   ml-auto hover:bg-gray-700"> <XMarkIcon className="h-6 w-6 ml-1 text-gray-50" /> </button>
                    </div>
                    <div id="ban_modal_content" className="flex flex-col ">
                        <div className="w-full mb-3">
                            <Separator />
                        </div>
                        <div className="flex flex-col px-3  w-full">
                            <h1 className="text-[10px] font-semibold text-gray-400 ">ENTER USERNAME</h1>
                            <input id="username" maxLength={100} onChange={(e) => setUsername(e.target.value)} placeholder="u/username" type="text" className="w-full h-10 text-[13px] rounded-sm focus:outline-none focus:ring-0  border-[#343536] text-[gray-200] bg-[#1A1A1B] mt-2" />

                            <h1 className="text-[10px] mt-4 font-semibold text-gray-400 ">REASON TO BAN</h1>
                            <select onChange={(e) => { setReason(e.target.value) }} className="w-full h-10 text-[13px] rounded-sm focus:outline-none focus:ring-0  border-[#343536] text-[gray-400] bg-[#1A1A1B] mt-2">
                                <option value="">Select a reason</option>
                                {updatedRules && updatedRules.map((rule, index) => (
                                    <option key={index} value={rule.text}>
                                        {rule.text}
                                    </option>
                                ))}
                            </select>

                            <h1 className="text-[10px] mt-4 font-semibold text-gray-400 ">MOD NOTE</h1>
                            <input id="modNote" onChange={(e) => { setModNoteCount(300 - e.target.value.length); setModNote(e.target.value) }} maxLength={300} placeholder="Note" type="text" className="w-full h-10 text-[13px] rounded-sm focus:outline-none focus:ring-0  border-[#343536] text-[gray-200] bg-[#1A1A1B] mt-2" />
                            <p className="text-[12px] mt-[3px] text-gray-500">{modNotCount} characters remaining</p>

                            <h1 className="text-[10px] mt-4 font-semibold text-gray-400 ">HOW LONG?</h1>
                            <div className="flex flex-row items-center">
                                <input id="ban_duration_input"
                                    type="number"
                                    min="1"
                                    max="999"
                                    disabled={banDays === 0}
                                    onChange={(e) => { setBanDays != 0 && setBanDays(parseInt(e.target.value, 10)) }}
                                    value={banDays == 0 ? '' : banDays}
                                    className="w-[75px] h-10 text-[13px] rounded-sm focus:outline-none focus:ring-0  border-[#343536] text-[gray-200] bg-[#1A1A1B] mt-2"
                                />
                                <div className={`w-fit px-1 h-[39px] -mb-2 flex flex-row items-center ${banDays == 0 ? 'border-1 border-[#343536]' : 'border-1'} `}>
                                    <h1>Days</h1>
                                </div>

                                <div id="ban_permenant" className="ml-4 cursor-pointer mt-2">
                                    {banDays !== 0 && <svg onClick={(e) => { e.stopPropagation(); setBanDays(0) }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" className="_1vmueUAOJJg7fhS7wxztWa _29ZBtSa05ZCR4Sj1modCls"><path fill="#818384" d="M1.66666667,3.34755033 L1.66666667,16.6524497 C1.66666667,17.5781756 2.42112363,18.3333333 3.34755033,18.3333333 L16.6524497,18.3333333 C17.5781756,18.3333333 18.3333333,17.5788764 18.3333333,16.6524497 L18.3333333,3.34755033 C18.3333333,2.42182438 17.5788764,1.66666667 16.6524497,1.66666667 L3.34755033,1.66666667 C2.42182438,1.66666667 1.66666667,2.42112363 1.66666667,3.34755033 Z M0,3.34755033 C0,1.49874933 1.5032506,0 3.34755033,0 L16.6524497,0 C18.5012507,0 20,1.5032506 20,3.34755033 L20,16.6524497 C20,18.5012507 18.4967494,20 16.6524497,20 L3.34755033,20 C1.49874933,20 0,18.4967494 0,16.6524497 L0,3.34755033 Z"></path></svg>}
                                    {banDays === 0 && <svg onClick={(e) => { e.stopPropagation(); setBanDays(null) }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" className="_1UmPxfh5dZu-x2VK6n61BM"><path fill="#0279D3" d="M0,3.34755033 C0,1.49874933 1.5032506,0 3.34755033,0 L16.6524497,0 C18.5012507,0 20,1.5032506 20,3.34755033 L20,16.6524497 C20,18.5012507 18.4967494,20 16.6524497,20 L3.34755033,20 C1.49874933,20 0,18.4967494 0,16.6524497 L0,3.34755033 Z M8.50575,15.1995 L15.797625,7.907625 C16.25325,7.452625 16.25325,6.71325 15.797625,6.25825 C15.342,5.802625 14.602625,5.802625 14.147625,6.25825 L7.7295,12.676375 L5.635125,10.327625 C5.20575,9.846375 4.46825,9.805125 3.987625,10.23325 C3.506375,10.662625 3.4645,11.400125 3.89325,11.88075 L6.810125,15.151375 C7.023875,15.39075 7.327,15.531375 7.647625,15.54075 C7.658875,15.54075 7.6695,15.541375 7.68075,15.541375 C7.990125,15.541375 8.287,15.41825 8.50575,15.1995 Z"></path></svg>}
                                </div>

                                <p className="mt-2 ml-[6px] text-gray-300">
                                    Permenant
                                </p>

                            </div>


                            <div className="flex flex-row mt-2 items-center">
                                <div id="cancel_ban" onClick={(e) => { e.stopPropagation(); setIsOpenBannedModal(false) }} className="flex my-3 flex-row px-2 mr-6 cursor-pointer hover:bg-white  h-8 rounded-3xl bg-gray-200 items-center ml-auto">
                                    <h1 className="text-[13px] text-black font-semibold">Cancel</h1>
                                </div>

                                <div id="submit_ban" onClick={(e) => { banUser(e) }} className={`flex my-3 flex-row px-2   h-8 rounded-3xl bg-gray-200 items-center ${(reason.trim() === '' || modNote.trim() === '' || username.trim() === '' || banDays === null || !reason || !modNote || !username) ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-white'} `}>
                                    <h1 className="text-[13px]  text-black font-semibold">Ban user</h1>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div >

    );
}