import { api } from "./common/api";
import { Ticket } from "../types/ticket";

// Movies API
export const userApi = {
  getMoviesList: () => api.get("api/getMoviesList"),
  getMyBookings: () => api.get("api/getMyBookings"),
  addBooking: (ticket: Ticket) => api.post(`/api/addBooking/`, ticket),
  updateBooking: (ticket: Ticket) =>
    api.post("api/updateBooking", {
      ...ticket,
    }),
  deleteBooking: (ticketId: string) =>
    api.delete("api/deleteBooking", {
      params: {
        id: ticketId,
      },
    }),
};
