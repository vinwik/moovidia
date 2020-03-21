import { createContext } from "react";

export const MovieContext = createContext();

// function MovieContextProvider({ children }) {
//   const [movie, setmovie] = useState();

//   const handleClick = id => {
//     setmovie(id);
//   };

//   return (
//     <MovieContext.Provider value={{ movie, setMovie }}>
//       {children}
//     </MovieContext.Provider>
//   );
// }

// export default MovieContextProvider;
