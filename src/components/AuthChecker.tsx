import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useLoginStore } from '../store/useLoginStore';

interface AuthCheckerProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

export const AuthChecker: React.FC<AuthCheckerProps> = ({ children, requireAdmin = false }) => {
    const { isLoggedIn, isAdmin } = useLoginStore();
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate({ to: '/login' })
        } else if (requireAdmin && !isAdmin) {
            navigate({ to: '/' })
        }
    }, [isLoggedIn, isAdmin, navigate, requireAdmin])

    if (!isLoggedIn) return null;
    if (requireAdmin && !isAdmin) return null;
    return <>{children}</>;
}