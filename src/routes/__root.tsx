import { Outlet, createRootRoute } from "@tanstack/react-router";
import NavHeader from "../components/NavHeader";

export const Route = createRootRoute({
    component: () => (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white p-4">
                <NavHeader />
            </header>

            <main className="max-w-6xl mx-auto p-4">
                <Outlet />
            </main>
        </div>
    ),
});
