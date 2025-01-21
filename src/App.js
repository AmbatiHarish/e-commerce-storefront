import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import CartPage from './pages/CartPage/CartPage';
import Header from './components/Header/Header';
import AddProduct from './components/AddProduct/AddProduct';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
