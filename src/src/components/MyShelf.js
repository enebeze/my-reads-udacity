import React from "react";
import { Link } from 'react-router-dom';

// My Components
import BookShelf from "./BookShelf";
import Header from './Header';

// Componente MyShelf
const MyShelf = props => {

    // Receive the props
    const { currentlyReading, wantToRead, read } = props.books;

    return (
        <div className="list-books">
            <Header title='My Reads by Ebenézer' />
            <div className='list-books-content'>
                <div>
                <BookShelf 
                    title='Currently Reading'
                    books={currentlyReading}
                    changeShelfBook={props.changeShelfBook} />

                <BookShelf 
                    title='Want to Read'
                    books={wantToRead} 
                    changeShelfBook={props.changeShelfBook} />

                <BookShelf 
                    title='Read'
                    books={read} 
                    changeShelfBook={props.changeShelfBook} />
                </div>
            </div>
            <div className='open-search'>
                <Link to='/search'>Search Book</Link>
            </div>
        </div>
    );
  }

export default MyShelf;
