
/**
 * `HiddenPost` is a functional component that renders a hidden post with an undo button.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string|number} props.id - The unique identifier of the post.
 * @param {Function} props.handleHidePost - The function to be called when the undo button is clicked.
 * @returns {JSX.Element} The rendered React element.
 */
const HiddenPost = ({ id, handleHidePost }) => {
    return (
        <div
            id={"hidden_" + id + "_full"}
            className={`flex flex-col h-20 bg-reddit_hover px-3 pt-1 mt-1 pb-1 rounded-2xl w-full`}
        >
            <div className="flex flex-row justify-between p-3 items-center">
                <p className="font-bold text-white">Post hidden</p>
                <button id={"undo-hide-" + id} onClick={handleHidePost} className="text-white font-bold w-16 h-10 bg-reddit_search hover:bg-reddit_light_undo p-2 rounded-2xl text-sm">Undo</button>
            </div>
        </div>
    );
}

export default HiddenPost;