
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { EditBanModal } from "./EditBanModal";
import { patchRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";


const ModeratorsRow = ({ username, profilePicture, showAlertForTime }) => {
    const navigate = useNavigate();
  


    return (

        <div className="w-full h-fit py-2  flex flex-row items-center border-b-1 border-gray-700">

            <img src={profilePicture} alt="profile" className="w-8 h-8 rounded-full" />

            <div className=" flex flex-col mt-1">
                <h1 onClick={()=>navigate(`/user/${username}`)} className="text-white text-[14px] hover:underline cursor-pointer ml-2">{username}</h1>
            </div>
        </div>

    );
}

export default ModeratorsRow;