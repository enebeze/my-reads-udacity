import React from "react";
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'


const Book = ({ book, changeShelfBook }) => (

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
          value={book.shelf}
          onChange={(e) => { changeShelfBook(book, e.target.value); }}
        >
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="graphQl">GraphQl</option>
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
    <div className="averageRating">
      <Rater interactive={false} rating={book.averageRating} /> 
      ({book.averageRating || 0})
    </div>
  </div>
);

export default Book;
