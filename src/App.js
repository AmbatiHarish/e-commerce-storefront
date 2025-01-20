import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/cart" element={<h1>Cart</h1>} />
      </Routes>
    </div>
  );
}

export default App;
