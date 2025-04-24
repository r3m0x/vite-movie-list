import { useLoginStore } from "../../store/useLoginStore";


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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-blue-100 p-4 rounded-lg">
                        <h3 className="font-semibold">Total Users</h3>
                        <p className="text-2xl">2</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg">
                        <h3 className="font-semibold">Total Movies</h3>
                        <p className="text-2xl">10</p>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded-lg">
                        <h3 className="font-semibold">Total Bookings</h3>
                        <p className="text-2xl">25</p>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Manage Movies</h2>
                    
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;