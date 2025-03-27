
import { useState } from "react";
import { useRootContext } from "../hooks/useRootContext";

type TicketItemProps = {
    id: string;
};

const TicketItem = ({ id }: TicketItemProps) => {

    const [isEdit, setIsEdit] = useState(false);
    const [seatCount, setSeatCount] = useState(0);
    const { state, dispatch } = useRootContext();

    const ticket = state.tickets.tickets.find(ticket => ticket.id === id);
    const movie = state.movies.movies.find(movie => movie.id === ticket?.movie_id);

    if (ticket && movie) {
        return (

            ticket.seatsCount > 0 && <div
                key={ticket.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
                <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                        {movie.title}
                    </h3>
                    <div className="flex justify-between items-center mb-4">
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800}`}
                        >${ticket.seatsCount} seats booked
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
                        }
                        }
                    />
                    {!isEdit && (<button className={`w-full py-2 px-4 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors`} onClick={() => { setIsEdit(true) }}>Edit Ticket </button>)}
                    {isEdit && (

                        <button className={`w-full py-2 px-4 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors`}
                            onClick={() => {
                                setIsEdit(false);
                                const movieAction = seatCount > ticket.seatsCount ? 'BOOK_MOVIE' : 'CANCEL_MOVIE';
                                const seatDiff = Math.abs(seatCount - ticket.seatsCount)
                                dispatch({ type: movieAction, payload: { id: ticket.movie_id, count: seatDiff } });
                                dispatch({ type: 'UPDATE_TICKET', payload: { id: ticket.id, count: seatCount } });
                            }}
                        >
                            Confirm
                        </button>
                    )
                    }
                    <button className={`w-full py-2 px-4 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors`}
                        onClick={() => {
                            dispatch({ type: 'CANCEL_TICKET', payload: { id: ticket.id } });
                            dispatch({ type: 'CANCEL_MOVIE', payload: { id: ticket.movie_id, count: ticket.seatsCount } });
                        }}
                    >
                        Cancel Booking
                    </button>
                </div>
            </div >
        );
    }

};

export default TicketItem;
