import { useEffect, useState, useRef } from "react";
import { getRequest } from "@/services/Requests";
import { baseUrl, limit } from "@/constants";
import Post from "../mainfeed/Post";
import Loading from "../Loading/Loading";

const Upvoted = () => {
  const [upvoted, setUpvoted] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();
  const lastUpvotedRef = useRef();

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const getUpvoted = async () => {
      if (!hasMore) return;
      setLoading(true);
      try {
        const response = await getRequest(
          `${baseUrl}/user/upvoted?page=${currentPage}&limit=${limit}`
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
