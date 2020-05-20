import React, { useState } from "react";
import Row from "./Row";
import Showcase from "./Showcase";
import { MovieContext } from "./MovieContext";

function App() {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [isBuffering, setIsBuffering] = useState(null);
  const [isPlaying, setIsPlaying] = useState(null);
  const [currentProgress, setCurrentProgress] = useState(0);

  return (
    <div className="App">
      <MovieContext.Provider
        value={{
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
        }}
      >
        <Showcase />
        <Row />
      </MovieContext.Provider>
    </div>
  );
}

export default App;
