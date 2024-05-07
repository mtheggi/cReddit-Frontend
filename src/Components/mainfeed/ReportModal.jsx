"use client";

import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Separator from "../sidebar/Nav-Icons/Separator";
import { getRequest, postRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";

export function ReportModal({ setIsOpenReportModal, isOpenReportModal, postId, reportModalRef, communityRules, showAlertForTime }) {

    const [selectedRule, setSelectedRule] = useState(null);

    const reportPost = async () => {
        const response = await postRequest(`${baseUrl}/post/${postId}/report`, { communityRule: selectedRule });
        setIsOpenReportModal(false);
        if (response.status === 200 || response.status === 201) {

            showAlertForTime("success", response.data.message);
        }
        else {
            showAlertForTime("error", response.data.message);
        }
    }

    return (

        <div className="community-modal flex flex-row items-center justify-center">
            <div className="overlay"></div>
            <div id="report" className="bg-reddit_greenyDark min-w-[538px]  z-30 text-white rounded-xl w-100% h-100% pt-auto flex flex-col xs:py-2 xs:h-fit xs:w-120 px-3 ">

                <div ref={reportModalRef} className="flex flex-col my-auto">
                    <div className="card-header flex flex-row justify-center sm:justify-between  mb-2"  >
                        <h1 className="mt-[11px] text-[20px]">Submit a report</h1>
                        <button onClick={() => { setIsOpenReportModal(false) }} id="close-report" className="h-8 w-8 rounded-full mt-2 bg-reddit_search  ml-auto hover:bg-reddit_search_light"> <XMarkIcon className="h-6 w-6 ml-1 text-gray-50" /> </button>
                    </div>
                    <div id="report_content" className="flex flex-col ">
                        <p className="mb-3 text-[15px] text-gray-400 pr-[8px] hidden sm:block">Thanks for looking out for yourself and your fellow redditors by reporting things that break the rules. Let us know what's happening, and we'll look into it. </p>
                        <div className="mt-1 mb-3">
                            <Separator />
                        </div>
                        <div className="flex flex-row flex-wrap w-full">

                            {communityRules.filter(rule => rule.appliesTo !== 'Comments only').map((rule, index) => (
                                <div onClick={() => setSelectedRule(rule.text)} key={index} className={`flex mb-3 mx-2 flex-row items-center justify-center rounded-3xl cursor-pointer ${selectedRule == rule.text ? 'bg-gray-700' : 'bg-[#2B3236]  hover:bg-gray-700'}  w-fit px-3 py-2 h-fit`}>
                                    <h1>{rule.text.substring(0, 20)}</h1>
                                </div>
                            ))}

                            {communityRules.filter(rule => rule.appliesTo !== 'Comments only').length === 0 &&
                                <div className="w-full mb-[15px] flex flex-row items-center">
                                    <h1 className="mt-1">The community that this post belongs to does not have any rules to be violated for reporting.</h1>
                                </div>
                            }

                        </div>

                        {communityRules.filter(rule => rule.appliesTo !== 'Comments only').length !== 0 && <div className="flex flex-row w-full mt-1.5 mb-2.5 ">
                            <div id="next_report" onClick={reportPost} className={` ${selectedRule ? 'bg-reddit_blue hover:bg-reddit_light_blue cursor-pointer' : 'bg-gray-500 cursor-not-allowed'}  mr-2 ml-auto mt-2 px-[11px] h-9 rounded-full font-medium text-[13px] flex items-center`}>Submit</div>
                        </div>}
                    </div>
                </div>
            </div>

        </div >

    );
}