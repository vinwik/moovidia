import React, { useEffect, useContext } from "react";
import Movie from "./Movie";
import Title from "./Title";
import { MovieContext } from "./MovieContext";
import Slider from "react-slick";
import "../slick.css";
import "../slick-theme.css";

const Row = () => {
  const { movies, setMovies, movieDetails, setMovieDetails } = useContext(
    MovieContext
  );

  useEffect(() => {
    const getMovies = async () => {
      const API_KEY = "e58b7e8de66faddc44e4570baf218619";
      let today = new Date();
      let year = today.getFullYear();
      let lastMonth = ("0" + (today.getMonth() - 1)).slice(-2);
      let currentMonth = ("0" + (today.getMonth() + 1)).slice(-2);
      let date = ("0" + today.getDate()).slice(-2);

      let formatLastMonth = `${year}-${lastMonth}-${date}`;
      let formatToday = `${year}-${currentMonth}-${date}`;

      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?region=GB&with_original_language=en&include_video=true&without_genres=99&primary_release_date.gte=${formatLastMonth}&primary_release_date.lte=${formatToday}&api_key=${API_KEY}`
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
    getMovies();
    // return () => {
    //   cleanup;
    // };
  }, [setMovies, setMovieDetails]);

  var settings = {
    // arrows: false,
    focusOnSelect: true,
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 9,
    slidesToScroll: 1
  };

  return (
    // <div style={row}>
    <MovieContext.Provider
      value={{
        movieDetails,
        setMovieDetails
      }}
    >
      {/* <div style={rowWrapper}> */}
      {/* <div style={highlitedMovie}></div> */}
      {/* <div style={movieWrapper}> */}
      <div style={row}>
        <Title title="In Cinemas" />
        <Slider {...settings}>
          {movies.map(movie => {
            return <Movie key={movie.id} movie={movie} />;
          })}
        </Slider>
      </div>
      {/* </div> */}
      {/* </div> */}
    </MovieContext.Provider>
    // </div>
  );
};

export default Row;

const row = {
  position: "absolute",
  width: "95%",
  bottom: 0,
  left: "40px"
};
const rowWrapper = {
  paddingLeft: "20px"
};

const highlitedMovie = {
  position: "absolute",
  top: 0,
  left: 80,
  width: "185px",
  height: "300px",
  border: "3px solid white",
  zIndex: 5
};

const movieWrapper = {
  display: "flex"
};
