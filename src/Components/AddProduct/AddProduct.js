import { Alert, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { addProduct } from '../../api';
import './AddProduct.css';

const AddProduct = ({ onProductAdded }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false); // State for Snackbar visibility

    const handleCloseSnackbar = () => {
        setShowSnackbar(false); // Hide Snackbar
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = {
            name,
            description,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
        };
        try {
            await addProduct(newProduct);
            setShowSnackbar(true); // Show Snackbar
            setName('');
            setDescription('');
            setPrice('');
            setQuantity('');
            if (onProductAdded) {
                onProductAdded(); // Notify parent to refresh the product list
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <form className="AddProductForm" onSubmit={handleSubmit}>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Product added successfully!
                </Alert>
            </Snackbar>
            <h2>Add a New Product</h2>
            <div className="form-group">
                <label>Product Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter product name"
                    required
                />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter product description"
                    rows="4"
                    required
                ></textarea>
            </div>
            <div className="form-group">
                <label>Price ($)</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price"
                    min="0"
                    step="0.01"
                    required
                />
            </div>
            <div className="form-group">
                <label>Quantity</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter quantity"
                    min="1"
                    required
                />
            </div>
            <button type="submit" className="submit-button">
                Add Product
            </button>
        </form>
    );
};

export default AddProduct;
