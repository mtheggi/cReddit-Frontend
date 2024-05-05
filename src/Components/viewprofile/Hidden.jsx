import { useEffect, useState, useRef } from "react";
import { getRequest } from "@/services/Requests";
import { baseUrl, profileLimit } from "@/constants";
import Post from "../mainfeed/Post";
import Loading from "../Loading/Loading";

/**
 * Renders a list of hidden posts for the user.
 * @module Hidden
 * @returns {JSX.Element} A React component representing a list of hidden posts.
 */
const Hidden = () => {
  /**
   * State to hold the list of hidden posts.
   * @type {[Object[], Function]}
   */
  const [hidden, setHidden] = useState([]);

  /**
   * State to track the current page of hidden posts.
   * @type {[number, Function]}
   */
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * State to indicate whether hidden posts are being loaded.
   * @type {[boolean, Function]}
   */
  const [loading, setLoading] = useState(false);

  /**
   * State to indicate whether there are more hidden posts to fetch.
   * @type {[boolean, Function]}
   */
  const [hasMore, setHasMore] = useState(true);

  /**
   * Ref to observe the last hidden post element for lazy loading.
   * @type {Object}
   */
  const observer = useRef();

  /**
   * Ref to the last hidden post element in the list.
   * @type {Object}
   */
  const lastHiddenRef = useRef();

  /**
   * Function to load the next page of hidden posts.
   * @returns {void}
   */
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    /**
     * Fetches hidden posts from the server.
     * @returns {void}
     */
    const getHidden = async () => {
      if (!hasMore) return;
      setLoading(true);
      try {
        const response = await getRequest(
          `${baseUrl}/user/hidden-posts?page=${currentPage}&limit=${profileLimit}`
        );
        if (response.status === 200 || response.status === 201) {
          if (response.data.length === 0) {
            setHasMore(false);
          } else {
            setHidden((prevHidden) => [...prevHidden, ...response.data]);
          }
        }
      } catch (error) {
        console.error("Error fetching hidden:", error);
      }
      setLoading(false);
    };
    getHidden();
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

    if (lastHiddenRef.current) {
      observer.current.observe(lastHiddenRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore]);

  return (
    <div id="saved">
      {hidden.map((hiddenItem, index) => {
        if (hidden.length === index + 1) {
          return (
            <div key={hiddenItem._id} ref={lastHiddenRef}>
              <Post id={hiddenItem._id} {...hiddenItem} />
            </div>
          );
        } else {
          return (
            <Post key={hiddenItem._id} id={hiddenItem._id} {...hiddenItem} />
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

export default Hidden;
