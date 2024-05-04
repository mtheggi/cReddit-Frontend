import { useEffect, useState, useRef } from "react";
import { getRequest } from "@/services/Requests";
import { baseUrl, limit } from "@/constants";
import Post from "../mainfeed/Post";
import Loading from "../Loading/Loading";

const Downvoted = () => {
  const [downvoted, setDownvoted] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();
  const lastDownvotedRef = useRef();

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const getDownvoted = async () => {
      if (!hasMore) return;
      setLoading(true);
      try {
        const response = await getRequest(
          `${baseUrl}/user/downvoted?page=${currentPage}&limit=${limit}`
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
