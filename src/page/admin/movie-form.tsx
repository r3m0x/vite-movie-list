import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
// Remove useState and useEffect if no longer needed here
import { v7 as uuidv7 } from "uuid";
import MovieFormMain from "../../components/admin/main"; // Import the new main component
import { useMovies } from "../../hooks/useMovies";
import { adminApi } from "../../services/admin";
import { Movie } from "../../types/movie";

const AdminMovieFormPage = () => {
  const search = useSearch({ from: "/admin/movies" });
  const movieId = search.movieId;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: movies, isLoading, error } = useMovies(); // Add loading/error handling

  // Find the movie if we're in edit mode
  const movieToEdit = movieId
    ? movies?.find((movie) => movie.id === movieId)
    : undefined;
  const isEditMode = !!movieId;

  // Keep mutations here as they interact with page navigation and query invalidation
  const createMovieMutation = useMutation({
    mutationFn: (movie: Movie) => adminApi.addMovie(movie),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      alert("Movie created successfully.");
      navigate({ to: "/admin" });
    },
    // Add onError for better feedback
    onError: (err) => {
      alert("Failed to create movie. Please try again.");
      console.error("Failed to create movie:", err);
    },
  });

  const updateMovieMutation = useMutation({
    mutationFn: (movie: Movie) => adminApi.updateMovie(movie.id, movie),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      alert("Movie updated successfully.");
      navigate({ to: "/admin" });
    },
    // Add onError for better feedback
    onError: (err) => {
      alert("Failed to update movie. Please try again.");
      console.error("Failed to update movie:", err);
      // Add user feedback (e.g., toast notification)
    },
  });

  // This function is passed to MovieFormMain to handle the final submission
  const handleFormSubmit = (formDataFromMain: Partial<Movie>) => {
    console.log("handleFormSubmi");
    const finalData = {
      ...(isEditMode ? movieToEdit : {}),
      ...formDataFromMain,
    };

    if (isEditMode && movieToEdit) {
      updateMovieMutation.mutate({ ...finalData, id: movieToEdit.id } as Movie);
    } else {
      createMovieMutation.mutate({ ...finalData, id: uuidv7() } as Movie);
    }
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">Loading movie data...</div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-red-600">
        Error loading movie data: {error.message}
      </div>
    );
  }

  // Handle case where movie ID is provided but movie is not found
  if (isEditMode && !movieToEdit && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-red-600">
        Movie not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? "Edit Movie" : "Create New Movie"}
      </h1>

      <MovieFormMain
        initialData={isEditMode && movieToEdit ? movieToEdit : {}}
        onSubmit={handleFormSubmit}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default AdminMovieFormPage;
