import React, { useState } from "react";
import Row from "./Row";
import Showcase from "./Showcase";
import { MovieContext } from "./MovieContext";

function App() {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);

  return (
    <div className="App">
      <MovieContext.Provider
        value={{
          movies,
          setMovies,
          movieDetails,
          setMovieDetails
        }}
      >
        <Showcase />
        <Row />
      </MovieContext.Provider>
    </div>
  );
}

export default App;
