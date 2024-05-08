"use client";

import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Separator from "../sidebar/Nav-Icons/Separator";
import { getRequest, patchRequest, postRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";

export function ApproveModal({ setIsOpenApproveModal, approveModalRef, selectedSubreddit, showAlertForTime, setApprovedUsers }) {
    const [username, setUsername] = useState('');

    const approveUser = async (e) => {
        e.stopPropagation();
        if (username.trim() === '' || !username)
            return;
        const response = await patchRequest(`${baseUrl}/mod/approve/${selectedSubreddit.name}`, {
            username: username
        })
        if (response.status === 200 || response.status === 201) {
            showAlertForTime("success", response.data.message);
            setIsOpenApproveModal(false);
            setApprovedUsers((prev) => [...prev, { user: username }]);
        }
        else {
            showAlertForTime("error", response.data.message);

        }
    }

    return (

        <div className="community-modal flex flex-row items-center justify-center">
            <div className="overlay"></div>
            <div ref={approveModalRef} id="approved" className="bg-[#1A1A1B] min-w-[538px]  z-30 text-white rounded-xl w-100% h-100% pt-auto flex flex-col xs:py-2 xs:h-fit xs:w-120 ">

                <div className="flex flex-col my-auto">
                    <div className="card-header px-3  flex flex-row justify-center sm:justify-between mb-[5px]"  >
                        <h1 className="mt-[11px] text-[18px]">Approve a user:</h1>
                        <button onClick={() => { setIsOpenApproveModal(false) }} id="close-report" className="h-8 w-8 rounded-full mt-2   ml-auto hover:bg-gray-700"> <XMarkIcon className="h-6 w-6 ml-1 text-gray-50" /> </button>
                    </div>
                    <div ref={approveModalRef} id="approve_modal_content" className="flex flex-col ">
                        <div className="w-full mb-1">
                            <Separator />
                        </div>
                        <div className="flex flex-col px-3  w-full">

                            

                            <h1 className="text-[10px] mt-4 font-semibold text-gray-400 ">USERNAME</h1>
                            <input id="username" onChange={(e) => { setUsername(e.target.value) }} maxLength={300} placeholder="Username" type="text" className="w-full h-10 text-[13px] rounded-sm focus:outline-none focus:ring-0  border-[#343536] text-[gray-200] bg-[#1A1A1B] mt-2" />


                            

                            <div className="flex flex-row mt-2 items-center">
                                <div onClick={(e) => { e.stopPropagation(); setIsOpenApproveModal(false) }} className="flex my-3 flex-row px-2 mr-6 cursor-pointer hover:bg-white  h-8 rounded-3xl bg-gray-200 items-center ml-auto">
                                    <h1 className="text-[13px] text-black font-semibold">Cancel</h1>
                                </div>

                                <div onClick={approveUser} className={`flex my-3 flex-row px-2   h-8 rounded-3xl bg-gray-200 items-center ${(username.trim() === '' || !username) ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-white'} `}>
                                    <h1 className="text-[13px]  text-black font-semibold">Approve</h1>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div >

    );
}