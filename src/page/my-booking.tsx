import { useMutation, useQueryClient } from "@tanstack/react-query";
import TicketTable, { TicketTableButton } from "../components/TicketTable";
import { useMovies } from "../hooks/useMovies";
import { useTickets } from "../hooks/useTickets";
import { adminApi } from "../services/admin";
import { userApi } from "../services/user";
import { Movie } from "../types/movie";
import { Ticket } from "../types/ticket";

const MyBookingPage = () => {
  // Add QueryClient to invalidate queries
  const queryClient = useQueryClient();

  const {
    data: movies,
    isLoading: isLoadingMovies,
    error: queryMoviesError,
  } = useMovies();

  const {
    data: tickets,
    isLoading: isLoadingTickets,
    error: queryTicketsError,
  } = useTickets();

  const editBookingMutation = useMutation({
    mutationFn: (ticket: Ticket) => {
      return userApi.updateBooking(ticket);
    },
    onSuccess: async (response) => {
      alert(`Ticket edited!`);
      return response;
    },
  });

  const deleteBookingMutation = useMutation({
    mutationFn: (ticket: Ticket) => {
      return userApi.deleteBooking(ticket.id);
    },
    onSuccess: async (response) => {
      alert(`Ticket deleted!`);
      return response;
    },
  });

  const updateMovieMutation = useMutation({
    mutationFn: (movie: Movie) => {
      return adminApi.updateMovie(movie.id, {
        availableSeatsCount: movie.availableSeatsCount,
      });
    },
    onSuccess: async (response) => {
      return response;
    },
  });

  const handleEditBooking = async (ticket: Ticket, seatCount: number) => {
    if (
      ticket &&
      ticket.id &&
      ticket.movie_id &&
      ticket.seatsCount > 0 &&
      seatCount > 0 &&
      ticket.seatsCount !== seatCount
    ) {
      const movie = movies?.find((movie) => movie.id === ticket.movie_id);
      if (movie) {
        const countDiff = ticket.seatsCount - seatCount;
        if (movie.availableSeatsCount + countDiff <= movie.totalSeatsCount)
          movie.availableSeatsCount += countDiff;
        else {
          movie.availableSeatsCount = movie.totalSeatsCount;
        }

        try {
          const updatedTicket = { ...ticket, seatsCount: seatCount };

          await updateMovieMutation.mutateAsync(movie);
          await editBookingMutation.mutateAsync(updatedTicket);

          queryClient.invalidateQueries({ queryKey: ["tickets"] });
          queryClient.invalidateQueries({ queryKey: ["movies"] });
        } catch (error) {
          console.error("Failed to update booking:", error);
          alert("Failed to update booking. Please try again.");
        }
      } else {
        alert(`Error: Movie not found!`);
      }
    } else {
      alert(`Error: Cannot edit booking!`);
    }
  };

  const handleDeleteBooking = async (ticket: Ticket) => {
    if (ticket && ticket.id && ticket.movie_id && ticket.seatsCount > 0) {
      const movie = movies?.find((movie) => movie.id === ticket.movie_id);
      if (movie) {
        try {
          const updatedMovie = {
            ...movie,
            availableSeatsCount:
              movie.availableSeatsCount + ticket.seatsCount <=
              movie.totalSeatsCount
                ? movie.availableSeatsCount + ticket.seatsCount
                : movie.totalSeatsCount,
          };

          await updateMovieMutation.mutateAsync(updatedMovie);
          await deleteBookingMutation.mutateAsync(ticket);

          queryClient.invalidateQueries({ queryKey: ["tickets"] });
          queryClient.invalidateQueries({ queryKey: ["movies"] });
        } catch (error) {
          console.error("Failed to delete booking:", error);
          alert("Failed to delete booking. Please try again.");
        }
      } else {
        alert(`Error: Movie not found!`);
      }
    } else {
      alert(`Error: Booking not found!`);
    }
  };

  const mutationHook = [
    {
      label: "Edit",
      action: handleEditBooking,
      seatCountRequired: true,
    },
    {
      label: "Delete",
      action: handleDeleteBooking,
    },
  ];

  // Use isLoading from useQuery
  if (isLoadingMovies || isLoadingTickets) {
    return <div className="text-center py-8">Loading movies...</div>;
  }

  // Use queryError from useQuery
  if (queryMoviesError || queryTicketsError) {
    return (
      <div className="text-center py-8 text-red-500">
        Error: {queryMoviesError?.message} {queryTicketsError?.message}
      </div>
    );
  }
  return (
    <TicketTable
      tickets={tickets ?? []}
      buttons={mutationHook as TicketTableButton<Ticket>[]}
    />
  );
};

export default MyBookingPage;
