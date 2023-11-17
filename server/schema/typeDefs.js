const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    me: User
  }

  type User {
    _id: ID
    username: String
    email: String
    savedClothes: [Clothes]
  }

  type Clothes {
    clothesId: String
    seller: [String]
    description: String
    price: Int
    size: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveClothes(input: clothesInput): User
    removeClothes(clothesId: ID!): User
  }

  input clothesInput {
    clothesId: String
    type: [String]
    description: String
    title: String
    image: String
    link: String
  } 
`;

module.exports = typeDefs;
