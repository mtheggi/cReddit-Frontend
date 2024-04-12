import Navbar from "../navbar/Navbar";
import CommunitiesSection from "./CommunitiesSection";

/**
 * React component representing a page displaying top communities.
 * @returns {JSX.Element} React component.
 */
const TopCommunities = () => {
  return (
    <>
      <div id="Top-Communities" className="bg-[#0b1416] min-w-[350px]">
        <CommunitiesSection />
      </div>
    </>
  );
};

export default TopCommunities;
