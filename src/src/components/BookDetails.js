import React from "react";
import { Card, Icon, Col, Row, Rate } from "antd";

const BookDetails = ({ book }) => {
  return (
    <div>
      <Card
        title={book.title}
        style={{ width: 880 }}
        cover={
          <Row style={{marginTop: 20}} >

            <Col style={{ paddingLeft: 30, alignItems: "center" }} span={8}>
              {book.imageLinks && (
                <img
                  alt="example"
                  src={book.imageLinks.smallThumbnail}
                  style={{
                    width: 190,
                    height: 260,
                    paddingBottom: 10
                  }}
                />
              )}
              <Rate disabled defaultValue={book.averageRating} /> ({book.averageRating || 0})
            </Col>

            <Col span={8}>
              <span className="book-title">Author</span>
              {book.authors &&
                book.authors.map(author => (
                  <p key={author} className="book-authors">
                    {author}
                  </p>
                ))}

              <span className="book-title">Publisher</span>
              <p>{book.publisher}</p>

              <span className="book-title">Published Date</span>
              <p>{book.publishedDate}</p>

              <span className="book-title">Categories</span>
              {book.categories &&
                book.categories.map(c => (
                  <p key={c} className="book-authors">
                    {c}
                  </p>
                ))}

              <span className="book-title">Pages</span>
              <p>{book.pageCount}</p>
            </Col>
          </Row>
        }
        actions={[
          <Icon
            type="star"
            onClick={() => { window.open(`https://books.google.com.br/books?op=lookup&id=${book.id}`, "_blank" ); }}
          >Rate It</Icon>,
          <Icon
            type="eye-o"
            onClick={() => { window.open(book.previewLink, "_blank"); }}
          >Preview</Icon>,
        ]}
      >
        <p>{book.description}</p>
      </Card>
    </div>
  );
};

export default BookDetails;
