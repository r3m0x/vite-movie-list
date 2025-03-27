import TicketItem from "../components/ticket";
import { useRootContext } from "../hooks/useRootContext";

const MyBookingPage = () => {

  const { state } = useRootContext();
  const tickets = state.tickets.tickets

  return (
    <>
      <div className="text-center py-8">
        <h2 className="text-xl text-red-500">Your Tickets</h2>
      </div>

      <div className="ticket-list">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <TicketItem key={ticket.id} id={ticket.id} />
          ))
        ) : (
          <div className="text-center py-8">
            <h2 className="text-xl text-red-500">No Booking Ticket Found</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default MyBookingPage;