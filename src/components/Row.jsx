import React, { useEffect, useContext } from "react";
import Movie from "./Movie";
import Title from "./Title";
import { MovieContext } from "./MovieContext";
import Slider from "react-slick";
import "../carousel/slick.css";
import "../carousel/slick-theme.css";

const Row = () => {
  const {
    movies,
    setMovies,
    movieDetails,
    setMovieDetails,
    isBuffering,
    setIsBuffering,
    isPlaying,
    setIsPlaying,
    currentProgress,
    setCurrentProgress,
  } = useContext(MovieContext);

  useEffect(() => {
    //API call
    const getMovies = async () => {
      const API_KEY = process.env.REACT_APP_API_KEY;

      let today = new Date();
      let year = today.getFullYear();
      let lastMonth = ("0" + (today.getMonth() - 3)).slice(-2);
      let currentMonth = ("0" + (today.getMonth() - 1)).slice(-2);
      let date = ("0" + today.getDate()).slice(-2);

      //Format date yyyy-mm-dd
      let formatLastMonth = `${year}-${lastMonth}-${date}`;
      let formatToday = `${year}-${currentMonth}-${date}`;

      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?region=GB&with_original_language=en&include_video=true&without_genres=99&primary_release_date.gte=${formatLastMonth}&primary_release_date.lte=${formatToday}&api_key=${API_KEY}`
      );
      const data = await response.json();

      setMovies(data.results);

      //Set first result to Showcase for autoplay on load
      setMovieDetails({
        id: data.results[0].id,
        banner: data.results[0].backdrop_path,
        title: data.results[0].title,
        overview: data.results[0].overview,
        release_date: data.results[0].release_date.slice(0, 4),
      });
    };
    getMovies();
  }, [setMovies, setMovieDetails]); //updates on change

  //STYLES
  const styledRow = {
    position: "absolute",
    width: "100%",
    bottom: 0,
    // left: "40px",
    padding: "0 40px",
    opacity: movies.length ? 1 : 0,
    transition: "all 0.5s ease",
  };

  //SLIDER SETTINGS
  const sliderSettings = {
    // focusOnSelect: true,
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 9,
    slidesToScroll: 1,
  };

  return (
    <MovieContext.Provider
      value={{
        movieDetails,
        setMovieDetails,
        isBuffering,
        setIsBuffering,
        isPlaying,
        setIsPlaying,
        currentProgress,
        setCurrentProgress,
      }}
    >
      <div style={styledRow}>
        <Title title="In Cinemas" />
        <Slider {...sliderSettings} className="row">
          {movies.map((movie) => {
            return <Movie key={movie.id} movie={movie} />;
          })}
        </Slider>
      </div>
    </MovieContext.Provider>
  );
};

export default Row;
