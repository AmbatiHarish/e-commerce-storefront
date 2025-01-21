import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Cart from './Cart';

const mockStore = configureStore([]);

describe('Cart Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            cart: {
                items: [
                    { id: '1', name: 'Item 1', price: 10, quantity: 2 },
                    { id: '2', name: 'Item 2', price: 20, quantity: 1 },
                ],
                totalAmount: 40,
            },
        });

        store.dispatch = jest.fn(); // Mock dispatch
    });

    test('renders the cart title', () => {
        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );

        expect(screen.getByText('Your Cart')).toBeInTheDocument();
    });

    test('displays "Your cart is empty!" when there are no items', () => {
        store = mockStore({
            cart: {
                items: [],
                totalAmount: 0,
            },
        });

        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );

        expect(screen.getByText('Your cart is empty!')).toBeInTheDocument();
    });

    test('renders all cart items', () => {
        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );

        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    test('renders the total amount correctly', () => {
        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );

        expect(screen.getByText('Total: $40.00')).toBeInTheDocument();
    });

    test('dispatches the removeItem action when "Remove" button is clicked', () => {
        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );

        const removeButtons = screen.getAllByText('Remove');
        fireEvent.click(removeButtons[0]);

        expect(store.dispatch).toHaveBeenCalledWith({ type: 'cart/removeItem', payload: '1' });
    });

    test('renders price and quantity for each cart item', () => {
        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );

        expect(screen.getByText('Price: $10')).toBeInTheDocument();
        expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
        expect(screen.getByText('Price: $20')).toBeInTheDocument();
        expect(screen.getByText('Quantity: 1')).toBeInTheDocument();
    });
});
