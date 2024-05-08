import { useEffect, useState, useRef } from "react";
import { getRequest } from "@/services/Requests";
import { baseUrl, profileLimit } from "@/constants";
import Post from "../mainfeed/Post";
import PostComment from "../mainfeed/comment/PostComment";
import Statistics from "./Statistics";
import Loading from "../Loading/Loading";

/**
 * Renders a list of posts or comments for the user's overview.
 * @module Overview
 * @returns {JSX.Element} A React component representing a list of posts or comments.
 */
const Overview = ({ userInfo }) => {
  /**
   * State to hold the list of overview items.
   * @type {Array<Object>}
   */
  const [overview, setOverview] = useState([]);

  /**
   * State to track the current page number of overview items.
   * @type {number}
   */
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * State to indicate if data is being loaded.
   * @type {boolean}
   */
  const [loading, setLoading] = useState(false);

  /**
   * State to indicate whether there are more overview items to fetch.
   * @type {boolean}
   */
  const [hasMore, setHasMore] = useState(true);

  /**
   * Ref for IntersectionObserver.
   * @type {React.MutableRefObject<IntersectionObserver>}
   */
  const observer = useRef();

  /**
   * Ref for the last overview item element.
   * @type {React.MutableRefObject<HTMLDivElement>}
   */
  const lastOverviewRef = useRef();

  /**
   * Function to load the next page of overview items.
   */
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    /**
     * Fetches overview items from the server.
     */
    const getOverview = async () => {
      if (!hasMore) return;
      setLoading(true);
      try {
        const response = await getRequest(
          `${baseUrl}/user/${userInfo.username}/overview?page=${currentPage}&limit=${profileLimit}`
        );
        if (response.status === 200 || response.status === 201) {

          if (response.data.length === 0) {
            setHasMore(false);
          } else {
            setOverview((prevOverview) => [...prevOverview, ...response.data]);
          }
        }
      } catch (error) {
        console.error("Error fetching overview:", error);
      }
      setLoading(false);
    };

    getOverview();
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

    if (lastOverviewRef.current) {
      observer.current.observe(lastOverviewRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore]);

  return (
    <div id="overview">
      {overview.map((overviewItem, index) => {
        if (overview.length === index + 1) {
          if (overviewItem.type === "Comment") {
            return (
              <div key={overviewItem._id} ref={lastOverviewRef}>
                <PostComment id={overviewItem._id} {...overviewItem} />
              </div>
            );
          } else {
            return (
              <div key={overviewItem._id} ref={lastOverviewRef}>
                <Post id={overviewItem._id} {...overviewItem} />
                <Statistics
                  views={overviewItem.views}
                  upvote={overviewItem.upvote}
                  netVote={overviewItem.netVote}
                  commentCount={overviewItem.commentCount}
                />
              </div>
            );
          }
        } else {
          if (overviewItem.type === "Comment") {
            return (
              <PostComment
                key={overviewItem._id}
                id={overviewItem._id}
                {...overviewItem}
              />
            );
          } else {
            return (
              <div key={overviewItem._id}>
                <Post id={overviewItem._id} {...overviewItem} />
                <Statistics
                  views={overviewItem.views}
                  upvote={overviewItem.upvote}
                  downvote={overviewItem.downvote}
                  commentCount={overviewItem.commentCount}
                />
              </div>
            );
          }
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

export default Overview;
