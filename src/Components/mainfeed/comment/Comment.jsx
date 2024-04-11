import AddComment from "./AddComment";
import { useState, useRef, useEffect } from "react";
import PostComment from "./PostComment";
import { ChevronDownIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';
import { baseUrl } from "../../../constants";
import { getRequest } from "../../../services/Requests";
import NoComments from "./NoComments";

const Comment = ({ postId }) => {

    const menuRefCateg = useRef();
    const [isOpenCateg, setIsOpenCateg] = useState(false);
    const [PostComments, setPostComments] = useState([]);
    const [isCommenting, setIsCommenting] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Best");

    const onAddComment = () => {
        setIsCommenting(false);
    }

    useEffect(() => {
        const getSinglePostComments = async (selectedPostId) => {
            const response = getRequest(`${baseUrl}/post/${selectedPostId}/comments?${selectedSort ? `sort=${selectedSort.toLowerCase()}` : ""}`)
            if (response.status == 200 || response.status == 201) {
                setPostComments(response.data);
            }
        }
        getSinglePostComments(postId);
    });


    useEffect(() => {
        let closeDropdown = (e) => {
            if (menuRefCateg.current && !menuRefCateg.current.contains(e.target)) {
                setIsOpenCateg(false);
            }

        };
        document.addEventListener("click", closeDropdown);

        const mainfeedElement = document.getElementById("mainfeed");

        const handleScroll = () => {
            const scrollThreshold = 58;
            if (mainfeedElement.scrollTop > scrollThreshold) {
                setIsOpenCateg(false);
            }
        };

        if (mainfeedElement) {
            mainfeedElement.addEventListener("scroll", handleScroll);
        }

        return () => {
            document.removeEventListener("click", closeDropdown);
            if (mainfeedElement) {
                mainfeedElement.removeEventListener("scroll", handleScroll);
            }
        };
    });




    return (
        <>
            <div
                id="mainfeed_category_dropdown"
                ref={menuRefCateg}
                className="relative"
            >
                <div
                    onClick={() => setIsOpenCateg((prev) => !prev)}
                    className={`flex w-14 h-7 rounded-full hover:bg-reddit_search_light ${isOpenCateg ? "bg-reddit_search_light" : ""
                        } justify-center items-center cursor-pointer`} >
                    <p className="text-gray-500 font-semibold text-xs no-select ">
                        {selectedSort}
                    </p>
                    <ChevronDownIcon className="h-3 ml-0.5 w-3 text-gray-400" />
                </div>

                {isOpenCateg && (
                    <div className=" w-20 h-72 bg-reddit_search absolute mt-2.5 -ml-1 text-white text-sm pt-2.5  rounded-lg  font-extralight flex flex-col">
                        <div className="w-full pl-4 rounded-lg h-9 flex items-center font-normal">
                            <p className="no-select">Sort by</p>
                        </div>

                        <div onClick={() => setSelectedSort("Best")}
                            id="mainfeed_category_best"
                            href=""
                            className="w-full pl-4 hover:bg-reddit_hover h-12 flex items-center cursor-pointer"
                        >
                            <p className="no-select">Best</p>
                        </div>

                        <div onClick={() => setSelectedSort("Hot")}
                            id="mainfeed_category_hot"
                            href=""
                            className="w-full pl-4 hover:bg-reddit_hover h-12 flex items-center cursor-pointer"
                        >
                            <p className="no-select">Hot</p>
                        </div>

                        <div onClick={() => setSelectedSort("New")}
                            id="mainfeed_category_new"
                            href=""
                            className="w-full pl-4  hover:bg-reddit_hover h-12 flex items-center cursor-pointer"
                        >
                            <p className="no-select">New</p>
                        </div>

                        <div onClick={() => setSelectedSort("Top")}
                            id="mainfeed_category_top"
                            href=""
                            className="w-full pl-4  hover:bg-reddit_hover h-12 flex items-center cursor-pointer"
                        >
                            <p className="no-select">Top</p>
                        </div>

                        <div onClick={() => setSelectedSort("Rising")}
                            id="mainfeed_category_rising"
                            href=""
                            className="w-full pl-4  hover:bg-reddit_hover h-12 flex items-center cursor-pointer rounded-b-lg"
                        >
                            <p className="no-select">Rising</p>
                        </div>
                    </div>
                )}
            </div>
            <AddComment postId={postId} onAddComment={onAddComment} isCommenting={isCommenting} setIsCommenting={setIsCommenting} />

            {PostComments.map((comment, index) => (
                <PostComment
                    key={index}
                    id={comment._id}
                    {...comment}
                />
            ))}

            {PostComments.length==0 && <NoComments/>}
        </>

    );
}

export default Comment;