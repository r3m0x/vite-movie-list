import { useEffect } from "react";
// Remove useLoaderData import
// import { useLoaderData } from "@tanstack/react-router";
import MovieItem from "../components/movie";
import { Movie } from "../types/movie";
import { useMovieStore } from "../store/useMovieStore";
import { useQuery } from "@tanstack/react-query"; // Import useQuery
import axios from 'axios'; // Import axios

// Define the fetch function
const fetchMoviesList = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get<Movie[]>('http://localhost:8080/api/getMoviesList');
    return response.data;
  } catch (error) {
    console.error('Movie data loading error:', error);
    throw new Error('Failed to fetch movies');
  }
};


const HomePage = () => {
  const { movies, fetchMovies: setMoviesInStore } = useMovieStore(); // Renamed fetchMovies to avoid conflict

  const { data: loadedMovies, isLoading, error: queryError } = useQuery<Movie[], Error>({
    queryKey: ['movies'],
    queryFn: fetchMoviesList,
  });

  useEffect(() => {
    if (loadedMovies) {
      setMoviesInStore(loadedMovies);
    }
  }, [loadedMovies, setMoviesInStore]);

  // Use isLoading from useQuery
  if (isLoading) {
    return <div className="text-center py-8">Loading movies...</div>;
  }

  // Use queryError from useQuery
  if (queryError) {
    return <div className="text-center py-8 text-red-500">Error: {queryError.message}</div>;
  }

  return (
    <>
      <div className="text-center py-8">
        <h2 className="text-xl text-red-500">Now Showing</h2>
      </div>

      <div className="movie-list">
        {/* Use movies from the store */}
        {movies.length > 0 ? (
          movies.map((movie: Movie) => (
            <MovieItem key={movie.id} id={movie.id} />
          ))
        ) : (
          <div className="text-center py-8">
            {/* Adjust message if needed, maybe data is loading or truly empty */}
            <h2 className="text-xl text-red-500">No Movies Found</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;