import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCartItems = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUserId = localStorage.getItem('userId');

      const response = await axios.get(`http://localhost:3000/ziad/carts/get-by-user/${storedUserId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      });

      console.log(response.data);  // Log the API response

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

  useEffect(() => {
    fetchCartItems();
  }, []);

  const removeFromCart = async (cartId, itemId) => {
    try {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        console.error('No token found in local storage');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      };

      const response = await axios.delete(`http://localhost:3000/ziad/carts/delete-by-id/${cartId}`, config);

      if (response.status === 200) {
        // Update the cart items state
        const updatedCartItems = cartItems.map(item => {
          if (item.cartId === cartId && item._id === itemId) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }).filter(item => item.quantity > 0);

        setCartItems(updatedCartItems);

        // Recalculate total price after removing item
        const total = updatedCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotalPrice(total);

        //console.log('Cart item successfully removed');
        alert('Cart item successfully removed')
      } else {
        console.error('Failed to delete cart item:', response);
      }
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  return (
    <div>
    
      <h1>Cart</h1>
      
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map(item => (
          <div key={item._id}>
            <h3>Title: {item.bookId.title}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => removeFromCart(item.cartId, item._id)}>Remove</button>
          </div>
        ))
      )}
        <button type="button"><Link to='/checkoutPage'>checkout</Link></button>
    </div>
  );
};

export default CartPage;
