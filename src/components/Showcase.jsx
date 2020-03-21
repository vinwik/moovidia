import React, { useState, useEffect, useContext } from "react";
import YoutubeBackground from "react-youtube-background";
import { MovieContext } from "./MovieContext";

const Showcase = () => {
  const [trailer, setTrailer] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const { movieDetails } = useContext(MovieContext);

  useEffect(() => {
    const getMovie = async () => {
      const API_KEY = process.env.REACT_APP_API_KEY;

      if (movieDetails.id) {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieDetails.id}/videos?api_key=${API_KEY}`
        );

        const data = await response.json();
        console.log(data);

        if (data.results.length) {
          return setTrailer(data.results[0].key);
        }
      }
    };
    getMovie();
    return () => {
      setTrailer([]);
      setIsVisible(null);
    };
  }, [movieDetails]);

  const visible = event => {
    setIsVisible(true);
  };

  const pause = event => {
    event.target.stopVideo();
    setTimeout(() => {
      event.target.playVideo();
    }, 3500);
  };

  const stop = event => {
    setIsVisible(null);
    event.target.stopVideo();
  };

  const end = event => {
    if (event.data === 0) {
      setIsVisible(null);
      event.target.stopVideo();
    }
  };

  const style = {
    opacity: isVisible ? 1 : 0,
    width: "100%",
    height: "100%",
    transition: "opacity 1s ease",
    zIndex: -1
  };

  return (
    <div>
      {movieDetails && (
        <div
          style={{
            opacity: trailer.length && 1,
            background: `no-repeat center/cover`,
            backgroundImage:
              movieDetails.banner &&
              `url("https://image.tmdb.org/t/p/original${movieDetails.banner}")`,
            position: "fixed",
            top: 0,
            width: "100%",
            height: "75%",
            maxHeight: "75vh",
            transition: "opacity, background 0.5s ease",
            zIndex: -1
          }}
        >
          <div
            className="description"
            style={{
              position: "absolute",
              width: "30%",
              bottom: "100px",
              marginLeft: "40px",
              textShadow: "0 0 10px #000"
            }}
          >
            <h1>{movieDetails.title}</h1>
            <h3>{movieDetails.release_date}</h3>
            <p>{movieDetails.overview}</p>
          </div>
          <div style={layer}>
            {trailer.length && (
              <YoutubeBackground
                videoId={trailer + "?mute=0"}
                nocookie={true}
                onReady={pause}
                onPlay={visible}
                onEnd={stop}
                onStateChange={end}
                style={style}
              ></YoutubeBackground>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Showcase;

const layer = {
  width: "100%",
  height: "100%",
  background:
    "radial-gradient(circle, rgba(255,255,255,0) 50%, rgba(0,0,0,1) 100%)"
};
