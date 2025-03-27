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
  | { type: 'BOOK_TICKET'; payload: { id: string; movie_id: string; count: number } }
  | { type: 'UPDATE_TICKET'; payload: { id: string; count: number } }
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

    case 'BOOK_TICKET': {
      const { id, movie_id, count } = action.payload;
      return {
        ...state,
        tickets: [
          ...state.tickets,
          {
            id: id,
            movie_id: movie_id,
            seatsCount: count,
          }
        ]
      };
    }

    case 'UPDATE_TICKET': {
      const { id, count } = action.payload;
      return {
        ...state,
        tickets: state.tickets.map(ticket =>
          ticket.id === id && ticket.seatsCount > 0 && count > 0
            ? {
              ...ticket,
              seatsCount: count
            }
            : ticket
        )
      };
    }

    case 'CANCEL_TICKET': {
      const { id } = action.payload;
      return {
        ...state,
        tickets: state.tickets.map(ticket =>
          ticket.id === id && ticket.seatsCount > 0
            ? {
              ...ticket,
              seatsCount: 0
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