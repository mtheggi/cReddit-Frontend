const Overview = () => {
  return (
    <>
      {/** Snoo PlaceHolder */}
      <div className="text-center text-[18px] font-bold flex flex-col items-center justify-center">
        <img
          src="https://www.redditstatic.com/shreddit/assets/hmm-snoo.png"
          alt="Image of a wondering Snoo"
          width="60"
          loading="lazy"
        ></img>
        <div className="text-[#FFFFFF]">
          Welcome to Your Profile Page, Have a walk!
        </div>
      </div>
    </>
  );
};

export default Overview;
