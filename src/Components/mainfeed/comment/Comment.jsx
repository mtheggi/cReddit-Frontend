import AddComment from "./AddComment";
import { useState, useRef, useEffect } from "react";
import PostComment from "./PostComment";
import { ChevronDownIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';
import { baseUrl } from "../../../constants";
import { getRequest } from "../../../services/Requests";
import NoComments from "./NoComments";
import { submitComment } from "./CommentUtils";
import Loading from "@/Components/Loading/Loading";

const Comment = ({ postId }) => {

    const menuRefCateg = useRef();
    const [isOpenCateg, setIsOpenCateg] = useState(false);
    const [postComments, setPostComments] = useState([]);
    const [isCommenting, setIsCommenting] = useState(false);
    const [selectedSort, setSelectedSort] = useState("New");
    const [isLoading, setIsLoading] = useState(true);
  

    const onAddComment = () => {
        setIsCommenting(false);
    }

    useEffect(() => {
        const getSinglepostComments = async (selectedPostId) => {
            const response = await getRequest(`${baseUrl}/post/${selectedPostId}/comments?limit=50&sort=${selectedSort.toLowerCase()}`)
            if (response.status == 200 || response.status == 201) {
                setPostComments([...response.data]);
            }
            setIsLoading(false);
        }

        getSinglepostComments(postId);
    }, [selectedSort]);


    useEffect(() => {
        let closeDropdown = (e) => {
            if (menuRefCateg.current && !menuRefCateg.current.contains(e.target)) {
                setIsOpenCateg(false);
            }
        };
        document.addEventListener("click", closeDropdown);

        const mainfeedElement = document.getElementById("mainfeed");

        const handleScroll = () => {
            const dropdownElement = document.getElementById("mainfeed_comment_category_dropdown");
            const dropdownRect = dropdownElement.getBoundingClientRect();
            const isVisible = dropdownRect.top >= 55 && dropdownRect.bottom <= window.innerHeight - 250;

            if (!isVisible) {
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
    }, []);



    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="w-full flex flex-col px-2">
                    <div
                        id="mainfeed_comment_category_dropdown"
                        ref={menuRefCateg}
                        className="relative w-fit"
                    >
                        <div
                            onClick={() => { setIsOpenCateg((prev) => !prev) }}
                            className={`flex w-14 -ml-1 h-7 rounded-full hover:bg-reddit_search_light ${isOpenCateg ? "bg-reddit_search_light" : ""
                                } justify-center items-center cursor-pointer`} >
                            <p className="text-gray-500 font-semibold text-xs no-select ">
                                {selectedSort}
                            </p>
                            <ChevronDownIcon className="h-3 ml-0.5 w-3 text-gray-400" />
                        </div>

                        {isOpenCateg && (
                            <div id="tempID" className=" w-20 h-60 z-20 bg-reddit_search absolute mt-2.5 -ml-1 text-white text-sm pt-2.5  rounded-lg  font-extralight flex flex-col">
                                <div className="w-full pl-4 rounded-lg h-9 flex items-center font-normal">
                                    <p className="no-select">Sort by</p>
                                </div>

                                <div onClick={() => { setSelectedSort("Best"); setIsOpenCateg(false) }}
                                    id="mainfeed_category_best"
                                    href=""
                                    className="w-full pl-4 hover:bg-reddit_hover h-12 flex items-center cursor-pointer"
                                >
                                    <p className="no-select">Best</p>
                                </div>

                                <div onClick={() => { setSelectedSort("Top"); setIsOpenCateg(false) }}
                                    id="mainfeed_category_hot"
                                    href=""
                                    className="w-full pl-4 hover:bg-reddit_hover h-12 flex items-center cursor-pointer"
                                >
                                    <p className="no-select">Top</p>
                                </div>

                                <div onClick={() => { setSelectedSort("New"); setIsOpenCateg(false) }}
                                    id="mainfeed_category_new"
                                    href=""
                                    className="w-full pl-4  hover:bg-reddit_hover h-12 flex items-center cursor-pointer"
                                >
                                    <p className="no-select">New</p>
                                </div>

                                <div onClick={() => { setSelectedSort("Old"); setIsOpenCateg(false) }}
                                    id="mainfeed_category_top"
                                    href=""
                                    className="w-full pl-4  hover:bg-reddit_hover h-12 flex items-center cursor-pointer"
                                >
                                    <p className="no-select">Old</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <AddComment postId={postId} 
                    setPostComments={setPostComments} 
                    onAddComment={onAddComment} isCommenting={isCommenting} 
                    setIsCommenting={setIsCommenting} 
                    selectedSort={selectedSort}  />

                    {postComments.map((comment, index) => (
                        <PostComment
                            key={index}
                            id={comment._id}
                            {...comment}
                        />
                    ))}

                    {postComments.length == 0 && !isLoading && (
                        <NoComments />
                    )}
                </div>
            )}
        </div>

    );
}

export default Comment;