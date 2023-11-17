import { gql } from "@apollo/client";
export const GET_ME = gql`
  query Me {
    me {
      _id
      email
      savedClothes {
        sellers
        clothesId
        description
        image
        link
        title
      }
      username
    }
  }
`;










