import React from "react";

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
