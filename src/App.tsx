import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { RootContextProvider } from './components/contextProvider'
import HomePage from './page/home'
import LoginPage from './page/login'
import ErrorPage from './page/error'
import MyBookingPage from './page/my-booking'
import LogoutPage from './page/logout'

function App() {
  return (
    <RootContextProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          {/* Navigation Header */}
          <header className="bg-blue-600 text-white p-4">
            <nav className="max-w-6xl mx-auto">
              <Link to="/" className="text-2xl font-bold hover:text-blue-200">
                Movie Database
              </Link>
            </nav>
          </header>

          <main className="max-w-6xl mx-auto p-4">
            <Routes>
              {/* Fixed route elements and paths */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/my-booking" element={<MyBookingPage />} />
              {/* Movie Details Route 
              <Route path="/movies/:id" element={<MovieDetails />} /> */}

              {/* 404 Page */}
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </RootContextProvider>
  )
}

export default App