import gql from 'graphql-tag';

export const AllBooksGraphql = gql`
  query {
    allBookses {
      id: idApi
      idGraphQl: id
      title
      shelf
      authors
      imageLinks
      averageRating
      publisher
      publishedDate
      categories
      pageCount
      previewLink
      description
    }
  }
`;

export const AddFromGraphql = gql`
  mutation createBooks(
    $idApi: String!
    $author: [String!]
    $imageLinks: Json
    $shelf: String
    $title: String
    $averageRating: Float
    $publisher: String
    $publishedDate: String
    $categories: [String!]
    $pageCount: Int
    $previewLink: String
    $description: String
  ) {
    createBooks(
      idApi: $idApi
      authors: $author
      imageLinks: $imageLinks
      shelf: $shelf
      title: $title
      averageRating: $averageRating
      publisher: $publisher
      publishedDate: $publishedDate
      categories: $categories
      pageCount: $pageCount
      previewLink: $previewLink
      description: $description
    ) {
      id: idApi
      idGraphQl: id
      idApi
      title
      shelf
      imageLinks
      authors
      averageRating
      publisher
      publishedDate
      categories
      pageCount
      previewLink
      description
    }
  }
`;

export const RemoveFromGraphql = gql`
  mutation deleteBooks($id: ID!) {
    deleteBooks(id: $id) {
      id
      idApi
    }
  }
`;
