import React from 'react';
import ProductList from '../../Components/ProductList/ProductList';
import './Home.css';

const Home = () => {
    return (
        <div className='HomeContainer'>
            <h1>Welcome to Our Store</h1>
            <p>Browse our collection of the best products available.</p>
            <ProductList />
        </div>
    );
};

export default Home;
