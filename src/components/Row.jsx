import React, { useState, useEffect } from "react";
import Movie from "./Movie";
import Title from "./Title";
import Showcase from "./Showcase";
import { MovieContext } from "./MovieContext";

const Row = () => {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);

  const getMovies = async () => {
    const API_KEY = "e58b7e8de66faddc44e4570baf218619";
    let today = new Date();
    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let date = ("0" + today.getDate()).slice(-2);

    let formatToday = `${year}-${month}-${date}`;

    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?primary_release_date.lte=${formatToday}&api_key=${API_KEY}`
    );

    const data = await response.json();
    console.log(data.results);
    setMovies(data.results);

    setMovieDetails({
      id: data.results[0].id,
      banner: data.results[0].backdrop_path,
      title: data.results[0].title,
      overview: data.results[0].overview,
      release_date: data.results[0].release_date.slice(0, 4)
    });
  };

  useEffect(() => {
    getMovies();
    // return () => {
    //   cleanup;
    // };
  }, []);

  return (
    <div style={row}>
      <MovieContext.Provider
        value={{
          movieDetails,
          setMovieDetails
        }}
      >
        <Showcase />
        <div style={rowWrapper}>
          <Title title="In Cinemas" />
          <div style={movieWrapper}>
            {movies.map(movie => {
              return <Movie key={movie.id} movie={movie} />;
            })}
          </div>
        </div>
      </MovieContext.Provider>
    </div>
  );
};

export default Row;

const row = {
  //   height: "100%",
  position: "absolute",
  //   left: 0,

  bottom: 0
  //   width: "100%"
};
const rowWrapper = {
  paddingLeft: "20px"
};

const movieWrapper = {
  display: "flex"
};
