import QueueRow from "./QueueRow";
import killbill from "@/assets/kill_bill.jpg";
const SchedualePost = ({selectedSubReddit}) => {
    const { name, icon } = selectedSubReddit

    return (
        <div id="mod_content" className="flex flex-col  w-full h-full">
            <div className="w-full px-4  mt-[9px] min-h-[190px]  flex flex-col border-b-[1px] border-[#252C2E]">
                <div className="flex mt-2 -ml-4  flex-row">
                    <div className="w-fit px-3 h-11 mb-4 flex flex-row justify-start items-center cursor-pointer ">
                        <img src={icon} className="h-11 w-11 rounded-full mr-4 " />
                        <h1 className="text-[33px] font-semibold text-gray-200"> r/{name} :</h1>
                    </div>
                    <h1 className="text-[33px] mb-3 mt-1 font-semibold text-gray-200"> Scheduled Posts</h1>
                </div>
                <p className="text-gray-200 mt-1 font-light text-[14px]">Anything that needs moderator attention will show up in needs review.</p>

                <div className="w-[470px] h-12  mt-auto mb-2 flex flex-row items-center space-x-16">
                    <div className="hover:bg-reddit_search w-fit px-3 h-11 flex flex-row items-center cursor-pointer rounded-3xl">
                        <h1 className="text-white text-[14px]">Unmoderated</h1>
                    </div>

                    <div className="hover:bg-reddit_search  w-fit px-3 h-11 flex flex-row items-center cursor-pointer rounded-3xl">
                        <h1 className="text-white text-[14px]">Edited</h1>
                    </div>

                    <div className="hover:bg-reddit_search w-fit px-3 h-11 flex flex-row items-center cursor-pointer rounded-3xl">
                        <h1 className="text-white text-[14px]">Removed</h1>
                    </div>

                </div>
            </div>




        </div>



    );
};

export default SchedualePost;
