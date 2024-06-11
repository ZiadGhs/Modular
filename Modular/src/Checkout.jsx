import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './checkOut.css'
const Checkout = ({ cartItems }) => {
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [token, setToken] = useState('')
  const [userId, setUserId] = useState('')
  useEffect(() => {
    // Calculate total price of items in cart
    const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const handleShippingChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCheckout = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUserId = localStorage.getItem('userId');
  
      // Ensure both token and user ID are available
      if (!storedToken || !storedUserId) {
        console.error('Token or user ID not found in localStorage');
        return;
      }
  
      // Set token and user ID states
      setToken(storedToken);
      setUserId(storedUserId);
  
      // Create the order object
      const order = {
        userId: storedUserId, // Include the userId in the order object
        items: cartItems,
        totalPrice: totalPrice,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod
      };
  
      // Make the POST request to create the order
     
        // Your code to create the order
        await axios.post('http://localhost:3000/ziad/orders/create', order, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
      
        // If the request is successful, log a success message
        console.log('Order placed successfully');
        alert('Order placed successfully');
      } catch (error) {
        // Check if the error is due to a network issue or server error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Error creating order:', error.response.data);
          alert('Failed to place order: ' + error.response.data.error);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
          alert('Failed to place order: No response received from the server');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up request:', error.message);
          alert('Failed to place order: ' + error.message);
        }
      }
    }
  
  return (
    <div className='checkout-container'>
      <h2>Checkout</h2>
      <div>
        <h3>Shipping Address</h3>
        <input type="text" name="street" value={shippingAddress.street} onChange={handleShippingChange} placeholder="Street" required />
        <input type="text" name="city" value={shippingAddress.city} onChange={handleShippingChange} placeholder="City" required />
        <input type="text" name="state" value={shippingAddress.state} onChange={handleShippingChange} placeholder="State" required />
        <input type="text" name="postalCode" value={shippingAddress.postalCode} onChange={handleShippingChange} placeholder="Postal Code" required />
        <input type="text" name="country" value={shippingAddress.country} onChange={handleShippingChange} placeholder="Country" required />
      </div>
      <div>
        <h3>Payment Method</h3>
        <label>
          <input type="radio" name="paymentMethod" value="PayPal" onChange={handlePaymentChange} />
          PayPal
        </label>
        <label>
          <input type="radio" name="paymentMethod" value="CreditCard" onChange={handlePaymentChange} />
          Credit Card
        </label>
      </div>
      <div>
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default Checkout;
