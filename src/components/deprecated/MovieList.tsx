import { Movie } from "../../types/movie";
import MovieItem from "./MovieItem";


interface MovieListProps {
    movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {

    return (
        <>
            <div className="text-center py-8">
                <h2 className="text-xl text-red-500">Now Showing</h2>
            </div>

            <div className="movie-list">
                {/* Use movies from the store */}
                {movies.length > 0 ? (
                    movies.map((movie: Movie) => (
                        <MovieItem key={movie.id} movie={movie} />
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

export default MovieList;
