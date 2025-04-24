import { Link } from '@tanstack/react-router';
import { useLoginStore } from '../store/useLoginStore';
import { routeTree } from '../routeTree.gen';

type NavItem = {
    path: string;
    label: string;
};

function Navbar() {

    const { isLoggedIn, isAdmin } = useLoginStore();

    const routeTreeChildren = routeTree.children ? Object.values(routeTree.children) : [];

    const filterNavItems: NavItem[] = routeTreeChildren
        ?.filter((route) => {

            if (isLoggedIn) {
                if (isAdmin) {
                    console.log("is login admin = ",route.path.startsWith("/admin") || route.path=== "/logout");
                    return route.path.startsWith("/admin") || route.path=== "/logout";
                }
                console.log("is login not admin = ",route.path !== "/login" && !route.path.startsWith("/admin"));
                return route.path !== "/login" && !route.path.startsWith("/admin")
            }
            else{
                console.log("is not login = ",route.path=== "/login");
                return route.path=== "/login"
            }

            // return (


            //     ((!isLoggedIn && route.path === "/login") ||
            //         (isLoggedIn && route.path !== "/login")) &&
            //     ((!isAdmin && !route.path.startsWith("/admin")) ||
            //         (isAdmin && route.path.startsWith("/admin")))
            // );
        })
        .map((route) => ({
            path: route.path,
            label: route?.options?.staticData?.label || route.path, // Use label if available, fallback to path
        })) || [];

    console.log(filterNavItems);


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