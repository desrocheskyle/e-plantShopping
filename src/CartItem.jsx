import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addItem } from './CartSlice';
import './CartItem.css';

const unit = (cost) => {
  const n = parseFloat(String(cost).replace(/[^0-9.]/g, ''));
  return Number.isNaN(n) ? 0 : n;
};

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      total += (item.quantity ?? 0) * unit(item.cost);
    });
    return total.toFixed(2);
  };

  const calculateTotalCost = (item) =>
    ((item.quantity ?? 0) * unit(item.cost)).toFixed(2);

  const handleContinueShopping = (e) => {
    if (typeof onContinueShopping === 'function') onContinueShopping(e);
  };

  // --- Task 4 actions ---

  // Use updateQuantity to change how many items are in the cart
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: (item.quantity ?? 0) + 1 }));
  };

  const handleDecrement = (item) => {
    const q = item.quantity ?? 0;
    if (q > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: q - 1 }));
    } else {
      // Use removeItem to delete an item completely
      // (exactly as the lab hint shows)
      dispatch(removeItem(item.name));
    }
  };

  // Use removeItem to delete an item completely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); // <-- matches lab hint
  };

  // Optional: Use addItem to add a new product (or +1 of the same)
  const handleAddOneMore = (item) => {
    dispatch(addItem({ name: item.name, image: item.image, cost: item.cost }));
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>

              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>

                {/* Optional helper to show addItem usage inside Cart */}
                <button
                  className="cart-item-button"
                  onClick={() => handleAddOneMore(item)}
                  title="Add one via addItem reducer"
                >
                  +1 (addItem)
                </button>
              </div>

              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount" />

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
