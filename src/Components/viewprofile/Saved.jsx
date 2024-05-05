import { useEffect, useState, useRef } from "react";
import { getRequest } from "@/services/Requests";
import { baseUrl, profileLimit } from "@/constants";
import Post from "../mainfeed/Post";
import Loading from "../Loading/Loading";

/**
 * Component for displaying the saved posts of a user.
 * @returns {JSX.Element} The JSX element representing the Saved component.
 */
const Saved = () => {
  /**
   * State to store the array of saved posts.
   * @type {Array<Object>}
   */
  const [saved, setSaved] = useState([]);

  /**
   * State to store the current page number of saved posts.
   * @type {number}
   */
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * State to indicate if data is being loaded.
   * @type {boolean}
   */
  const [loading, setLoading] = useState(false);

  /**
   * State to track if there are more saved posts to fetch.
   * @type {boolean}
   */
  const [hasMore, setHasMore] = useState(true);

  /**
   * Ref for IntersectionObserver.
   * @type {React.MutableRefObject<IntersectionObserver>}
   */
  const observer = useRef();

  /**
   * Ref for the last saved post element.
   * @type {React.MutableRefObject<HTMLDivElement>}
   */
  const lastSavedRef = useRef();

  /**
   * Function to increment the current page number.
   */
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  /**
   * Effect hook to fetch saved posts from the server.
   */
  useEffect(() => {
    const getSaved = async () => {
      if (!hasMore) return;
      setLoading(true);
      try {
        const response = await getRequest(
          `${baseUrl}/user/saved?page=${currentPage}&limit=${profileLimit}`
        );
        if (response.status === 200 || response.status === 201) {
          if (response.data.length === 0) {
            setHasMore(false);
          } else {
            setSaved((prevSaved) => [...prevSaved, ...response.data]);
          }
        }
      } catch (error) {
        console.error("Error fetching saved:", error);
      }
      setLoading(false);
    };
    getSaved();
  }, [currentPage, hasMore]);

  /**
   * Effect hook to set up IntersectionObserver to detect when the last saved post becomes visible.
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

    if (lastSavedRef.current) {
      observer.current.observe(lastSavedRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore]);

  return (
    <div id="saved">
      {saved.map((savedItem, index) => {
        if (saved.length === index + 1) {
          return (
            <div key={savedItem._id} ref={lastSavedRef}>
              <Post id={savedItem._id} {...savedItem} />
            </div>
          );
        } else {
          return <Post key={savedItem._id} id={savedItem._id} {...savedItem} />;
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

export default Saved;
