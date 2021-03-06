import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginateMovies } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import SearchBox from "./searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    itemPageLimit: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { criteria: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => movie._id !== m._id);
    this.setState({ movies });
  };

  handleLikeClick = (movie) => {
    const movies = [...this.state.movies];
    const idx = movies.indexOf(movie);
    movies[idx] = { ...movie };
    movies[idx].liked = !movies[idx].liked;
    this.setState({ movies });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  handleGenreSelected = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      itemPageLimit,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;

    let filteredMovies = allMovies;
    if (searchQuery) {
      filteredMovies = allMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filteredMovies = allMovies.filter(
        (movie) => movie.genre._id === selectedGenre._id
      );
    }

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.criteria],
      [sortColumn.order]
    );

    const displayedMovies = paginateMovies(
      sortedMovies,
      currentPage,
      itemPageLimit
    );

    return { totalCount: filteredMovies.length, data: displayedMovies };
  };

  render() {
    const { length: moviesCount } = this.state.movies;
    const { currentPage, itemPageLimit, sortColumn, searchQuery } = this.state;

    if (moviesCount <= 0) {
      return <p>There are no movies in the database!</p>;
    }

    const { totalCount, data: displayedMovies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelected={this.handleGenreSelected}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            style={{ marginBottom: 20 }}
            className="btn btn-primary"
          >
            New Movie
          </Link>
          <p>Showing {totalCount} movies in the database</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            displayedMovies={displayedMovies}
            onLike={this.handleLikeClick}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemCount={totalCount}
            itemPageLimit={itemPageLimit}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
