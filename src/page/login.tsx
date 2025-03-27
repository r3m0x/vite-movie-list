// LoginPage.tsx (or similar)
import { FormEvent, useState } from 'react';
import { useRootContext } from '../hooks/useRootContext';
import { useNavigate } from 'react-router';

const LoginPage = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useRootContext().dispatch;

    const handleLoginSubmit = (e: FormEvent) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            setError('');
            if (username === 'admin' && password === 'admin') {
                dispatch({ type: 'LOGIN' });
                navigate('/');
            } else {
                setError('Invalid username or password');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <div className="error-message">{error}</div>}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="login-button"
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;