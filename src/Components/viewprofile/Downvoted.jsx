import { useEffect, useState, useRef } from "react";
import { getRequest } from "@/services/Requests";
import { baseUrl, profileLimit } from "@/constants";
import Post from "../mainfeed/Post";
import Loading from "../Loading/Loading";

/**
 * Renders a list of downvoted posts for the user.
 * @module Downvoted
 * @returns {JSX.Element} A React component representing a list of downvoted posts.
 */
const Downvoted = () => {
  /**
   * State to hold the list of downvoted posts.
   * @type {[Object[], Function]}
   */
  const [downvoted, setDownvoted] = useState([]);

  /**
   * State to track the current page of downvoted posts.
   * @type {[number, Function]}
   */
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * State to indicate whether downvoted posts are being loaded.
   * @type {[boolean, Function]}
   */
  const [loading, setLoading] = useState(false);

  /**
   * State to indicate whether there are more downvoted posts to fetch.
   * @type {[boolean, Function]}
   */
  const [hasMore, setHasMore] = useState(true);

  /**
   * Ref to observe the last downvoted post element for lazy loading.
   * @type {Object}
   */
  const observer = useRef();

  /**
   * Ref to the last downvoted post element in the list.
   * @type {Object}
   */
  const lastDownvotedRef = useRef();

  /**
   * Function to load the next page of downvoted posts.
   * @returns {void}
   */
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    /**
     * Fetches downvoted posts from the server.
     * @returns {void}
     */
    const getDownvoted = async () => {
      if (!hasMore) return;
      setLoading(true);
      try {
        const response = await getRequest(
          `${baseUrl}/user/downvoted?page=${currentPage}&limit=${profileLimit}`
        );
        if (response.status === 200 || response.status === 201) {
          if (response.data.length === 0) {
            setHasMore(false);
          } else {
            setDownvoted((prevDownvoted) => [
              ...prevDownvoted,
              ...response.data,
            ]);
          }
        }
      } catch (error) {
        console.error("Error fetching downvoted:", error);
      }
      setLoading(false);
    };

    getDownvoted();
  }, [currentPage, hasMore]);

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

    if (lastDownvotedRef.current) {
      observer.current.observe(lastDownvotedRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore]);

  return (
    <div id="downvoted">
      {downvoted.map((downvotedItem, index) => {
        if (downvoted.length === index + 1) {
          return (
            <div key={downvotedItem._id} ref={lastDownvotedRef}>
              <Post id={downvotedItem._id} {...downvotedItem} />
            </div>
          );
        } else {
          return (
            <Post
              key={downvotedItem._id}
              id={downvotedItem._id}
              {...downvotedItem}
            />
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

export default Downvoted;
