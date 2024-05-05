import { useEffect, useState, useRef } from "react";
import { getRequest } from "@/services/Requests";
import { baseUrl, profileLimit } from "@/constants";
import Post from "../mainfeed/Post";
import Loading from "../Loading/Loading";

/**
 * Component for displaying the posts upvoted by the user.
 * @returns {JSX.Element} The JSX element representing the Upvoted component.
 */
const Upvoted = () => {
  /**
   * State to store the array of upvoted posts.
   * @type {Array<Object>}
   */
  const [upvoted, setUpvoted] = useState([]);

  /**
   * State to store the current page number of upvoted posts.
   * @type {number}
   */
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * State to indicate if data is being loaded.
   * @type {boolean}
   */
  const [loading, setLoading] = useState(false);

  /**
   * State to track if there are more upvoted posts to fetch.
   * @type {boolean}
   */
  const [hasMore, setHasMore] = useState(true);

  /**
   * Ref for IntersectionObserver.
   * @type {React.MutableRefObject<IntersectionObserver>}
   */
  const observer = useRef();

  /**
   * Ref for the last upvoted post element.
   * @type {React.MutableRefObject<HTMLDivElement>}
   */
  const lastUpvotedRef = useRef();

  /**
   * Function to increment the current page number.
   */
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  /**
   * Effect hook to fetch upvoted posts from the server.
   */
  useEffect(() => {
    const getUpvoted = async () => {
      if (!hasMore) return;
      setLoading(true);
      try {
        const response = await getRequest(
          `${baseUrl}/user/upvoted?page=${currentPage}&limit=${profileLimit}`
        );
        if (response.status === 200 || response.status === 201) {
          if (response.data.length === 0) {
            setHasMore(false);
          } else {
            setUpvoted((prevUpvoted) => [...prevUpvoted, ...response.data]);
          }
        }
      } catch (error) {
        console.error("Error fetching upvoted:", error);
      }
      setLoading(false);
    };

    getUpvoted();
  }, [currentPage, hasMore]);

  /**
   * Effect hook to set up IntersectionObserver to detect when the last upvoted post becomes visible.
   */
  useEffect(() => {
    if (loading) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          nextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (lastUpvotedRef.current) {
      observer.current.observe(lastUpvotedRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore]);

  return (
    <div id="upvoted">
      {upvoted.map((upvotedItem, index) => {
        if (upvoted.length === index + 1) {
          return (
            <div key={upvotedItem._id} ref={lastUpvotedRef}>
              <Post id={upvotedItem._id} {...upvotedItem} />
            </div>
          );
        } else {
          return (
            <Post key={upvotedItem._id} id={upvotedItem._id} {...upvotedItem} />
          );
        }
      })}

      {loading && (
        <div className="my-[24px]">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Upvoted;
