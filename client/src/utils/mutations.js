export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        saveClothes {
          sellers
          clothesId
          description
          price
          size
          image
          link
          title
        }
      }
    }
  }
`;
export const SAVE_CLOTHES = gql`
  mutation saveClothes($input: ClothesInput) {
    saveClothes(input: $input) {
        _id
        username
        email
        saveClothes {
          clothesId
          sellers
          description
          price
          size
          image
          link
          title
        }
      }
    }
  `;
  export const REMOVE_CLOTHES = gql`
    mutation removeClothes($clothesId: String!) {
      removeClothes(clothesId: $clothesId) {
        _id
        username
        email
        saveClothes {
          clothesId
          sellers
          description
          price
          size
          image
          link
          title
        }
      }
    }
  `;









