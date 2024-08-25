import React, { useState } from 'react';
import { toast } from 'react-toastify';

function ShoppingCart({ cartItems, setCartItems, handlePlaceOrder }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price);
    return isNaN(price) ? total : total + price;
  }, 0);

  const handleRemoveItem = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
  };

  const handlePlaceOrderClick = async () => {
    const mobileNumber = prompt('Please enter your mobile number:');
    if (!mobileNumber) {
      toast.error('Mobile number is required!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems, mobileNumber }),
      });

      if (response.ok) {
        toast.success('Order placed successfully!');
        console.log('Order placed successfully!');
        setCartItems([]); // Clear the cart after successful order
        setIsOpen(false); // Close the cart popup after successful order
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
                {item.name} - ₹{item.price ? parseFloat(item.price).toFixed(2) : 'N/A'}
                <button onClick={() => handleRemoveItem(index)}>Delete</button>
              </li>
            ))}
          </ul>
          <div className="total">
            <span>Total: ₹{totalPrice.toFixed(2)}</span>
            <button onClick={handlePlaceOrderClick}>Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
