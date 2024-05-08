
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { EditBanModal } from "./EditBanModal";
import { patchRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";


const ApprovedRow = ({ username, profilePicture, showAlertForTime, setApprovedUsers, selectedSubReddit }) => {
    const navigate = useNavigate();

    const removeUser = async () => {
        const response = await patchRequest(`${baseUrl}/mod/unapprove/${selectedSubReddit.name}`, {
            username: username
        })

        if (response.status === 200 || response.status === 201) {
            showAlertForTime("success", response.data.message);
            setApprovedUsers((prev) => prev.filter((user) => user.user !== username));
        }
        else {
            showAlertForTime("error", response.data.message);
        }
    }
  


    return (

        <div className="w-full h-fit py-2  flex flex-row items-center border-b-1 border-gray-700">

            <img src={profilePicture} alt="profile" className="w-8 h-8 rounded-full" />

            <div className=" flex flex-col mt-1">
                <h1 onClick={()=>navigate(`/user/${username}`)} className="text-white text-[14px] hover:underline cursor-pointer ml-2">{username}</h1>
            </div>

            <div className="ml-auto mr-2">
                <button onClick={removeUser} className="bg-reddit_search hover:bg-reddit_search_light w-fit px-[10px] py-1 rounded-xl h-8 text-gray-200 text-[14px]">Remove</button>
            </div>
        </div>

    );
}

export default ApprovedRow;