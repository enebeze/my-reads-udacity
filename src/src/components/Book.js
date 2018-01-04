import React from "react";
import BookDetails from "./BookDetails";
import { Modal } from "antd";
import Rater from "react-rater";

class Book extends React.Component {
  state = {
    visible: false
  };

  // Show or Hide Modal
  showHideModal = () => {
    this.setState({ visible: !this.state.visible});
  }

  render() {
    const { book, changeShelfBook } = this.props;
    const { visible } = this.state;

    return (
      <div className="book">
        
          <div className="book-top">
            {book.imageLinks && (
              <a onClick={this.showHideModal}>
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                  }}
                />
              </a>
            )}
            <div className="book-shelf-changer">
              <select
                value={book.shelf}
                onChange={e => {
                  changeShelfBook(book, e.target.value);
                }}
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
        {book.authors &&
          book.authors.map(author => (
            <div key={author} className="book-authors">
              {author}
            </div>
          ))}
        <div className="averageRating">
          <Rater interactive={false} rating={book.averageRating} />
          ({book.averageRating || 0})
        </div>

        <Modal
          width={930}
          visible={visible}
          onCancel={this.showHideModal}
          footer={null}
          closable={false}
        >
          <BookDetails book={book} />
        </Modal>
      </div>
    );
  }
}

export default Book;
