import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRootContext } from "../hooks/useRootContext";

export const LoginChecker = () => {
    const loginContext = useRootContext();
    const navigate = useNavigate();

    const isLoggedIn = loginContext.state?.login?.isLoggedIn;

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        } else if (location.pathname === '/login') {
            navigate('/'); // Or navigate to your home page path
        }
    }, [isLoggedIn, navigate]);

    return <Outlet />;
};