import { useEffect, useState, useRef } from "react";
import { getRequest } from "@/services/Requests";
import { baseUrl, limit } from "@/constants";
import PostComment from "../mainfeed/comment/PostComment";
import Loading from "../Loading/Loading";

const Comments = ({ userInfo }) => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();
  const lastCommentRef = useRef();

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const getComments = async () => {
      if (!hasMore) return;
      setLoading(true);
      try {
        const response = await getRequest(
          `${baseUrl}/user/${userInfo.username}/comments?page=${currentPage}&limit=${limit}`
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
