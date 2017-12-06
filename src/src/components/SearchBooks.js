import React, { Component } from "react";
import ReactLoading from 'react-loading';
import BookShelf from './BookShelf';
import * as BooksAPI from '../services/BooksAPI';

class SearchBooks extends Component {

  // State
  state = {
    books: [],
    notFound: false,
    loading: false
  }

  // Function to fetch the books 
  searchBooks = query => {
    this.setState({ loading: true, books: [], notFound: false, });

    if (query) {
      BooksAPI.search(query).then(books => {
          // Not Found
          if (books.error)
            this.setState({ books: [], notFound: true, loading: false });
          else 
            this.setState({ books, notFound: false, loading: false });
        });
    }
    else 
      this.setState({ books: [], notFound: false, loading: false });
  }



  render() {

    const { books, notFound, loading } = this.state;

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
            <h1 className='not-found'>No results found for you query</h1>
          )}

          {loading && (
            <div className='loading'>
              <ReactLoading className='loading' type='bars' color='#2e7c31' delay={1} />
            </div>
          )}

        </div>
      </div>
    );
  }
}

export default SearchBooks