import React, { useState } from "react";
import { v7 as uuidv7 } from "uuid";
import { useMovieStore } from "../../store/deprecated/useMovieStore";
import { useTicketStore } from "../../store/deprecated/useTicketStore";
import { Movie } from "../../types/movie";

interface MovieItemProps {
  movie: Movie;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  const [seatCount, setSeatCount] = useState(0);

  const { bookMovie } = useMovieStore();
  const { bookTicket } = useTicketStore();

  const ticket_id = uuidv7();

  if (movie)
    return (
      <div
        key={movie.id}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-3 truncate hover:text-blue-600 transition-colors">
            {movie.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 h-[60px] leading-relaxed">
            {movie.description}
          </p>
          <div className="flex justify-between items-center mb-6">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                movie.availableSeatsCount > 0
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
            }}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <button
            disabled={
              seatCount <= 0 || movie.availableSeatsCount - seatCount < 0
            }
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white ${
              movie.availableSeatsCount > 0
                ? "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                : "bg-gray-400 cursor-not-allowed"
            } transition-colors shadow-md hover:shadow-lg`}
            onClick={() => {
              bookTicket(
                ticket_id,
                movie.id,
                movie.title,
                movie.showtime,
                seatCount
              );
              bookMovie(movie.id, seatCount);
            }}
          >
            {movie.availableSeatsCount > 0 ? "Book Now" : "Unavailable"}
          </button>
        </div>
      </div>
    );
};

export default MovieItem;
