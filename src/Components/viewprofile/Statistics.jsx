const Statistics = ({ views, upvote, downvote, commentCount }) => {
  return (
    <div id="statistics">
      <div className="visible my-[20px]">
        <div className="mt-[8px]">
          <h3 className="text-[12px] font-semibold text-white">
            Lifetime Performance
          </h3>{" "}
          <div className="mt-[6px] flex justify-between px-[50px] py-[20px]">
            <div className="rounded-sm border-solid border-neutral-500 border-[2px] inline-grid justify-items-center py-[4px] px-[16px] text-neutral-content">
              <div className="text-[18px] font-bold text-white no-underline">
                {views}
              </div>
              <span className="inline-flex items-center text-[10px] font-semibold text-neutral-500">
                <svg
                  rpl=""
                  className="mr-[4px]"
                  fill="currentColor"
                  height="20"
                  icon-name="views-outline"
                  viewBox="0 0 20 20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.078 9.691a9.85 9.85 0 0 0-.774 1A8.613 8.613 0 0 1 1.97 9.683 8.192 8.192 0 0 1 .211 7.377a1.94 1.94 0 0 1 0-1.753A8.757 8.757 0 0 1 8.014 1a8.679 8.679 0 0 1 7.735 4.5c.227.43.3.924.205 1.4-.391-.157-.792-.29-1.2-.4a.885.885 0 0 0-.106-.412A7.43 7.43 0 0 0 8.014 2.25a7.5 7.5 0 0 0-6.689 3.941.7.7 0 0 0 0 .619 6.938 6.938 0 0 0 1.49 1.953c.388.353.81.664 1.263.928Zm1.635-2.6a2.217 2.217 0 0 1 .222-1.71A2.352 2.352 0 0 1 7.4 4.278c.202-.051.408-.078.616-.078a2.372 2.372 0 0 1 2.3 1.709c.029.113.048.228.06.344.411-.062.826-.1 1.242-.113a3.513 3.513 0 0 0-.1-.563A3.648 3.648 0 0 0 7.08 3.069a3.592 3.592 0 0 0-2.227 1.686 3.442 3.442 0 0 0 .286 3.893c.314-.27.644-.52.988-.75a2.268 2.268 0 0 1-.413-.808v.001Zm11.893 9.889a8.198 8.198 0 0 0 2-2.488A2.142 2.142 0 0 0 19.6 12.5 8.499 8.499 0 0 0 12 8a8.586 8.586 0 0 0-7.67 4.628 1.968 1.968 0 0 0 0 1.745 8.176 8.176 0 0 0 1.726 2.306 8.78 8.78 0 0 0 11.551.3v.001Zm.89-3.9a.899.899 0 0 1 0 .833c-.422.808-1 1.524-1.7 2.108a7.527 7.527 0 0 1-9.89-.254 6.926 6.926 0 0 1-1.464-1.954.716.716 0 0 1 0-.626A7.328 7.328 0 0 1 12 9.25a7.262 7.262 0 0 1 6.5 3.83h-.003Zm-5.572 3.849a3.546 3.546 0 0 0 2.175-1.663 3.508 3.508 0 0 0 .352-2.687 3.588 3.588 0 0 0-5.632-1.897 3.543 3.543 0 0 0-.92 1.051 3.506 3.506 0 0 0-.352 2.686 3.582 3.582 0 0 0 4.377 2.51Zm1.322-4.024a2.265 2.265 0 0 1-.227 1.735 2.306 2.306 0 0 1-1.42 1.081 2.334 2.334 0 0 1-2.849-1.628 2.265 2.265 0 0 1 .227-1.735 2.298 2.298 0 0 1 1.416-1.08 2.357 2.357 0 0 1 2.018.395c.406.308.7.74.835 1.232Z"></path>
                </svg>
                Total Views
              </span>
            </div>
            <div className="rounded-sm border-solid border-neutral-500 border-[2px] inline-grid justify-items-center py-[4px] px-[16px] text-neutral-content">
              <div className="text-[18px] font-bold text-white no-underline">
                {Math.round((upvote / (upvote + downvote)) * 100)}%
              </div>
              <span className="inline-flex items-center text-[10px] font-semibold text-neutral-500">
                <svg
                  rpl=""
                  className="mr-[4px]"
                  fill="currentColor"
                  height="20"
                  icon-name="upvotes-outline"
                  viewBox="0 0 20 20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.674 14.693h-2.35V8.66H1.858L6.5 3.247 9.12 6.3l.83-.953-2.595-3.024a1.16 1.16 0 0 0-1.709 0L.38 8.466a.875.875 0 0 0 .664 1.445h3.031v4.907A1.127 1.127 0 0 0 5.2 15.943h2.6a1.128 1.128 0 0 0 1.125-1.125v-1.613h-1.25v1.488ZM14.8 18h-2.6a1.128 1.128 0 0 1-1.125-1.125v-4.907h-3.03a.876.876 0 0 1-.665-1.445l5.266-6.143a1.16 1.16 0 0 1 1.71 0l5.265 6.144a.875.875 0 0 1-.664 1.444h-3.032v4.907A1.127 1.127 0 0 1 14.8 18Zm-2.475-1.25h2.35v-6.032h3.466L13.5 5.3l-4.64 5.418h3.464v6.032Z"></path>
                </svg>
                Upvote Rate
              </span>
            </div>
            <div className="rounded-sm border-solid border-neutral-500 border-[2px] inline-grid justify-items-center py-[4px] px-[16px] text-neutral-content">
              <div className="text-[18px] font-bold text-white no-underline">
                {commentCount}
              </div>
              <span className="inline-flex items-center text-[10px] font-semibold text-neutral-500">
                <svg
                  rpl=""
                  className="mr-[4px]"
                  fill="currentColor"
                  height="20"
                  icon-name="comments-outline"
                  viewBox="0 0 20 20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3.625 12.069v1.25A2.98 2.98 0 0 1 1 10.349V4a2.985 2.985 0 0 1 2.958-3h8.084a2.969 2.969 0 0 1 2.92 2.625h-1.255a1.72 1.72 0 0 0-1.665-1.375H3.958A1.734 1.734 0 0 0 2.25 4v6.345a1.746 1.746 0 0 0 1.375 1.724Zm10.4 4.89h2.021A2.962 2.962 0 0 0 19 14V7.959A2.962 2.962 0 0 0 16.042 5H7.958A2.962 2.962 0 0 0 5 7.959V14a2.962 2.962 0 0 0 2.958 2.959h2.494l-.028 1.478a.719.719 0 0 0 .41.661l.46.158 2.731-2.297ZM10.8 18.04h-.005.005Zm5.242-11.79a1.711 1.711 0 0 1 1.708 1.709V14a1.711 1.711 0 0 1-1.708 1.709h-2.478L11.7 17.283l.031-1.574H7.958A1.71 1.71 0 0 1 6.25 14V7.959A1.711 1.711 0 0 1 7.958 6.25h8.084Z"></path>
                </svg>
                Comments
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
