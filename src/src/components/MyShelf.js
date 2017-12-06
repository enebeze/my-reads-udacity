import React from "react";
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';

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
                
                {props.loading && (
                    <div className='loading'>
                        <ReactLoading className='loading' type='bars' color='#2e7c31' delay={1} />
                    </div>
                )}

                {!props.loading && (
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
                )}
            </div>
            <div className='open-search'>
                <Link to='/search'>Search Book</Link>
            </div>
        </div>
    );
  }

export default MyShelf;
