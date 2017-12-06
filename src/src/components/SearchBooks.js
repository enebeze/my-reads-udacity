import React, { Component } from "react";
import BookShelf from './BookShelf';
import * as BooksAPI from '../services/BooksAPI';

class SearchBooks extends Component {

  // State
  state = {
    books: [],
    notFound: false
  }

  // Function to fetch the books 
  searchBooks = query => {
    if (query) {
      BooksAPI.search(query).then(books => {
          // Not Found
          if (books.error)
            this.setState({ books: [], notFound: true });
          else 
            this.setState({ books, notFound: false });
        });
    }
    else 
      this.setState({ books: [], notFound: false });
  }



  render() {

    const { books, notFound } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a
            className="close-search"
            onClick={ this.props.back }
          >
            Close
          </a>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author" 
              onChange={event => this.searchBooks(event.target.value)} />
          </div>
        </div>
        
        <div className="search-books-results">
          
          {books.length > 0 && (
            <BookShelf 
              title="Search Result"
              books={books}
              changeShelfBook={this.props.changeShelfBook}
              getCurrentShelfBook={this.props.getCurrentShelfBook}
            />
          )}

          {notFound && (
            <h1 className="not-found">No results found for you query</h1>
          )}

        </div>
      </div>
    );
  }
}

export default SearchBooks