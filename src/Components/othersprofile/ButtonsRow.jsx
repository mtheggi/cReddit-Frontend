import { useNavigate } from "react-router-dom";
const ButtonsRow = ({ selectedPage, setSelectedPage, userName }) => {
    const navigate = useNavigate();

    return (
        <div id="profile-buttons-row" className="flex w-full flex-row justify-start px-0 py-3">
            <button onClick={() => { setSelectedPage('overview'); navigate(`/user/${userName}/`); }} className={"overview-profile-button ml-4 py-2 px-4 rounded-3xl text-white text-md font-bold hover:underline " + (selectedPage == 'overview' ? 'bg-reddit_search_light' : "")}>overview</button>
            <button onClick={() => { setSelectedPage('submitted'); navigate(`/user/${userName}/submitted`); }} className={"posts-profile-button ml-4 py-2 px-4 rounded-3xl text-white text-md font-bold hover:underline " + (selectedPage == 'submitted' ? 'bg-reddit_search_light' : "")}>posts</button>
            <button onClick={() => { setSelectedPage('comments'); navigate(`/user/${userName}/comments`); }} className={"comments-profile-button ml-4 py-2 px-4 rounded-3xl text-white text-md font-bold hover:underline " + (selectedPage == 'comments' ? 'bg-reddit_search_light' : "")}>comments</button>
        </div>
    );
}

export default ButtonsRow;