import React from 'react';
import { Route } from'react-router-dom';
import * as BooksAPI from '../services/BooksAPI';
// My components
import MyShelf from '../components/MyShelf';
import SearchBooks from '../components/SearchBooks';
// Plugins 
import _ from 'lodash';

class App extends React.Component {

  // State Inicial
  state = {
    books: {},
    loading: true
  }

  componentDidMount() {
    // Get All books
    this.getAllMyBooksShelf();
  }

  // Function to get all books
  getAllMyBooksShelf = () => {
    // Search from api
    BooksAPI.getAll().then(result => {
      // Group books by shelf
      const books = _.groupBy(result, 'shelf');
      // Update state 
      this.setState( { books, loading: false } );
    });
  }

  // Function to update the book on a shelf
  changeShelfBook = (book, newShelf) => {

    // Update state
    this.setState(prevState => {
      // Books
      const { books } = prevState;

      // Check the shelf's book
      if (book.shelf) {
        // Remove book from current shelf
        books[book.shelf] = books[book.shelf].filter(b => b.id !== book.id);
      }

      // Check the new Shelf
      if (newShelf !== "none") {
          // Update shelf's book
        book.shelf = newShelf;
        // Check if there were already any books on the target shelf
        if (!books[newShelf]) 
          // If not, initialize
          books[newShelf] = [];
        
        // Add book on the new shelf
        books[newShelf].push(book);
      }

      // Return the new state of books
      return books;
    });

    // Update Api
    BooksAPI.update(book, newShelf);
  }

  // Function to check if the book is already in some shelf
  getCurrentShelfBook = (book) => {
    const { books } = this.state;
    // Browse properties
    for (var property in books) {
      // Check the book 
      if (books[property].filter(b => b.id === book.id).length > 0)
        return property;
    }
     
    // If it does not find returns none
    return 'none';
  }

  render() {
    return (
      <div className="app">

        {/* Route to component Shelf */}
        <Route exact path='/' render={() => (
          <MyShelf 
            books={this.state.books}
            changeShelfBook={this.changeShelfBook}
            loading={this.state.loading} />
        )}/>

        {/* Route to component SearchBooks */}
        <Route path='/search' render={({ history }) => (
          <SearchBooks 
            changeShelfBook={this.changeShelfBook}
            getCurrentShelfBook={this.getCurrentShelfBook}
            back={() => history.push('/')} />
        )}/>

      </div>
    )
  }
}

export default App
