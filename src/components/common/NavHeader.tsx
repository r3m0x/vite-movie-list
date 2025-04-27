import { Link } from '@tanstack/react-router';
import { routeTree } from '../../routeTree.gen';
import { useLoginStore } from '../../store/useLoginStore';

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
                (!route.options?.staticData?.hideInNav && (!isLoggedIn && route.path === "login") ||
                    (isLoggedIn && route.path !== "login")) &&
                ((!isAdmin && !route.path.startsWith("admin")) ||
                    (isAdmin && (route.path.startsWith("admin") || route.path === "logout" )))
            );
        })
        .map((route) => {
            const absolutePath = route.path.startsWith('/') ? route.path : `/${route.path}`;
            return {
                path: absolutePath,
                label: route?.options?.staticData?.label || absolutePath,
            };
        }) || [];

    return (
        <nav className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h-2v-2h2zm-2-2h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-4h2v-2h-2v2zm-4 0h2v-2H7v2zm0 4h2v-2H7v2z" clipRule="evenodd" />
                        </svg>
                        <span className="text-white font-bold text-2xl tracking-tight">Vite Movie Booking</span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-2">
                            {filterNavItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="text-gray-300 hover:bg-slate-600 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out flex items-center"
                                    activeProps={{
                                        className: "bg-slate-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    {isLoggedIn && (
                        <div className="flex items-center">
                            <div className="ml-3 relative">
                                <div className="bg-slate-600 p-1 rounded-full text-teal-400">
                                    <span className="sr-only">User profile</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Mobile menu - can be expanded if needed */}
            <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {filterNavItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="text-gray-300 hover:bg-slate-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;