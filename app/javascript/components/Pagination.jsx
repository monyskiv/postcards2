import React from "react";
import PropTypes from "prop-types";

function Pagination({
  currentPage,
  totalPostcards,
  postcardsPerPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalPostcards / postcardsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getVisiblePageNumbers = () => {
    if (totalPages <= 10) {
      return createRange(1, totalPages);
    }

    if (currentPage <= 6) {
      const lastPageBeforeEllipsis = 8;
      return [...createRange(1, lastPageBeforeEllipsis), "...", totalPages];
    }

    if (currentPage >= totalPages - 5) {
      return [1, "...", ...createRange(totalPages - 8, totalPages)];
    }

    return [1, "...", ...createMiddlePages(), "...", totalPages];
  };

  const createMiddlePages = () => {
    const middlePagesStart = Math.max(2, currentPage - 3);
    const middlePagesEnd = Math.min(currentPage + 3, totalPages - 1);

    return createRange(middlePagesStart, middlePagesEnd);
  };

  const createRange = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  };

  return (
    <div>
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>

      {getVisiblePageNumbers().map((page, index) => 
        typeof page === "number" ? (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ) : (
          <span key={`ellipses-${index}`} style={{ margin: "0 5px" }}>
            {page}
          </span>
        )
      )}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        Next
      </button>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPostcards: PropTypes.number.isRequired,
  postcardsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
