import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Cart.css'; // Import the CSS file
import { removeItem } from '../../features/cart/cartSlice';

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items);
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const dispatch = useDispatch();

    const removeFromCartHandler = id => {
        dispatch(removeItem(id));
    };

    return (
        <div className="CartContainer">
            <h1 className="CartTitle">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="empty-cart">Your cart is empty!</p>
            ) : (
                <div>
                    <div className="CartItems">
                        {cartItems.map(item => (
                            <div className="CartItem" key={item.id}>
                                <div className="CartItemInfo">
                                    <h3 className="CartItemName">{item.name}</h3>
                                    <p className="CartItemPrice">Price: ${item.price}</p>
                                    <p className="CartItemQuantity">Quantity: {item.quantity}</p>
                                </div>
                                <button
                                    className="RemoveItemButton"
                                    onClick={() => removeFromCartHandler(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="CartTotal">
                        <h2>Total: ${totalAmount.toFixed(2)}</h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
