import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="HeaderContainer">
            <h1>E-Commerce Store</h1>
            <nav>
                <Link to="/" className="HeaderLink">Home</Link>
                <Link to="/cart" className="HeaderLink">Cart</Link>
            </nav>
        </header>
    );
};

export default Header;
