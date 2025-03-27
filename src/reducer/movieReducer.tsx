import { Movie } from '../types/movie';

export interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

export const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
};

// Action type definitions
export type MovieAction =
  | { type: 'FETCH_MOVIES'; payload: Movie[] }
  | { type: 'BOOK_MOVIE'; payload: { id: string; count: number } }
  | { type: 'CANCEL_MOVIE'; payload: { id: string; count: number } };

const movieReducer = (
  state: MovieState,
  action: MovieAction
): MovieState => {
  switch (action.type) {
    case 'FETCH_MOVIES':
      return {
        ...state,
        // Always use the payload array (even if empty) to ensure state reflects server response
        movies: action.payload,
        loading: false,
        error: null
      };

    case 'BOOK_MOVIE': {
      const { id, count } = action.payload;
      return {
        ...state,
        movies: state.movies.map(movie =>
          movie.id === id && count > 0 && movie.availableSeatsCount - count >= 0
            ? {
              ...movie,
              availableSeatsCount: movie.availableSeatsCount - count
            }
            : movie
        )
      };
    }

    case 'CANCEL_MOVIE': {
      const { id, count } = action.payload;
      console.log(id)
      console.log(count)
      return {
        ...state,
        movies: state.movies.map(movie =>
          movie.id === id
            ? {
              ...movie,
              // Ensure available seats don't exceed total capacity
              availableSeatsCount: Math.min(
                movie.availableSeatsCount + count,
                movie.totalSeatsCount
              )
            }
            : movie
        )
      };
    }

    default:
      return state;
  }
};

export default movieReducer;