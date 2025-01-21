import React from 'react';
import { render, screen } from '@testing-library/react';
import CartPage from './CartPage';

jest.mock('../../components/Cart/Cart', () => () => <div data-testid="cart-component">Cart Component</div>);

describe('CartPage Component', () => {
  test('renders CartPage and Cart component', () => {
    render(<CartPage />);

    // Check that CartPage renders successfully
    expect(screen.getByTestId('cart-component')).toBeInTheDocument();
    expect(screen.getByText('Cart Component')).toBeInTheDocument();
  });

  test('matches the snapshot', () => {
    const { asFragment } = render(<CartPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
