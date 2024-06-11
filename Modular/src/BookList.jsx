import React, { useEffect, useState } from 'react';
import './BookList.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const App = () => {
  const [books, setBooks] = useState([]);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null); // Assuming you have access to the userId in your app

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    const userId = localStorage.getItem('userId');
    setUserId(userId);
   

    axios.get('http://localhost:3000/ziad/books/get-all', {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    })
    .then(response => setBooks(response.data))
    .catch(error => console.error('Error fetching books:', error));
  }, []);
// Modified addToCart function
const addToCart = async (bookId, price) => {
  try {
    const response = await axios.post('http://localhost:3000/ziad/carts/create', {
      userId,
      items: [{ bookId, quantity: 1, price }],
      totalPrice: price // Include totalPrice in the request body
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    alert('Item added to cart successfully!');
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};


  return (
    <div className="App">
      <header className="App-header">
        <h1>Book Cards</h1>
      </header>
      <div className="book-list">
        {books.map(book => (
          <div key={book._id} className="book-card">
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Price: ${book.price}</p>
            <p>Published Date: {new Date(book.publishedDate).toLocaleDateString()}</p>

            <button className="btn btn-primary" onClick={() => addToCart(book._id, book.price)}>
              Add to Cart
            </button>
            <Link to={`/bookDetails/${book._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <button className="btn btn-secondary">
                More Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
