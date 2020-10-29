import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = (props) => {
  const { itemCount, itemPageLimit, currentPage, onPageChange } = props;
  const pageCount = itemCount / itemPageLimit;
  const pages = _.range(1, pageCount + 1);

  return (
    pageCount > 1 && (
      <nav aria-label="Movie Results Pages" style={{ cursor: "pointer" }}>
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link">Previous</button>
          </li>
          {pages.map((page) => {
            return (
              <li
                key={page}
                className={
                  page === currentPage ? "page-item active" : "page-item"
                }
              >
                <button
                  className="page-link"
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              </li>
            );
          })}
          <li className="page-item">
            <button className="page-link">Next</button>
          </li>
        </ul>
      </nav>
    )
  );
};

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  itemPageLimit: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
