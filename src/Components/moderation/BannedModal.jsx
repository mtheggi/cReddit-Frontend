"use client";

import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Separator from "../sidebar/Nav-Icons/Separator";
import { getRequest, postRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";

export function BannedModal({ setIsOpenBannedModal, isOpenBannedModal, bannedModalRef }) {
    const [charCount, setCharCount] = useState(300);



    return (

        <div className="community-modal flex flex-row items-center justify-center">
            <div className="overlay"></div>
            <div ref={bannedModalRef} id="banned" className="bg-[#1A1A1B] min-w-[538px]  z-30 text-white rounded-xl w-100% h-100% pt-auto flex flex-col xs:py-2 xs:h-fit xs:w-120 px-3 ">

                <div className="flex flex-col my-auto">
                    <div className="card-header flex flex-row justify-center sm:justify-between  mb-2"  >
                        <h1 className="mt-[11px] text-[18px]">Ban a user:</h1>
                        <button onClick={() => { setIsOpenBannedModal(false) }} id="close-report" className="h-8 w-8 rounded-full mt-2   ml-auto hover:bg-gray-700"> <XMarkIcon className="h-6 w-6 ml-1 text-gray-50" /> </button>
                    </div>
                    <div id="ban_modal_content" className="flex flex-col ">
                        <div className="mt-1 mb-3">
                            <Separator />
                        </div>
                        <div className="flex flex-col w-full">
                            <h1 className="text-[10px] font-semibold text-gray-400 ">ENTER USERNAME</h1>
                            <input maxLength={100} placeholder="u/username" type="text" className="w-full h-10 text-[13px] rounded-sm focus:outline-none focus:ring-0  border-[#343536] text-[gray-200] bg-[#1A1A1B] mt-2" />

                            <h1 className="text-[10px] mt-4 font-semibold text-gray-400 ">REASON FOR BAN</h1>
                            <input maxLength={100} placeholder="Reason" type="text" className="w-full h-10 text-[13px] rounded-sm focus:outline-none focus:ring-0  border-[#343536] text-[gray-200] bg-[#1A1A1B] mt-2" />

                            <h1 className="text-[10px] mt-4 font-semibold text-gray-400 ">MOD NOTE</h1>
                            <input onChange={(e) => setCharCount(300 - e.target.value.length)} maxLength={300} placeholder="Note" type="text" className="w-full h-10 text-[13px] rounded-sm focus:outline-none focus:ring-0  border-[#343536] text-[gray-200] bg-[#1A1A1B] mt-2" />
                            <p className="text-[12px] mt-[3px] text-gray-500">{charCount} characters remaining</p>

                            <h1 className="text-[10px] mt-4 font-semibold text-gray-400 ">HOW LONG?</h1>
                            <div className="flex flex-row items-center">
                                <input
                                    type="number"
                                    min="1"
                                    max="999"
                                    className="w-[75px] h-10 text-[13px] rounded-sm focus:outline-none focus:ring-0  border-[#343536] text-[gray-200] bg-[#1A1A1B] mt-2"
                                />
                                <div className="w-fit px-1 h-[39px] -mb-2 flex flex-row items-center border-1">
                                    <h1>Days</h1>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>

        </div >

    );
}