import { Ticket } from "../types/ticket";


export interface TicketState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
}

export const initialState: TicketState = {
  tickets: [],
  loading: false,
  error: null,
};

// Action type definitions
export type TicketAction =
  | { type: 'TICKET_ERR'; }
  | { type: 'CANCEL_TICKET'; payload: { id: string; } };

const ticketReducer = (
  state: TicketState,
  action: TicketAction
): TicketState => {
  switch (action.type) {
    case 'TICKET_ERR':
      return {
        ...state,
        // Always use the payload array (even if empty) to ensure state reflects server response
        loading: false,
        error: "Error on this ticket"
      };

    case 'CANCEL_TICKET': {
      const { id } = action.payload;
      return {
        ...state,
        tickets: state.tickets.map(ticket =>
          ticket.id === id && ticket.seatsCount > 0
            ? {
              ...ticket,
              availableSeatsCount: ticket.seatsCount - 1
            }
            : ticket
        )
      };
    }

    default:
      return state;
  }
};

export default ticketReducer;