import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "../services/BooksAPI";
// My components
import MyShelf from "../components/MyShelf";
import SearchBooks from "../components/SearchBooks";
import BookDetails from "../components/BookDetails";

// Plugins
import _ from "lodash";

// GraphQl
import { graphql, compose } from "react-apollo";
import {
  AllBooksGraphql,
  AddFromGraphql,
  RemoveFromGraphql
} from "../apollo/BooksQuerys";

class App extends React.Component {
  // State Inicial
  state = {
    books: {},
    booksGraphQl: [],
    loading: true
  };

  componentDidMount() {
    // Get All books
    this.getAllMyBooksShelf();
  }

  componentWillReceiveProps(nextProps) {
    // Get books graphql
    let booksGraphQl = nextProps.data.allBookses || [];
    // Necessário fazer uma cópia pq se não o GraphQl bloqueia
    // o objeto e não permite alteração posteriormente
    booksGraphQl = Object.assign([], booksGraphQl);
    this.setState({ booksGraphQl });
  }

  // Function to get all books
  getAllMyBooksShelf = () => {
    // Search from api
    BooksAPI.getAll().then(result => {
      // Group books by shelf
      const books = _.groupBy(result, "shelf");

      console.log(books);

      // Update state
      this.setState({ books, loading: false });
    });
  };

  // Function to update the book on a shelf
  changeShelfBook = (book, newShelf) => {

    if (newShelf === "graphQl") {
      // Add from GraphQl
      this.addFromGraphQl(book);
      // To remove from my reads
      newShelf = "none";
    } 

    // Update state
    this.setState(prevState => {
      // Books
      const { books, booksGraphQl } = prevState;

      // Check the shelf's book
      if (book.shelf && book.shelf !== "none") {
        // Remove book from current shelf
        if (book.shelf === "graphQl") {
          // Remove from GraphQl
          prevState.booksGraphQl = booksGraphQl.filter(b => b.id !== book.id);
          this.removeFromGraphQl(book);
        } else {
          // Remove from outher shelfs
          books[book.shelf] = books[book.shelf].filter(b => b.id !== book.id);
        }
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
  };

  // Function to check if the book is already in some shelf
  getCurrentShelfBook = book => {

    const { books, booksGraphQl } = this.state;

    // Alwaws none
    book.shelf = "none";

    // Browse properties
    for (var property in books) {
      // Check the book
      if (books[property].filter(b => b.id === book.id).length > 0) {
        book.shelf = property;
        return book;
      }
    }

    // Check the book graphql
    if (booksGraphQl.filter(b => b.id === book.id).length > 0) {
      book.shelf = "graphQl";
      // Property used to delete book
      if (!book.idGraphQl)
        book.idGraphQl =
          booksGraphQl[_.findIndex(booksGraphQl, b => b.id === book.id)].idGraphQl;

      return book;
    }

    // If it does not find returns original book
    return book;
  };

  addFromGraphQl = book => {
    this.props
      .createBooks({
        variables: {
          idApi: book.id,
          author: book.authors,
          imageLinks: JSON.stringify(book.imageLinks),
          shelf: "graphQl",
          title: book.title,
          averageRating: book.averageRating
        },
        refetchQueries: [
          {query: AllBooksGraphql}
        ]
      })
      .then(result => {
        this.setState(prevState => {
          const { booksGraphQl } = prevState;
          booksGraphQl.push(result.data.createBooks);
          return booksGraphQl;
        });
      });
  };

  removeFromGraphQl = book => {
    this.props.deleteBooks({
      variables: { id: book.idGraphQl },
      refetchQueries: [
        {query: AllBooksGraphql}
      ]
    });
  };

  render() {
    return (
      <div className="app">
        {/* Route to component Shelf */}
        <Route
          exact
          path="/"
          render={() => (
            <MyShelf
              books={this.state.books}
              booksGraphQl={this.state.booksGraphQl}
              changeShelfBook={this.changeShelfBook}
              loading={this.state.loading}
            />
          )}
        />

        {/* Route to component SearchBooks */}
        <Route
          path="/search"
          render={({ history }) => (
            <SearchBooks
              changeShelfBook={this.changeShelfBook}
              getCurrentShelfBook={this.getCurrentShelfBook}
              back={() => history.push("/")}
            />
          )}
        />

        <Route
          path="/details"
          render={({ history }) => (
            <BookDetails />
          )}
        />
      </div>
    );
  }
}

export default compose(
  graphql(AllBooksGraphql),
  graphql(AddFromGraphql, { name: "createBooks" }),
  graphql(RemoveFromGraphql, { name: "deleteBooks" })
)(App);
