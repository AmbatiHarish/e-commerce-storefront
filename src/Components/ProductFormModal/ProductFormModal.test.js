import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductFormModal from "./ProductFormModal";
import { SnackbarProvider } from "../../context/SnackbarContext";

const mockShowSnackbar = jest.fn();
const mockOnClose = jest.fn();
const mockOnSubmit = jest.fn();

const renderWithSnackbar = (ui) => {
    return render(
        <SnackbarProvider value={{ showSnackbar: mockShowSnackbar }}>
            {ui}
        </SnackbarProvider>
    );
};


describe("ProductFormModal", () => {
    const initialData = {
        id: 1,
        name: "Sample Product",
        description: "Sample Description",
        price: 20,
        quantity: 5,
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders the modal with form fields", () => {
        renderWithSnackbar(
            <ProductFormModal
                open={true}
                onClose={mockOnClose}
                onSubmit={mockOnSubmit}
                formTitle="Add Product"
            />
        );

        expect(screen.getByText(/Add Product/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Product Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Quantity/i)).toBeInTheDocument();
    });

    test("populates form fields with initial data", () => {
        renderWithSnackbar(
            <ProductFormModal
                open={true}
                onClose={mockOnClose}
                onSubmit={mockOnSubmit}
                initialData={initialData}
                formTitle="Edit Product"
            />
        );

        expect(screen.getByLabelText(/Product Name/i)).toHaveValue(initialData.name);
        expect(screen.getByLabelText(/Description/i)).toHaveValue(initialData.description);
        expect(screen.getByLabelText(/Price/i)).toHaveValue(initialData.price);
        expect(screen.getByLabelText(/Quantity/i)).toHaveValue(initialData.quantity);
    });

    test("updates form state on input change", () => {
        renderWithSnackbar(
            <ProductFormModal
                open={true}
                onClose={mockOnClose}
                onSubmit={mockOnSubmit}
                formTitle="Add Product"
            />
        );

        const nameInput = screen.getByLabelText(/Product Name/i);
        const descriptionInput = screen.getByLabelText(/Description/i);
        const priceInput = screen.getByLabelText(/Price/i);
        const quantityInput = screen.getByLabelText(/Quantity/i);

        fireEvent.click(nameInput, { target: { value: "New Product" } });
        fireEvent.click(descriptionInput, { target: { value: "New Description" } });
        fireEvent.click(priceInput, { target: { value: 30 } });
        fireEvent.click(quantityInput, { target: { value: 10 } });

        expect(nameInput.value).toBe("New Product");
        expect(descriptionInput).toHaveValue("New Description");
        expect(priceInput).toHaveValue(30);
        expect(quantityInput).toHaveValue(10);
    });

    test("submits correct data", () => {
        renderWithSnackbar(
            <ProductFormModal
                open={true}
                onClose={mockOnClose}
                onSubmit={mockOnSubmit}
                initialData={initialData}
                formTitle="Edit Product"
            />
        );

        fireEvent.click(screen.getByText(/Save/i));

        expect(mockOnSubmit).toHaveBeenCalledWith({
            id: initialData.id,
            name: initialData.name,
            description: initialData.description,
            price: parseFloat(initialData.price),
            quantity: parseInt(initialData.quantity, 10),
        });
        expect(mockOnClose).toHaveBeenCalled();
    });

    test("closes the modal on cancel", () => {
        renderWithSnackbar(
            <ProductFormModal
                open={true}
                onClose={mockOnClose}
                onSubmit={mockOnSubmit}
                formTitle="Add Product"
            />
        );

        fireEvent.click(screen.getByText(/Cancel/i));
        expect(mockOnClose).toHaveBeenCalled();
    });

    test("prevents submission with empty fields", () => {
        renderWithSnackbar(
            <ProductFormModal
                open={true}
                onClose={mockOnClose}
                onSubmit={mockOnSubmit}
                formTitle="Add Product"
            />
        );

        fireEvent.click(screen.getByLabelText(/Product Name/i), { target: { value: "" } });
        fireEvent.click(screen.getByText(/Save/i));

        expect(mockOnSubmit).not.toHaveBeenCalled();
        expect(mockOnClose).not.toHaveBeenCalled();
    });
});
