import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Header from "./Header";

// Mock Redux Store
const mockStore = configureStore([]);

describe("Header Component", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            cart: { items: [] },
        });
    });

    test("renders Header with title and navigation links", () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        );

        // Check title
        expect(screen.getByText(/E-Commerce Store/i)).toBeInTheDocument();

        // Check navigation links
        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/cart/i)).toBeInTheDocument();
    });

    test("displays correct total cart items in StyledBadge", () => {
        // Mock cart items
        store = mockStore({
            cart: { items: [{ id: 1, quantity: 2 }, { id: 2, quantity: 3 }] },
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        );

        // Check badge content
        expect(screen.getByText("5")).toBeInTheDocument(); // Total items: 2 + 3 = 5
    });

    test("navigates to Home and Cart pages", () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        );

        // Check Home link
        const homeLink = screen.getByText(/Home/i);
        expect(homeLink.getAttribute("href")).toBe("/");

        // Check Cart link
        const cartLink = screen.getByTestId(/cart-link/i);
        expect(cartLink.getAttribute("href")).toBe("/cart");
    });
});
