import { useEffect } from "react";
import { useLoaderData } from "react-router";
import MovieItem from "../components/movie";
import { useRootContext } from "../hooks/useRootContext";

const HomePage = () => {
  const { state, dispatch } = useRootContext();
  const loadedMovies = useLoaderData();

  const movies = state.movies.movies ?? [];

  useEffect(() => {
    // Only dispatch if loadedMovies exists
    if (loadedMovies) {
      dispatch({ type: 'FETCH_MOVIES', payload: loadedMovies });
    }
  }, [loadedMovies, dispatch]);

  if (state.movies.loading) {
    return <div className="text-center py-8">Loading movies...</div>;
  }

  if (state.movies.error) {
    return <div className="text-center py-8 text-red-500">Error: {state.movies.error}</div>;
  }
  return (
    <>
      <div className="text-center py-8">
        <h2 className="text-xl text-red-500">Now Showing</h2>
      </div>

      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
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