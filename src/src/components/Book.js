import React from "react";


const Book = ({ book, changeShelfBook, getCurrentShelfBook }) => (

  <div className="book">
    <div className="book-top">
      {book.imageLinks && (
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.smallThumbnail})`
            }}
          />
        )}
      <div className="book-shelf-changer">
        <select
          value={book.shelf || getCurrentShelfBook(book)}
          onChange={(e) => { changeShelfBook(book, e.target.value); }}
        >
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{book.title}</div>
    {book.authors && (
      book.authors.map(author => 
        <div key={author} className="book-authors">{author}</div>
      )
    )}
  </div>
);

export default Book;
