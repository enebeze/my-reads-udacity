import React from "react";
import Book from "./Book";

const BookShelf = ({ title, books = [], changeShelfBook, getCurrentShelfBook }) => (
    
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      {books.length > 0 && (
        <ol className="books-grid">
          {books.map(book => (
            <li key={book.id}>
              <Book 
                key={book.id} 
                book={book}
                changeShelfBook={changeShelfBook}
                getCurrentShelfBook={getCurrentShelfBook} />
            </li>
          ))}
        </ol>
      )}
      {books.length === 0 && (
        <span className="not-found">No books on this bookshelf</span>
      )}
    </div>
  </div>
);

export default BookShelf;
