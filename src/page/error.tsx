import { Link } from "react-router-dom";

const ErrorPage = () => {

    return (
        <div className="text-center py-8">
            <h2 className="text-xl text-red-500">Page not found</h2>
            <p className="mt-4">
                <Link to="/" className="text-blue-500 hover:underline">
                    Back to Home
                </Link>
            </p>
        </div>
    );
};

export default ErrorPage;
