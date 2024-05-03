const MessagesFooter = () => {
  return (
    <div className="text-[12px] pt-[40px] clear-both text-center flex justify-center bg-black">
      <div className="border-[#808080] border-[3px] max-w-[600px] rounded-[7px] mb-[50px]">
        <div className="border-none inline-block align-top box-border mx-[25px]">
          <ul className="text-left list-none">
            <li className="text-[#777] text-[18px] font-normal mb-[5px] mt-auto">
              about
            </li>
            <li>
              <a href="https://redditblog.com">blog</a>
            </li>
            <li>
              <a href="https://www.redditinc.com">about</a>
            </li>
            <li>
              <a href="https://www.redditinc.com/advertising">advertising</a>
            </li>
            <li>
              <a href="https://www.redditinc.com/careers">careers</a>
            </li>
          </ul>
        </div>

        <div className="border-none inline-block align-top box-border mx-[25px]">
          <ul className="text-left list-none">
            <li className="text-[#777] text-[18px] font-normal mb-[5px] mt-auto">
              help
            </li>
            <li>
              <a href="https://www.reddit.com/rules/">site rules</a>
            </li>
            <li>
              <a href="https://www.reddithelp.com">Reddit help center</a>
            </li>
            <li>
              <a href="https://www.reddit.com/wiki/reddiquette/">reddiquette</a>
            </li>
            <li>
              <a href="https://www.reddit.com/help/healthycommunities/">
                mod guidelines
              </a>
            </li>
            <li>
              <a href="https://www.reddit.com/contact/">contact us</a>
            </li>
          </ul>
        </div>

        <div className="border-none inline-block align-top box-border mx-[25px]">
          <ul className="text-left list-none">
            <li className="text-[#777] text-[18px] font-normal mb-[5px] mt-auto">
              apps & tools
            </li>
            <li>
              <a href="https://itunes.apple.com/us/app/reddit-the-official-app/id1064216828?mt=8">
                Reddit for iPhone
              </a>
            </li>
            <li>
              <a href="https://play.google.com/store/apps/details?id=com.reddit.frontpage">
                Reddit for Android
              </a>
            </li>
            <li>
              <a href="#">mobile website</a>
            </li>
          </ul>
        </div>

        <div className="border-none inline-block align-top box-border mx-[25px]">
          <ul className="text-left list-none">
            <li className="text-[#777] text-[18px] font-normal mb-[5px] mt-auto">
              &lt;3
            </li>
            <li>
              <a href="https://www.reddit.com/premium/">reddit premium</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MessagesFooter;
