import React, { useEffect, useState } from 'react';
import { addProduct, deleteProduct, fetchProducts, updateProduct } from '../../api';
import { useSnackbar } from '../../context/SnackbarContext';
import DataTable from '../DataTable/DataTable';
import ProductFormModal from '../ProductFormModal/ProductFormModal';
import ProductItem from '../ProductItem/ProductItem';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                showSnackbar('Error fetching products', 'error');
                console.error('Error fetching products:', error);
            }
        };

        getProducts();
    }, [showSnackbar]);

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            showSnackbar('Product deleted successfully!');
            setProducts(products.filter((product) => product.id !== id));
        } catch (error) {
            showSnackbar('Error fetching products', 'error');
            console.error('Error deleting product:', error);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    const handleAddProduct = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        setEditingProduct(null);
    };

    const handleAddProductModal = async (newProduct) => {
        try {
            await addProduct(newProduct);
            showSnackbar('Product added successfully!');
            handleCloseModal(); // Close the modal
        } catch (error) {
            showSnackbar('Error fetching products', 'error');
            console.error('Error adding product:', error);
        }
    };

    const handleEditProductModal = async (updatedProduct) => {
        try {
            await updateProduct(updatedProduct.id, updatedProduct);
            showSnackbar('Product updated successfully!');
            handleCloseModal(); // Close the modal
        } catch (error) {
            showSnackbar('Error fetching products', 'error');
            console.error('Error updating product:', error);
        }
    }

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' },
        { key: 'price', label: 'Price' },
        { key: 'quantity', label: 'Quantity' },
    ];

    const actions = [
        {
            label: 'Edit',
            className: 'edit-button',
            onClick: (row) => handleEdit(row),
        },
        {
            label: 'Delete',
            className: 'delete-button',
            onClick: (row) => handleDelete(row.id),
        },
    ];

    return (
        <div>
            <div className="ProductListHeader">
                <h1 className="ProductListHeading">Product List</h1>
                <button onClick={handleAddProduct} className="add-button">
                    Add Product
                </button>
            </div>
            {products && (
                <DataTable data={products} columns={columns} actions={actions} />
            )}
            {isAddModalOpen && (
                <ProductFormModal
                    open={isAddModalOpen}
                    onClose={handleCloseModal}
                    onSubmit={handleAddProductModal}
                    formTitle="Add Product"
                />
            )}
            {editingProduct && (
                <ProductFormModal
                    open={!!editingProduct}
                    onClose={handleCloseModal}
                    onSubmit={handleEditProductModal}
                    initialData={editingProduct}
                    formTitle="Edit Product"
                />
            )}
            <div>
                <h1>Welcome to Our Store</h1>
                <p>Browse our collection of the best products available.</p>
                <div className='ProductItemList'>
                    {
                        products?.map(product => (
                            <ProductItem key={product?.id} product={product} />
                        ))
                    }
                </div>
            </div>
        </div >
    );
};

export default ProductList;
