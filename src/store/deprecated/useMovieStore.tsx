import { create } from 'zustand';
import { Movie } from '../../types/movie';

interface MovieState {
    movies: Movie[];
    loading: boolean;
    error: string | null;
    fetchMovies: (movies: Movie[]) => void;
    bookMovie: (id: string, count: number) => void;
    cancelMovie: (id: string, count: number) => void;
}

export const useMovieStore = create<MovieState>()((set) => ({
    movies: [],
    loading: false,
    error: null,
    fetchMovies: (movies) => set((state) => ({
        ...state,
        movies: state.movies.length === 0 ? movies : state.movies,
        loading: false,
        error: null
    })),
    bookMovie: (id, count) => set((state) => ({
        ...state,
        movies: state.movies.map(movie =>
            movie.id === id && count > 0 && movie.availableSeatsCount - count >= 0
                ? {
                    ...movie,
                    availableSeatsCount: movie.availableSeatsCount - count
                }
                : movie
        )
    })),
    cancelMovie: (id, count) => set((state) => ({
        ...state,
        movies: state.movies.map(movie =>
            movie.id === id
                ? {
                    ...movie,
                    availableSeatsCount: Math.min(
                        movie.availableSeatsCount + count,
                        movie.totalSeatsCount
                    )
                }
                : movie
        )
    }))
}));