import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useLoginStore } from '../store/useLoginStore';

interface AuthCheckerProps {
    children: React.ReactNode;
    requiredLogin?: boolean;
    requireAdmin?: boolean;
}

export const AuthChecker: React.FC<AuthCheckerProps> = ({ children, requiredLogin = false, requireAdmin = false }) => {
    const { isLoggedIn, isAdmin } = useLoginStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (requiredLogin && !isLoggedIn) {
            navigate({ to: '/login' });
        } else if (requireAdmin && !isAdmin) {
            navigate({ to: '/' });
        }
    }, [isLoggedIn, isAdmin, navigate, requiredLogin, requireAdmin]);

    if ((requiredLogin && !isLoggedIn) || (requireAdmin && !isAdmin)) {
        return null;
    }

    return <>{children}</>;
};