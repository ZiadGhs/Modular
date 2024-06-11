import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
const[token,setToken] = useState(null);
 // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjY3NDZmM2EyN2MzY2MwMmMzNTYyNjAiLCJpYXQiOjE3MTgwNDU1ODEsImV4cCI6MTcxODA0OTE4MX0.eKKM_KuN-nw3nhIodB4DC7iXy-PlX0o48N2CUzZjcWk';


  useEffect(() => {
     const storedToken = localStorage.getItem('token');
   // console.log(storedToken);
    setToken(storedToken);
    axios.get(`http://localhost:3000/ziad/books/get-by-id/${id}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    })
    .then
    (
      
      response =>   setBook(response.data)
  
  
  )
    .catch(error => console.error('Error fetching the book details:', error));
    
  }, []);


  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Price: ${book.price}</p>
      <p>Published Date: {new Date(book.publishedDate).toDateString()}</p>
      <p>ISBN: {book.ISBN}</p>
      <p>Genre: {book.genre.join(', ')}</p>
      <p>Pages: {book.pages}</p>
      <p>Language: {book.language}</p>
      <p>Publisher: {book.publisher}</p>
      <p>Description: {book.description}</p>
      <img src={book.coverImage} alt={`${book.title} cover`} />
      <h2>Ratings</h2>
      {book.ratings.map((rating) => (
        <div key={rating._id}>
         <p>Rating: {rating.rating}</p>
          <p>Review: {rating.review}</p>
        </div>
      ))}
      <button><Link to='/'>Go back</Link></button>
    </div>
  );
};
export default BookDetails;
