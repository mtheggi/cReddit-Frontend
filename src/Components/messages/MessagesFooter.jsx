/**
 * Component for the footer of the messages page.
 * @returns {JSX.Element} JSX element representing the messages footer component.
 */
const MessagesFooter = () => {
  return (
    <div className="text-[10px] pt-[40px] clear-both text-center flex justify-center bg-black">
      <div className="border-[#808080] border-[3px] max-w-[700px] 2xs:w-full w-[700px] rounded-[7px] mb-[50px] flex flex-row">
        <div className="inline-block align-top box-border px-[25px] my-[15px] w-[25%]">
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

        <div className="inline-block align-top box-border px-[25px] my-[15px] border-r-[#808080] border-l-[#808080] border-y-0 border-l-[2px] border-r-[1px] w-[25%]">
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

        <div className="inline-block align-top box-border px-[25px] my-[15px] border-r-[#808080] border-l-[#808080] border-y-0 border-r-[2px] border-l-[1px] w-[25%]">
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

        <div className="inline-block align-top box-border px-[25px] my-[15px] w-[25%]">
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
