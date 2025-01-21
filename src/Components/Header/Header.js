import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useSelector } from 'react-redux';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const Header = () => {
    const cartItems = useSelector(state => state.cart.items);
    const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <header className="HeaderContainer">
            <h1>E-Commerce Store</h1>
            <nav>
                <Link to="/" className="HeaderLink">Home</Link>
                <Link to="/cart" className="HeaderLink"><IconButton aria-label="cart">
                    <StyledBadge badgeContent={totalItems} color="secondary">
                        <ShoppingCartIcon />
                    </StyledBadge>
                </IconButton></Link>
            </nav>
        </header>
    );
};

export default Header;
