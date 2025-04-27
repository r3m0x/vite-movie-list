import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useLoginStore } from "../../store/useLoginStore";

interface AuthCheckerProps {
  children: React.ReactNode;
  requiredLogin?: boolean;
  requireAdmin?: boolean;
}

export const AuthChecker: React.FC<AuthCheckerProps> = ({
  children,
  requiredLogin = false,
  requireAdmin = false,
}) => {
  const { isLoggedIn, role, checkExpiration } = useLoginStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check expiration first
    const isSessionValid = checkExpiration();
    
    if (requiredLogin && !isSessionValid) {
      navigate({ to: "/login" });
    } else if (requireAdmin && role !== "admin") {
      navigate({ to: "/" });
    } else if (!requireAdmin && role == "admin") {
      navigate({ to: "/admin" });
    }
  }, [isLoggedIn, role, navigate, requiredLogin, requireAdmin, checkExpiration]);

  if (requiredLogin && !isLoggedIn) {
    return null;
  }

  return <>{children}</>;
};
