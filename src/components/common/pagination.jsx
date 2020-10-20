import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { itemCount, itemPageLimit, currentPage, onPageChange } = props;
  const pageCount = itemCount / itemPageLimit;
  const pages = _.range(1, pageCount + 1);

  return (
    pageCount > 1 && (
      <nav aria-label="Movie Results Pages" style={{ cursor: "pointergit" }}>
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link">Previous</a>
          </li>
          {pages.map((page) => {
            return (
              <li
                key={page}
                className={
                  page === currentPage ? "page-item active" : "page-item"
                }
              >
                <a className="page-link" onClick={() => onPageChange(page)}>
                  {page}
                </a>
              </li>
            );
          })}
          <li className="page-item">
            <a className="page-link">Next</a>
          </li>
        </ul>
      </nav>
    )
  );
};

export default Pagination;
