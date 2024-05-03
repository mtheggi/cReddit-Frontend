import { useNavigate } from "react-router-dom";

const MyButtonsRow = ({ selectedPage, setSelectedPage, userName }) => {
  const navigate = useNavigate();

  return (
    <div
      id="profile-buttons-row"
      className="flex flex-row justify-start px-0 py-3 overflow-scroll"
    >
      <button
        onClick={() => {
          setSelectedPage("overview");
          navigate(`/my-user/${userName}/`);
        }}
        className={
          "overview-profile-button ml-4 py-2 px-4 rounded-3xl text-white text-md font-bold hover:underline " +
          (selectedPage == "overview" ? "bg-reddit_search_light" : "")
        }
      >
        overview
      </button>

      <button
        onClick={() => {
          setSelectedPage("submitted");
          navigate(`/my-user/${userName}/submitted`);
        }}
        className={
          "posts-profile-button ml-4 py-2 px-4 rounded-3xl text-white text-md font-bold hover:underline " +
          (selectedPage == "submitted" ? "bg-reddit_search_light" : "")
        }
      >
        posts
      </button>

      <button
        onClick={() => {
          setSelectedPage("comments");
          navigate(`/my-user/${userName}/comments`);
        }}
        className={
          "comments-profile-button ml-4 py-2 px-4 rounded-3xl text-white text-md font-bold hover:underline " +
          (selectedPage == "comments" ? "bg-reddit_search_light" : "")
        }
      >
        comments
      </button>

      <button
        onClick={() => {
          setSelectedPage("saved");
          navigate(`/my-user/${userName}/saved`);
        }}
        className={
          "posts-profile-button ml-4 py-2 px-4 rounded-3xl text-white text-md font-bold hover:underline " +
          (selectedPage == "saved" ? "bg-reddit_search_light" : "")
        }
      >
        Saved
      </button>

      <button
        onClick={() => {
          setSelectedPage("hidden");
          navigate(`/my-user/${userName}/hidden`);
        }}
        className={
          "posts-profile-button ml-4 py-2 px-4 rounded-3xl text-white text-md font-bold hover:underline " +
          (selectedPage == "hidden" ? "bg-reddit_search_light" : "")
        }
      >
        Hidden
      </button>

      <button
        onClick={() => {
          setSelectedPage("upvoted");
          navigate(`/my-user/${userName}/upvoted`);
        }}
        className={
          "posts-profile-button ml-4 py-2 px-4 rounded-3xl text-white text-md font-bold hover:underline " +
          (selectedPage == "upvoted" ? "bg-reddit_search_light" : "")
        }
      >
        Upvoted
      </button>

      <button
        onClick={() => {
          setSelectedPage("downvoted");
          navigate(`/my-user/${userName}/downvoted`);
        }}
        className={
          "posts-profile-button ml-4 py-2 px-4 rounded-3xl text-white text-md font-bold hover:underline " +
          (selectedPage == "downvoted" ? "bg-reddit_search_light" : "")
        }
      >
        Downvoted
      </button>
    </div>
  );
};

export default MyButtonsRow;
