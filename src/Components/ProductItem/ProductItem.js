import React from 'react';
import './ProductItem.css';

const ProductItem = ({ product }) => {

    const addToCartHandler = () => {

    };

    return (
        <div className='ProductItemContainer'>
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
    );
};

export default ProductItem;
