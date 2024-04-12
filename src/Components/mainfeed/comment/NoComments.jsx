function NoComments() {
  return (
    <div className="w-full mt-9 mb-3 flex flex-row">
      <div className="w-13">
        <img
          src="https://www.redditstatic.com/shreddit/assets/thinking-snoo.png"
          srcSet=""
          sizes=""
          alt="Thinking Snoo"
        ></img>
      </div>
      <div className="ml-5">
        <p className="text-white text-lg font-medium mt-1">
          Be the first to comment
        </p>
        <div className="text-gray-400 text-[13px] xs:text-sm mt-3">
          <p>No responds to this post yet, Add your </p>
          <p> thoughts and get the conversation going.</p>
        </div>
      </div>
    </div>
  );
}

export default NoComments;
