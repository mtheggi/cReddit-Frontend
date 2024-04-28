import { useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import { getRequest } from '@/services/Requests';
import SearchFeedPeopleRow from "./SearchFeedPeopleRow";
import { baseUrl } from '@/constants';
import Separator from "../sidebar/Nav-Icons/Separator";
import SearchFeedCommunitiesRow from "./SearchFeedCommunitiesRow";
import SearchFeedPosts from "./SearchFeedPosts";
import Loading from "../Loading/Loading";
import NoResults from "./NoResults";
import SearchFeedComments from "./SearchFeedComments";




const SearchFeed = () => {
    const location = useLocation();
    const [peopleSearchResults, setPeopleSearchResults] = useState([]);
    const [communitiesSearchResults, setCommunitiesSearchResults] = useState([]);
    const [commentsSearchResults, setCommentsSearchResults] = useState([]);
    const [postsSearchResults, setPostsSearchResults] = useState([]);
    const { query } = useParams();
    const { type } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [pathChanged, setPathChanged] = useState(0);
    const prevPath = useRef(location.pathname);

    const observer = useRef();
    const lastElementRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);

    }, [isLoading, hasMore]);




    useEffect(() => {

        // if (type == 'people')
        setPeopleSearchResults([]);
        // else if (type == 'communities')
        setCommunitiesSearchResults([]);
        // else if (type == 'comments')
        setCommentsSearchResults([]);
        // else if (type == 'posts')
        setPostsSearchResults([]);

        setPage(1);
        setPathChanged(prev => (prevPath.current === location.pathname ? prev : prev + 1));
        console.log("empty results");
    }, [location.pathname]);



    useEffect(() => {
        const getSearchResults = async (query) => {
            if (query.length == 0)
                return;

            try {
                setHasMore(true);
                setIsLoading(true);
                const response = await getRequest(`${baseUrl}/search/${type == "people" ? "users" : type}?page=${[page]}&limit=10&query=${query}&autocomplete=false`);
                if (response.status == 200 || response.status == 201) {
                    if (type == "people") {
                        setPeopleSearchResults(prevResults => [...prevResults, ...response.data]);
                    }
                    else if (type == "communities") {
                        setCommunitiesSearchResults(prevResults => [...prevResults, ...response.data]);

                    }
                    else if (type == "posts") {
                        setPostsSearchResults(prevResults => [...prevResults, ...response.data]);

                    }
                    else if (type == "comments") {
                        setCommentsSearchResults(prevResults => [...prevResults, ...response.data]);
                    }
                    setHasMore(response.data.length >= 9);
                }
            } catch (error) {

            }
            finally {
                setIsLoading(false);
            }
        }
        if (location.pathname.includes("search") && (location.pathname.endsWith("/people") || location.pathname.endsWith("/communities") || location.pathname.endsWith("/posts") || location.pathname.endsWith("/comments"))) {
            getSearchResults(query);
            prevPath.current = location.pathname;
            console.log("get new results");
        }
    }, [page, pathChanged]);









    return (
        <div id="search_feed" className="flex-col flex w-full mt-2.5 ">

            <div id="search_content_map" className="flex-col max-w-[745px] flex">
                {location.pathname.endsWith("/people") &&
                    (( page == 1 && !isLoading && !hasMore && peopleSearchResults.length == 0)
                        ? <NoResults query={query}/>
                        :
                        peopleSearchResults.map((person, index) => {
                            if (peopleSearchResults.length === index + 1) {
                                return <SearchFeedPeopleRow key={index} {...person} lastElementRef={lastElementRef} />
                            }
                            else {
                                return <SearchFeedPeopleRow key={index} {...person} />
                            }

                        })
                    )


                }

                {location.pathname.endsWith("/communities") && (( page == 1 && !isLoading && !hasMore && communitiesSearchResults.length == 0)
                    ? <NoResults query={query}/>
                    :
                    communitiesSearchResults.map((community, index) => {
                        if (communitiesSearchResults.length === index + 1) {
                            return <SearchFeedCommunitiesRow key={index} {...community} lastElementRef={lastElementRef} />
                        }
                        else {
                            return <SearchFeedCommunitiesRow key={index} {...community} />
                        }
                    })
                )
                }

                {location.pathname.endsWith("/posts") && 
                    ((page == 1 && !isLoading && !hasMore && postsSearchResults.length == 0)
                        ? <NoResults query={query}/>
                        :
                        postsSearchResults.map((post, index) => {
                            if (postsSearchResults.length === index + 1) {
                                return <SearchFeedPosts key={index} {...post} lastElementRef={lastElementRef} />
                            }
                            else {
                                return <SearchFeedPosts key={index} {...post} />
                            }
                        })
                    )
                }

                {location.pathname.endsWith("/comments") &&
                    commentsSearchResults.map((comment, index) => {
                        if (commentsSearchResults.length === index + 1) {
                            return <SearchFeedComments key={index} {...comment} lastElementRef={lastElementRef} />
                        }
                        else {
                            return <SearchFeedComments key={index} {...comment} />
                        }
                    })
                }

            </div>

            {isLoading && hasMore &&
                <div className={`w-full ${page == 1 ? 'h-screen -mt-[130px]' : 'h-30'} flex flex-row justify-center items-center`}>
                    <Loading />
                </div>
            }

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

export default SearchFeed;