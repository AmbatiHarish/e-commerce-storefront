import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useSelector } from 'react-redux';

const Header = () => {
    const cartItems = useSelector(state => state.cart.items);
    const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <header className="HeaderContainer">
            <h1>E-Commerce Store</h1>
            <nav>
                <Link to="/" className="HeaderLink">Home</Link>
                <Link to="/cart" className="HeaderLink">Cart <span className="CartCount">{totalItems}</span></Link>
            </nav>
        </header>
    );
};

export default Header;
