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
    const mobileNumber = prompt('Please enter your mobile number:');
    if (!mobileNumber) {
      toast.error('Mobile number is required!');
      return;
    }

    const token = localStorage.getItem('token'); // Assume the token is stored in localStorage

    if (!token) {
      toast.error('You must be logged in to place an order.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ cartItems, mobileNumber }),
      });

      if (response.ok) {
        toast.success('Order placed successfully!');
        console.log('Order placed successfully!');
      } else {
        const errorData = await response.json();
        toast.error(`Failed to place order: ${errorData.error}`);
        console.error('Failed to place order:', response.statusText);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Error placing order!');
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
