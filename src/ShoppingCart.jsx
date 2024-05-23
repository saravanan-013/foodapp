import React, { useState } from 'react';
import { toast } from 'react-toastify';


function ShoppingCart({ cartItems }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price);
    return isNaN(price) ? total : total + price;
  }, 0);

  const handlePlaceOrder = async () => {
    try {
      // Send cart details to the backend
      const response = await fetch('https://foodapp-bcc0.onrender.com/api/dishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems }),
      });

      if (response.ok) {
        // If the response is successful, show a toast notification
        toast.success('Order placed successfully!');
        console.log('Order placed successfully!');
      } else {
        // If there's an error in the response, handle it accordingly
        console.error('Failed to place order:', response.statusText);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="shopping-cart">
      <button onClick={toggleCart}>Cart ({cartItems.length})</button>
      {isOpen && (
        <div className="cart-dropdown">
          <h3>Shopping Cart</h3>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price ? parseFloat(item.price).toFixed(2) : 'N/A'}
              </li>
            ))}
          </ul>
          <div className="total">
            <span>Total: ${totalPrice.toFixed(2)}</span>
            <button onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
