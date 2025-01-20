import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import CartPage from './pages/CartPage/CartPage';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
