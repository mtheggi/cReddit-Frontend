import { useEffect, useState, useRef } from "react";
import { getRequest } from "@/services/Requests";
import { baseUrl, limit } from "@/constants";
import Post from "../mainfeed/Post";
import Loading from "../Loading/Loading";

const Saved = () => {
  const [saved, setSaved] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();
  const lastSavedRef = useRef();

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const getSaved = async () => {
      if (!hasMore) return;
      setLoading(true);
      try {
        const response = await getRequest(
          `${baseUrl}/user/saved?page=${currentPage}&limit=${limit}`
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
