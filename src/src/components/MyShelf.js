import React, { Component } from "react";
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

// My Components
import BookShelf from "./BookShelf";
import Header from './Header';

// Componente MyShelf
class MyShelf extends Component {

    static propTypes = {
        books: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
        changeShelfBook: PropTypes.func.isRequired,
        booksGraphQl: PropTypes.array.isRequired
    }
    

    render() {

        // Receive the props
        const { currentlyReading, wantToRead, read } = this.props.books;

        return (
            <div className="list-books">
                <Header title='My Reads by Ebenézer' />
                <div className='list-books-content'>
                    
                    {this.props.loading && (
                        <div className='loading'>
                            <ReactLoading className='loading' type='bars' color='#2e7c31' delay={1} />
                        </div>
                    )}
    
                    {!this.props.loading && (
                        <div>
                            <BookShelf 
                                title='Currently Reading'
                                books={currentlyReading}
                                changeShelfBook={this.props.changeShelfBook} />
    
                            <BookShelf 
                                title='Want to Read'
                                books={wantToRead} 
                                changeShelfBook={this.props.changeShelfBook} />
    
                            <BookShelf 
                                title='Read'
                                books={read} 
                                changeShelfBook={this.props.changeShelfBook} />
                            
                            <BookShelf
                                title='Books GraphQl'
                                books={this.props.booksGraphQl}
                                changeShelfBook={this.props.changeShelfBook}
                                />
                        </div>
                    )}
                </div>
                <div className='open-search'>
                    <Link to='/search'>Search Book</Link>
                </div>
            </div>
        );
    }    
}

export default MyShelf;
