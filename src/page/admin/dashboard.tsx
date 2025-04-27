import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { AxiosResponse } from "axios";
import { useState } from "react";
import MovieTable from "../../components/MovieTable";
import { adminApi } from "../../services/admin";
import { useLoginStore } from "../../store/useLoginStore";
import { Movie } from "../../types/movie";

const AdminDashboardPage = () => {
    const { username } = useLoginStore();
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const queryClient = useQueryClient();

    const { data: movies, isLoading, error: queryError } = useQuery<Movie[], Error>({
        queryKey: ['movies'],
        queryFn: async () => {
            const response: AxiosResponse<Movie[]> = await adminApi.getMoviesList();
            return response?.data || [];
        },
    });

    // Delete movie mutation
    const deleteMovieMutation = useMutation({
        mutationFn: (movieId: string) => {
            return adminApi.deleteMovie(movieId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['movies'] });
            setSelectedMovie(null);
        },
    });

    const handleMovieSelect = (movie: Movie) => {
        setSelectedMovie(movie);
    };

    const handleDeleteMovie = () => {
        if (selectedMovie && window.confirm(`Are you sure you want to delete "${selectedMovie.title}"?`)) {
            deleteMovieMutation.mutate(selectedMovie.id);
        }
    };

    // Use isLoading from useQuery
    if (isLoading) {
        return <div className="text-center py-8">Loading movies...</div>;
    }

    // Use queryError from useQuery
    if (queryError) {
        return <div className="text-center py-8 text-red-500">Error: {queryError.message}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <div className="bg-white shadow rounded-lg p-6">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Welcome, {username}!</h2>
                    <p className="text-gray-600">You are logged in as an administrator.</p>
                </div>

                {/* Remove or keep the summary cards as needed */}
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 mb-8">
                    <div className="bg-green-100 p-4 rounded-lg">
                        <h3 className="font-semibold">Total Movies</h3>
                        <p className="text-2xl">{movies?.length}</p> {/* Replace with dynamic data if available */}
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Manage Movies</h2>
                        <div className="flex space-x-2">
                            {selectedMovie && (
                                <>
                                    <Link
                                        to="/admin/movies"
                                        search={{ movieId: selectedMovie.id }}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md hover:bg-blue-700 transition-all duration-200 ease-in-out flex items-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                        Edit
                                    </Link>
                                    <button
                                        onClick={handleDeleteMovie}
                                        className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md hover:bg-red-700 transition-all duration-200 ease-in-out flex items-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        Delete
                                    </button>
                                </>
                            )}
                            <Link
                                key='/admin/movies'
                                to='/admin/movies'
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md hover:bg-indigo-700 transition-all duration-200 ease-in-out flex items-center gap-2 group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add New Movie
                            </Link>
                        </div>
                    </div>
                    {/* Render the Movie Data Table */}
                    <MovieTable 
                        movies={movies ?? []} 
                        onSelectMovie={handleMovieSelect}
                        selectedMovieId={selectedMovie?.id}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;