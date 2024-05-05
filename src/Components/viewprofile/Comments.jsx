import { useEffect, useState, useRef } from "react";
import { getRequest } from "@/services/Requests";
import { baseUrl, profileLimit } from "@/constants";
import PostComment from "../mainfeed/comment/PostComment";
import Loading from "../Loading/Loading";

/**
 * Renders a list of comments for a user.
 * @module Comments
 * @param {Object} props - The component props.
 * @param {Object} props.userInfo - Information about the user.
 * @returns {JSX.Element} A React component representing a list of comments.
 */
const Comments = ({ userInfo }) => {
  /**
   * State to hold the list of comments.
   * @type {[Object[], Function]}
   */
  const [comments, setComments] = useState([]);

  /**
   * State to track the current page of comments.
   * @type {[number, Function]}
   */
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * State to indicate whether comments are being loaded.
   * @type {[boolean, Function]}
   */
  const [loading, setLoading] = useState(false);

  /**
   * State to indicate whether there are more comments to fetch.
   * @type {[boolean, Function]}
   */
  const [hasMore, setHasMore] = useState(true);

  /**
   * Ref to observe the last comment element for lazy loading.
   * @type {Object}
   */
  const observer = useRef();

  /**
   * Ref to the last comment element in the list.
   * @type {Object}
   */
  const lastCommentRef = useRef();

  /**
   * Function to load the next page of comments.
   * @returns {void}
   */
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    /**
     * Fetches comments from the server.
     * @returns {void}
     */
    const getComments = async () => {
      if (!hasMore) return;
      setLoading(true);
      try {
        const response = await getRequest(
          `${baseUrl}/user/${userInfo.username}/comments?page=${currentPage}&limit=${profileLimit}`
        );
        if (response.status === 200 || response.status === 201) {
          if (response.data.length === 0) {
            setHasMore(false);
          } else {
            setComments((prevComments) => [...prevComments, ...response.data]);
          }
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
      setLoading(false);
    };
    getComments();
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

    if (lastCommentRef.current) {
      observer.current.observe(lastCommentRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore]);

  return (
    <div id="comments">
      {comments.map((comment, index) => {
        if (comments.length === index + 1) {
          return (
            <div key={comment._id} ref={lastCommentRef}>
              <PostComment id={comment._id} {...comment} />
            </div>
          );
        } else {
          return (
            <PostComment key={comment._id} id={comment._id} {...comment} />
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

export default Comments;
