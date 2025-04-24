import { useEffect } from "react";
import { useLoaderData } from "@tanstack/react-router";
import MovieItem from "../components/movie";
import { Movie } from "../types/movie";
import { useMovieStore } from "../store/useMovieStore";

const HomePage = () => {

  const { movies, loading, error, fetchMovies } = useMovieStore();
  const loadedMovies = useLoaderData({ from: '/' }) as Movie[];

  useEffect(() => {
    if (loadedMovies) {
      fetchMovies(loadedMovies);
    }
  }, [loadedMovies, fetchMovies]);

  if (loading) {
    return <div className="text-center py-8">Loading movies...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }
  return (
    <>
      <div className="text-center py-8">
        <h2 className="text-xl text-red-500">Now Showing</h2>
      </div>

      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie: Movie) => (
            <MovieItem key={movie.id} id={movie.id} />
          ))
        ) : (
          <div className="text-center py-8">
            <h2 className="text-xl text-red-500">No Movies Found</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;