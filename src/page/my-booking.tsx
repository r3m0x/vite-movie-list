import TicketItem from "../components/ticket";
import { useTicketStore } from "../store/useTicketStore";
import { Ticket } from "../types/ticket";

const MyBookingPage = () => {
    const { tickets } = useTicketStore();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">Your Bookings</h2>
                <p className="mt-2 text-gray-600">Manage your movie tickets</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets.length > 0 ? (
                    tickets.map((ticket: Ticket) => (
                        <TicketItem key={ticket.id} id={ticket.id} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="mt-2 text-xl font-medium text-gray-900">No Bookings Found</h3>
                        <p className="mt-1 text-gray-500">Start exploring movies to make your first booking!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookingPage;