import React, { useContext } from "react";
import { MovieContext } from "./MovieContext";

const Movie = ({ movie }) => {
  const { setMovieDetails } = useContext(MovieContext);

  //STYLES
  const styledMovie = {
    height: "225px",
    width: "150px",
    maxHeight: "30vh",
    maxWidth: "auto",
    background: `no-repeat center center/cover`,
    backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.poster_path}")`,
    borderRadius: "1px",
    cursor: "pointer"
  };

  return (
    <div
      onClick={() => {
        //Set movie details for Showcase
        setMovieDetails({
          id: movie.id,
          banner: movie.backdrop_path,
          title: movie.title,
          overview: movie.overview,
          release_date: movie.release_date.slice(0, 4)
        });
      }}
      className="movie"
      style={styledMovie}
    ></div>
  );
};

export default Movie;
