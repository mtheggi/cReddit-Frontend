
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { EditBanModal } from "./EditBanModal";
import { patchRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";


const BannedRow = ({ username, communityRules, profilePicture, reasonToBan, days, showAlertForTime, selectedSubReddit, setBannedUsers }) => {
    const navigate = useNavigate();
    const bannedModalRef = useRef(null);
    const [isOpenEditBanModal, setIsOpenEditBanModal] = useState(false);

    const unbanUser = async () => {
        const response = await patchRequest(`${baseUrl}/mod/unban/${selectedSubReddit.name}`, {
            username: username
        })

        if (response.status === 200 || response.status === 201) {
            showAlertForTime("success", response.data.message);
            setBannedUsers((prev) => prev.filter((user) => user.username !== username));
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
                <h1 className=" ml-2 text-[12px] text-gray-400  font-light mt-1">{days == 0 ? 'Permenant Ban' : `${days} days Ban`}</h1>
            </div>
            <p className="text-[11px] text-gray-600 ml-4 mr-2">.</p>
            <p className="text-[11px] text-gray-600">{reasonToBan.substring(0, 16)}</p>
            <div className="ml-auto">
                <button onClick={()=>setIsOpenEditBanModal(true)} className="bg-reddit_search hover:bg-reddit_search_light w-fit px-3 py-1 rounded-xl h-8  text-white text-[14px]">Edit</button>
            </div>
            <div className="ml-3">
                <button onClick={unbanUser} className="bg-reddit_search hover:bg-reddit_search_light w-fit px-[10px] py-1 rounded-xl h-8  text-red-600 hover:text-red-600 text-[14px]">Unban</button>
            </div>
            {isOpenEditBanModal && <EditBanModal setBannedUsers={setBannedUsers} communityRules={communityRules} username={username} showAlertForTime={showAlertForTime} setIsOpenBannedModal={setIsOpenEditBanModal} issOpenBannedModal={isOpenEditBanModal} bannedModalRef={bannedModalRef} selectedSubreddit={selectedSubReddit} />
            }


        </div>

    );
}

export default BannedRow;