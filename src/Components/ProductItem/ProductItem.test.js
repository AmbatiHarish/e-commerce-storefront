import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../features/cart/cartSlice"; // Adjust the import path
import ProductItem from "./ProductItem";

jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
}));

jest.mock("../../features/cart/cartSlice", () => ({
    addItem: jest.fn(),
}));

describe("ProductItem Component", () => {
    const mockDispatch = jest.fn();
    const product = { id: 1, name: "Test Product", price: 100 };

    beforeEach(() => {
        jest.clearAllMocks();
        useDispatch.mockReturnValue(mockDispatch);
    });

    test("renders product details", () => {
        render(<ProductItem product={product} />);

        // Check product name
        expect(screen.getByText("Test Product")).toBeInTheDocument();

        // Check product price
        expect(screen.getByText("Price: $100")).toBeInTheDocument();

        // Check Add to Cart button
        expect(screen.getByText("Add to Cart")).toBeInTheDocument();
    });

    test("dispatches addItem action on button click", () => {
        render(<ProductItem product={product} />);

        const addToCartButton = screen.getByText("Add to Cart");
        fireEvent.click(addToCartButton);

        // Verify addItem action is called with correct product
        expect(addItem).toHaveBeenCalledWith(product);

        // Verify dispatch is called with the addItem action
        expect(mockDispatch).toHaveBeenCalledWith(addItem(product));
    });

    test("renders correctly with undefined product", () => {
        render(<ProductItem product={undefined} />);

        // Check that no product name or price is displayed
        expect(screen.queryByText(/Price/i)).not.toBeInTheDocument();
        expect(screen.queryByText("Add to Cart")).not.toBeInTheDocument();
    });
});
