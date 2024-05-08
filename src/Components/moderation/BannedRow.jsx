
import { useNavigate } from "react-router-dom";

const BannedRow = ({ username, profilePicture, reasonToBan, days }) => {
    const navigate = useNavigate();
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
                <button className="bg-reddit_search hover:bg-reddit_search_light w-fit px-3 py-1 rounded-xl h-8  text-white text-[14px]">Edit</button>
            </div>
        </div>

    );
}

export default BannedRow;