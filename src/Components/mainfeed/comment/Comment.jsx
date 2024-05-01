import AddComment from "./AddComment";
import { useState, useRef, useEffect, useCallback } from "react";
import PostComment from "./PostComment";
import { ChevronDownIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';
import { baseUrl } from "../../../constants";
import { getRequest } from "../../../services/Requests";
import NoComments from "./NoComments";
import Loading from "@/Components/Loading/Loading";

const Comment = ({ postId }) => {
    const menuRefCateg = useRef();
    const [isOpenCateg, setIsOpenCateg] = useState(false);
    const [postComments, setPostComments] = useState([]);
    const [isCommenting, setIsCommenting] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [paginationError, setPaginationError] = useState(false);
    const [isPaginationLoading, setIsPaginationLoading] = useState(true);
    const [loadingAddComment, setLoadingAddComment] = useState(false);
    const [isSortChanged, setIsSortChanged] = useState(0);
    const observer = useRef();

    const lastCommentElementRef = useCallback(node => {
        if (isPaginationLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
               
            }
        });
        if (node) observer.current.observe(node);

    }, [isPaginationLoading, hasMore]);

    const [selectedSort, setSelectedSort] = useState(() => {
        const storedSort = localStorage.getItem('commentsSelectedSort');
        if (storedSort) {
            return storedSort;
        } else {
            localStorage.setItem('commentsSelectedSort', 'New');
            return 'New';
        }
    });
    const prevSort = useRef(selectedSort);

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
            if (!dropdownElement) return;
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
    });

    const fetchComments = async (postId, page, sort) => {
        const response = await getRequest(`${baseUrl}/post/${postId}/comments?page=${page}&limit=5&sort=${sort.toLowerCase()}`);
        return response;
    }

    useEffect(() => {
        setPostComments([]);
        setPage(1);
        setIsSortChanged(prev => (prevSort.current !== selectedSort ? prev + 1 : prev));
    }, [selectedSort]);


    useEffect(() => {
        const getSinglepostComments = async () => {
            try {
                setHasMore(true);
                setIsPaginationLoading(true);
                const { status, data } = await fetchComments(postId, page, selectedSort);
                if (status === 200 || status === 201) {
                    setPostComments(prevComments => [...prevComments, ...data]);
                    setHasMore(data.length >= 5);
                } else {
                    throw new Error('Error fetching comments');
                }
            } catch (error) {
                setPaginationError(true);
            } finally {
                setIsPaginationLoading(false);
            }
        }

        getSinglepostComments();
        prevSort.current = selectedSort;
    }, [page, isSortChanged]);



    return (
        <div>
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
                        <div id="tempID" className=" w-20 h-48 z-20 bg-reddit_search absolute mt-2.5 -ml-1 text-white text-sm pt-2.5  rounded-lg  font-extralight flex flex-col">
                            <div className="w-full pl-4 rounded-lg h-9 flex items-center font-normal">
                                <p className="no-select">Sort by</p>
                            </div>

                            <div onClick={() => { setSelectedSort("Top"); setIsOpenCateg(false); localStorage.setItem('commentsSelectedSort', "Top"); }}
                                id="mainfeed_category_top"
                                href=""
                                className="w-full pl-4 hover:bg-reddit_hover h-12 flex items-center cursor-pointer"
                            >
                                <p className="no-select">Top</p>
                            </div>

                            <div onClick={() => { setSelectedSort("New"); setIsOpenCateg(false); localStorage.setItem('commentsSelectedSort', "New"); }}
                                id="mainfeed_category_new"
                                href=""
                                className="w-full pl-4  hover:bg-reddit_hover h-12 flex items-center cursor-pointer"
                            >
                                <p className="no-select">New</p>
                            </div>

                            <div onClick={() => { setSelectedSort("Old"); setIsOpenCateg(false); localStorage.setItem('commentsSelectedSort', "Old"); }}
                                id="mainfeed_category_old"
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
                    isCommenting={isCommenting}
                    setIsCommenting={setIsCommenting}
                    setIsPaginationLoading={setIsPaginationLoading}
                    setLoadingAddComment={setLoadingAddComment}
                />

                {

                    <>
                        { !loadingAddComment &&  postComments.map((comment, index) => {
                            if (postComments.length === index + 1) {
                                return <PostComment
                                    key={index}
                                    id={comment._id}
                                    {...comment}
                                    lastCommentElementRef={lastCommentElementRef}
                                />
                            }
                            else {
                                return <PostComment
                                    key={index}
                                    id={comment._id}
                                    {...comment}
                                />
                            }
                        })}

                        {(hasMore && isPaginationLoading || loadingAddComment) && <div className="w-full flex flex-row h-full mt-8">
                            {(
                                <Loading />
                            )}
                        </div>}

                        {
                            page === 1 && !hasMore && postComments.length === 0 && !isPaginationLoading && !loadingAddComment &&
                            <NoComments />
                        }

                    </>
                }
            </div>
        </div>

    );
}

export default Comment;