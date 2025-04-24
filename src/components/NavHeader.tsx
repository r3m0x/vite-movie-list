import { Link } from '@tanstack/react-router';
import { useLoginStore } from '../store/useLoginStore';
import { routeTree } from '../routeTree.gen';

type NavItem = {
    path: string;
    label: string;
};

function Navbar() {

    const { isLoggedIn, role } = useLoginStore();

    const routeTreeChildren = routeTree.children ? Object.values(routeTree.children) : [];

    const filterNavItems: NavItem[] = routeTreeChildren
        ?.filter((route) => {
            const isAdmin = role === "admin";
            return (
                ((!isLoggedIn && route.path === "login") ||
                    (isLoggedIn && route.path !== "login")) &&
                ((!isAdmin && !route.path.startsWith("admin")) ||
                    (isAdmin && route.path.startsWith("admin")))
            );
        })
        .map((route) => {
            const absolutePath = route.path.startsWith('/') ? route.path : `/${route.path}`;
            return {
                path: absolutePath,
                label: route?.options?.staticData?.label || absolutePath, // Use label if available, fallback to path
            };
        }) || [];

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