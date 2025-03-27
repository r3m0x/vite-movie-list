import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRootContext } from "../hooks/useRootContext";

const LogoutPage = () => {
    const { dispatch } = useRootContext();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({ type: 'LOGOUT' });
    }, [dispatch, navigate]);

    return (
        <div className="text-center py-8">
            <h2 className="text-xl text-red-500">Logout successfully</h2>
        </div>
    );
};

export default LogoutPage;
