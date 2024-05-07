import QueueRow from "./QueueRow";
import killbill from "@/assets/kill_bill.jpg";
const Queue = () => {

    return (
        <div id="mod_content" className="flex flex-col  w-full h-full">
            <div className="w-full px-4  mt-[9px] h-[150px] min-h-[150px]  flex flex-col border-b-[1px] border-[#252C2E]">
                <h1 className="text-[33px] font-semibold text-gray-200">Queue</h1>
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


            {/* <div className="w-full h-full flex flex-col items-center mt-20 ">
            <img className="w-[200px] h-[200px]" src="https://www.redditstatic.com/shreddit/assets/snoomojis/cat_blep.png" alt="cat blep" />
            <h1 className="text-white font-medium text-[24px]">Queue is clean.</h1>
            <p className="text-gray-400 mt-1">Kitteh is pleased</p>
        </div> */}

            <div id="mapped_mod" className="  flex flex-col h-full w-full ">
                <div className="w-full flex-col hover:bg-reddit_hover px-[32px] border-b-[1px] border-[#252C2E] py-4">
                    <QueueRow />

                </div>
            </div>

        </div>



    );
};

export default Queue;
