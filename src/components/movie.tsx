import { Link, useParams } from "react-router";
import { useMovieContext } from "../hooks/useMovieContext";

const MovieItem = () => {

    const { id } = useParams<{ id: string }>();
    const { state } = useMovieContext();

    const movie = state.movies.find(movie => movie.id === id);

    if(movie)
    return (
        <div
            key={movie.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
            <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                    {movie.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 h-[60px]">
                    {movie.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${movie.availableSeatsCount > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}
                    >
                        {movie.availableSeatsCount > 0
                            ? `${movie.availableSeatsCount} seats available`
                            : "Sold out"}
                    </span>
                </div>
                <button
                    disabled={movie.availableSeatsCount === 0}
                    className={`w-full py-2 px-4 rounded-md font-medium text-white ${movie.availableSeatsCount > 0
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                        } transition-colors`}
                >
                    {movie.availableSeatsCount > 0 ? "Book Now" : "Unavailable"}
                </button>
            </div>
        </div>
    );

    return (
        <div className="text-center py-8">
          <h2 className="text-xl text-red-500">Movie not found</h2>
          <p className="mt-4">
            <Link to="/" className="text-blue-500 hover:underline">
              Back to movie list
            </Link>
          </p>
        </div>
      );
};

export default MovieItem;
