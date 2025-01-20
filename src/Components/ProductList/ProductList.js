import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import './ProductList.css';

const dummyProducts = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Smartphone', price: 700 },
    { id: 3, name: 'Headphones', price: 150 },
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
