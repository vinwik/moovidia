import React, { useContext } from "react";
import { MovieContext } from "./MovieContext";

const Movie = ({ movie }) => {
  const { setMovieDetails } = useContext(MovieContext);

  const styledMovie = {
    height: "225px",
    width: "150px",
    maxHeight: "30vh",
    maxWidth: "auto",
    background: `no-repeat center center/cover`,
    backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.poster_path}")`,
    borderRadius: "1px"
    //   maxWidth: "185px"
    //   margin: "auto 3px"
    // boxShadow: "0 0 10px #000"
    //   scrollSnapAlign: "start"
  };

  return (
    <div>
      {/* <img
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
        tabIndex="1"
      /> */}
      <div
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
        tabIndex="1"
      ></div>
    </div>
  );
};

export default Movie;
