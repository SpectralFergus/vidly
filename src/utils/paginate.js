import _ from "lodash";

export function paginateMovies(movies, currentPage, itemLimit) {
  const startIndex = currentPage - 1 * itemLimit;
  return _(movies).slice(startIndex).take(itemLimit).value();
}
