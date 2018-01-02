import React from "react";
import Book from "./Book";

const BookShelf = ({ title, books = [], changeShelfBook, getCurrentShelfBook }) => (
    
  <div className="bookshelf">
    <div className="bookshelf-title-header">
      <h2 className="bookshelf-title">{title} ({books.length})</h2>
      
    </div>
    <div className="bookshelf-books">
      {books.length > 0 && (
        <ol className="books-grid">
          {books.map(book => {
            book = Object.assign([], book);

            if (getCurrentShelfBook)
              book = getCurrentShelfBook(book);
            
            return (
            <li key={book.id}>
              <Book 
                key={book.id} 
                book={book}
                changeShelfBook={changeShelfBook} />
            </li>
            )
          })}
        </ol>
      )}
      {books.length === 0 && (
        <span className="not-found">No books on this bookshelf</span>
      )}
    </div>
  </div>
);

export default BookShelf;
