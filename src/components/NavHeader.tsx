import { Link } from '@tanstack/react-router';
import { useLoginStore } from '../store/useLoginStore';

type NavItem = {
    path: string;
    label: string;
};

const navItems: NavItem[] = [
    { path: '/', label: 'Home' },
    { path: '/my-booking', label: 'My Bookings' },
    { path: '/login', label: 'Login' },
    { path: '/logout', label: 'Logout' }
];

function Navbar() {

    const { isLoggedIn } = useLoginStore();

    const filterNavItems = navItems.filter((item) => { return (!isLoggedIn && item.path === '/login') || (isLoggedIn && item.path != '/login') })

    return (
        <nav className="bg-gradient-to-r from-purple-800 to-indigo-900 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <span className="text-white font-bold text-2xl tracking-tight">MovieHub</span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {filterNavItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="text-gray-300 hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;