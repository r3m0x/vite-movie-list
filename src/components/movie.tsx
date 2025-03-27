import { useRootContext } from "../hooks/useRootContext";
import React, { useState } from "react";
import { v7 as uuidv7 } from 'uuid';

interface MovieItemProps {
    id: string;
}


const MovieItem: React.FC<MovieItemProps> = ({ id }) => {
    const [seatCount, setSeatCount] = useState(0);

    const { state, dispatch } = useRootContext();

    const movie = state.movies.movies.find(movie => movie.id === id);
    const ticket_id = uuidv7();


    if (movie)
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
                    <input
                        disabled={movie.availableSeatsCount <= 0}
                        type="number"
                        min="0"
                        placeholder="Ticket Number"
                        value={seatCount}
                        onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            setSeatCount(isNaN(value) ? 0 : value);
                        }
                        }
                    />
                    <button
                        disabled={seatCount <= 0 || movie.availableSeatsCount - seatCount < 0}
                        className={`w-full py-2 px-4 rounded-md font-medium text-white ${movie.availableSeatsCount > 0
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-400 cursor-not-allowed"
                            } transition-colors`}
                        onClick={() => { dispatch({ type: 'BOOK_TICKET', payload: { id: ticket_id, movie_id: movie.id, count: seatCount } }); dispatch({ type: 'BOOK_MOVIE', payload: { id: movie.id, count: seatCount } }) }}
                    >
                        {movie.availableSeatsCount > 0 ? "Book Now" : "Unavailable"}
                    </button>
                </div>
            </div>
        );
};

export default MovieItem;
