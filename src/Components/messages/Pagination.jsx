import React from "react";

/**
 * Component for pagination.
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.currentPage - The current page number.
 * @param {boolean} props.hasMoreContent - Indicates if there is more content to display.
 * @param {Function} props.onNextPage - Function to handle moving to the next page.
 * @param {Function} props.onPrevPage - Function to handle moving to the previous page.
 * @returns {JSX.Element} JSX element representing the pagination component.
 */
const Pagination = ({
  currentPage,
  hasMoreContent,
  onNextPage,
  onPrevPage,
}) => {
  return (
    <div className="flex justify-center items-center w-full my-[20px]">
      <div className="flex justify-between items-center w-[32%]">
        <button
          className="flex justify-center items-center w-[30px] h-[30px] rounded-full transition-all duration-[200ms] hover:bg-white hover:text-black"
          onClick={onPrevPage}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <span>Page {currentPage}</span>
        <button
          className="flex justify-center items-center w-[30px] h-[30px] rounded-full transition-all duration-[200ms] hover:bg-white hover:text-black"
          onClick={onNextPage}
          disabled={!hasMoreContent}
        >
          {" "}
          {">"}{" "}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
