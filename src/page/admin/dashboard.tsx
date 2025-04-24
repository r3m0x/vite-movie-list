import { useLoginStore } from "../../store/useLoginStore";
import { MovieDataTable } from "../../components/admin/MovieDataTable"; // Import the new component

const AdminDashboardPage = () => {
    const { username } = useLoginStore();

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
                        <p className="text-2xl">10</p> {/* Replace with dynamic data if available */}
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Manage Movies</h2>

                        Add New Movie

                    </div>
                    {/* Render the Movie Data Table */}
                    <MovieDataTable />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;