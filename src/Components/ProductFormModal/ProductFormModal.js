import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from '../../context/SnackbarContext';

const ProductFormModal = ({ open, onClose, onSubmit, initialData, formTitle }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        // Populate the form fields if initialData is provided (for editing)
        if (initialData) {
            setName(initialData.name || '');
            setDescription(initialData.description || '');
            setPrice(initialData.price || '');
            setQuantity(initialData.quantity || '');
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form fields
        if (!name || !description || !price || !quantity) {
            showSnackbar("All fields are required.", "error");
            return; // Do not proceed if validation fails
        }
        const productData = {
            id: initialData.id, // Include ID if editing
            name,
            description,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
        };
        onSubmit(productData); // Pass data to the parent component
        onClose(); // Close the modal
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle data-testid={formTitle}>{formTitle}</DialogTitle>
            <DialogContent>
                <form>
                    <TextField
                        data-testid="product-name"
                        label="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        data-testid="product-description"
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        required
                    />
                    <TextField
                        data-testid="product-price"
                        label="Price ($)"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        data-testid="product-quantity"
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary" variant="outlined">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductFormModal;
