import './App.css'
import { Outlet } from 'react-router-dom';
import NavHeader from './components/NavHeader';

function App() {

  return (

    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <NavHeader />
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <Outlet /> {/* Renders matched child routes */}
      </main>
    </div>
  )
}

export default App