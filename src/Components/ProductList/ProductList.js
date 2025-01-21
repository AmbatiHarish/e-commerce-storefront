import React, { useEffect, useState } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import './ProductList.css';
import { fetchProducts } from '../../api';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        getProducts();
    }, []);
    return (
        <div className='ProductListContainer'>
            {products.map(product => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
