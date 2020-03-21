import React, { useContext } from "react";
import { MovieContext } from "./MovieContext";

const Movie = ({ movie }) => {
  const { setMovieDetails } = useContext(MovieContext);

  return (
    <div className="movie">
      <img
        onClick={() => {
          setMovieDetails({
            id: movie.id,
            banner: movie.backdrop_path,
            title: movie.title,
            overview: movie.overview,
            release_date: movie.release_date.slice(0, 4)
          });
        }}
        src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
        alt={movie.title}
        className="movie"
        style={styledMovie}
      />
    </div>
  );
};

export default Movie;

const styledMovie = {
  height: "30vh",
  margin: "auto 3px",
  boxShadow: "0 0 10px #000",
  scrollSnapAlign: "start"
};
