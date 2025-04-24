import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useLoginStore } from "../store/useLoginStore";


const LogoutPage = () => {
    const { logout } = useLoginStore();
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        navigate({ to: '/' });
    }, [logout, navigate]);

    return (
        <div className="text-center py-8">
            <h2 className="text-xl text-red-500">Logout successfully</h2>
        </div>
    );
};

export default LogoutPage;
