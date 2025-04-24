import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { AuthChecker } from "../components/AuthChecker";
import HomePage from "../page/home";
import LoginPage from "../page/login";
import LogoutPage from "../page/logout";
import MyBookingPage from "../page/my-booking";
import AdminDashboardPage from "../page/admin/dashboard";
import App from "../App";
import { Movie } from "../types/movie";
import axios from "axios";

const rootRoute = createRootRoute({
    component: App
})

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => (
        <AuthChecker>
            <HomePage />
        </AuthChecker>
    ),
    loader: async () => {
        try {
            const response = await axios.get<Movie[]>('http://localhost:8080/api/getMoviesList');
            return response.data;
        } catch (error) {
            console.error('Movie data loading error:', error);
            return [];
        }
    },
})

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: LoginPage,
})

const logoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/logout',
    component: LogoutPage,
})

const myBookingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/my-booking',
    component: () => (
        <AuthChecker>
            <MyBookingPage />
        </AuthChecker>
    ),
})

const adminRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin',
    component: () => (
        <AuthChecker requireAdmin={true}>
            <AdminDashboardPage />
        </AuthChecker>
    ),
});

const routeTree = rootRoute.addChildren([
    indexRoute,
    loginRoute,
    logoutRoute,
    myBookingRoute,
    adminRoute
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}