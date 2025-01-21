import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { deleteProduct, fetchProducts, updateProduct } from "../../api";
import { useSnackbar } from "../../context/SnackbarContext";
import ProductList from "./ProductList";

jest.mock("../../context/SnackbarContext", () => ({
    useSnackbar: jest.fn(),
}));

jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
}));

jest.mock("../../api", () => ({
    fetchProducts: jest.fn(),
    addProduct: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
}));

describe("ProductList Component", () => {
    const mockShowSnackbar = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useSnackbar.mockReturnValue({ showSnackbar: mockShowSnackbar });
    });

    test("renders ProductList with header and Add Product button", () => {
        render(<ProductList />);

        expect(screen.getByText("Product List")).toBeInTheDocument();
        expect(screen.getByText("Add Product")).toBeInTheDocument();
    });

    test("fetches and displays products", async () => {
        const mockProducts = [
            { id: 1, name: "Product 1", description: "Description 1", price: 100, quantity: 10 },
        ];
        fetchProducts.mockResolvedValue(mockProducts);

        render(<ProductList />);

        await waitFor(() => expect(fetchProducts).toHaveBeenCalled());
        expect(screen.getAllByText(/Product 1/i)[0]).toBeInTheDocument();
    });

    test("shows snackbar on fetch error", async () => {
        fetchProducts.mockRejectedValue(new Error("Fetch Error"));

        render(<ProductList />);

        await waitFor(() => expect(fetchProducts).toHaveBeenCalled());
        expect(mockShowSnackbar).toHaveBeenCalledWith("Error fetching products", "error");
    });

    test("opens Add Product modal on button click", () => {
        render(<ProductList />);
        fireEvent.click(screen.getByText("Add Product"));

        expect(screen.getByTestId("Add Product")).toBeInTheDocument(); // Modal title
    });

    test("opens Edit Product modal with pre-filled data", async () => {
        const mockProducts = [
            { id: 1, name: "Product 1", description: "Description 1", price: 100, quantity: 10 },
        ];
        fetchProducts.mockResolvedValue(mockProducts);

        render(<ProductList />);
        await waitFor(() => expect(fetchProducts).toHaveBeenCalled());

        fireEvent.click(await screen.findByText("Edit"));

        expect(screen.getByText("Edit Product")).toBeInTheDocument(); // Modal title
        expect(screen.getByDisplayValue("Product 1")).toBeInTheDocument(); // Pre-filled data
        expect(screen.getByDisplayValue("Description 1")).toBeInTheDocument();
        expect(screen.getByDisplayValue("100")).toBeInTheDocument();
        expect(screen.getByDisplayValue("10")).toBeInTheDocument();
    });

    test("shows snackbar on update product error", async () => {
        updateProduct.mockRejectedValue(new Error("Update Error"));
        const mockProducts = [
            { id: 1, name: "Product 1", description: "Description 1", price: 100, quantity: 10 },
        ];

        fetchProducts.mockResolvedValue(mockProducts);

        render(<ProductList />);
        await waitFor(() => expect(fetchProducts).toHaveBeenCalled());

        const editButton = await screen.findByText("Edit");
        fireEvent.click(editButton);

        fireEvent.click(screen.getByText("Save"));

        await waitFor(() => expect(mockShowSnackbar).toHaveBeenCalledWith("Error fetching products", "error"));
    });

    test("deletes a product successfully", async () => {
        const mockProducts = [{ id: 1, name: "Product 1", description: "Description 1", price: 100, quantity: 10 }];
        fetchProducts.mockResolvedValue(mockProducts);
        deleteProduct.mockResolvedValue();

        render(<ProductList />);
        await waitFor(() => expect(fetchProducts).toHaveBeenCalled());

        fireEvent.click(await screen.findByText("Delete"));

        await waitFor(() => expect(deleteProduct).toHaveBeenCalledWith(1));
        expect(mockShowSnackbar).toHaveBeenCalledWith("Product deleted successfully!");
    });
});
