
import { useState } from "react";
import { useMovieStore } from '../store/useMovieStore';
import { useTicketStore } from '../store/useTicketStore';

type TicketItemProps = {
    id: string;
};

const TicketItem = ({ id }: TicketItemProps) => {

    const [isEdit, setIsEdit] = useState(false);
    const [seatCount, setSeatCount] = useState(0);

    const { movies, bookMovie, cancelMovie } = useMovieStore();
    const { tickets, updateTicket, cancelTicket } = useTicketStore();;

    const ticket = tickets.find(ticket => ticket.id === id);
    const movie = movies.find(movie => movie.id === ticket?.movie_id);

    if (ticket && movie) {
        return (
            ticket.seatsCount > 0 && (
                <div
                    key={ticket.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                    <div className="p-6 space-y-4">
                        <h3 className="text-2xl font-bold text-gray-800 mb-3 truncate hover:text-blue-600 transition-colors">
                            {movie.title}
                        </h3>
                        <div className="flex justify-between items-center">
                            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                                {ticket.seatsCount} seats booked
                            </span>
                        </div>
                        <input
                            disabled={!isEdit}
                            type="number"
                            min="0"
                            max={movie.availableSeatsCount}
                            placeholder="Ticket Number"
                            defaultValue={ticket.seatsCount}
                            onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                setSeatCount(isNaN(value) ? 0 : value);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <div className="space-y-3">
                            {!isEdit && (
                                <button
                                    className="w-full py-3 px-6 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-md hover:shadow-lg"
                                    onClick={() => { setIsEdit(true) }}
                                >
                                    Edit Ticket
                                </button>
                            )}
                            {isEdit && (
                                <button
                                    className="w-full py-3 px-6 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 active:bg-green-800 transition-colors shadow-md hover:shadow-lg"
                                    onClick={() => {
                                        setIsEdit(false);
                                        const movieAction = seatCount > ticket.seatsCount ? bookMovie : cancelMovie;
                                        const seatDiff = Math.abs(seatCount - ticket.seatsCount);
                                        movieAction(ticket.movie_id, seatDiff);
                                        updateTicket(ticket.id, seatCount);
                                    }}
                                >
                                    Confirm
                                </button>
                            )}
                            <button
                                className="w-full py-3 px-6 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 transition-colors shadow-md hover:shadow-lg"
                                onClick={() => {
                                    cancelTicket(ticket.id);
                                    cancelMovie(ticket.movie_id, ticket.seatsCount);
                                }}
                            >
                                Cancel Booking
                            </button>
                        </div>
                    </div>
                </div>
            )
        );
    }
};

export default TicketItem;
