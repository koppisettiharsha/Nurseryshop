import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice'; // Adjust path as necessary
import './CartItem.css'; // Import CSS for styling

const CartItem = ({ item, onContinueShopping }) => {
    const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = () => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item.name)); // Remove item if quantity drops to 0
        }
    };

    const handleRemove = () => {
        dispatch(removeItem(item.name));
    };

    // Calculate total cost for this item
    const calculateTotalCost = () => {
        return parseFloat(item.cost.substring(1)) * item.quantity; // Convert cost string to number and multiply by quantity
    };

    return (
        <div className="cart-item">
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
                <h2>{item.name}</h2>
                <div>Price: {item.cost}</div>
                <div>Quantity: {item.quantity}</div>
                <div>Subtotal: ${calculateTotalCost().toFixed(2)}</div>
                <button onClick={handleIncrement}>+</button>
                <button onClick={handleDecrement}>-</button>
                <button onClick={handleRemove}>Remove</button>
            </div>
        </div>
    );
};

const CartItems = () => {
    const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux store
    const dispatch = useDispatch();

    const calculateTotalAmount = () => {
        let total = 0;
        cartItems.forEach(item => {
            total += calculateTotalCost(item);
        });
        return total;
    };

    const handleContinueShopping = (e) => {
        onContinueShopping(e); // Call the function passed from parent component
    };

    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

    return (
        <div className="cart-container">
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <CartItem key={item.name} item={item} />
                    ))}
                    <h2>Total Cost: ${calculateTotalAmount().toFixed(2)}</h2>
                    <button onClick={handleContinueShopping}>Continue Shopping</button>
                    <button onClick={handleCheckoutShopping}>Checkout</button>
                </>
            )}
        </div>
    );
};

export default CartItems;
