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

  const deleteBookingMutation = useMutation({
    mutationFn: (ticket: Ticket) => {
      return userApi.deleteBooking(ticket.id);
    },
    onSuccess: async (response) => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
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
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      return response;
    },
  });

  const handleDeleteBooking = (ticket: Ticket) => {
    if (ticket && ticket.id && ticket.movie_id && ticket.seatsCount > 0) {
      const movie = movies?.find((movie) => movie.id === ticket.movie_id);
      if (movie) {
        if (
          movie.availableSeatsCount + ticket.seatsCount <=
          movie.totalSeatsCount
        )
          movie.availableSeatsCount += ticket.seatsCount;
        else {
          movie.availableSeatsCount = movie.totalSeatsCount;
        }
        updateMovieMutation.mutate(movie);
        deleteBookingMutation.mutate(ticket);
      } else {
        alert(`Error: Movie not found!`);
      }
    } else {
      alert(`Error: Booking not found!`);
    }
  };

  const mutationHook = [
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
