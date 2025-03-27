import { createBrowserRouter, createRoutesFromElements, Route, useLoaderData } from "react-router";
import { LoginChecker } from "../components/LoginChecker";
import ErrorPage from "../page/error";
import HomePage from "../page/home";
import LoginPage from "../page/login";
import LogoutPage from "../page/logout";
import MyBookingPage from "../page/my-booking";
import { RootContextProvider } from "../components/contextProvider";
import App from "../App";
import { Movie } from "../types/movie";
import axios from "axios";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={(
                <RootContextProvider>
                    <App />
                </RootContextProvider>
            )}
            errorElement={<ErrorPage />}
        >
            <Route path="login" element={<LoginPage />} />
            <Route path="logout" element={<LogoutPage />} />

            <Route element={<LoginChecker />}>
                <Route
                    index
                    element={<HomePage />}
                    loader={async () => {
                        try {
                            const response = await axios.get<Movie[]>('../data/movies.json');
                            return response.data;
                        } catch (error) {
                            console.error('Movie data loading error:', error);
                        }
                    }}
                />
                <Route path="my-booking" element={<MyBookingPage />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
        </Route>
    )
);