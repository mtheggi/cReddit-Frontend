import { useNavigate } from "react-router-dom";
import BlockedImg from "@/assets/Block.svg";
const Blocked = ({ userName }) => {
    return (

        <div className="flex flex-col w-full justify-center items-center h-full bg-reddit_greenyDark no-select px-1 py-1 ">

            <img src={BlockedImg} alt="Blocked" className="w-60 h-60" />
            <h1 className="m-3 font-bold text-24 text-white" > You have Blocked {userName} </h1>
            <p className="text-14 mb-3 mt-0 text-white">unblock to see details </p>
            <div className="w-full h-6 mt-2">
                <div className="relative w-full h-full">
                    <div className="text-gray-400 text-sm mt-1.5">
                        <p className=" text-transparent">
                            Tabgo corpus texo. Cicuta dsdsdsdddddddddddddsdsdsds dsdsdsddsdsdsdsffffffffffff in quaerat caveo corpus bellicus. Voluptates terror via curis deludo supra somniculosus bibo.
                        </p>
                    </div>
                </div>
            </div>

        </div>

    );

}
export default Blocked;