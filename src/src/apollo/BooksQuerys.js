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
  ) {
    createBooks(
      idApi: $idApi
      authors: $author
      imageLinks: $imageLinks
      shelf: $shelf
      title: $title
    ) {
      id: idApi
      idGraphQl: id
      idApi
      title
      shelf
      imageLinks
      authors
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
