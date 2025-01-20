import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<h1>Cart</h1>} />
      </Routes>
    </div>
  );
}

export default App;
