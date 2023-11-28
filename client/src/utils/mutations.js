import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

{/* Changed ADD_USER properties so it's 'clothesId', 'title', 'price', and 'image' (same as SearchClothes.jsx') */}
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        savedClothes {
          clothesId
          title
          price
          image
        }
      }
    }
  }
`;

{/* Changed SAVE_CLOTHES properties so it's 'clothesId', 'title', 'price', and 'image' (same as SearchClothes.jsx') */}
export const SAVE_CLOTHES = gql`
  mutation saveClothes($input: clothesInput) {
    saveClothes(input: $input) {
        _id
        username
        email
        savedClothes {
          clothesId
          title
          price
          image
        }
      }
    }
  `;

{/* Changed REMOVE_CLOTHES properties so it's 'clothesId', 'title', 'price', and 'image' (same as SearchClothes.jsx') */}
export const REMOVE_CLOTHES = gql`
mutation removeClothes($clothesId: ID!) {
  removeClothes(clothesId: $clothesId) {
    _id
    username
    email
    savedClothes {
      clothesId
      title
      price
      image
    }
  }
}
`;
