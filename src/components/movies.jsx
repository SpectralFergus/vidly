import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginateMovies } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import Like from "./common/like";
import Pagination from "./common/pagination";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    itemPageLimit: 8,
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
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
    console.log("genre selected:", genre);
  };
  render() {
    const { length: moviesCount } = this.state.movies;
    const { currentPage, itemPageLimit, movies: allMovies } = this.state;
    if (moviesCount <= 0) {
      return <p>There are no movies in the database!</p>;
    }
    const displayedMovies = paginateMovies(
      allMovies,
      currentPage,
      itemPageLimit
    );
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelected={this.handleGenreSelected}
          />
        </div>
        <div className="col">
          <p>Showing {moviesCount} movies in the database</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {displayedMovies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.genre.name}</td>
                  <td>{movie.title}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLikeClick(movie)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <Pagination
            itemCount={moviesCount}
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
