import { useEffect, useState } from "react";
import QueueRow from "./QueueRow";
import killbill from "@/assets/kill_bill.jpg";
import { getRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";
import Loading from "../Loading/Loading";
import Separator from "../sidebar/Nav-Icons/Separator";
const Queue = ({ selectedSubReddit }) => {
    const { name, icon } = selectedSubReddit

    const [selectedPage, setSelectedPage] = useState("reported")

    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);



    useEffect(() => {
        const Fetch = async () => {
            setIsLoading(true);
            if (selectedPage === "reported") {
                const response = await getRequest(`${baseUrl}/subreddit/${name}/reported-posts`);
                if (response.status === 200) {
                    setPosts(response.data)
                    setIsLoading(false);
                }
            } else if (selectedPage === "edited") {

                const response = await getRequest(`${baseUrl}/subreddit/about/edited/${name}`);
                if (response.status === 200) {
                    const newStructure = response.data.map((post) => { return { ...post.post, userPic: post.userPic } })
                    setPosts(newStructure)
                    console.log("new Structure", newStructure)
                    setIsLoading(false);
                }
            } else {

                const response = await getRequest(`${baseUrl}/subreddit/${name}/unmoderated-posts`);
                if (response.status === 200) {
                    setPosts(response.data)
                    setIsLoading(false);
                }

            }

        }

        Fetch();
    }, [selectedPage])

    console.log(posts)
    return (
        <div id="mod_content" className="flex flex-col  w-full h-full">
            <div className="w-full px-4 mb-3 mt-[9px] h-fit min-h-[250px]  flex flex-col border-b-[1px] border-[#252C2E]">

                <div className="w-fit px-3 h-11 mb-4 flex flex-row justify-start items-center cursor-pointer ">
                    <img src={icon} className="h-11 w-11 rounded-full mr-4 " />
                    <h1 className="text-[33px] font-semibold text-gray-200"> r/{name}</h1>
                </div>

                <h1 className="text-[33px] mb-3 mt-1 font-semibold text-gray-200"> Queue</h1>

                <p className="text-gray-200 mb-1 mt-1 font-light text-[14px]">Anything that needs moderator attention will show up in needs review.</p>

                <div className="w-[470px] h-12  mt-auto mb-2 flex flex-row items-center space-x-16">
                    <div className={`${selectedPage === 'reported' ? 'bg-reddit_search ' : " "}hover:bg-reddit_search w-fit px-3 h-9 mb-1 flex flex-row items-center cursor-pointer rounded-3xl`}
                        onClick={() => { setSelectedPage("reported") }}
                    >
                        <h1 className="text-white text-[14px]">Reported</h1>
                    </div>

                    <div className={`${selectedPage === 'edited' ? 'bg-reddit_search ' : " "}hover:bg-reddit_search w-fit px-3 h-9 mb-1 flex flex-row items-center cursor-pointer rounded-3xl`}
                        onClick={() => { setSelectedPage("edited") }}
                    >
                        <h1 className="text-white text-[14px]">Edited</h1>
                    </div>

                    <div className={`${selectedPage === 'unmoderated' ? 'bg-reddit_search ' : " "}hover:bg-reddit_search w-fit px-3 h-9 mb-1 flex flex-row items-center cursor-pointer rounded-3xl`}
                        onClick={() => { setSelectedPage("unmoderated") }}
                    >
                        <h1 className="text-white text-[14px]">Unmoderated</h1>
                    </div>
                </div>
            </div>


            {posts.length === 0 && !isLoading &&
                <div className="w-full h-fit flex flex-col items-center mt-40 ">
                    <img className="w-[200px] h-[200px]" src="https://www.redditstatic.com/shreddit/assets/snoomojis/cat_blep.png" alt="cat blep" />
                    <h1 className="text-white font-medium text-[24px]">Queue is clean.</h1>
                    <p className="text-gray-400 mt-1">Kitteh is pleased</p>
                </div>
            }

            {
                isLoading ? <Loading /> :
                    <div id="mapped_mod" className="  flex flex-col h-fit w-full ">
                        {posts && posts.map((post, index) => {
                            return (
                                <div key={index} className="w-full flex-col hover:bg-reddit_hover px-[32px] border-b-[1px] border-[#252C2E] py-4">
                                    <QueueRow key={index} post={post} />
                                </div>)
                        })}
                    </div>
            }

        </div >



    );
};

export default Queue;
