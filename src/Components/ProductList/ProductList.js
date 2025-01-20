import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import './ProductList.css';

const dummyProducts = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Smartphone', price: 700 },
    { id: 3, name: 'Headphones', price: 150 },
    { id: 4, name: 'Smartwatch', price: 300 },
    { id: 5, name: 'Tablet', price: 400 },
    { id: 6, name: 'Charger', price: 50 },
    { id: 7, name: 'Mouse', price: 20 },
    { id: 8, name: 'Keyboard', price: 30 },
    { id: 9, name: 'Monitor', price: 200 },
    { id: 10, name: 'Printer', price: 150 },
];

const ProductList = () => {
    return (
        <div className='ProductListContainer'>
            {dummyProducts.map(product => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
