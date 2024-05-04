import { useEffect, useState, useRef } from "react";
import { getRequest } from "@/services/Requests";
import { baseUrl, limit } from "@/constants";
import Post from "../mainfeed/Post";
import Loading from "../Loading/Loading";

const Hidden = () => {
  const [hidden, setHidden] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();
  const lastHiddenRef = useRef();

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const getHidden = async () => {
      if (!hasMore) return;
      setLoading(true);
      try {
        const response = await getRequest(
          `${baseUrl}/user/hidden-posts?page=${currentPage}&limit=${limit}`
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
    <>
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
    </>
  );
};

export default Hidden;
