
import { Ticket } from "../types/ticket";

type TicketItemProps = {
    ticket: Ticket;
};

const TicketItem = ({ ticket }: TicketItemProps) => {

    return (
        ticket.seatsCount > 0 && <div
            key={ticket.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
            <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                    {ticket.title}
                </h3>
                <div className="flex justify-between items-center mb-4">
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800}`}
                    >${ticket.seatsCount} seats booked
                    </span>
                </div>
                <button className={`w-full py-2 px-4 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors`}
                >
                    "Cancel Booking"
                </button>
            </div>
        </div>
    );
};

export default TicketItem;
