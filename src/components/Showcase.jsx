import React, { useState, useEffect, useContext, useRef } from "react";
import YoutubeBackground from "react-youtube-background";
import { MovieContext } from "./MovieContext";

const Showcase = () => {
  const [trailer, setTrailer] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const raf = useRef();

  const {
    movieDetails,
    setIsBuffering,
    isPlaying,
    setIsPlaying,
    setCurrentProgress,
  } = useContext(MovieContext);

  const stopPlay = (event) => {
    // stop video before play otherwise no transition
    event.target.stopVideo();
    setCurrentProgress(0);
    cancelAnimationFrame(raf.current);

    // 3.5sec timeout after player is ready
    setTimeout(() => {
      event.target.playVideo();
      setIsBuffering(false);
      setIsPlaying(true);
    }, 3500);
  };

  const onPlay = (event) => {
    // fade in
    setIsVisible(true);

    const playing = () => {
      const duration = event.target.getDuration();
      const elapsed = event.target.getCurrentTime();
      const progress = elapsed / duration;
      setCurrentProgress(progress);

      const compare = duration - elapsed;
      if (compare <= 1) {
        setIsVisible(false);
      }

      if (progress < 1 && isPlaying) {
        raf.current = requestAnimationFrame(playing);
      }
    };
    playing();
  };

  const stop = (event) => {
    //stop video as player set to loop by default
    event.target.stopVideo();
    cancelAnimationFrame(raf.current);
  };

  useEffect(() => {
    //API call
    const getMovie = async () => {
      const API_KEY = process.env.REACT_APP_API_KEY;
      console.log(movieDetails);

      if (movieDetails.id) {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieDetails.id}/videos?api_key=${API_KEY}`
        );
        const data = await response.json();

        if (data.results.length) {
          return setTrailer(data.results[0].key);
        }
      }
    };
    getMovie();
    return () => {
      //Cleanup
      setTrailer(null);
      setIsVisible(null);
    };
  }, [movieDetails]); //updates on movie change

  //STYLES
  const styledBanner = {
    opacity: movieDetails.banner ? 1 : 0,
    background: `no-repeat center/cover`,
    backgroundImage:
      movieDetails.banner &&
      `url("https://image.tmdb.org/t/p/original${movieDetails.banner}")`,
    position: "fixed",
    top: 0,
    width: "100%",
    height: "75%",
    maxHeight: "75vh",
    transition: "background 0.5s ease, opacity 0.5s ease",
    transitionDelay: "0.2s",
    zIndex: -1,
  };

  const styledDescription = {
    position: "absolute",
    width: "30%",
    bottom: "calc(15vh + 1em)",
    marginLeft: "40px",
    textShadow: "0 0 10px #000",
  };
  const styledLayer = {
    width: "100%",
    height: "100%",
    background:
      "radial-gradient(circle, rgba(255,255,255,0) 50%, rgba(0,0,0,1) 100%)",
  };

  const styledTrailer = {
    opacity: isVisible ? 1 : 0,
    width: "100%",
    height: "100%",
    transition: "opacity 1s ease",
    zIndex: -1,
  };

  return (
    <>
      {movieDetails && (
        <div style={styledBanner}>
          <div style={styledDescription}>
            <h1>{movieDetails.title}</h1>
            <h3>{movieDetails.release_date}</h3>
            <p>{movieDetails.overview}</p>
          </div>
          <div style={styledLayer}>
            {trailer && (
              <YoutubeBackground
                videoId={trailer + "?mute=0"}
                nocookie={true}
                onReady={stopPlay}
                onPlay={onPlay}
                onEnd={stop}
                style={styledTrailer}
              ></YoutubeBackground>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Showcase;
