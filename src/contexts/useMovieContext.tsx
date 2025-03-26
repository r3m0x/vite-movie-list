// contexts/MovieContext.js
import { createContext, useContext, useReducer } from 'react';
import { MovieListingItemType } from '../types/movie';
const MovieContext = createContext({});

export function MovieProvider({ children }) {
  const [state, dispatch] = useReducer(movieReducer, { movies: []});
  
  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
}

export const useMovies = () => useContext(MovieContext);