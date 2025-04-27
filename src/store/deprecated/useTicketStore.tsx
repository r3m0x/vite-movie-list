import { create } from 'zustand';
import { Ticket } from '../../types/ticket';

interface TicketState {
  tickets: Ticket[];
  bookTicket: (id: string, movie_id: string, movie_title: string, movie_showtime: string, count: number) => void;
  updateTicket: (id: string, count: number) => void;
  cancelTicket: (id: string) => void;
}

export const useTicketStore = create<TicketState>()((set) => ({
  tickets: [],
  bookTicket: (id, movie_id, movie_title, movie_showtime, count) => set((state) => ({
    tickets: [
      ...state.tickets,
      {
        id,
        movie_id,
        movie_title,
        movie_showtime,
        seatsCount: count,
      }
    ]
  })),
  updateTicket: (id, count) => set((state) => ({
    tickets: state.tickets.map(ticket =>
      ticket.id === id && ticket.seatsCount > 0 && count > 0
        ? {
          ...ticket,
          seatsCount: count
        }
        : ticket
    )
  })),
  cancelTicket: (id) => set((state) => ({
    tickets: state.tickets.filter(ticket => ticket.id !== id)
  }))
}));