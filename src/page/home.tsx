import { useMutation } from "@tanstack/react-query"; // Import useQuery
import { v7 as uuidv7 } from "uuid";
import MoviesTable, { MovieTableButton } from "../components/MovieTable";
import { useMovies } from "../hooks/useMovies";
import { adminApi } from "../services/admin";
import { userApi } from "../services/user";
import { Movie } from "../types/movie";
import { Ticket } from "../types/ticket";

const HomePage = () => {
  const { data: movies, isLoading, error: queryError } = useMovies();

  const addUserBookingMutation = useMutation({
    mutationFn: (ticket: Ticket) => {
      return userApi.addBooking(ticket);
    },
    onSuccess: async (response) => {
      alert(`Movie booked!`);
      return response;
    },
  });

  const updateMovieMutation = useMutation({
    mutationFn: (movie: Movie) => {
      return adminApi.updateMovie(movie.id, movie);
    },
    onSuccess: async (response) => {
      return response;
    },
  });

  const handleAddBooking = (movie: Movie, seatCount: number) => {
    if (movie && movie.id && movie.availableSeatsCount - seatCount >= 0) {
      movie.availableSeatsCount -= seatCount;
      updateMovieMutation.mutate(movie);
      addUserBookingMutation.mutate({
        id: uuidv7(),
        movie_id: movie.id,
        movie_title: movie.title,
        movie_showtime: movie.showtime,
        seatsCount: seatCount,
      });
    } else {
      alert(`Error: Not enough seat(s)!! ${movie.id} - ${seatCount}`);
    }
  };

  const mutationHook = [
    {
      label: "Book",
      action: handleAddBooking,
      seatCountRequired: true,
    },
  ];

  // Use isLoading from useQuery
  if (isLoading) {
    return <div className="text-center py-8">Loading movies...</div>;
  }

  // Use queryError from useQuery
  if (queryError) {
    return (
      <div className="text-center py-8 text-red-500">
        Error: {queryError.message}
      </div>
    );
  }

  return (
    <MoviesTable
      movies={movies ?? []}
      buttons={mutationHook as MovieTableButton<Movie>[]}
    />
  );
};

export default HomePage;
