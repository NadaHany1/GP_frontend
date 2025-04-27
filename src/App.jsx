import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductGrid from './pages/ProductGrid';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import { AuthProvider } from './contexts/AuthContext';


function App() {

  return (

      <AuthProvider>
        <Navbar />
        <main className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductGrid />} />
            <Route path="/profile" element={<Profile />} />

          </Routes>
        </main>
      </AuthProvider>

  )
}

export default App
