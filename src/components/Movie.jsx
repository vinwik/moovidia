import React, { useContext } from "react";
import { MovieContext } from "./MovieContext";
import Play from "./Play";

const Movie = ({ movie }) => {
  const {
    movieDetails,
    setMovieDetails,
    isBuffering,
    setIsBuffering,
    isPlaying,
    setIsPlaying,
    currentProgress,
  } = useContext(MovieContext);

  const handleClick = () => {
    setIsPlaying(false);
    setIsBuffering(true);

    setMovieDetails({
      id: movie.id,
      banner: movie.backdrop_path,
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date.slice(0, 4),
    });
  };

  //STYLES
  const styledMovie = {
    height: "30vh",
    background: `no-repeat center center/cover`,
    backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.poster_path}")`,
    borderRadius: "1px",
    // boxShadow: "0 0 10px #000",
    cursor: "pointer",
  };

  return (
    <div
      onClick={() => {
        handleClick();
      }}
      className="movie"
      style={styledMovie}
    >
      <div
        className={`play-layer ${
          movie.id === movieDetails.id && isPlaying
            ? "visible"
            : movie.id === movieDetails.id && isBuffering && "visible rotate"
        }`}
      >
        {movie.id === movieDetails.id && isBuffering ? (
          <Play currentProgress={0.25} opacity={"0.85"} />
        ) : movie.id === movieDetails.id && isPlaying ? (
          <Play currentProgress={currentProgress} opacity={"0.85"} />
        ) : (
          <Play currentProgress={0} opacity={"1"} />
        )}
      </div>
    </div>
  );
};

export default Movie;
