import React from 'react';
import CustomNavbar from './Navbar';
import BookList from './BookList';
import Cart from './Cart';
import AboutUs from './AboutUs';
import ContactPage from './ContactPage';
import BookDetails from './BookDetails';
import Register from './Register';
import Login from './Login';
import AddBook from './addBook';
import Checkout from './Checkout';
import CheckoutPage from './CheckoutPage';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
function App() {
  return (
<div>
  <CustomNavbar />
  <Router>
  <Routes>
<Route path='/' element={<BookList/>}>Home</Route>
<Route path='/about' element={<AboutUs/>}>About</Route>
<Route path='/contact' element={<ContactPage/>}>Contact</Route>
<Route path='/register' element={<Register/>}>Register</Route>
<Route path='/login' element={<Login/>} >Login</Route>
<Route path='/addBook' element={<AddBook/>}>Add Book</Route>
<Route path='/cart' element={<Cart/>}>Cart</Route>
<Route path='/checkout' element={<Checkout/>}>Checkout</Route>
<Route path='/bookDetails/:id' element={<BookDetails />} />
<Route path='/checkoutPage' element={<CheckoutPage/>}>CheckoutPage</Route>
    
  </Routes>
  </Router>
  {/* Rest of your app content goes here */}
</div>
);
}

export default App;