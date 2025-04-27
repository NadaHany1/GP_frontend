import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductGrid from './pages/ProductGrid';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import { AuthProvider } from './contexts/AuthContext';
import ProviderProfile from './pages/ProviderProfile';

function App() {

  return (

      <AuthProvider>
        <Navbar />
        <main className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductGrid />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/merProfile" element={<ProviderProfile/>}></Route>
          </Routes>
        </main>
      </AuthProvider>

  )
}

export default App
