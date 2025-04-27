import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import MovieTable from "../../components/MovieTable";

import { adminApi } from "../../services/admin";
import { useLoginStore } from "../../store/useLoginStore";
import { Movie } from "../../types/movie";
import { Link } from "@tanstack/react-router";
// Import the new component

const AdminDashboardPage = () => {
    const { username } = useLoginStore();

    const { data: movies, isLoading, error: queryError } = useQuery<Movie[], Error>({
        queryKey: ['movies'],
        queryFn: async () => {
            const response: AxiosResponse<Movie[]> = await adminApi.getMoviesList();
            return response?.data || [];
        },
    });

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
                    {/* Render the Movie Data Table */}
                    <MovieTable movies={movies ?? []} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;