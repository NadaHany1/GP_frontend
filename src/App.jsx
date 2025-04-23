import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductGrid from './pages/ProductGrid';
import Navbar from './components/Navbar';


function App() {

  return (
    <>
      <Navbar/>
      <main className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductGrid />} />
        </Routes>
      </main>
    </>
  )
}

export default App
