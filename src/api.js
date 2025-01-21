import axios from 'axios';

const API_BASE_URL = 'https://infinite-crag-97104-fbd5d845929b.herokuapp.com//api';

// Product API methods
export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/product`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/product/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};

export const addProduct = async (product) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/product`, product);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

export const updateProduct = async (id, product) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/product/${id}`, product);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/product/${id}`);
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};
