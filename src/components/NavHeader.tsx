import { Link } from 'react-router-dom';
import { useRootContext } from '../hooks/useRootContext';


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

    const loginContext = useRootContext();
    const isLoggedIn = loginContext.state.login.isLoggedIn;

    const filterNavItems = navItems.filter((item) => { return (!isLoggedIn && item.path === '/login') || (isLoggedIn && item.path != '/login') })

    return (
        <nav className="bg-gradient-to-r from-indigo-800 to-purple-800 p-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <span className="text-white font-semibold text-xl mr-6 tracking-wide">Movie booking</span>
                    <div className="md:flex space-x-4">
                        {filterNavItems.map((item) => (
                            <span key={item.path} className="">
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="text-gray-200 hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                                >
                                    {item.label}
                                </Link>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;