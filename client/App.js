import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookList from './components/Books/BookList';
import BookDetail from './components/Books/BookDetail';
import Cart from './components/Cart/Cart';
import OrderList from './components/Orders/OrderList';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={BookList} />
        <Route path="/books/:id" component={BookDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/orders" component={OrderList} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
