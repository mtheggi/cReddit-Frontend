import { useEffect, useState, useRef } from "react";
import { getRequest } from "@/services/Requests";
import { baseUrl, limit } from "@/constants";
import Post from "../mainfeed/Post";
import Loading from "../Loading/Loading";

/**
 * Component for displaying the posts submitted by a user.
 * @param {Object} props - The props passed to the Submitted component.
 * @param {Object} props.userInfo - Information about the user.
 * @returns {JSX.Element} The JSX element representing the Submitted component.
 */
const Submitted = ({ userInfo }) => {
  /**
   * State to store the array of submitted posts.
   * @type {Array<Object>}
   */
  const [posts, setPosts] = useState([]);

  /**
   * State to store the current page number of submitted posts.
   * @type {number}
   */
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * State to indicate if data is being loaded.
   * @type {boolean}
   */
  const [loading, setLoading] = useState(false);

  /**
   * State to track if there are more submitted posts to fetch.
   * @type {boolean}
   */
  const [hasMore, setHasMore] = useState(true);

  /**
   * Ref for IntersectionObserver.
   * @type {React.MutableRefObject<IntersectionObserver>}
   */
  const observer = useRef();

  /**
   * Ref for the last submitted post element.
   * @type {React.MutableRefObject<HTMLDivElement>}
   */
  const lastPostRef = useRef();

  /**
   * Function to increment the current page number.
   */
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  /**
   * Effect hook to fetch submitted posts from the server.
   */
  useEffect(() => {
    const getPosts = async () => {
      if (!hasMore) return;
      setLoading(true);
      try {
        const response = await getRequest(
          `${baseUrl}/user/${userInfo.username}/posts?page=${currentPage}&limit=${limit}`
        );
        if (response.status === 200 || response.status === 201) {
          if (response.data.length === 0) {
            setHasMore(false);
          } else {
            setPosts((prevPosts) => [...prevPosts, ...response.data]);
          }
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setLoading(false);
    };

    getPosts();
  }, [currentPage, hasMore]);

  /**
   * Effect hook to set up IntersectionObserver to detect when the last submitted post becomes visible.
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

    if (lastPostRef.current) {
      observer.current.observe(lastPostRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore]);

  return (
    <div id="submitted">
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return (
            <div key={post._id} ref={lastPostRef}>
              <Post id={post._id} {...post} />
            </div>
          );
        } else {
          return <Post key={post._id} id={post._id} {...post} />;
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

export default Submitted;
