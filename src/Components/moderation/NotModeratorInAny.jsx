/**
 * NoComments is a React component that displays a message when there are no comments on a post.
 * It shows an image and a text saying "Be the first to comment", along with a suggestion to add thoughts and start the conversation.
 *
 * @component
 */
function NotModeratorInAny() {
    return (
      <div className="w-full mt-9 mb-3 justify-center -ml-12 flex flex-row">
        <div className="w-13">
          <img
            src="https://www.redditstatic.com/shreddit/assets/thinking-snoo.png"
            srcSet=""
            sizes=""
            alt="Thinking Snoo"
          ></img>
        </div>
        <div className="ml-5">
          <p className="text-white text-[22px] font-medium mt-1">
            You are not a moderator in any community
          </p>
          <div className="text-gray-400 text-[15px] xs:text-sm mt-3">
            <p>Become a moderator in a community or create one, </p>
          </div>
        </div>
      </div>
    );
  }
  
  export default NotModeratorInAny;
  