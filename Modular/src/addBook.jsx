import React, { useState } from 'react';
import axios from 'axios';
import './addBook.css'
const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    publishedDate: '',
    ISBN: '',
    genre: '',
    pages: '',
    language: '',
    publisher: '',
    description: '',
    coverImage: '',
    rating: '',
    review: ''
  });
const [token,setToken] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    try {
        const res = await axios.post('http://localhost:3000/ziad/books/create', formData, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        }); // Replace YOUR_API_ENDPOINT with your actual endpoint
      console.log(res.data); // Log the response data
      alert('book added successfully   ')
      // Optionally, you can redirect or show a success message here
    } catch (err) {
      console.error(err); // Log any errors
      // Optionally, you can show an error message here
    }
  };

  return (
    <div className='AddBook'>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        
        <label>Author</label>
        <input type="text" name="author" value={formData.author} onChange={handleChange} required />

        <label>Price</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />

        <label>Published Date</label>
        <input type="date" name="publishedDate" value={formData.publishedDate} onChange={handleChange} required />

        <label>ISBN</label>
        <input type="text" name="ISBN" value={formData.ISBN} onChange={handleChange} required />

        <label>Genre</label>
        <input type="text" name="genre" value={formData.genre} onChange={handleChange} />

        <label>Pages</label>
        <input type="number" name="pages" value={formData.pages} onChange={handleChange} required />

        <label>Language</label>
        <input type="text" name="language" value={formData.language} onChange={handleChange} required />

        <label>Publisher</label>
        <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} />

        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>

        
        <label>Rating</label>
        <input type="number" name="rating" value={formData.rating} onChange={handleChange} />

        <label>Review</label>
        <textarea name="review" value={formData.review} onChange={handleChange}></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBook;
