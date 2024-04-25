const ButtonsRow = ({ selectedPage, setSelectedPage }) => {

    return (
        <div id="profile-buttons-row" className="flex flex-row justify-start px-0 py-3">
            <button onClick={() => { setSelectedPage('overview') }} className={"overview-profile-button ml-4 py-2 px-4 rounded-3xl text-white text-md font-bold hover:underline " + (selectedPage == 'overview' ? 'bg-reddit_search_light' : "")}>overview</button>
            <button onClick={() => { setSelectedPage('submitted') }} className={"posts-profile-button ml-4 py-2 px-4 rounded-3xl text-white text-md font-bold hover:underline " + (selectedPage == 'submitted' ? 'bg-reddit_search_light' : "")}>posts</button>
            <button onClick={() => { setSelectedPage('comments') }} className={"comments-profile-button ml-4 py-2 px-4 rounded-3xl text-white text-md font-bold hover:underline " + (selectedPage == 'comments' ? 'bg-reddit_search_light' : "")}>comments</button>
        </div>
    );
}

export default ButtonsRow;