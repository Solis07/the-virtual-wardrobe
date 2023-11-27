import { gql } from "@apollo/client";

{/* Changed GET_ME properties so it's 'clothesId', 'title', 'price', and 'image' (same as SearchClothes.jsx') */}
export const GET_ME = gql`
  query me {
    me {
      _id
      email
      savedClothes {
        clothesId
          title
          price
          image
      }
      username
    }
  }
`;
