import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

// Mock the ProductList component
jest.mock('../../components/ProductList/ProductList', () => () => (
    <div data-testid="product-list">Mocked ProductList</div>
));

describe('Home Component', () => {
    test('renders the ProductList component', () => {
        render(<Home />);
        const productList = screen.getByTestId('product-list');
        expect(productList).toBeInTheDocument();
        expect(productList).toHaveTextContent('Mocked ProductList');
    });
});
