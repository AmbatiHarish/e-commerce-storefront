import React from 'react';
import './ProductItem.css';
import { useDispatch } from 'react-redux';
import { addItem } from '../../features/cart/cartSlice';

const ProductItem = ({ product }) => {
    const dispatch = useDispatch();

    const addToCartHandler = () => {
        dispatch(addItem(product));
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
