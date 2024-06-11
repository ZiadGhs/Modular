import React, { useState, useEffect } from 'react';
import Checkout from './Checkout';
import axios from 'axios';
import './checkOut.css'
const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUserId = localStorage.getItem('userId');

      const response = await axios.get(`http://localhost:3000/ziad/carts/get-by-user/${storedUserId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      });

      console.log(response.data); // Log the API response

      // Flatten and combine items by bookId
      const combinedItems = response.data.reduce((acc, cart) => {
        cart.items.forEach(item => {
          const existingItem = acc.find(i => i.bookId._id === item.bookId._id);
          if (existingItem) {
            existingItem.quantity += item.quantity;
          } else {
            acc.push({ ...item, cartId: cart._id });
          }
        });
        return acc;
      }, []);

      setCartItems(combinedItems);

      // Calculate total price
      const total = combinedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setTotalPrice(total);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <Checkout cartItems={cartItems} totalPrice={totalPrice} />
    </div>
  );
};

export default CheckoutPage;
